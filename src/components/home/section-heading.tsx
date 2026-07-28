import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("text-center", className)}>
      <h2 className="font-semibold text-foreground text-balance text-[24px] leading-[30px] md:text-[32px] md:leading-[38px] lg:text-[44px] lg:leading-[50px]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-[10px] text-foreground text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] lg:text-[20px] lg:leading-[30px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
