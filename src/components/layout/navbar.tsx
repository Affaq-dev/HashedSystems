"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth-store";
import { useUiStore } from "@/stores/ui-store";
import { Logo } from "./logo";
import { UserMenu } from "./user-menu";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/cn";

type NavbarProps = {
  variant?: "transparent" | "solid";
};

export function Navbar({ variant = "solid" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const toggleMobileMenu = useUiStore((s) => s.toggleMobileMenu);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (variant !== "transparent") return;

    function onScroll() {
      setScrolled(window.scrollY > 40);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const effectiveSolid = variant === "solid" || scrolled;

  const outlinePillClasses = cn(
    "rounded-full border h-10 px-4 inline-flex items-center gap-1.5 text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
    effectiveSolid
      ? "border-primary text-primary hover:bg-primary/5"
      : "border-white/70 text-white hover:bg-white/10"
  );

  const loginLinkClasses = cn(
    "h-10 w-10 rounded-full border inline-flex items-center justify-center transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
    effectiveSolid
      ? "border-primary text-primary hover:bg-primary/5"
      : "border-white/70 text-white hover:bg-white/10"
  );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-colors duration-300",
          effectiveSolid ? "bg-surface border-b border-border" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-[72px] md:h-[88px] flex items-center justify-between gap-4">
          <Logo withWordmark={effectiveSolid} />

          {effectiveSolid && (
            <Link
              href="/search"
              className="hidden md:flex items-center rounded-full border border-border shadow-card bg-white px-1 gap-0 hover:shadow-float transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <span className="text-sm text-muted px-4 py-2">Location</span>
              <span className="text-sm text-muted px-4 py-2 border-l border-border">
                Date
              </span>
              <span className="text-sm text-muted px-4 py-2 border-l border-border">
                Guests
              </span>
              <span className="ml-1 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white shrink-0">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="6"
                    cy="6"
                    r="4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M9.5 9.5L12 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </Link>
          )}

          <div className="hidden md:flex items-center gap-2">
            {mounted && token && user ? (
              <UserMenu tone={effectiveSolid ? "dark" : "light"} />
            ) : (
              <>
                <button className={outlinePillClasses}>
                  Add your listing
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 5L7 9L11 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button className={outlinePillClasses}>
                  EN
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 5L7 9L11 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <Link href="/login" aria-label="Log in" className={loginLinkClasses}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="9"
                      cy="6.5"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M2 15.5C2 12.5 5 10 9 10C13 10 16 12.5 16 15.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
              </>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              className={cn(
                "rounded-full border h-9 px-4 inline-flex items-center text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                effectiveSolid
                  ? "border-primary text-primary hover:bg-primary/5"
                  : "border-white/70 text-white hover:bg-white/10"
              )}
            >
              Add your listing
            </button>
            <button
              aria-label="Open menu"
              onClick={toggleMobileMenu}
              className={cn(
                "h-10 w-10 inline-flex items-center justify-center rounded-full transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                effectiveSolid
                  ? "text-foreground hover:bg-foreground/5"
                  : "text-white hover:bg-white/10"
              )}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 6H19M3 11H19M3 16H19"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu />
    </>
  );
}
