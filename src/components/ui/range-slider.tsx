"use client";

import { cn } from "@/lib/cn";

type RangeSliderProps = {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  "aria-label"?: string;
};

const thumbClass = cn(
  "absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer pointer-events-none",
  "[&::-webkit-slider-thumb]:appearance-none",
  "[&::-webkit-slider-thumb]:pointer-events-auto",
  "[&::-webkit-slider-thumb]:h-4",
  "[&::-webkit-slider-thumb]:w-4",
  "[&::-webkit-slider-thumb]:rounded-full",
  "[&::-webkit-slider-thumb]:bg-white",
  "[&::-webkit-slider-thumb]:[border:1px_solid_var(--color-border)]",
  "[&::-webkit-slider-thumb]:shadow-card",
  "[&::-webkit-slider-runnable-track]:bg-transparent",
  "[&::-moz-range-thumb]:pointer-events-auto",
  "[&::-moz-range-thumb]:h-4",
  "[&::-moz-range-thumb]:w-4",
  "[&::-moz-range-thumb]:rounded-full",
  "[&::-moz-range-thumb]:bg-white",
  "[&::-moz-range-thumb]:[border:1px_solid_var(--color-border)]",
  "[&::-moz-range-thumb]:shadow-card",
  "[&::-moz-range-track]:bg-transparent"
);

export function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  "aria-label": ariaLabel,
}: RangeSliderProps) {
  const [low, high] = value;
  const range = max - min || 1;
  const lowPercent = ((low - min) / range) * 100;
  const highPercent = ((high - min) / range) * 100;
  const lowOnRight = lowPercent >= 50;

  return (
    <div role="group" aria-label={ariaLabel} className="relative w-full h-6">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-border">
        <div
          className="absolute h-full rounded-full bg-primary"
          style={{ left: `${lowPercent}%`, right: `${100 - highPercent}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={low}
        onChange={(e) => {
          const next = Math.min(Number(e.target.value), high);
          onChange([next, high]);
        }}
        aria-label="Minimum value"
        className={thumbClass}
        style={{ zIndex: lowOnRight ? 3 : 1 }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={high}
        onChange={(e) => {
          const next = Math.max(Number(e.target.value), low);
          onChange([low, next]);
        }}
        aria-label="Maximum value"
        className={thumbClass}
        style={{ zIndex: lowOnRight ? 1 : 3 }}
      />
    </div>
  );
}
