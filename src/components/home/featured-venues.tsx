"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { VenueCard } from "@/components/venue/venue-card";
import { venues } from "@/data/venues";
import { cn } from "@/lib/cn";

const TABS = ["ROOFTOP", "GALLERY", "RESTAURANT", "OUTDOOR", "STUDIO", "TERRACE", "BALLROOM"] as const;

type Tab = (typeof TABS)[number];

function filterVenues(tab: Tab) {
  const lower = tab.toLowerCase();
  const matched = venues.filter((v) =>
    v.venueType.toLowerCase().includes(lower) ||
    v.venueType.toLowerCase() === lower
  );
  if (matched.length >= 4) return matched.slice(0, 8);
  const rest = venues.filter((v) => !matched.includes(v));
  return [...matched, ...rest].slice(0, 8);
}

export function FeaturedVenues() {
  const [activeTab, setActiveTab] = useState<Tab>("GALLERY");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 360 : -360, behavior: "smooth" });
  };

  const displayed = filterVenues(activeTab);

  return (
    <section className="relative py-12 md:py-24 overflow-hidden">
      <Image
        src="/images/featured-bg.png"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-6 lg:px-[80px]">
        <h2 className="text-[28px] md:text-[44px] font-semibold text-white text-center text-balance leading-[50px]">
          Featured Venues
        </h2>

        <div className="mt-[25px] -mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:-mx-6 md:px-6">
          <div className="mx-auto flex w-max gap-3">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "h-[50px] px-[30px] rounded-[10px] text-[16px] shrink-0 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                  activeTab === tab
                    ? "bg-primary text-white font-bold"
                    : "bg-[#b7b7b7]/50 text-white font-normal hover:bg-white/25"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div
            ref={scrollRef}
            className="-mx-4 flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scroll-px-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:-mx-6 md:gap-[28px] md:scroll-px-6 md:px-6 lg:gap-6"
          >
            {displayed.map((venue) => (
              <div key={venue.id} className="w-[300px] shrink-0 snap-start lg:w-[340px]">
                <VenueCard venue={venue} />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex justify-end gap-2 mt-6">
          <button
            type="button"
            aria-label="Scroll venues left"
            onClick={() => scroll("left")}
            className={cn(
              "h-10 w-10 rounded-full bg-white shadow-card inline-flex items-center justify-center",
              "hover:bg-white/90 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            )}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11 14L6 9l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Scroll venues right"
            onClick={() => scroll("right")}
            className={cn(
              "h-10 w-10 rounded-full bg-white shadow-card inline-flex items-center justify-center",
              "hover:bg-white/90 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            )}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
