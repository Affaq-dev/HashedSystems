"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Modal } from "@/components/ui/modal";
import { RangeSlider } from "@/components/ui/range-slider";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/stores/ui-store";
import { useSearchParamsState } from "@/hooks/use-search-params-state";
import { cn } from "@/lib/cn";

type FilterFormValues = {
  venueTypes: string[];
  eventTypes: string[];
  capacity: [number, number];
  price: [number, number];
  verified: boolean;
};

const VENUE_TYPE_OPTIONS = [
  "Office Space",
  "Meeting",
  "Private Party",
  "Villa",
  "Bar",
  "Loft",
  "Apartment",
  "Ballroom",
  "Restaurant",
  "Studio",
  "House",
  "Gallery",
];

const EVENT_TYPE_OPTIONS = [
  "Wedding",
  "Reception",
  "Ceremony",
  "Engagement",
  "Birthday",
  "Babyshower",
  "Concert/Performance",
  "Brand Launch",
  "Fashion Show",
  "Corporate Event",
  "Conference",
  "Pop-up",
];

const DEFAULT_CAPACITY: [number, number] = [10, 1500];
const DEFAULT_PRICE: [number, number] = [10, 30000];

export function FilterModal() {
  const filterModalOpen = useUiStore((s) => s.filterModalOpen);
  const closeFilterModal = useUiStore((s) => s.closeFilterModal);
  const { params, setParams } = useSearchParamsState();

  const { control, handleSubmit, watch, setValue, reset } =
    useForm<FilterFormValues>({
      defaultValues: {
        venueTypes: [],
        eventTypes: [],
        capacity: DEFAULT_CAPACITY,
        price: DEFAULT_PRICE,
        verified: false,
      },
    });

  useEffect(() => {
    if (filterModalOpen) {
      reset({
        venueTypes: params.venueTypes ?? [],
        eventTypes: params.eventTypes ?? [],
        capacity: [params.guestsMin ?? 10, params.guestsMax ?? 1500],
        price: [params.priceMin ?? 10, params.priceMax ?? 30000],
        verified: params.verified ?? false,
      });
    }
  }, [filterModalOpen, params, reset]);

  const venueTypes = watch("venueTypes");
  const eventTypes = watch("eventTypes");
  const capacity = watch("capacity");
  const price = watch("price");

  function togglePill(current: string[], value: string): string[] {
    return current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
  }

  const defaultValues: FilterFormValues = {
    venueTypes: [],
    eventTypes: [],
    capacity: DEFAULT_CAPACITY,
    price: DEFAULT_PRICE,
    verified: false,
  };

  function onSubmit(values: FilterFormValues) {
    const [capMin, capMax] = values.capacity;
    const [priceMin, priceMax] = values.price;
    const capacityChanged =
      capMin !== DEFAULT_CAPACITY[0] || capMax !== DEFAULT_CAPACITY[1];
    const priceChanged =
      priceMin !== DEFAULT_PRICE[0] || priceMax !== DEFAULT_PRICE[1];

    setParams({
      venueTypes: values.venueTypes.length ? values.venueTypes : undefined,
      eventTypes: values.eventTypes.length ? values.eventTypes : undefined,
      guestsMin: capacityChanged ? capMin : undefined,
      guestsMax: capacityChanged ? capMax : undefined,
      priceMin: priceChanged ? priceMin : undefined,
      priceMax: priceChanged ? priceMax : undefined,
      verified: values.verified ? true : undefined,
    });
    closeFilterModal();
  }

  return (
    <Modal
      open={filterModalOpen}
      onClose={closeFilterModal}
      title="Filters"
      className="max-w-xl"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <h3 className="text-sm font-bold mb-3">Venue Type</h3>
          <div className="flex flex-wrap gap-2">
            {VENUE_TYPE_OPTIONS.map((option) => {
              const selected = venueTypes.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setValue("venueTypes", togglePill(venueTypes, option), {
                      shouldDirty: true,
                    })
                  }
                  className={cn(
                    "rounded-full border px-4 h-9 text-sm transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                    selected
                      ? "border-primary text-primary bg-primary/5 font-medium"
                      : "border-border text-muted hover:border-foreground/40"
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-sm font-bold mb-3">Capacity</h3>
          <p className="text-sm text-muted mb-4">
            Showing venues for{" "}
            <strong className="text-foreground">{capacity[0]}</strong>
            {" - "}
            <strong className="text-foreground">{capacity[1]}</strong> guests
          </p>
          <Controller
            control={control}
            name="capacity"
            render={({ field }) => (
              <RangeSlider
                min={10}
                max={1500}
                step={10}
                value={field.value}
                onChange={field.onChange}
                aria-label="Capacity range"
              />
            )}
          />
        </section>

        <section className="mt-8">
          <h3 className="text-sm font-bold mb-3">Price per hour (AED)</h3>
          <p className="text-sm text-muted mb-4">
            <strong className="text-foreground">
              AED {price[0].toLocaleString()}.00
            </strong>
            {" — "}
            <strong className="text-foreground">
              AED {price[1].toLocaleString()}.00
            </strong>
          </p>
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <RangeSlider
                min={10}
                max={30000}
                step={10}
                value={field.value}
                onChange={field.onChange}
                aria-label="Price per hour range"
              />
            )}
          />
        </section>

        <section className="mt-8">
          <h3 className="text-sm font-bold mb-3">Event / Occasion</h3>
          <div className="flex flex-wrap gap-2">
            {EVENT_TYPE_OPTIONS.map((option) => {
              const selected = eventTypes.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setValue("eventTypes", togglePill(eventTypes, option), {
                      shouldDirty: true,
                    })
                  }
                  className={cn(
                    "rounded-full border px-4 h-9 text-sm transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                    selected
                      ? "border-primary text-primary bg-primary/5 font-medium"
                      : "border-border text-muted hover:border-foreground/40"
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold">Verified Only</p>
              <p className="text-xs text-muted mt-0.5">
                Only show venues with a verified badge
              </p>
            </div>
            <Controller
              control={control}
              name="verified"
              render={({ field }) => (
                <Toggle
                  checked={field.value}
                  onChange={field.onChange}
                  aria-label="Verified only"
                />
              )}
            />
          </div>
        </section>

        <div className="mt-10 pt-5 border-t border-border flex items-center justify-between">
          <Button
            variant="outline"
            type="button"
            className="border-border text-muted hover:text-foreground"
            onClick={() => reset(defaultValues)}
          >
            Clear All
          </Button>
          <Button variant="primary" type="submit">
            Apply Filters
          </Button>
        </div>
      </form>
    </Modal>
  );
}
