"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Badge } from "@/components/ui/badge";
import type { Venue } from "@/types/venue";

type VenueCardProps = {
  venue: Venue;
  highlighted?: boolean;
};

export function VenueCard({ venue, highlighted = false }: VenueCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const prevImage = () =>
    setImageIndex((i) => (i - 1 + venue.images.length) % venue.images.length);
  const nextImage = () =>
    setImageIndex((i) => (i + 1) % venue.images.length);

  return (
    <div
      className={cn(
        "group bg-white rounded-card overflow-hidden shadow-card",
        "hover:shadow-float hover:-translate-y-0.5 transition motion-reduce:transform-none",
        highlighted && "ring-2 ring-sky-500"
      )}
    >
      <div className="relative aspect-[16/11]">
        <Image
          src={venue.images[imageIndex]}
          alt={venue.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 340px"
        />

        <button
          type="button"
          aria-label="Previous image"
          onClick={prevImage}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 z-10",
            "h-8 w-8 rounded-full bg-white/90 shadow-card",
            "inline-flex items-center justify-center transition-colors hover:bg-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            "opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity"
          )}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Next image"
          onClick={nextImage}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 z-10",
            "h-8 w-8 rounded-full bg-white/90 shadow-card",
            "inline-flex items-center justify-center transition-colors hover:bg-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            "opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity"
          )}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {venue.verified && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="dark">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Verified
            </Badge>
          </div>
        )}

        <div className="absolute top-3 right-3 z-10 flex gap-1.5">
          <IconButton
            size="sm"
            variant="solid"
            aria-label="Share this venue"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="11" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.25" />
              <circle cx="11" cy="11.5" r="1.5" stroke="currentColor" strokeWidth="1.25" />
              <circle cx="3" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.25" />
              <path d="M4.4 6.2L9.6 3.3M4.4 7.8l5.2 2.9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            </svg>
          </IconButton>
          <IconButton
            size="sm"
            variant="solid"
            aria-label={liked ? "Remove from favourites" : "Save to favourites"}
            onClick={() => setLiked((v) => !v)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M7 12S1.5 8.5 1.5 4.5A3 3 0 0 1 7 3a3 3 0 0 1 5.5 1.5C12.5 8.5 7 12 7 12Z"
                stroke={liked ? "#ef4444" : "currentColor"}
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={liked ? "#ef4444" : "none"}
              />
            </svg>
          </IconButton>
        </div>

        <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1 z-10 pointer-events-none">
          {venue.images.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                i === imageIndex ? "bg-white" : "bg-white/50"
              )}
            />
          ))}
        </div>
      </div>

      <div className="p-4">
        <p className="font-bold text-foreground leading-snug line-clamp-2">{venue.title}</p>

        <div className="flex items-center gap-1 mt-1">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0 text-primary">
            <path
              d="M7 1.5A4 4 0 0 1 11 5.5C11 8.5 7 12.5 7 12.5S3 8.5 3 5.5A4 4 0 0 1 7 1.5Z"
              stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
            />
            <circle cx="7" cy="5.5" r="1.25" stroke="currentColor" strokeWidth="1.25" />
          </svg>
          <span className="text-primary text-sm font-medium">{venue.city}, {venue.area}</span>
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs text-muted">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="6" cy="4" r="2" stroke="currentColor" strokeWidth="1.1" />
              <path d="M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
            {venue.capacity}+
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs text-muted">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <rect x="1.5" y="1.5" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.1" />
              <path d="M4.5 1.5v9M7.5 1.5v9M1.5 4.5h9M1.5 7.5h9" stroke="currentColor" strokeWidth="1.1" />
            </svg>
            {venue.sizeSqFt.toLocaleString()} sq ft
          </span>
          {venue.parking && (
            <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs text-muted">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <rect x="1" y="3" width="10" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.1" />
                <circle cx="3.5" cy="9.5" r="1" stroke="currentColor" strokeWidth="1.1" />
                <circle cx="8.5" cy="9.5" r="1" stroke="currentColor" strokeWidth="1.1" />
                <path d="M1 5.5h10" stroke="currentColor" strokeWidth="1.1" />
              </svg>
              Free parking
            </span>
          )}
          {venue.amenities.length > 0 && (
            <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs text-muted bg-foreground/5">
              +{venue.amenities.length} more
            </span>
          )}
        </div>

        <div className="mt-3 border-t border-border pt-3 flex items-center justify-between">
          <span className="font-bold text-sm">
            From{" "}
            {venue.currency === "AED" ? "AED " : "$"}
            {venue.pricePerHour}/hour
          </span>
          <Button variant="outline" size="sm">
            View details
          </Button>
        </div>
      </div>
    </div>
  );
}
