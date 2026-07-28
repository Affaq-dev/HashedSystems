"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import { Chip } from "@/components/ui/chip";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParamsState } from "@/hooks/use-search-params-state";
import type { VenueCategory } from "@/types/venue";

type ActiveFiltersProps = {
  total?: number;
  mapOpen?: boolean;
  onToggleMap?: () => void;
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

export function ActiveFilters({ total, mapOpen, onToggleMap }: ActiveFiltersProps) {
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
    <div className="max-w-[1440px] mx-auto px-4 md:px-[30px] py-[10px] flex flex-wrap items-center gap-[5px]">
      <span className="text-[14px] text-[#575757] font-normal shrink-0 mr-1">
        {total === undefined ? (
          <Skeleton className="h-5 w-40 inline-block" />
        ) : (
          `${total.toLocaleString()} ${categoryLabel} near London`
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
          className="inline-flex items-center h-8 px-[15px] rounded-full border-[1.5px] border-[#e6e6e6] bg-white text-[11px] text-[#3a3a3a] font-medium transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          Clear filters
        </button>
      )}

      {onToggleMap && total !== 0 && (
        <button
          type="button"
          onClick={onToggleMap}
          className="ml-auto xl:hidden inline-flex items-center gap-[8px] h-[38px] px-[16px] rounded-[10px] border border-[#e6e6e6] bg-white text-[13px] font-medium text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer"
        >
          {mapOpen ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="1.5" y="2.5" width="5" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
              <rect x="9.5" y="2.5" width="5" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="currentColor" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3.5-4.5 8.5-4.5 8.5S3.5 9.5 3.5 6A4.5 4.5 0 0 1 8 1.5Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          )}
          {mapOpen ? "Show List" : "Show Map"}
        </button>
      )}

      <div ref={sortRef} className="relative ml-auto hidden xl:block">
        <button
          type="button"
          onClick={() => setSortOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={sortOpen}
          className="inline-flex items-center gap-2 h-8 px-[15px] rounded-full border-[1.5px] border-[#e6e6e6] bg-white text-[11px] text-[#333333] font-normal transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          Sort by: {sortLabel}
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"
            className={cn("transition-transform duration-150", sortOpen && "rotate-180")}
          >
            <path
              d="M2 3.5l3 3 3-3"
              stroke="currentColor"
              strokeWidth="1"
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
