"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { useSearchParamsState } from "@/hooks/use-search-params-state";
import type { VenueCategory } from "@/types/venue";

type Tab = {
  label: string;
  value: VenueCategory | "all";
  icon: React.ReactNode;
};

const tabs: Tab[] = [
  {
    label: "All Spaces",
    value: "all",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Photo Studio",
    value: "photo-studio",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="2" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="11" cy="12.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 6V4.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="17" cy="9" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Film Studio",
    value: "film-studio",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="2" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 10h18M6 6l2-3M10 6l2-3M14 6l2-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Warehouse",
    value: "warehouse",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M2 9L11 3l9 6v10H2V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="8" y="13" width="6" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Gallery",
    value: "gallery",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 15l4-4 4 4 3-4 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    ),
  },
  {
    label: "Restaurant",
    value: "restaurant",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M8 3v5a4 4 0 0 1-4 4M8 3v16M4 3v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 3c0 0 4 3.5 4 8 0 0-1.5.5-4 .5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Apartment",
    value: "apartment",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="16" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 9h16" stroke="currentColor" strokeWidth="1.5" />
        <rect x="7" y="12" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
        <rect x="12" y="12" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
        <path d="M9 19v-4M13 19v-4" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    ),
  },
  {
    label: "Office Space",
    value: "office-space",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="3" y="7" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 12h16" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 12v7M13 12v7" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    ),
  },
  {
    label: "Venue",
    value: "venue",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 2l2.09 4.26L18 7.27l-3.5 3.41.83 4.82L11 13.2l-4.33 2.3.83-4.82L4 7.27l4.91-.71L11 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Private Party",
    value: "private-party",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M5 17L11 5l6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 5 c2-4 5-3 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="5.5" r="1" fill="currentColor" />
        <path d="M7.5 14h7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Meeting",
    value: "meeting",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="15" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 18c0-3 2-5 5-5M20 18c0-3-2-5-5-5M11 13c-1.5 0-4 1-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="11" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 13c1.5 0 4 1 4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function CategoryTabs() {
  const { params, setParams } = useSearchParamsState();
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeCategory = params.category ?? "all";

  function scrollLeft() {
    scrollRef.current?.scrollBy({ left: -220, behavior: "smooth" });
  }

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: 220, behavior: "smooth" });
  }

  return (
    <div className="border-b border-border bg-surface">
      <div className="relative flex items-center">
        <button
          type="button"
          onClick={scrollLeft}
          aria-label="Scroll categories left"
          className="hidden md:flex shrink-0 h-10 w-10 items-center justify-center text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ml-2"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-none px-2 md:px-0 flex-1"
          style={{ scrollbarWidth: "none" }}
        >
          {tabs.map((tab) => {
            const isActive = activeCategory === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setParams({ category: tab.value })}
                aria-label={`Filter by ${tab.label}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1.5 px-3 py-3 text-xs font-medium whitespace-nowrap border-b-2 -mb-px transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-inset",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted hover:text-foreground"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={scrollRight}
          aria-label="Scroll categories right"
          className="hidden md:flex shrink-0 h-10 w-10 items-center justify-center text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 mr-2"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
