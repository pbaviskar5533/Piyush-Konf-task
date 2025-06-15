
"use client";

import useLocalStorage from './useLocalStorage';
import type { WatchlistItem, Anime } from '@/lib/types';
import { animes as allAnimes } from '@/lib/mock-data'; // Assuming mock-data exports all animes

const WATCHLIST_KEY = 'animeStreamWatchlist';

interface UseWatchlistReturn {
  watchlist: WatchlistItem[];
  watchlistAnimes: Anime[];
  addToWatchlist: (animeId: string) => void;
  removeFromWatchlist: (animeId: string) => void;
  isOnWatchlist: (animeId: string) => boolean;
}

const useWatchlist = (): UseWatchlistReturn => {
  const [watchlist, setWatchlist] = useLocalStorage<WatchlistItem[]>(WATCHLIST_KEY, []);

  const addToWatchlist = (animeId: string) => {
    if (!watchlist.find(item => item.animeId === animeId)) {
      setWatchlist([...watchlist, { animeId, addedAt: new Date().toISOString() }]);
    }
  };

  const removeFromWatchlist = (animeId: string) => {
    setWatchlist(watchlist.filter(item => item.animeId !== animeId));
  };

  const isOnWatchlist = (animeId: string): boolean => {
    return !!watchlist.find(item => item.animeId === animeId);
  };

  const watchlistAnimes: Anime[] = watchlist
    .map(item => allAnimes.find(anime => anime.id === item.animeId))
    .filter((anime): anime is Anime => !!anime)
    .sort((a,b) => new Date(watchlist.find(i => i.animeId === b.id)!.addedAt).getTime() - new Date(watchlist.find(i => i.animeId === a.id)!.addedAt).getTime());


  return { watchlist, watchlistAnimes, addToWatchlist, removeFromWatchlist, isOnWatchlist };
};

export default useWatchlist;
