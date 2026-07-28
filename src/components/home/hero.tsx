"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { SearchWidget } from "./search-widget";

const IMAGES = [
  "/hero/hero-1.jpg",
  "/hero/hero-2.jpg",
  "/hero/hero-3.jpg",
  "/hero/hero-4.jpg",
];

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % IMAGES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-svh flex items-center justify-center overflow-hidden">
      {IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />

      <div className="relative z-10 w-full max-w-[1110px] mx-auto px-[30px] sm:px-4 text-center pt-24">
        <h1 className="text-white font-semibold text-[30px] leading-[40px] [text-wrap:normal] sm:text-[44px] sm:leading-[54px] sm:text-balance md:text-[70px] md:leading-[80px] max-w-[820px] mx-auto">
          Celebrate in venues big and small
        </h1>
        <div className="mt-10 md:mt-14 w-full max-w-[1054px] mx-auto text-left">
          <SearchWidget />
        </div>

        <div className="mt-12 flex justify-center gap-[5px]">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActive(i)}
            className="h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            style={{
              width: i === active ? 28 : 8,
              backgroundColor: i === active ? "#fec432" : "#d9d9d9",
            }}
          />
        ))}
        </div>
      </div>
    </section>
  );
}
