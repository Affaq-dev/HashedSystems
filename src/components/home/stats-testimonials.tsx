"use client";

import Image from "next/image";
import { SectionHeading } from "./section-heading";

const STATS = [
  { value: "1,500+", label: "Venues Vetted & Approved", bg: "bg-[#f87171]", textColor: "text-white" },
  { value: "7,500+", label: "Events Successfully Hosted", bg: "bg-primary", textColor: "text-white" },
  { value: "35+", label: "Cities Across the Region", bg: "bg-accent", textColor: "text-white" },
  { value: "4.9★", label: "Average Host Rating", bg: "bg-dot-active", textColor: "text-foreground" },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "Venuze made finding a rooftop for our product launch effortless — we compared five spaces and booked within a day. The team loved it.",
    name: "Michael Carter",
    byline: "Michael Carter",
    photo: "/images/testimonials/michael.png",
  },
  {
    quote:
      "I planned my sister's engagement end to end here. Venue, caterer, photographer — one checkout, zero stress. Genuinely impressive.",
    name: "Ayesha M.",
    byline: "by Ayesha M.",
    photo: "/images/testimonials/ayesha.png",
  },
] as const;

function StarRow() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 text-dot-active"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function StatsTestimonials() {
  return (
    <section className="bg-surface-alt py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeading
          title="Trusted by Event Creators Who Demand Excellence"
          subtitle="Join thousands of planners and hosts who love our seamless discovery and booking experience."
        />

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat) => (
            <div key={stat.value} className={`${stat.bg} rounded-2xl px-6 py-8 text-center`}>
              <p className={`text-3xl md:text-4xl font-extrabold ${stat.textColor}`}>{stat.value}</p>
              <p className={`text-sm mt-1 ${stat.textColor === "text-foreground" ? "text-foreground/70" : "text-white/80"}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white rounded-card shadow-card overflow-hidden flex">
              <div className="relative w-[40%] shrink-0 self-stretch">
                <Image
                  src={t.photo}
                  alt={t.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 40vw, 20vw"
                />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <p className="text-sm text-muted leading-relaxed">{t.quote}</p>
                <p className="mt-4 font-bold text-sm text-foreground">{t.byline}</p>
                <StarRow />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            aria-label="Previous testimonials"
            className="h-10 w-10 rounded-full bg-white shadow-card flex items-center justify-center text-foreground hover:bg-surface-alt transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next testimonials"
            className="h-10 w-10 rounded-full bg-white shadow-card flex items-center justify-center text-foreground hover:bg-surface-alt transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
