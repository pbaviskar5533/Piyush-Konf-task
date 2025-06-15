
"use client";

import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { animeRecommendations, AnimeRecommendationsInput, AnimeRecommendationsOutput } from '@/ai/flows/anime-recommendations';
import { intelligentAnimeRecommendations, IntelligentAnimeRecommendationsInput, IntelligentAnimeRecommendationsOutput } from '@/ai/flows/intelligent-anime-recommendations';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingDots from '@/components/ui/LoadingDots';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useHistory from '@/hooks/useHistory'; // To get viewing history

// Schemas for forms
const simpleRecSchema = z.object({
  viewingHistory: z.string().min(1, "Please enter at least one anime."),
});
type SimpleRecFormData = z.infer<typeof simpleRecSchema>;

const intelligentRecSchema = z.object({
  userWatchHistory: z.string().min(1, "Please enter your watch history."),
  otherUsersWatchHistory: z.string().min(1, "Please provide other users' watch history as JSON."),
  numberOfRecommendations: z.coerce.number().min(1).max(10).default(5),
});
type IntelligentRecFormData = z.infer<typeof intelligentRecSchema>;


export default function RecommendationsPage() {
  const { toast } = useToast();
  const { enrichedHistory } = useHistory();

  const [simpleRecommendations, setSimpleRecommendations] = useState<string[]>([]);
  const [intelligentRecs, setIntelligentRecs] = useState<string[]>([]);
  const [isLoadingSimple, setIsLoadingSimple] = useState(false);
  const [isLoadingIntelligent, setIsLoadingIntelligent] = useState(false);

  const defaultViewingHistory = enrichedHistory.map(item => item.anime?.title).filter(Boolean).slice(0,10).join('\n')  as string;


  const simpleForm = useForm<SimpleRecFormData>({
    resolver: zodResolver(simpleRecSchema),
    defaultValues: { viewingHistory: defaultViewingHistory || "" },
  });

  const intelligentForm = useForm<IntelligentRecFormData>({
    resolver: zodResolver(intelligentRecSchema),
    defaultValues: {
      userWatchHistory: defaultViewingHistory || "",
      otherUsersWatchHistory: JSON.stringify([
        { userId: "user123", watchHistory: ["Naruto", "Bleach", "Attack on Titan"] },
        { userId: "user456", watchHistory: ["Death Note", "Steins;Gate", "Code Geass"] }
      ], null, 2),
      numberOfRecommendations: 5,
    },
  });
  
  React.useEffect(() => {
    if (defaultViewingHistory && !simpleForm.getValues("viewingHistory")) {
      simpleForm.setValue("viewingHistory", defaultViewingHistory);
    }
    if (defaultViewingHistory && !intelligentForm.getValues("userWatchHistory")) {
       intelligentForm.setValue("userWatchHistory", defaultViewingHistory);
    }
  }, [defaultViewingHistory, simpleForm, intelligentForm]);


  const handleSimpleSubmit: SubmitHandler<SimpleRecFormData> = async (data) => {
    setIsLoadingSimple(true);
    setSimpleRecommendations([]);
    try {
      const input: AnimeRecommendationsInput = {
        viewingHistory: data.viewingHistory.split('\n').map(s => s.trim()).filter(Boolean),
      };
      const result: AnimeRecommendationsOutput = await animeRecommendations(input);
      setSimpleRecommendations(result.recommendations);
    } catch (error) {
      console.error("Error fetching simple recommendations:", error);
      toast({ variant: "destructive", title: "Error", description: "Could not fetch simple recommendations." });
    } finally {
      setIsLoadingSimple(false);
    }
  };

  const handleIntelligentSubmit: SubmitHandler<IntelligentRecFormData> = async (data) => {
    setIsLoadingIntelligent(true);
    setIntelligentRecs([]);
    try {
      let parsedOtherUsersHistory;
      try {
        parsedOtherUsersHistory = JSON.parse(data.otherUsersWatchHistory);
        if (!Array.isArray(parsedOtherUsersHistory) || !parsedOtherUsersHistory.every(u => typeof u === 'object' && u !== null && 'userId' in u && 'watchHistory' in u)) {
          throw new Error("Invalid JSON structure for other users' history.");
        }
      } catch (e) {
        intelligentForm.setError("otherUsersWatchHistory", { type: "manual", message: "Invalid JSON format. Please provide an array of {userId: string, watchHistory: string[]}." });
        setIsLoadingIntelligent(false);
        return;
      }

      const input: IntelligentAnimeRecommendationsInput = {
        userWatchHistory: data.userWatchHistory.split('\n').map(s => s.trim()).filter(Boolean),
        otherUsersWatchHistory: parsedOtherUsersHistory,
        numberOfRecommendations: data.numberOfRecommendations,
      };
      const result: IntelligentAnimeRecommendationsOutput = await intelligentAnimeRecommendations(input);
      setIntelligentRecs(result.recommendations);
    } catch (error) {
      console.error("Error fetching intelligent recommendations:", error);
      toast({ variant: "destructive", title: "Error", description: "Could not fetch intelligent recommendations." });
    } finally {
      setIsLoadingIntelligent(false);
    }
  };

  return (
    <div className="container mx-auto space-y-12 py-8">
      <SectionTitle>AI Anime Recommendations</SectionTitle>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Simple Recommendations Card */}
        <Card className="bg-card shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline">Personalized Picks</CardTitle>
            <CardDescription>Get recommendations based on your viewing history.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={simpleForm.handleSubmit(handleSimpleSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="viewingHistory" className="font-medium">Your Watched Anime (one per line)</Label>
                <Textarea
                  id="viewingHistory"
                  {...simpleForm.register('viewingHistory')}
                  rows={5}
                  className="mt-1 bg-input"
                  placeholder="e.g. Attack on Titan&#x0a;Death Note&#x0a;Naruto"
                />
                {simpleForm.formState.errors.viewingHistory && (
                  <p className="mt-1 text-sm text-destructive">{simpleForm.formState.errors.viewingHistory.message}</p>
                )}
              </div>
              <Button type="submit" disabled={isLoadingSimple} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                {isLoadingSimple ? <LoadingDots /> : 'Get Recommendations'}
              </Button>
            </form>
            {simpleRecommendations.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 font-headline text-lg font-semibold">Here are your picks:</h3>
                <ul className="list-inside list-disc space-y-1 rounded-md border border-border bg-background/30 p-4">
                  {simpleRecommendations.map((rec, index) => (
                    <li key={index} className="text-foreground/90">{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Intelligent Recommendations Card */}
        <Card className="bg-card shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline">Intelligent Discovery (Collaborative Filtering)</CardTitle>
            <CardDescription>Discover new anime based on what similar users enjoy.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={intelligentForm.handleSubmit(handleIntelligentSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="userWatchHistoryInt" className="font-medium">Your Watched Anime (one per line)</Label>
                <Textarea
                  id="userWatchHistoryInt"
                  {...intelligentForm.register('userWatchHistory')}
                  rows={3}
                  className="mt-1 bg-input"
                  placeholder="e.g. Attack on Titan&#x0a;Death Note"
                />
                {intelligentForm.formState.errors.userWatchHistory && (
                  <p className="mt-1 text-sm text-destructive">{intelligentForm.formState.errors.userWatchHistory.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="otherUsersWatchHistory" className="font-medium">Other Users' Watch History (JSON format)</Label>
                <Textarea
                  id="otherUsersWatchHistory"
                  {...intelligentForm.register('otherUsersWatchHistory')}
                  rows={5}
                  className="mt-1 font-code text-xs bg-input"
                  placeholder='[{"userId": "user1", "watchHistory": ["Anime A", "Anime B"]}]'
                />
                {intelligentForm.formState.errors.otherUsersWatchHistory && (
                  <p className="mt-1 text-sm text-destructive">{intelligentForm.formState.errors.otherUsersWatchHistory.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="numberOfRecommendations" className="font-medium">Number of Recommendations</Label>
                <Input
                  id="numberOfRecommendations"
                  type="number"
                  {...intelligentForm.register('numberOfRecommendations')}
                  className="mt-1 bg-input"
                  min="1"
                  max="10"
                />
                {intelligentForm.formState.errors.numberOfRecommendations && (
                  <p className="mt-1 text-sm text-destructive">{intelligentForm.formState.errors.numberOfRecommendations.message}</p>
                )}
              </div>
              <Button type="submit" disabled={isLoadingIntelligent} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                {isLoadingIntelligent ? <LoadingDots /> : 'Suggest New Anime'}
              </Button>
            </form>
            {intelligentRecs.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 font-headline text-lg font-semibold">You might also like:</h3>
                 <ul className="list-inside list-disc space-y-1 rounded-md border border-border bg-background/30 p-4">
                  {intelligentRecs.map((rec, index) => (
                    <li key={index} className="text-foreground/90">{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
       <Alert className="mt-12 border-accent text-accent">
          <Terminal className="h-5 w-5 !text-accent" />
          <AlertTitle className="font-headline !text-accent">Note on AI Recommendations</AlertTitle>
          <AlertDescription className="text-accent/80">
            The AI might take a moment to generate recommendations. The quality of recommendations depends on the input provided.
            Your recent watch history is pre-filled for convenience.
          </AlertDescription>
        </Alert>
    </div>
  );
}
