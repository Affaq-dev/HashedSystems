"use client";

import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api-client";
import { toQueryString } from "./use-search-params-state";
import type { VenueSearchParams, VenueSearchResponse } from "@/types/venue";

export function useVenues(params: VenueSearchParams) {
  return useInfiniteQuery({
    queryKey: ["venues", toQueryString(params)],
    queryFn: ({ pageParam }) =>
      apiFetch<VenueSearchResponse>(
        `/api/venues?${toQueryString({ ...params, page: pageParam })}`
      ),
    initialPageParam: 1,
    getNextPageParam: (last) =>
      last.page * last.pageSize < last.total ? last.page + 1 : undefined,
    placeholderData: keepPreviousData,
  });
}
