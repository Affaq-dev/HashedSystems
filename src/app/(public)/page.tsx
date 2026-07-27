import { Hero } from "@/components/home/hero";
import { CategoryCards } from "@/components/home/category-cards";
import { FeaturedVenues } from "@/components/home/featured-venues";
import { VendorCards } from "@/components/home/vendor-cards";
import { VendorCtaBanner } from "@/components/home/vendor-cta-banner";
import { HowItWorks } from "@/components/home/how-it-works";
import { StatsTestimonials } from "@/components/home/stats-testimonials";
import { Destinations } from "@/components/home/destinations";
import { ListVenueCta } from "@/components/home/list-venue-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryCards />
      <FeaturedVenues />
      <VendorCards />
      <VendorCtaBanner />
      <HowItWorks />
      <StatsTestimonials />
      <Destinations />
      <ListVenueCta />
    </>
  );
}
