import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./section-heading";

const DESTINATIONS = [
  {
    name: "New York, USA",
    count: "24 Venues",
    description: "Coastal energy, modern Venue",
    popular: "Popular: Rooftop",
    price: "From $50 per hour",
    image: "/images/destinations/new-york.png",
    alt: "Flatiron Building, New York City",
  },
  {
    name: "London, UK",
    count: "108 Venues",
    description: "Coastal energy, modern Venue",
    popular: "Popular: Rooftop",
    price: "From $25 per hour",
    image: "/images/destinations/london.png",
    alt: "Tower Bridge, London",
  },
  {
    name: "Dubai, UAE",
    count: "17 Venues",
    description: "Coastal energy, modern Venue",
    popular: "Popular: Rooftop",
    price: "From $50 per hour",
    image: "/images/destinations/dubai.png",
    alt: "Dubai city skyline at sunset",
  },
] as const;

export function Destinations() {
  return (
    <section className="bg-white py-12 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-[80px]">
        <SectionHeading
          title="Discover Exceptional Destinations Across the Region"
          subtitle="From cosmopolitan cityscapes to cultural treasures, explore where celebrations come alive with local flavor."
        />

        <div className="mt-12 -mx-4 flex snap-x snap-mandatory gap-[15px] overflow-x-auto scroll-px-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:-mx-6 md:scroll-px-6 md:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.name}
              className="relative w-[300px] shrink-0 snap-center rounded-card overflow-hidden aspect-[4/5] group cursor-pointer lg:w-auto"
            >
              <Image
                src={dest.image}
                alt={dest.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                sizes="(max-width: 1023px) 300px, 33vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4">
                <Badge
                  variant="dark"
                  className="px-[11px] py-[6px] font-semibold text-[11px] lg:px-[15px] lg:py-[8px] lg:text-[12px]"
                >
                  {dest.count}
                </Badge>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-[14px] lg:p-5">
                <p className="text-white text-[22px] font-semibold leading-[24px] lg:text-[30px] lg:leading-[30px]">
                  {dest.name}
                </p>
                <p className="text-white text-[13px] leading-[18px] mt-[6px] lg:text-[16px] lg:leading-[24px] lg:mt-[10px]">
                  {dest.description}
                </p>
                <div className="flex items-center justify-between gap-2 mt-[4px] lg:mt-[5px]">
                  <p className="text-white text-[13px] whitespace-nowrap lg:text-[16px]">{dest.popular}</p>
                  <p className="text-white font-bold text-[13px] whitespace-nowrap lg:text-[16px]">{dest.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
