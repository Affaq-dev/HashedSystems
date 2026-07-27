"use client";

import Image from "next/image";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/cn";

const VENDORS = [
  { label: "Caterers", src: "/images/vendors/caterers.png" },
  { label: "Decorators", src: "/images/vendors/decorators.png" },
  { label: "Photographers", src: "/images/vendors/photographers.png" },
  { label: "Entertainment", src: "/images/vendors/entertainment.png" },
] as const;

export function VendorCards() {
  return (
    <section className="bg-surface-alt py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeading
          title="Complete Your Event with our Trusted Vendors"
          subtitle="Venues are just the beginning. Discover caterers, decorators, photographers, entertainment, and more all in one place, ready to bring your event project to life."
        />

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {VENDORS.map(({ label, src }) => (
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
              <span className="absolute bottom-4 left-4 text-white font-bold text-lg leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="hidden md:flex justify-end gap-2 mt-4">
          <button
            type="button"
            aria-label="Previous vendor"
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
            aria-label="Next vendor"
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
