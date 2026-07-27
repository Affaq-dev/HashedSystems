"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { useSearchParamsState } from "@/hooks/use-search-params-state";
import { useVenues } from "@/hooks/use-venues";
import { VenueCard } from "@/components/venue/venue-card";
import { VenueCardSkeleton } from "./venue-card-skeleton";
import { EmptyState } from "./empty-state";
import { ActiveFilters } from "./active-filters";
import { Button } from "@/components/ui/button";

export function ResultsGrid() {
  const { params } = useSearchParamsState();
  const query = useVenues(params);
  const [_mapOpen, setMapOpen] = useState(false);

  const total = query.data?.pages[0]?.total;
  const allItems = query.data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <>
      <ActiveFilters total={total} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 pb-10">
        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            {query.isPending ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <VenueCardSkeleton key={i} />
                ))}
              </div>
            ) : query.isError ? (
              <div className="py-20 text-center">
                <p className="text-foreground font-medium mb-4">
                  Something went wrong loading venues.
                </p>
                <Button variant="outline" onClick={() => query.refetch()}>
                  Try again
                </Button>
              </div>
            ) : total === 0 ? (
              <EmptyState />
            ) : (
              <div
                className={cn(
                  "transition-opacity duration-150",
                  query.isFetching && !query.isFetchingNextPage
                    ? "opacity-60 pointer-events-none"
                    : "opacity-100"
                )}
              >
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {allItems.map((venue) => (
                    <VenueCard key={venue.id} venue={venue} />
                  ))}
                </div>

                {query.hasNextPage && (
                  <div className="mt-8 flex justify-center">
                    <Button
                      variant="outline"
                      onClick={() => query.fetchNextPage()}
                      disabled={query.isFetchingNextPage}
                    >
                      {query.isFetchingNextPage ? "Loading..." : "Load more venues"}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          <aside className="hidden xl:block xl:w-[38%] shrink-0">
            <div className="rounded-card bg-surface-alt border border-border h-[70vh] sticky top-[104px] flex items-center justify-center text-muted text-sm">
              Map view coming soon
            </div>
          </aside>
        </div>
      </div>

      <button
        type="button"
        aria-label="Show map"
        onClick={() => setMapOpen(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 xl:hidden inline-flex items-center gap-2 bg-ink text-white rounded-full h-11 px-6 shadow-float text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-colors hover:bg-ink/90 motion-reduce:transition-none"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3.5-4.5 8.5-4.5 8.5S3.5 9.5 3.5 6A4.5 4.5 0 0 1 8 1.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.25" />
        </svg>
        Show Map
      </button>
    </>
  );
}
