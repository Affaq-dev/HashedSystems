"use client";

import Image from "next/image";
import { SectionHeading } from "./section-heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

const CATEGORIES = [
  { label: "Celebration Venues", src: "/images/categories/celebration.png" },
  { label: "Private Party Venues", src: "/images/categories/private-party.png" },
  { label: "Corporate Meetings", src: "/images/categories/corporate.png" },
  { label: "Creative Studios", src: "/images/categories/studios.png" },
] as const;

export function CategoryCards() {
  return (
    <section className="bg-white py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeading
          title="Find The Best Venue For Any Occasion"
          subtitle="Explore venues by category, from timeless ballrooms and rooftops with a view to modern studios and outdoor gardens, discover spaces designed to inspire unforgettable experiences."
        />

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map(({ label, src }) => (
            <div
              key={label}
              className="relative rounded-card overflow-hidden group aspect-[3/4] cursor-pointer"
            >
              <Image
                src={src}
                alt={label}
                fill
                className="object-cover scale-100 group-hover:scale-105 transition duration-300 motion-reduce:transform-none"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute top-3 left-3 z-10">
                <Badge variant="dark">37 Venues</Badge>
              </div>
              <span className="absolute bottom-4 left-4 text-white font-bold text-lg leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="hidden md:flex justify-end gap-2 mt-4">
          <button
            type="button"
            aria-label="Previous category"
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
            aria-label="Next category"
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
