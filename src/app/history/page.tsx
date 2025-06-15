
"use client";

import Link from 'next/link';
import Image from 'next/image';
import useHistory, { type EnrichedHistoryItem } from '@/hooks/useHistory';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/button';
import { HistoryIcon, PlayCircleIcon, Trash2Icon, TvIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function HistoryPage() {
  const { enrichedHistory, clearHistory, addToHistory } = useHistory();

  const handleContinueWatching = (item: EnrichedHistoryItem) => {
    // This will take user to anime page, which auto-plays or highlights the episode.
    // For a true "continue watching", episode selection logic on anime page would need adjustment.
    // We also re-add to history to bump it to the top.
    if (item.animeId && item.episodeId) {
        addToHistory(item.animeId, item.episodeId);
    }
  };


  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <SectionTitle className="!mb-0">Watch History</SectionTitle>
        {enrichedHistory.length > 0 && (
          <Button variant="outline" onClick={clearHistory} className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive">
            <Trash2Icon className="mr-2 h-4 w-4" /> Clear History
          </Button>
        )}
      </div>

      {enrichedHistory.length > 0 ? (
        <div className="space-y-4">
          {enrichedHistory.map((item) => (
            <div
              key={`${item.animeId}-${item.episodeId}-${item.watchedAt}`}
              className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                {item.anime?.coverImageUrl ? (
                    <Image
                        src={item.anime.coverImageUrl}
                        alt={item.anime.title || 'Anime cover'}
                        width={64}
                        height={96}
                        className="h-24 w-16 rounded object-cover"
                        data-ai-hint="anime art"
                    />
                ) : (
                    <div className="flex h-24 w-16 items-center justify-center rounded bg-muted">
                        <TvIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                )}
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">
                    {item.anime?.title || 'Unknown Anime'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.episode?.title ? `Ep ${item.episode.episodeNumber}: ${item.episode.title}` : 'Unknown Episode'}
                  </p>
                  <p className="text-xs text-muted-foreground/80">
                    Watched {formatDistanceToNow(new Date(item.watchedAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <Button asChild variant="ghost" className="text-accent hover:text-accent/80 sm:ml-auto">
                <Link href={`/anime/${item.animeId}?episode=${item.episodeId}`} onClick={() => handleContinueWatching(item)}>
                  <PlayCircleIcon className="mr-2 h-5 w-5" /> Continue Watching
                </Link>
              </Button>
            </div>
          ))}
        </div>
      ) : (
         <div className="mt-16 flex flex-col items-center justify-center text-center">
          <HistoryIcon className="mb-6 h-24 w-24 text-muted-foreground" />
          <h2 className="mb-2 font-headline text-2xl font-semibold text-foreground">
            No Watch History Yet
          </h2>
          <p className="mb-6 max-w-md text-muted-foreground">
            Start watching some anime, and your recently viewed episodes will appear here.
          </p>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/">Discover Anime</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
