"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";

type FieldKey = "where" | "when" | "guests";

const WHERE_OPTIONS = ["Dubai, UAE", "London, UK", "New York, USA"];
const WHEN_OPTIONS = ["Anytime", "Today", "This week", "This month"];
const GUESTS_OPTIONS = ["10-20", "1-10", "20-50", "50-100", "100+"];

function VenueIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="7" width="14" height="11" rx="1" stroke="currentColor" strokeWidth="1.75" />
      <path d="M1 7L10 1L19 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="8" y="12" width="4" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8L6 0Z" />
    </svg>
  );
}

function MagnifierIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12.5 12.5L16 16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 5L7 9L11 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type DropdownFieldProps = {
  id: FieldKey;
  label: string;
  value: string;
  options: string[];
  open: boolean;
  onToggle: () => void;
  onSelect: (val: string) => void;
};

function DropdownField({
  id,
  label,
  value,
  options,
  open,
  onToggle,
  onSelect,
}: DropdownFieldProps) {
  return (
    <div className="relative flex-1 min-w-0">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`${label}: ${value}`}
        onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between gap-2 px-4 py-2.5 text-left",
          "hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-field transition-colors"
        )}
      >
        <span className="flex flex-col min-w-0">
          <span className="text-[14px] leading-[21px] font-normal text-[#808080]">{label}</span>
          <span className="text-[16px] leading-[24px] font-medium text-black truncate">{value}</span>
        </span>
        <span className="text-muted shrink-0">
          <ChevronDownIcon />
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute left-0 top-full mt-2 min-w-[160px] bg-white rounded-card shadow-float border border-border py-1 z-30"
        >
          {options.map((opt) => (
            <li key={opt} role="option" aria-selected={opt === value}>
              <button
                type="button"
                onClick={() => onSelect(opt)}
                className={cn(
                  "w-full text-left px-4 py-2.5 text-sm hover:bg-foreground/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40",
                  opt === value ? "font-semibold text-primary" : "text-foreground"
                )}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function SearchWidget() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"venue" | "vendors">("venue");
  const [openField, setOpenField] = useState<FieldKey | null>(null);
  const [city, setCity] = useState("Dubai, UAE");
  const [when, setWhen] = useState("Anytime");
  const [guests, setGuests] = useState("10-20");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpenField(null);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenField(null);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function toggleField(key: FieldKey) {
    setOpenField((prev) => (prev === key ? null : key));
  }

  function handleSearch() {
    const params = new URLSearchParams();
    params.set("city", city);
    params.set("guests", guests);
    if (when !== "Anytime") {
      params.set("when", when);
    }
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div ref={rootRef}>
      <div className="relative z-10 -mb-[17px] hidden justify-center lg:flex">
        <div className="inline-flex items-center bg-white rounded-[10px] shadow-card px-[7px] py-[7px] gap-0">
          <button
            type="button"
            onClick={() => setActiveTab("venue")}
            className={cn(
              "inline-flex items-center gap-[7px] rounded-[10px] px-5 text-[14px] leading-[21px] font-semibold transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
              activeTab === "venue"
                ? "h-[40px] bg-primary text-white"
                : "h-[24px] text-foreground hover:text-primary"
            )}
          >
            <VenueIcon />
            Venue
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("vendors")}
            className={cn(
              "inline-flex items-center gap-[5px] rounded-[10px] px-5 text-[14px] leading-[21px] font-semibold transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
              activeTab === "vendors"
                ? "h-[40px] bg-primary text-white"
                : "h-[24px] text-black hover:text-primary"
            )}
          >
            <SparkleIcon />
            Vendors
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[10px] shadow-float p-4 md:px-[16px] md:py-[16px]">
        <div className="hidden md:flex items-center gap-[24px]">
          <DropdownField
            id="where"
            label="Where"
            value={city}
            options={WHERE_OPTIONS}
            open={openField === "where"}
            onToggle={() => toggleField("where")}
            onSelect={(v) => {
              setCity(v);
              setOpenField(null);
            }}
          />
          <DropdownField
            id="when"
            label="When"
            value={when}
            options={WHEN_OPTIONS}
            open={openField === "when"}
            onToggle={() => toggleField("when")}
            onSelect={(v) => {
              setWhen(v);
              setOpenField(null);
            }}
          />
          <DropdownField
            id="guests"
            label="Guests"
            value={guests}
            options={GUESTS_OPTIONS}
            open={openField === "guests"}
            onToggle={() => toggleField("guests")}
            onSelect={(v) => {
              setGuests(v);
              setOpenField(null);
            }}
          />
          <div className="ml-2 shrink-0">
            <button
              type="button"
              onClick={handleSearch}
              aria-label="Search venues"
              className="rounded-[10px] h-full min-h-[61px] px-[40px] text-[24px] leading-[29px] font-semibold text-white bg-primary hover:bg-primary-hover inline-flex items-center gap-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <MagnifierIcon />
              Search
            </button>
          </div>
        </div>

        <div className="flex md:hidden flex-col">
          <div className="flex gap-[11px]">
            <button
              type="button"
              onClick={() => setActiveTab("venue")}
              className={cn(
                "flex h-[44px] flex-1 items-center justify-center gap-[7px] rounded-[10px] text-[16px] font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                activeTab === "venue" ? "bg-primary text-white" : "bg-[#edeef1] text-[#5e5e5e]"
              )}
            >
              <VenueIcon />
              Venue
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("vendors")}
              className={cn(
                "flex h-[44px] flex-1 items-center justify-center gap-[7px] rounded-[10px] text-[16px] font-semibold transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                activeTab === "vendors" ? "bg-primary text-white" : "bg-[#edeef1] text-[#5e5e5e]"
              )}
            >
              <SparkleIcon />
              Vendors
            </button>
          </div>

          <div className="mt-[6px] flex flex-col divide-y divide-border">
          <DropdownField
            id="where"
            label="Where"
            value={city}
            options={WHERE_OPTIONS}
            open={openField === "where"}
            onToggle={() => toggleField("where")}
            onSelect={(v) => {
              setCity(v);
              setOpenField(null);
            }}
          />
          <DropdownField
            id="when"
            label="When"
            value={when}
            options={WHEN_OPTIONS}
            open={openField === "when"}
            onToggle={() => toggleField("when")}
            onSelect={(v) => {
              setWhen(v);
              setOpenField(null);
            }}
          />
          <DropdownField
            id="guests"
            label="Guests"
            value={guests}
            options={GUESTS_OPTIONS}
            open={openField === "guests"}
            onToggle={() => toggleField("guests")}
            onSelect={(v) => {
              setGuests(v);
              setOpenField(null);
            }}
          />
          </div>

          <button
            type="button"
            onClick={handleSearch}
            aria-label="Search venues"
            className="mt-[14px] w-full rounded-[10px] h-[50px] px-6 text-[18px] leading-[24px] font-semibold text-white bg-primary hover:bg-primary-hover inline-flex items-center justify-center gap-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <MagnifierIcon />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
