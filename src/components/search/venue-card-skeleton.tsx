import { Skeleton } from "@/components/ui/skeleton";

export function VenueCardSkeleton() {
  return (
    <div className="flex h-full flex-col bg-white rounded-card shadow-card overflow-hidden">
      <Skeleton className="aspect-[6/5] shrink-0 rounded-none" />
      <div className="flex flex-1 flex-col p-4">
        <div className="min-h-[44px] space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="mt-1 h-3.5 w-1/3" />
        <div className="mt-2 mb-3 flex min-h-[59px] content-start flex-wrap gap-[5px]">
          <Skeleton className="h-[27px] w-16 rounded-full" />
          <Skeleton className="h-[27px] w-20 rounded-full" />
          <Skeleton className="h-[27px] w-16 rounded-full" />
        </div>
        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-[32px] w-[100px] rounded-[10px]" />
        </div>
      </div>
    </div>
  );
}
