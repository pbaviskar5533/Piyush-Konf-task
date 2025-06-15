
import LoadingDots from "@/components/ui/LoadingDots";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <LoadingDots className="text-accent" dotClassName="h-3 w-3" />
        <p className="text-muted-foreground">Loading page...</p>
      </div>
    </div>
  );
}
