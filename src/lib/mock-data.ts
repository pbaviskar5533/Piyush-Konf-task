
import type { Anime, Genre } from './types';

export const genres: Genre[] = [
  { id: 'action', name: 'Action' },
  { id: 'adventure', name: 'Adventure' },
  { id: 'comedy', name: 'Comedy' },
  { id: 'drama', name: 'Drama' },
  { id: 'fantasy', name: 'Fantasy' },
  { id: 'sci-fi', name: 'Sci-Fi' },
  { id: 'slice-of-life', name: 'Slice of Life' },
  { id: 'romance', name: 'Romance' },
  { id: 'supernatural', name: 'Supernatural' },
];

export const animes: Anime[] = [
  {
    id: '1',
    title: 'Cosmic Voyager',
    description: 'A thrilling adventure across galaxies to find the legendary Cosmic Crystal. Join Captain Alex and his diverse crew as they battle space pirates, explore strange new worlds, and uncover ancient secrets.',
    coverImageUrl: 'https://placehold.co/400x600.png',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    rating: 4.8,
    popularityScore: 95,
    releaseYear: 2023,
    status: 'Ongoing',
    episodes: [
      { id: 'e1-1', title: 'The Journey Begins', episodeNumber: 1, duration: '24min', description: 'The crew assembles for their epic quest.' },
      { id: 'e1-2', title: 'Nebula of Peril', episodeNumber: 2, duration: '23min', description: 'A dangerous shortcut through a volatile nebula.' },
      { id: 'e1-3', title: 'Pirate Encounter', episodeNumber: 3, duration: '25min', description: 'First encounter with the dreaded space pirates.' },
    ],
  },
  {
    id: '2',
    title: 'Magical Academy Chronicles',
    description: 'Follow the lives of students at the prestigious Aethelgard Academy of Magic. Elara, a gifted but reckless mage, uncovers a dark plot threatening her school and the entire magical realm.',
    coverImageUrl: 'https://placehold.co/400x600.png',
    genres: ['Fantasy', 'Drama', 'Supernatural'],
    rating: 4.5,
    popularityScore: 92,
    releaseYear: 2022,
    status: 'Completed',
    episodes: [
      { id: 'e2-1', title: 'First Day at Aethelgard', episodeNumber: 1, duration: '22min' },
      { id: 'e2-2', title: 'The Forbidden Spell', episodeNumber: 2, duration: '24min' },
      { id: 'e2-3', title: 'Whispers in the Dark', episodeNumber: 3, duration: '23min' },
      { id: 'e2-4', title: 'Tournament of Mages', episodeNumber: 4, duration: '25min' },
    ],
  },
  {
    id: '3',
    title: 'Cyber City Renegades',
    description: 'In a neon-lit dystopian future, a group of renegade hackers fights against a tyrannical corporation controlling every aspect of life. Led by the enigmatic "Zero", they expose corruption and fight for freedom.',
    coverImageUrl: 'https://placehold.co/400x600.png',
    genres: ['Sci-Fi', 'Action', 'Drama'],
    rating: 4.6,
    popularityScore: 88,
    releaseYear: 2023,
    status: 'Ongoing',
    episodes: [
      { id: 'e3-1', title: 'System Error', episodeNumber: 1, duration: '24min' },
      { id: 'e3-2', title: 'Ghost in the Machine', episodeNumber: 2, duration: '23min' },
    ],
  },
  {
    id: '4',
    title: 'Slice of Sweet Life',
    description: 'A heartwarming story about a group of friends running a small bakery in a quaint town. Experience their daily joys, struggles, and the sweet moments that make life special.',
    coverImageUrl: 'https://placehold.co/400x600.png',
    genres: ['Slice of Life', 'Comedy', 'Romance'],
    rating: 4.9,
    popularityScore: 90,
    releaseYear: 2021,
    status: 'Completed',
    episodes: [
      { id: 'e4-1', title: 'The Grand Opening', episodeNumber: 1, duration: '24min' },
      { id: 'e4-2', title: 'A Pinch of Love', episodeNumber: 2, duration: '22min' },
      { id: 'e4-3', title: 'Festival Fiasco', episodeNumber: 3, duration: '23min' },
    ],
  },
   {
    id: '5',
    title: 'Echoes of Yesterday',
    description: 'A high school student discovers he can communicate with ghosts. He uses his newfound ability to solve mysteries and help spirits find peace, all while navigating the complexities of teenage life.',
    coverImageUrl: 'https://placehold.co/400x600.png',
    genres: ['Supernatural', 'Drama', 'Slice of Life'],
    rating: 4.3,
    popularityScore: 85,
    releaseYear: 2024,
    status: 'New Release',
    episodes: [
      { id: 'e5-1', title: 'The First Echo', episodeNumber: 1, duration: '24min' },
    ],
  },
  {
    id: '6',
    title: 'Galactic Footballers',
    description: 'In a universe where football is the ultimate sport, a ragtag team from Earth aims for the Galactic Cup. Can they overcome alien physiology and advanced technology to become champions?',
    coverImageUrl: 'https://placehold.co/400x600.png',
    genres: ['Action', 'Comedy', 'Sci-Fi'],
    rating: 4.2,
    popularityScore: 80,
    releaseYear: 2024,
    status: 'New Release',
    episodes: [
      { id: 'e6-1', title: 'Kick Off', episodeNumber: 1, duration: '23min' },
    ],
  }
];

export const getAnimeById = (id: string): Anime | undefined => {
  return animes.find(anime => anime.id === id);
};

export const getPopularAnimes = (limit: number = 3): Anime[] => {
  return [...animes].sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0)).slice(0, limit);
};

export const getNewReleases = (limit: number = 3): Anime[] => {
  return animes.filter(anime => anime.releaseYear === new Date().getFullYear() || anime.status === 'New Release').slice(0, limit);
};

export const getAnimesByGenre = (genreName: string, limit: number = 6): Anime[] => {
  return animes.filter(anime => anime.genres.includes(genreName)).slice(0, limit);
};

export const searchAnimes = (query: string): Anime[] => {
  if (!query) return [];
  return animes.filter(anime => anime.title.toLowerCase().includes(query.toLowerCase()));
};
