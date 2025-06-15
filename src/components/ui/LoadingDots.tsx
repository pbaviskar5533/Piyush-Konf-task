
import { cn } from "@/lib/utils";

interface LoadingDotsProps {
  className?: string;
  dotClassName?: string;
}

const LoadingDots = ({ className, dotClassName }: LoadingDotsProps) => {
  return (
    <div className={cn("flex items-center justify-center space-x-1", className)}>
      <span className={cn("h-2 w-2 animate-pulse rounded-full bg-current delay-0", dotClassName)} />
      <span className={cn("h-2 w-2 animate-pulse rounded-full bg-current delay-200", dotClassName)} />
      <span className={cn("h-2 w-2 animate-pulse rounded-full bg-current delay-[400ms]", dotClassName)} />
    </div>
  );
};

export default LoadingDots;
