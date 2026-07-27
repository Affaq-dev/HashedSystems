"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParamsState } from "@/hooks/use-search-params-state";
import { useUiStore } from "@/stores/ui-store";

export function SearchToolbar() {
  const { params, setParams, activeFilterCount } = useSearchParamsState();
  const openFilterModal = useUiStore((s) => s.openFilterModal);
  const [inputValue, setInputValue] = useState(params.q ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!params.q) setInputValue("");
  }, [params.q]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setInputValue(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setParams({ q: val || undefined });
    }, 400);
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className="border-b border-border bg-surface">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-3 flex items-center gap-3">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
          className="shrink-0 text-muted"
        >
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12.5 12.5L15.5 15.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        <input
          type="search"
          value={inputValue}
          onChange={handleChange}
          placeholder="Add keywords..."
          aria-label="Search venues by keyword"
          className="flex-1 text-sm bg-transparent focus:outline-none placeholder:text-muted text-foreground"
        />

        <button
          type="button"
          onClick={openFilterModal}
          aria-label={`Filters${activeFilterCount > 0 ? `, ${activeFilterCount} active` : ""}`}
          className="inline-flex items-center gap-2 text-sm font-semibold hover:bg-foreground/5 rounded-full h-10 px-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 shrink-0"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 4h12M4 8h8M6 12h4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span className="h-5 w-5 rounded-full bg-primary text-white text-[11px] flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
