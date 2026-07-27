"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      return;
    }
    prevFocusRef.current = document.activeElement as HTMLElement;
    document.documentElement.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => {
      setVisible(true);
      panelRef.current?.focus();
    });
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", handleKey);
      document.documentElement.style.overflow = "";
      prevFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "bg-surface rounded-card shadow-float w-full max-w-2xl max-h-[85vh] overflow-y-auto",
          "outline-none",
          "transition-[opacity,transform] duration-150 motion-reduce:transition-none motion-reduce:transform-none",
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95",
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <h2 id={titleId} className="text-lg font-bold text-foreground">
              {title}
            </h2>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className={cn(
                "inline-flex items-center justify-center h-8 w-8 rounded-full shrink-0",
                "text-muted hover:bg-foreground/5 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              )}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 4L4 12M4 4l8 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        )}
        <div className={cn("px-6 pb-6", title ? "pt-2" : "pt-6")}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
