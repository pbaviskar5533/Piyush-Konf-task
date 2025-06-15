
import { FilmIcon } from 'lucide-react';

interface VideoPlayerPlaceholderProps {
  animeTitle?: string;
  episodeTitle?: string;
}

const VideoPlayerPlaceholder = ({ animeTitle, episodeTitle }: VideoPlayerPlaceholderProps) => {
  return (
    <div className="aspect-video w-full rounded-lg border-2 border-dashed border-accent bg-muted/50 flex flex-col items-center justify-center text-center p-4">
      <FilmIcon className="h-16 w-16 text-accent mb-4" />
      <h2 className="font-headline text-xl text-foreground">Video Player</h2>
      {animeTitle && episodeTitle && (
         <p className="text-muted-foreground mt-1">Playing: {animeTitle} - {episodeTitle}</p>
      )}
      <p className="text-sm text-muted-foreground mt-2">
        Video streaming functionality would be implemented here.
      </p>
    </div>
  );
};

export default VideoPlayerPlaceholder;
