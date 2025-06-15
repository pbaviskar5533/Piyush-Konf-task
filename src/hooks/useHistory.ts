
"use client";

import useLocalStorage from './useLocalStorage';
import type { HistoryItem, Anime, Episode } from '@/lib/types';
import { animes as allAnimes } from '@/lib/mock-data';

const HISTORY_KEY = 'animeStreamHistory';

export interface EnrichedHistoryItem extends HistoryItem {
  anime?: Anime;
  episode?: Episode;
}
interface UseHistoryReturn {
  history: HistoryItem[];
  enrichedHistory: EnrichedHistoryItem[];
  addToHistory: (animeId: string, episodeId: string) => void;
  clearHistory: () => void;
  getWatchedEpisodes: (animeId: string) => string[];
}

const useHistory = (): UseHistoryReturn => {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>(HISTORY_KEY, []);

  const addToHistory = (animeId: string, episodeId: string) => {
    const newHistoryItem: HistoryItem = {
      animeId,
      episodeId,
      watchedAt: new Date().toISOString(),
    };
    // Remove previous entry for the same episode to update watchedAt, then add new one
    const updatedHistory = history.filter(item => !(item.animeId === animeId && item.episodeId === episodeId));
    setHistory([newHistoryItem, ...updatedHistory].slice(0, 50)); // Keep last 50 items
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const getWatchedEpisodes = (animeId: string): string[] => {
    return history
      .filter(item => item.animeId === animeId)
      .map(item => item.episodeId);
  };
  
  const enrichedHistory: EnrichedHistoryItem[] = history
    .map(item => {
      const anime = allAnimes.find(a => a.id === item.animeId);
      const episode = anime?.episodes.find(e => e.id === item.episodeId);
      return { ...item, anime, episode };
    })
    .filter(item => !!item.anime && !!item.episode)
    .sort((a,b) => new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime());

  return { history, enrichedHistory, addToHistory, clearHistory, getWatchedEpisodes };
};

export default useHistory;
