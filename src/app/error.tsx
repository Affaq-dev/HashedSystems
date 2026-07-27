"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="min-h-svh flex items-center justify-center bg-surface p-4">
      <div className="flex flex-col items-center text-center max-w-md w-full">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="12"
            y="24"
            width="96"
            height="64"
            rx="6"
            stroke="#d1d5db"
            strokeWidth="2.5"
          />
          <rect
            x="44"
            y="88"
            width="32"
            height="7"
            rx="1"
            stroke="#d1d5db"
            strokeWidth="2.5"
          />
          <line
            x1="32"
            y1="99"
            x2="88"
            y2="99"
            stroke="#d1d5db"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M60 46L60 60"
            stroke="#ef4444"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="60" cy="68" r="2.5" fill="#ef4444" />
          <path
            d="M46 72L60 44L74 72H46Z"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>

        <h1 className="text-2xl font-extrabold text-foreground mt-6">
          Something went wrong
        </h1>
        <p className="text-muted text-sm mt-2">
          An unexpected error occurred. Try again, or head back to the homepage.
        </p>

        <div className="mt-6 flex gap-3 justify-center">
          <Button variant="primary" size="md" onClick={reset}>
            Try again
          </Button>
          <Link
            href="/"
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
              "border border-primary text-primary bg-transparent hover:bg-primary/5",
              "h-11 px-6 text-sm"
            )}
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
