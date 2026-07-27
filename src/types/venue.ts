export type VenueCategory =
  | "photo-studio"
  | "film-studio"
  | "warehouse"
  | "gallery"
  | "restaurant"
  | "apartment"
  | "office-space"
  | "venue"
  | "private-party"
  | "meeting";

export interface Venue {
  id: string;
  title: string;
  city: string;
  area: string;
  country: string;
  capacity: number;
  sizeSqFt: number;
  parking: boolean;
  amenities: string[];
  pricePerHour: number;
  currency: "USD" | "AED";
  verified: boolean;
  images: string[];
  category: VenueCategory;
  venueType: string;
  eventTypes: string[];
  lat: number;
  lng: number;
}

export interface VenueSearchParams {
  q?: string;
  category?: VenueCategory | "all";
  guestsMin?: number;
  guestsMax?: number;
  priceMin?: number;
  priceMax?: number;
  venueTypes?: string[];
  eventTypes?: string[];
  verified?: boolean;
  parking?: boolean;
  sort?: "recommended" | "price-asc" | "price-desc";
  page?: number;
}

export interface VenueSearchResponse {
  items: Venue[];
  total: number;
  page: number;
  pageSize: number;
}
