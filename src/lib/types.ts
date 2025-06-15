
export interface Episode {
  id: string;
  title: string;
  episodeNumber: number;
  duration: string; // e.g., "24min"
  thumbnailUrl?: string; // Optional: if episodes have individual thumbnails
  description?: string;
}

export interface Anime {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  genres: string[];
  rating?: number; // e.g., 4.5
  episodes: Episode[];
  popularityScore?: number; // For sorting by popularity
  releaseYear?: number; // For "New Releases"
  status?: 'Ongoing' | 'Completed';
}

export interface WatchlistItem {
  animeId: string;
  addedAt: string; // ISO date string
}

export interface HistoryItem {
  animeId: string;
  episodeId: string;
  watchedAt: string; // ISO date string
  // progress?: number; // 0-1 for percentage watched, for "continue watching"
}

export interface Genre {
  id: string;
  name: string;
}
