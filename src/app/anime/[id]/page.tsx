
"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getAnimeById } from '@/lib/mock-data';
import type { Anime as AnimeType, Episode } from '@/lib/types';
import SectionTitle from '@/components/ui/SectionTitle';
import EpisodeListItem from '@/components/anime/EpisodeListItem';
import VideoPlayerPlaceholder from '@/components/anime/VideoPlayerPlaceholder';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon, CheckCircleIcon, StarIcon, CalendarDaysIcon, TvIcon, Loader2 } from 'lucide-react';
import useWatchlist from '@/hooks/useWatchlist';
import useHistory from '@/hooks/useHistory';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AnimeDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [anime, setAnime] = useState<AnimeType | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { addToWatchlist, removeFromWatchlist, isOnWatchlist } = useWatchlist();
  const { addToHistory, getWatchedEpisodes } = useHistory();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const fetchedAnime = getAnimeById(id);
        if (fetchedAnime) {
          setAnime(fetchedAnime);
          if (fetchedAnime.episodes.length > 0) {
            // setSelectedEpisode(fetchedAnime.episodes[0]); // Auto-select first episode
          }
        }
        setIsLoading(false);
      }, 300);
    }
  }, [id]);

  const handlePlayEpisode = (episodeId: string) => {
    if (!anime) return;
    const episode = anime.episodes.find(ep => ep.id === episodeId);
    if (episode) {
      setSelectedEpisode(episode);
      addToHistory(anime.id, episode.id);
       // Scroll to player
      const playerElement = document.getElementById('video-player-section');
      if (playerElement) {
        playerElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-theme(space.32))] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-accent" />
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="flex min-h-[calc(100vh-theme(space.32))] flex-col items-center justify-center text-center">
        <TvIcon className="h-24 w-24 text-muted-foreground mb-4" />
        <SectionTitle>Anime Not Found</SectionTitle>
        <p className="text-muted-foreground">
          The anime you're looking for doesn't exist or couldn't be loaded.
        </p>
        <Button asChild variant="link" className="mt-4 text-accent">
          <a href="/">Go to Discover</a>
        </Button>
      </div>
    );
  }

  const isAnimeOnWatchlist = isOnWatchlist(anime.id);
  const watchedEpisodes = getWatchedEpisodes(anime.id);

  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Image
            src={anime.coverImageUrl}
            alt={`Cover of ${anime.title}`}
            width={400}
            height={600}
            className="w-full rounded-lg object-cover shadow-xl"
            priority
            data-ai-hint="anime poster"
          />
           <Button
            onClick={() => isAnimeOnWatchlist ? removeFromWatchlist(anime.id) : addToWatchlist(anime.id)}
            className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90"
            aria-live="polite"
          >
            {isAnimeOnWatchlist ? (
              <>
                <CheckCircleIcon className="mr-2 h-5 w-5" /> Added to Watchlist
              </>
            ) : (
              <>
                <PlusCircleIcon className="mr-2 h-5 w-5" /> Add to Watchlist
              </>
            )}
          </Button>
        </div>

        <div className="md:col-span-2">
          <h1 className="mb-2 font-headline text-4xl font-bold text-foreground">{anime.title}</h1>
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {anime.rating && (
              <span className="flex items-center">
                <StarIcon className="mr-1 h-4 w-4 text-amber-400 fill-amber-400" /> {anime.rating.toFixed(1)}
              </span>
            )}
            {anime.releaseYear && (
              <span className="flex items-center">
                <CalendarDaysIcon className="mr-1 h-4 w-4" /> {anime.releaseYear}
              </span>
            )}
             <span className="flex items-center">
                <TvIcon className="mr-1 h-4 w-4" /> {anime.episodes.length} Episodes
              </span>
            <span>{anime.status}</span>
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            {anime.genres.map(genre => (
              <Badge key={genre} variant="outline" className="border-accent text-accent">{genre}</Badge>
            ))}
          </div>
          <p className="mb-6 text-base leading-relaxed text-foreground/80">{anime.description}</p>
        </div>
      </div>
      
      {selectedEpisode && (
        <section id="video-player-section" className="pt-4">
            <VideoPlayerPlaceholder animeTitle={anime.title} episodeTitle={selectedEpisode.title} />
        </section>
      )}


      <section>
        <SectionTitle as="h3">Episodes</SectionTitle>
        {anime.episodes.length > 0 ? (
           <ScrollArea className="h-[400px] rounded-md border border-border p-1">
            <div className="space-y-3 p-3">
                {anime.episodes.map(episode => (
                <EpisodeListItem
                    key={episode.id}
                    episode={episode}
                    animeId={anime.id}
                    onPlay={handlePlayEpisode}
                    isWatched={watchedEpisodes.includes(episode.id)}
                />
                ))}
            </div>
          </ScrollArea>
        ) : (
          <p className="text-muted-foreground">No episodes available for this series yet.</p>
        )}
      </section>
    </div>
  );
}
