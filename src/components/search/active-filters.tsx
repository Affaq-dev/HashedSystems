"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import { Chip } from "@/components/ui/chip";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParamsState } from "@/hooks/use-search-params-state";
import type { VenueCategory } from "@/types/venue";

type ActiveFiltersProps = {
  total?: number;
};

const categoryPluralMap: Record<VenueCategory | "all", string> = {
  all: "spaces",
  "photo-studio": "photo studios",
  "film-studio": "film studios",
  warehouse: "warehouses",
  gallery: "galleries",
  restaurant: "restaurants",
  apartment: "apartments",
  "office-space": "office spaces",
  venue: "venues",
  "private-party": "private parties",
  meeting: "meeting rooms",
};

const sortLabels: Record<string, string> = {
  recommended: "Recommended",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
};

export function ActiveFilters({ total }: ActiveFiltersProps) {
  const { params, setParams, clearAll } = useSearchParamsState();
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const categoryLabel = categoryPluralMap[params.category ?? "all"];
  const sortLabel = sortLabels[params.sort ?? "recommended"] ?? "Recommended";

  useEffect(() => {
    if (!sortOpen) return;

    function handleOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setSortOpen(false);
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [sortOpen]);

  const hasChips =
    params.verified !== undefined ||
    params.parking !== undefined ||
    (params.priceMin !== undefined || params.priceMax !== undefined) ||
    (params.guestsMin !== undefined || params.guestsMax !== undefined) ||
    (params.venueTypes && params.venueTypes.length > 0) ||
    (params.eventTypes && params.eventTypes.length > 0);

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-4 flex flex-wrap items-center gap-2">
      <span className="text-sm text-foreground">
        {total === undefined ? (
          <Skeleton className="h-5 w-40 inline-block" />
        ) : (
          <>
            <strong>{total.toLocaleString()}</strong> {categoryLabel} near London
          </>
        )}
      </span>

      {params.verified !== undefined && (
        <Chip onRemove={() => setParams({ verified: undefined })}>Verified</Chip>
      )}

      {params.parking !== undefined && (
        <Chip onRemove={() => setParams({ parking: undefined })}>Parking</Chip>
      )}

      {(params.priceMin !== undefined || params.priceMax !== undefined) && (
        <Chip
          onRemove={() => setParams({ priceMin: undefined, priceMax: undefined })}
        >
          {params.priceMin !== undefined && params.priceMax !== undefined
            ? `AED ${params.priceMin}–${params.priceMax}`
            : params.priceMin !== undefined
            ? `AED ${params.priceMin}+`
            : `Up to AED ${params.priceMax}`}
        </Chip>
      )}

      {(params.guestsMin !== undefined || params.guestsMax !== undefined) && (
        <Chip
          onRemove={() => setParams({ guestsMin: undefined, guestsMax: undefined })}
        >
          {params.guestsMin !== undefined && params.guestsMax !== undefined
            ? `${params.guestsMin}–${params.guestsMax} guests`
            : params.guestsMin !== undefined
            ? `${params.guestsMin}+ guests`
            : `Up to ${params.guestsMax} guests`}
        </Chip>
      )}

      {params.venueTypes?.map((vt) => (
        <Chip
          key={vt}
          onRemove={() =>
            setParams({
              venueTypes: params.venueTypes?.filter((v) => v !== vt),
            })
          }
        >
          {vt}
        </Chip>
      ))}

      {params.eventTypes?.map((et) => (
        <Chip
          key={et}
          onRemove={() =>
            setParams({
              eventTypes: params.eventTypes?.filter((e) => e !== et),
            })
          }
        >
          {et}
        </Chip>
      ))}

      {hasChips && (
        <button
          type="button"
          onClick={clearAll}
          className="text-sm text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
        >
          Clear all
        </button>
      )}

      <div ref={sortRef} className="relative ml-auto">
        <button
          type="button"
          onClick={() => setSortOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={sortOpen}
          className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
        >
          Sort by: {sortLabel}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className={cn("transition-transform duration-150", sortOpen && "rotate-180")}
          >
            <path
              d="M3 5l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {sortOpen && (
          <ul
            role="listbox"
            aria-label="Sort options"
            className="absolute right-0 top-full mt-1 w-48 rounded-card bg-surface shadow-float border border-border z-20 overflow-hidden"
          >
            {(
              [
                { value: undefined, label: "Recommended" },
                { value: "price-asc" as const, label: "Price: low to high" },
                { value: "price-desc" as const, label: "Price: high to low" },
              ] as Array<{ value: typeof params.sort; label: string }>
            ).map((opt) => {
              const isCurrent = (params.sort ?? undefined) === opt.value;
              return (
                <li key={opt.label} role="option" aria-selected={isCurrent}>
                  <button
                    type="button"
                    onClick={() => {
                      setParams({ sort: opt.value });
                      setSortOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2.5 text-sm transition-colors",
                      "hover:bg-foreground/5 focus-visible:outline-none focus-visible:bg-foreground/5",
                      isCurrent ? "text-primary font-medium" : "text-foreground"
                    )}
                  >
                    {opt.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
