
import type { Episode } from '@/lib/types';
import { PlayCircleIcon, TvIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EpisodeListItemProps {
  episode: Episode;
  animeId: string;
  onPlay: (episodeId: string) => void;
  isWatched?: boolean;
}

const EpisodeListItem = ({ episode, animeId, onPlay, isWatched }: EpisodeListItemProps) => {
  return (
    <div className={cn(
      "flex items-center justify-between rounded-lg border border-border bg-card p-3 shadow-sm transition-colors hover:bg-card/80",
      isWatched && "bg-primary/10 border-primary/30"
      )}
    >
      <div className="flex items-center gap-3">
        {episode.thumbnailUrl ? (
            <img 
                src={episode.thumbnailUrl} 
                alt={`Thumbnail for ${episode.title}`} 
                className="h-12 w-20 rounded object-cover"
                data-ai-hint="anime scene"
            />
        ) : (
            <div className="flex h-12 w-20 items-center justify-center rounded bg-muted">
                <TvIcon className="h-6 w-6 text-muted-foreground" />
            </div>
        )}
        <div>
          <h3 className="font-headline text-sm font-medium text-foreground">
            Ep {episode.episodeNumber}: {episode.title}
          </h3>
          <p className="text-xs text-muted-foreground">{episode.duration}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPlay(episode.id)}
        aria-label={`Play ${episode.title}`}
        className="text-accent hover:text-accent/80"
      >
        <PlayCircleIcon className="h-7 w-7" />
      </Button>
    </div>
  );
};

export default EpisodeListItem;
