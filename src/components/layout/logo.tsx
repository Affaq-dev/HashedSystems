import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

type LogoProps = {
  withWordmark?: boolean;
  wordmarkTone?: "brand" | "light";
  className?: string;
};

export function Logo({ withWordmark, wordmarkTone = "brand", className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Venuze home"
      className={cn(
        "inline-flex items-center gap-[10px] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        className
      )}
    >
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={48}
        height={32}
        className="h-[32px] w-auto"
        priority
      />
      {withWordmark && (
        <Image
          src="/images/logo-wordmark.png"
          alt="venuze"
          width={124}
          height={19}
          className={cn(
            "h-[19px] w-auto hidden sm:block",
            wordmarkTone === "light" && "brightness-0 invert"
          )}
          priority
        />
      )}
    </Link>
  );
}
