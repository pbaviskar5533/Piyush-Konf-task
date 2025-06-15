
"use client";

import AnimeCard from '@/components/anime/AnimeCard';
import SectionTitle from '@/components/ui/SectionTitle';
import useWatchlist from '@/hooks/useWatchlist';
import { Button } from '@/components/ui/button';
import { ListVideoIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';

export default function WatchlistPage() {
  const { watchlistAnimes, removeFromWatchlist, watchlist } = useWatchlist();

  return (
    <div className="container mx-auto space-y-8 py-8">
      <SectionTitle>My Watchlist</SectionTitle>
      {watchlistAnimes.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {watchlistAnimes.map((anime) => (
            <div key={anime.id} className="group relative">
              <AnimeCard anime={anime} />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeFromWatchlist(anime.id)}
                className="absolute right-2 top-2 z-10 opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                aria-label={`Remove ${anime.title} from watchlist`}
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <ListVideoIcon className="mb-6 h-24 w-24 text-muted-foreground" />
          <h2 className="mb-2 font-headline text-2xl font-semibold text-foreground">
            Your Watchlist is Empty
          </h2>
          <p className="mb-6 max-w-md text-muted-foreground">
            Looks like you haven't added any anime to your watchlist yet. Start exploring and add your favorites!
          </p>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/">Discover Anime</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
