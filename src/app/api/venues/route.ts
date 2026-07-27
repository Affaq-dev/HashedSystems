import { NextResponse } from "next/server";
import { z } from "zod";
import { venues } from "@/data/venues";
import type { VenueSearchResponse } from "@/types/venue";

const venueSearchSchema = z.object({
  q: z.string().optional(),
  category: z
    .enum([
      "all",
      "photo-studio",
      "film-studio",
      "warehouse",
      "gallery",
      "restaurant",
      "apartment",
      "office-space",
      "venue",
      "private-party",
      "meeting",
    ])
    .optional(),
  guestsMin: z.coerce.number().int().positive().optional(),
  guestsMax: z.coerce.number().int().positive().optional(),
  priceMin: z.coerce.number().int().positive().optional(),
  priceMax: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional(),
  verified: z
    .string()
    .transform((v) => v === "true" || v === "1")
    .optional(),
  parking: z
    .string()
    .transform((v) => v === "true" || v === "1")
    .optional(),
  venueTypes: z
    .string()
    .transform((v) => v.split(",").filter(Boolean))
    .optional(),
  eventTypes: z
    .string()
    .transform((v) => v.split(",").filter(Boolean))
    .optional(),
  sort: z.enum(["recommended", "price-asc", "price-desc"]).default("recommended"),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawParams = Object.fromEntries(searchParams.entries());

  const parsed = venueSearchSchema.safeParse(rawParams);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid search parameters" }, { status: 400 });
  }

  const {
    q,
    category,
    guestsMin,
    priceMin,
    priceMax,
    page = 1,
    verified,
    parking,
    venueTypes,
    eventTypes,
    sort,
  } = parsed.data;

  let filtered = venues.filter((v) => {
    if (q) {
      const term = q.toLowerCase();
      const matches =
        v.title.toLowerCase().includes(term) ||
        v.city.toLowerCase().includes(term) ||
        v.area.toLowerCase().includes(term);
      if (!matches) return false;
    }

    if (category && category !== "all") {
      if (v.category !== category) return false;
    }

    if (guestsMin !== undefined && v.capacity < guestsMin) return false;

    if (priceMin !== undefined && v.pricePerHour < priceMin) return false;
    if (priceMax !== undefined && v.pricePerHour > priceMax) return false;

    if (venueTypes && venueTypes.length > 0) {
      if (!venueTypes.includes(v.venueType)) return false;
    }

    if (eventTypes && eventTypes.length > 0) {
      const hasOverlap = v.eventTypes.some((et) => eventTypes.includes(et));
      if (!hasOverlap) return false;
    }

    if (verified !== undefined && v.verified !== verified) return false;
    if (parking !== undefined && v.parking !== parking) return false;

    return true;
  });

  if (sort === "recommended") {
    filtered = filtered.sort((a, b) => {
      if (a.verified !== b.verified) return a.verified ? -1 : 1;
      return b.capacity - a.capacity;
    });
  } else if (sort === "price-asc") {
    filtered = filtered.sort((a, b) => a.pricePerHour - b.pricePerHour);
  } else if (sort === "price-desc") {
    filtered = filtered.sort((a, b) => b.pricePerHour - a.pricePerHour);
  }

  const pageSize = 9;
  const total = filtered.length;
  const items = filtered.slice((page - 1) * pageSize, page * pageSize);

  await new Promise((resolve) => setTimeout(resolve, 600));

  const response: VenueSearchResponse = {
    items,
    total,
    page,
    pageSize,
  };

  return NextResponse.json(response);
}
