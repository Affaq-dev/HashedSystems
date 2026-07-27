import { cn } from "@/lib/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export function Input({ invalid = false, className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-field border bg-surface px-4 text-sm placeholder:text-faint",
        "focus:outline-none focus:ring-2",
        invalid
          ? "border-primary ring-primary/20"
          : "border-border focus:border-foreground/30 focus:ring-primary/20",
        className
      )}
      {...props}
    />
  );
}
