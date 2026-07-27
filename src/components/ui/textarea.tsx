import { cn } from "@/lib/cn";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export function Textarea({ invalid = false, className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-field border bg-surface px-4 py-3 text-sm placeholder:text-faint",
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
