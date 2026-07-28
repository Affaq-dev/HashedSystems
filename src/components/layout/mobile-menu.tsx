"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUiStore } from "@/stores/ui-store";
import { useAuthStore } from "@/stores/auth-store";
import { useLogout } from "@/hooks/use-logout";
import { Logo } from "./logo";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/cn";

export function MobileMenu() {
  const mobileMenuOpen = useUiStore((s) => s.mobileMenuOpen);
  const closeMobileMenu = useUiStore((s) => s.closeMobileMenu);
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [translated, setTranslated] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      setVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTranslated(false));
      });
    } else {
      setTranslated(true);
      const timer = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMobileMenu();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen, closeMobileMenu]);

  if (!visible) return null;

  const linkClasses =
    "py-3 text-base font-medium text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm";

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={closeMobileMenu}
      />
      <div
        className={cn(
          "absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-surface shadow-float p-6 flex flex-col gap-1",
          "transition-transform duration-200 motion-reduce:transition-none",
          translated ? "translate-x-full" : "translate-x-0"
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <Logo withWordmark />
          <IconButton
            aria-label="Close menu"
            variant="ghost"
            onClick={closeMobileMenu}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 4L16 16M16 4L4 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </IconButton>
        </div>
        <Link href="#" className={linkClasses} onClick={closeMobileMenu}>
          Add your listing
        </Link>
        <Link href="#" className={linkClasses} onClick={closeMobileMenu}>
          Language: EN
        </Link>
        {mounted && user ? (
          <>
            <div className="py-3 text-base font-medium text-foreground">
              {user.firstName} {user.lastName}
            </div>
            <button
              onClick={() => {
                closeMobileMenu();
                void logout();
              }}
              className="py-3 text-base font-medium text-primary hover:text-primary-hover text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              Log out
            </button>
          </>
        ) : (
          <Link href="/login" className={linkClasses} onClick={closeMobileMenu}>
            Log in
          </Link>
        )}
      </div>
    </div>
  );
}
