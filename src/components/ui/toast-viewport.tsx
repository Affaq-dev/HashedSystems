"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useUiStore } from "@/stores/ui-store";

type ToastData = {
  id: number;
  type: "success" | "error";
  message: string;
};

function CheckCircle() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-emerald-400"
    >
      <circle cx="9" cy="9" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.5 9l2.5 2.5 4.5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertCircle() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-red-400"
    >
      <circle cx="9" cy="9" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 5.5v4M9 12.5h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastData;
  onDismiss: () => void;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      role="alert"
      className={cn(
        "bg-ink text-white rounded-card shadow-float px-4 py-3 text-sm flex items-start gap-3",
        "transition-[opacity,transform] duration-200 motion-reduce:transition-none motion-reduce:transform-none",
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
      )}
    >
      {toast.type === "success" ? <CheckCircle /> : <AlertCircle />}
      <span className="flex-1 leading-snug">{toast.message}</span>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={onDismiss}
        className={cn(
          "inline-flex items-center justify-center h-5 w-5 shrink-0 rounded-full",
          "text-white/60 hover:text-white hover:bg-white/10 transition-colors",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
        )}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path
            d="M8 2L2 8M2 2l6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

export function ToastViewport() {
  const toasts = useUiStore((s) => s.toasts);
  const dismissToast = useUiStore((s) => s.dismissToast);

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed top-[80px] md:top-[96px] right-6 z-[60] flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)]"
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={() => dismissToast(toast.id)}
        />
      ))}
    </div>
  );
}
