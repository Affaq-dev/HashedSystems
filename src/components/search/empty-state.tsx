import { NoDataIllustration } from "./no-data-illustration";

export function EmptyState() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
      <NoDataIllustration />
      <p className="text-[15px] font-medium mt-6 text-foreground">No data found for your search.</p>
      <p className="text-[13px] text-muted mt-2">
        Explore other options or clear filters to see more results.
      </p>
    </div>
  );
}
