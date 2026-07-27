import Link from "next/link";
import { useId } from "react";
import { cn } from "@/lib/cn";

type LogoProps = {
  withWordmark?: boolean;
  className?: string;
};

export function Logo({ withWordmark, className }: LogoProps) {
  const rawId = useId();
  const gradientId = `grad${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <Link
      href="/"
      aria-label="Venuze home"
      className={cn(
        "inline-flex items-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        className
      )}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="16"
            y1="2"
            x2="16"
            y2="30"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--color-accent)" />
            <stop offset="1" stopColor="var(--color-primary)" />
          </linearGradient>
        </defs>
        <path
          d="M16 2C10 8.5 4 14 4 21C4 27 9.5 31 16 31C22.5 31 28 27 28 21C28 14 22 8.5 16 2Z"
          fill={`url(#${gradientId})`}
        />
        <path
          d="M10.5 19L16 25.5L21.5 19"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {withWordmark && (
        <span className="text-primary font-extrabold text-xl tracking-tight">
          venuze
        </span>
      )}
    </Link>
  );
}
