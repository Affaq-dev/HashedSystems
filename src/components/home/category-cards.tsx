"use client";

import { useRef } from "react";
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
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const [first, second] = Array.from(track.children) as HTMLElement[];
    const step = second ? second.offsetLeft - first.offsetLeft : track.clientWidth;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeading
          title="Find The Best Venue For Any Occasion"
          subtitle="Explore venues by category, from timeless ballrooms and rooftops with a view to modern studios and outdoor gardens, discover spaces designed to inspire unforgettable experiences."
        />

        <div
          ref={trackRef}
          className="mt-10 -mx-4 flex snap-x snap-mandatory gap-[10px] overflow-x-auto scroll-px-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:-mx-6 md:gap-[14px] md:scroll-px-6 md:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0"
        >
          {CATEGORIES.map(({ label, src }) => (
            <div
              key={label}
              className="relative w-[165px] shrink-0 snap-center rounded-card overflow-hidden group aspect-[3/4] cursor-pointer md:w-[205px] lg:w-auto"
            >
              <Image
                src={src}
                alt={label}
                fill
                className="object-cover scale-100 group-hover:scale-105 transition duration-300 motion-reduce:transform-none"
                sizes="(max-width: 767px) 165px, (max-width: 1023px) 205px, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute top-3 left-3 z-10">
                <Badge variant="dark" className="px-[15px] py-[8px] font-semibold text-[12px]">37 Venues</Badge>
              </div>
              <span className="absolute bottom-3 left-3 text-white font-semibold text-[16px] leading-[20px] md:bottom-4 md:left-4 md:text-[20px] md:leading-[24px] lg:text-[24px] lg:leading-[28px] xl:text-[30px] xl:leading-[30px]">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="hidden md:flex justify-end gap-2 mt-4">
          <button
            type="button"
            aria-label="Previous category"
            onClick={() => scrollByCard(-1)}
            className={cn(
              "h-10 w-10 rounded-full bg-white shadow-card inline-flex items-center justify-center",
              "hover:bg-white/90 transition-colors cursor-pointer",
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
            onClick={() => scrollByCard(1)}
            className={cn(
              "h-10 w-10 rounded-full bg-white shadow-card inline-flex items-center justify-center",
              "hover:bg-white/90 transition-colors cursor-pointer",
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
