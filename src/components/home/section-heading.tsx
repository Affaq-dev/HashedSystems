import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("text-center", className)}>
      <h2 className="text-3xl md:text-4xl font-extrabold text-foreground text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
