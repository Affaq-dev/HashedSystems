"use client";

import Image from "next/image";
import { useRef } from "react";

const STATS = [
  { value: "1,500+", label: "Venues Vetted & Approved", bg: "bg-[#ef7f70]", text: "text-white" },
  { value: "7,500+", label: "Events Successfully Hosted", bg: "bg-[#ec5d44]", text: "text-white" },
  { value: "35+", label: "Cities Across the Region", bg: "bg-[#ef8f3a]", text: "text-white" },
  { value: "4.9★", label: "Average Host Rating", bg: "bg-[#f6c453]", text: "text-black" },
] as const;

const TESTIMONIALS = [
  {
    quote: "Venuze made finding a rooftop for our product launch effortless — booked in a day.",
    byline: "Michael Carter",
    photo: "/images/testimonials/michael.png",
    alt: "Michael Carter",
  },
  {
    quote: "I planned my sister's engagement here — one checkout, zero stress.",
    byline: "by Ayesha M.",
    photo: "/images/testimonials/ayesha.png",
    alt: "Ayesha M.",
  },
  {
    quote: "Booked a gallery for our brand dinner in one evening — pricing was upfront.",
    byline: "Daniel Reyes",
    photo: "/images/testimonials/michael.png",
    alt: "Daniel Reyes",
  },
  {
    quote: "Compared eight terraces in minutes and the host replied the same afternoon.",
    byline: "by Hannah Wright",
    photo: "/images/testimonials/ayesha.png",
    alt: "Hannah Wright",
  },
] as const;

function StarRow() {
  return (
    <div className="flex gap-[2px]" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="size-[12px] text-dot-active md:size-[9px] lg:size-[14px]"
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
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth, behavior: "smooth" });
  };

  return (
    <section className="bg-[linear-gradient(90deg,#fdf0d1_0%,#f9ddd9_100%)] pt-[58px] pb-[58px] md:pt-[65px] md:pb-[50px] lg:pt-[110px] lg:pb-[54px]">
      <div className="mx-auto w-full max-w-[1440px] px-[14px] lg:px-[80px]">
        <div className="text-center">
          <h2 className="mx-auto max-w-[290px] text-[24px] leading-[30px] font-semibold text-foreground md:max-w-none md:text-[30px] md:leading-[34px] lg:text-[44px] lg:leading-[50px]">
            Trusted by Event Creators Who Demand Excellence
          </h2>
          <p className="mx-auto mt-[10px] max-w-[300px] text-[14px] leading-[20px] text-foreground md:max-w-none lg:text-[20px] lg:leading-[30px]">
            Join thousands of planners and hosts who love our seamless discovery and booking
            experience.
          </p>
        </div>

        <div className="mt-[20px] grid grid-cols-2 gap-[15px] md:mt-[34px] md:px-[61px] lg:mt-[44px] lg:grid-cols-4 lg:gap-[24px] lg:px-0">
          {STATS.map((stat) => (
            <div
              key={stat.value}
              className={`${stat.bg} flex min-h-[131px] flex-col items-center justify-center rounded-[16px] px-[10px] py-[16px] text-center md:min-h-[105px] md:px-[16px] lg:min-h-[123px]`}
            >
              <p className={`text-[32px] leading-none font-bold md:text-[36px] ${stat.text}`}>
                {stat.value}
              </p>
              <p
                className={`mt-[12px] text-[14px] leading-[20px] md:mt-[10px] md:text-[16px] md:leading-[24px] ${stat.text}`}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div
          ref={trackRef}
          className="-mx-[14px] mt-[58px] flex snap-x snap-mandatory gap-[10px] overflow-x-auto scroll-px-[14px] px-[14px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-[25px] md:gap-[14px] lg:mx-0 lg:mt-[32px] lg:gap-[24px] lg:scroll-px-0 lg:px-0"
        >
          {TESTIMONIALS.map((t) => (
            <article
              key={t.byline}
              className="flex w-[308px] shrink-0 snap-start overflow-hidden rounded-[16px] bg-white shadow-[0_4px_10px_rgb(0_0_0/0.08)] min-h-[185px] md:w-[calc((100%-14px)/2)] md:min-h-[176px] lg:w-[calc((100%-24px)/2)] lg:min-h-[296px] lg:rounded-[20px]"
            >
              <div className="relative w-[38%] shrink-0 self-stretch">
                <Image
                  src={t.photo}
                  alt={t.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 767px) 118px, (max-width: 1023px) 138px, 240px"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center px-[16px] py-[14px] lg:px-[30px]">
                <p className="line-clamp-5 text-[16px] leading-[20px] text-foreground md:line-clamp-3 md:text-[12px] md:leading-[17px] lg:text-[20px] lg:leading-[30px]">
                  {t.quote}
                </p>
                <p className="mt-[8px] text-[14px] leading-[20px] font-bold text-foreground md:mt-[14px] md:text-[11px] md:leading-[16px] lg:mt-[20px] lg:text-[18px] lg:leading-[24px]">
                  {t.byline}
                </p>
                <div className="mt-[4px]">
                  <StarRow />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-[40px] hidden justify-end gap-[12px] lg:flex">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => scrollBy(-1)}
            className="flex size-[44px] items-center justify-center rounded-full bg-[#f4f4f4] text-foreground shadow-[0_2px_6px_rgb(0_0_0/0.10)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => scrollBy(1)}
            className="flex size-[44px] items-center justify-center rounded-full bg-[#f4f4f4] text-foreground shadow-[0_2px_6px_rgb(0_0_0/0.10)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
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
