import Image from "next/image";
import type { Venue } from "@/types/venue";

type MapPopupCardProps = {
  venue: Venue;
};

export function MapPopupCard({ venue }: MapPopupCardProps) {
  return (
    <div className="w-[240px]">
      <div className="relative w-full" style={{ height: 155 }}>
        <Image
          src={venue.images[0]}
          alt={venue.title}
          fill
          className="object-cover"
          sizes="240px"
        />
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold line-clamp-1 text-foreground">{venue.title}</p>
        <p className="text-xs text-muted mt-1">
          {venue.city}, {venue.country}
        </p>
      </div>
    </div>
  );
}
