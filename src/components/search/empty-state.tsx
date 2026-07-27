import { NoDataIllustration } from "./no-data-illustration";

export function EmptyState() {
  return (
    <div className="py-20 text-center flex flex-col items-center">
      <NoDataIllustration />
      <p className="text-lg font-bold mt-6">No data found for your search.</p>
      <p className="text-sm text-muted mt-2">
        Explore other options or clear filters to see more results.
      </p>
    </div>
  );
}
