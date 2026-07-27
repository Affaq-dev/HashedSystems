import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchToolbar } from "@/components/search/search-toolbar";
import { CategoryTabs } from "@/components/search/category-tabs";
import { ResultsGrid } from "@/components/search/results-grid";

export const metadata: Metadata = { title: "Search venues — Venuze" };

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchToolbar />
      <CategoryTabs />
      <ResultsGrid />
    </Suspense>
  );
}
