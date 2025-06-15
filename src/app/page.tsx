
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import AnimeCard from '@/components/anime/AnimeCard';
import SectionTitle from '@/components/ui/SectionTitle';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon, XIcon } from 'lucide-react';
import { animes, genres, getPopularAnimes, getNewReleases, getAnimesByGenre, searchAnimes as searchAnimeData } from '@/lib/mock-data';
import type { Anime } from '@/lib/types';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Anime[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  const popularAnimes = useMemo(() => getPopularAnimes(6), []);
  const newReleases = useMemo(() => getNewReleases(6), []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsLoadingSearch(true);
    const timer = setTimeout(() => {
      setSearchResults(searchAnimeData(searchTerm));
      setIsLoadingSearch(false);
    }, 500); // Debounce search

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div className="container mx-auto space-y-12 py-8">
      <div className="relative mx-auto mb-12 max-w-2xl">
        <SectionTitle as="h1" className="text-center !mb-4">Discover Anime</SectionTitle>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title, genre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full bg-input py-6 pl-10 pr-10 text-lg shadow-lg focus:ring-2 focus:ring-accent"
            aria-label="Search anime"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <XIcon className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {isLoadingSearch && <p className="text-center text-muted-foreground">Searching...</p>}

      {searchResults.length > 0 && (
        <section>
          <SectionTitle>Search Results for "{searchTerm}"</SectionTitle>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {searchResults.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </section>
      )}

      {!searchTerm && (
        <>
          <section>
            <SectionTitle>Popular This Season</SectionTitle>
            <ScrollArea className="w-full whitespace-nowrap rounded-md">
              <div className="flex w-max space-x-4 p-4">
                {popularAnimes.map((anime) => (
                  <div key={anime.id} className="w-60 flex-shrink-0">
                    <AnimeCard anime={anime} />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          <section>
            <SectionTitle>New Releases</SectionTitle>
             <ScrollArea className="w-full whitespace-nowrap rounded-md">
              <div className="flex w-max space-x-4 p-4">
                {newReleases.map((anime) => (
                   <div key={anime.id} className="w-60 flex-shrink-0">
                    <AnimeCard anime={anime} />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          {genres.map((genre) => {
            const genreAnimes = getAnimesByGenre(genre.name, 6);
            if (genreAnimes.length === 0) return null;
            return (
              <section key={genre.id}>
                <SectionTitle>Top in {genre.name}</SectionTitle>
                <ScrollArea className="w-full whitespace-nowrap rounded-md">
                  <div className="flex w-max space-x-4 p-4">
                    {genreAnimes.map((anime) => (
                      <div key={anime.id} className="w-60 flex-shrink-0">
                        <AnimeCard anime={anime} />
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </section>
            );
          })}
        </>
      )}
    </div>
  );
}
