import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Page not found — Venuze",
};

export default function NotFound() {
  return (
    <main className="min-h-svh flex items-center justify-center bg-surface p-4">
      <div className="flex flex-col items-center text-center max-w-md w-full">
        <p className="text-6xl font-extrabold text-primary">404</p>
        <h1 className="text-2xl font-extrabold mt-2">Page not found</h1>
        <p className="text-muted text-sm mt-2">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className={cn(
            "mt-6 inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            "bg-primary text-white hover:bg-primary-hover",
            "h-11 px-6 text-sm"
          )}
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
