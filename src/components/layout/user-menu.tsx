"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuthStore } from "@/stores/auth-store";
import { useLogout } from "@/hooks/use-logout";
import { cn } from "@/lib/cn";

type UserMenuProps = {
  tone: "light" | "dark";
};

export function UserMenu({ tone }: UserMenuProps) {
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onMouseDown(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!user) return null;

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-1 py-1 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
          tone === "light"
            ? "text-white hover:bg-white/10"
            : "text-foreground hover:bg-foreground/5"
        )}
      >
        <span className="text-sm font-medium">
          {user.firstName} {user.lastName}
        </span>
        <Image
          src={user.avatar}
          alt={`${user.firstName} ${user.lastName}`}
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-surface rounded-card shadow-float border border-border py-1 min-w-36 z-50">
          <button
            onClick={() => {
              setOpen(false);
              void logout();
            }}
            className="text-sm px-4 py-2 hover:bg-foreground/5 w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
