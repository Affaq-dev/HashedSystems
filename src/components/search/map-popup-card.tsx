import Image from "next/image";
import type { Venue } from "@/types/venue";

type MapPopupCardProps = {
  venue: Venue;
};

export function MapPopupCard({ venue }: MapPopupCardProps) {
  return (
    <div className="w-56">
      <div className="relative w-full" style={{ height: 130 }}>
        <Image
          src={venue.images[0]}
          alt={venue.title}
          fill
          className="object-cover"
          sizes="224px"
        />
      </div>
      <div className="p-3">
        <p className="text-sm font-bold line-clamp-1 text-foreground">{venue.title}</p>
        <p className="text-xs text-muted mt-0.5">
          {venue.city}, {venue.country}
        </p>
      </div>
    </div>
  );
}
