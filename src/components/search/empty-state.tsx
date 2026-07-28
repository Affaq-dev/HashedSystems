import Image from "next/image";

export function EmptyState() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
      <div className="w-[252px] flex flex-col items-center text-center">
        <Image
          src="/images/no-data.png"
          alt=""
          width={189}
          height={127}
          className="w-[189px] h-auto"
          priority
        />
        <p className="mt-[29px] text-[16px] font-semibold text-foreground">
          No data found for your search.
        </p>
        <p className="mt-[6px] text-[14px] leading-[1.35] text-muted">
          Explore other options or clear filters to see more results.
        </p>
      </div>
    </div>
  );
}
