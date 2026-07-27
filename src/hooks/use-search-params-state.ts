"use client";

import { useCallback, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { VenueSearchParams } from "@/types/venue";

function toNum(val: string | null): number | undefined {
  if (!val) return undefined;
  const n = Number(val);
  return isNaN(n) ? undefined : n;
}

export function toQueryString(params: VenueSearchParams): string {
  const qs = new URLSearchParams();

  if (params.q) qs.set("q", params.q);
  if (params.category) qs.set("category", params.category);
  if (params.guestsMin !== undefined) qs.set("guestsMin", String(params.guestsMin));
  if (params.guestsMax !== undefined) qs.set("guestsMax", String(params.guestsMax));
  if (params.priceMin !== undefined) qs.set("priceMin", String(params.priceMin));
  if (params.priceMax !== undefined) qs.set("priceMax", String(params.priceMax));
  if (params.venueTypes && params.venueTypes.length > 0)
    qs.set("venueTypes", params.venueTypes.join(","));
  if (params.eventTypes && params.eventTypes.length > 0)
    qs.set("eventTypes", params.eventTypes.join(","));
  if (params.verified !== undefined) qs.set("verified", String(params.verified));
  if (params.parking !== undefined) qs.set("parking", String(params.parking));
  if (params.sort) qs.set("sort", params.sort);
  if (params.page !== undefined) qs.set("page", String(params.page));

  return qs.toString();
}

function parseSearchParams(sp: ReturnType<typeof useSearchParams>): VenueSearchParams {
  const category = sp.get("category") as VenueSearchParams["category"] | null;

  const verifiedRaw = sp.get("verified");
  const parkingRaw = sp.get("parking");

  const venueTypesRaw = sp.get("venueTypes");
  const eventTypesRaw = sp.get("eventTypes");

  return {
    q: sp.get("q") ?? undefined,
    category: category ?? undefined,
    guestsMin: toNum(sp.get("guestsMin")),
    guestsMax: toNum(sp.get("guestsMax")),
    priceMin: toNum(sp.get("priceMin")),
    priceMax: toNum(sp.get("priceMax")),
    venueTypes: venueTypesRaw ? venueTypesRaw.split(",").filter(Boolean) : undefined,
    eventTypes: eventTypesRaw ? eventTypesRaw.split(",").filter(Boolean) : undefined,
    verified: verifiedRaw !== null ? verifiedRaw === "true" : undefined,
    parking: parkingRaw !== null ? parkingRaw === "true" : undefined,
    sort: (sp.get("sort") as VenueSearchParams["sort"]) ?? undefined,
    page: toNum(sp.get("page")),
  };
}

export function useSearchParamsState() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const params = useMemo(() => parseSearchParams(searchParams), [searchParams]);

  const setParams = useCallback(
    (patch: Partial<VenueSearchParams>) => {
      const hasNonPageKey = Object.keys(patch).some((k) => k !== "page");
      const merged: VenueSearchParams = { ...params, ...patch };
      if (hasNonPageKey) {
        delete merged.page;
      }

      const cleaned = Object.fromEntries(
        Object.entries(merged).filter(([, v]) => {
          if (v === undefined || v === null) return false;
          if (Array.isArray(v) && v.length === 0) return false;
          if (v === "") return false;
          return true;
        })
      ) as VenueSearchParams;

      const qs = toQueryString(cleaned);
      router.replace(pathname + (qs ? "?" + qs : ""), { scroll: false });
    },
    [params, pathname, router]
  );

  const clearAll = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (params.venueTypes && params.venueTypes.length > 0) count++;
    if (params.eventTypes && params.eventTypes.length > 0) count++;
    if (params.priceMin !== undefined || params.priceMax !== undefined) count++;
    if (params.guestsMin !== undefined || params.guestsMax !== undefined) count++;
    if (params.verified !== undefined) count++;
    if (params.parking !== undefined) count++;
    return count;
  }, [params]);

  return { params, setParams, clearAll, activeFilterCount };
}
