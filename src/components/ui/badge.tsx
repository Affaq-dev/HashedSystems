import { cn } from "@/lib/cn";

type BadgeProps = {
  variant?: "dark" | "light";
  className?: string;
  children?: React.ReactNode;
};

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  dark: "bg-black/55 text-white backdrop-blur-sm",
  light: "bg-white/90 text-foreground",
};

export function Badge({ variant = "dark", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
