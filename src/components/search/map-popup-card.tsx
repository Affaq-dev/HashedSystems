import Image from "next/image";
import type { Venue } from "@/types/venue";

type MapPopupCardProps = {
  venue: Venue;
};

export function MapPopupCard({ venue }: MapPopupCardProps) {
  return (
    <div className="w-[250px] p-[10px] pb-[18px]">
      <div className="relative w-full h-[158px] rounded-[16px] overflow-hidden">
        <Image
          src={venue.images[0]}
          alt={venue.title}
          fill
          className="object-cover"
          sizes="250px"
        />
      </div>
      <p className="mt-[12px] text-[18px] font-bold leading-[1.25] text-foreground line-clamp-2">
        {venue.title}
      </p>
      <div className="mt-[10px] flex items-center gap-[6px]">
        <svg
          width="16"
          height="16"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          className="shrink-0 text-primary"
        >
          <path
            d="M7 1.5A4 4 0 0 1 11 5.5C11 8.5 7 12.5 7 12.5S3 8.5 3 5.5A4 4 0 0 1 7 1.5Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="7" cy="5.5" r="1.3" stroke="currentColor" strokeWidth="1.3" />
        </svg>
        <span className="text-[14px] text-foreground">
          {venue.city}, {venue.country}
        </span>
      </div>
    </div>
  );
}
