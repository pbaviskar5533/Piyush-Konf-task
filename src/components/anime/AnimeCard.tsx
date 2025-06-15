
import Link from 'next/link';
import Image from 'next/image';
import type { Anime } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarIcon } from 'lucide-react';

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    <Link href={`/anime/${anime.id}`} passHref>
      <Card className="h-full transform-gpu overflow-hidden bg-card transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-accent/20">
        <CardHeader className="p-0">
          <div className="aspect-[2/3] w-full overflow-hidden">
            <Image
              src={anime.coverImageUrl}
              alt={`Cover art for ${anime.title}`}
              width={400}
              height={600}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              data-ai-hint="anime illustration"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="mb-2 line-clamp-2 font-headline text-lg text-foreground">
            {anime.title}
          </CardTitle>
          <div className="mb-2 flex flex-wrap gap-1">
            {anime.genres.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
          <p className="line-clamp-3 text-xs text-muted-foreground">
            {anime.description}
          </p>
        </CardContent>
        {anime.rating && (
          <CardFooter className="p-4 pt-0">
            <div className="flex items-center text-sm text-amber-400">
              <StarIcon className="mr-1 h-4 w-4 fill-amber-400" />
              <span>{anime.rating.toFixed(1)}</span>
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
};

export default AnimeCard;
