import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchToolbar } from "@/components/search/search-toolbar";
import { CategoryTabs } from "@/components/search/category-tabs";
import { ResultsGrid } from "@/components/search/results-grid";
import { FilterModal } from "@/components/search/filter-modal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Search venues — Venuze" };

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchToolbar />
      <CategoryTabs />
      <ResultsGrid />
      <FilterModal />
    </Suspense>
  );
}
