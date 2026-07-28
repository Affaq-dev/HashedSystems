"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/cn";
import { useSearchParamsState } from "@/hooks/use-search-params-state";
import { useVenues } from "@/hooks/use-venues";
import { VenueCard } from "@/components/venue/venue-card";
import { VenueCardSkeleton } from "./venue-card-skeleton";
import { EmptyState } from "./empty-state";
import { ActiveFilters } from "./active-filters";
import { Button } from "@/components/ui/button";

const VenueMap = dynamic(() => import("./venue-map"), {
  ssr: false,
  loading: () => <div className="h-full w-full rounded-card bg-surface-alt animate-pulse" />,
});

export function ResultsGrid() {
  const { params } = useSearchParamsState();
  const query = useVenues(params);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileMapOpen, setMobileMapOpen] = useState(false);

  const mapSectionRef = useRef<HTMLDivElement>(null);

  const handleViewDetails = useCallback((id: string) => {
    setSelectedId((current) => (current === id ? null : id));
    if (window.matchMedia("(max-width: 1279px)").matches) {
      setMobileMapOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!mobileMapOpen) return;
    mapSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [mobileMapOpen]);

  const total = query.data?.pages[0]?.total;
  const allItems = useMemo(
    () => query.data?.pages.flatMap((p) => p.items) ?? [],
    [query.data]
  );

  return (
    <>
      <ActiveFilters
        total={total}
        mapOpen={mobileMapOpen}
        onToggleMap={() => setMobileMapOpen((v) => !v)}
      />

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 pb-10">
        <div className="flex gap-6">
          <div className={cn("flex-1 min-w-0", mobileMapOpen && "hidden xl:block")}>
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
                    <VenueCard
                      key={venue.id}
                      venue={venue}
                      highlighted={venue.id === selectedId}
                      onViewDetails={handleViewDetails}
                    />
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

          {total !== 0 && (
            <aside className="hidden xl:block xl:w-[30%] shrink-0">
              <div className="rounded-card border border-border h-[70vh] sticky top-[104px] overflow-hidden">
                <VenueMap
                  venues={allItems}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              </div>
            </aside>
          )}

          {total !== 0 && mobileMapOpen && (
            <div ref={mapSectionRef} className="xl:hidden flex-1 min-w-0">
              <div className="rounded-card border border-border h-[70vh] overflow-hidden">
                <VenueMap
                  venues={allItems}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  );
}
