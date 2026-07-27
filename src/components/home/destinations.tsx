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
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeading
          title="Discover Exceptional Destinations Across the Region"
          subtitle="From cosmopolitan cityscapes to cultural treasures, explore where celebrations come alive with local flavor."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.name}
              className="relative rounded-card overflow-hidden aspect-[4/5] group cursor-pointer"
            >
              <Image
                src={dest.image}
                alt={dest.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4">
                <Badge variant="dark">{dest.count}</Badge>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white text-2xl font-bold leading-tight">{dest.name}</p>
                <p className="text-white/80 text-sm mt-1">{dest.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-white/80 text-sm">{dest.popular}</p>
                  <p className="text-white font-bold text-sm">{dest.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
