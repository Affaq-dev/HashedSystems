import { cn } from "@/lib/cn";

type ChipProps = {
  children: React.ReactNode;
  onRemove?: () => void;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export function Chip({ children, onRemove, active = false, onClick, className }: ChipProps) {
  const baseClasses = cn(
    "inline-flex items-center gap-1 rounded-full border-[1.5px] px-[15px] h-8 text-[11px] font-medium transition-colors",
    active
      ? "border-primary text-primary bg-primary/5"
      : "border-[#e6e6e6] text-[#3a3a3a] bg-white",
    className
  );

  const content = (
    <>
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label="Remove filter"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="inline-flex items-center justify-center rounded-full w-4 h-4 text-current hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          ×
        </button>
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(baseClasses, "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40")}
      >
        {content}
      </button>
    );
  }

  return <div className={baseClasses}>{content}</div>;
}
