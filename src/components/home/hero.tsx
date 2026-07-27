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

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center pt-24">
        <h1 className="text-white font-extrabold text-4xl md:text-6xl leading-tight text-balance">
          Celebrate in venues big and small
        </h1>
        <div className="mt-8 md:mt-10 w-full max-w-3xl mx-auto text-left">
          <SearchWidget />
        </div>
      </div>

      <div className="absolute bottom-8 inset-x-0 flex justify-center gap-2 z-10">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActive(i)}
            className="h-2 w-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            style={{
              backgroundColor: i === active ? "#f59e0b" : "rgba(255,255,255,0.6)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
