"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

type FieldKey = "where" | "when" | "guests";

const WHERE_OPTIONS = ["Dubai, UAE", "London, UK", "New York, USA"];
const WHEN_OPTIONS = ["Anytime", "Today", "This week", "This month"];
const GUESTS_OPTIONS = ["10-20", "1-10", "20-50", "50-100", "100+"];

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
          <span className="text-xs text-muted leading-none mb-0.5">{label}</span>
          <span className="text-sm font-semibold text-foreground truncate">{value}</span>
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
      <div className="flex gap-2 mb-3 justify-center md:justify-start">
        <button
          type="button"
          onClick={() => setActiveTab("venue")}
          className={cn(
            "rounded-full h-10 px-6 text-sm font-semibold shadow-card transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            activeTab === "venue"
              ? "bg-primary text-white"
              : "bg-white text-foreground hover:bg-foreground/5"
          )}
        >
          Venue
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("vendors")}
          className={cn(
            "rounded-full h-10 px-6 text-sm font-semibold shadow-card transition-colors inline-flex items-center gap-1.5",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            activeTab === "vendors"
              ? "bg-primary text-white"
              : "bg-white text-foreground hover:bg-foreground/5"
          )}
        >
          <SparkleIcon />
          Vendors
        </button>
      </div>

      <div className="bg-white rounded-card shadow-float p-2 md:p-2.5">
        <div className="hidden md:flex items-stretch">
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
          <div className="border-l border-border self-stretch my-1" />
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
          <div className="border-l border-border self-stretch my-1" />
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
            <Button
              variant="primary"
              size="lg"
              onClick={handleSearch}
              aria-label="Search venues"
              className="h-full"
            >
              <MagnifierIcon />
              Search
            </Button>
          </div>
        </div>

        <div className="flex md:hidden flex-col divide-y divide-border">
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
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSearch}
              aria-label="Search venues"
              className="w-full"
            >
              <MagnifierIcon />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
