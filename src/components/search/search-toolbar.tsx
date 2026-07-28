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
    <div className="border-b border-[#d0d0d0] bg-white">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 h-[50px] flex items-center gap-3">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="shrink-0 text-muted"
        >
          <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M16 16L20 20"
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
          className="flex-1 text-base bg-transparent focus:outline-none placeholder:text-[#a39e9e] text-foreground"
        />

        <div aria-hidden="true" className="w-px h-[34px] bg-[#d0d0d0] shrink-0" />

        <button
          type="button"
          onClick={openFilterModal}
          aria-label={`Filters${activeFilterCount > 0 ? `, ${activeFilterCount} active` : ""}`}
          className="inline-flex items-center gap-[10px] text-base font-normal h-[34px] rounded-[6px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 shrink-0"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <rect x="2" y="3.3" width="8.5" height="2" rx="1" />
            <rect x="13.1" y="3.3" width="8.9" height="2" rx="1" />
            <rect x="13.1" y="2" width="2.4" height="5.4" rx="1.2" />
            <rect x="2" y="11" width="7" height="2" rx="1" />
            <rect x="11.2" y="11" width="10.8" height="2" rx="1" />
            <rect x="6.6" y="8.9" width="2.4" height="6.2" rx="1.2" />
            <rect x="2" y="17.9" width="10" height="2" rx="1" />
            <rect x="14.9" y="17.9" width="7.1" height="2" rx="1" />
            <rect x="14.9" y="16.6" width="2.4" height="5.4" rx="1.2" />
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span className="h-5 w-5 -translate-y-[7px] rounded-full bg-black text-white text-[11px] flex items-center justify-center font-semibold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
