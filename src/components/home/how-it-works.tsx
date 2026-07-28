import Image from "next/image";
import { SectionHeading } from "./section-heading";

const STEPS = [
  {
    number: 1,
    title: "Search & filter",
    body: "Browse our curated collection of venues and event professionals. Use smart filters, high-quality visuals, and authentic reviews to find options that fit your needs, style, and budget.",
  },
  {
    number: 2,
    title: "Compare & message",
    body: "Communicate directly with venue hosts and service providers. Request tailored quotes, discuss requirements, and design every detail of your event or project with confidence.",
  },
  {
    number: 3,
    title: "Book & add services",
    body: "Secure your choices with ease through our protected booking system. With clear agreements, secure payments, and ongoing support, you can move forward knowing everything is handled.",
  },
];

const COLLAGE = [
  {
    src: "/images/how-it-works/collage-2.png",
    alt: "Guests dancing at a party venue",
    position: "left-[51.4563%] top-0",
  },
  {
    src: "/images/how-it-works/collage-1.png",
    alt: "Friends taking photos at a celebration",
    position: "left-0 top-[10.9629%]",
  },
  {
    src: "/images/how-it-works/collage-4.png",
    alt: "Event team joining hands",
    position: "left-[51.4563%] top-[46.3596%]",
  },
  {
    src: "/images/how-it-works/collage-3.png",
    alt: "Couple exchanging a gift at a venue",
    position: "left-0 top-[57.3251%]",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white pt-12 lg:pt-24 pb-12 md:pb-24">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <SectionHeading
          title="Your Path to the Perfect Venue"
          subtitle="Planning an event, production, or gathering shouldn’t feel complicated. Our streamlined process connects you with the right venues and trusted professionals, taking the stress out of logistics so you can focus on what matters most  making it a success."
        />

        <div className="mt-[50px] lg:mt-[22px] grid grid-cols-1 items-start lg:grid-cols-[515fr_604fr] lg:gap-x-[49px] lg:pl-[32px]">
          <div className="relative mx-auto w-full max-w-[520px] aspect-[515/407.1] lg:mx-0 lg:max-w-none">
            {COLLAGE.map(({ src, alt, position }) => (
              <div
                key={src}
                className={`absolute ${position} w-[48.5437%] h-[42.6704%] overflow-hidden rounded-[13px] md:rounded-[16px] lg:rounded-[20px]`}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 45vw, 22vw"
                />
              </div>
            ))}

            <div className="absolute left-[49.223%] top-[47.777%] -translate-x-1/2 -translate-y-1/2 z-10 w-[25.4369%] aspect-square rounded-full bg-white shadow-float flex items-center justify-center">
              <Image
                src="/images/how-it-works/stage-icon.svg"
                alt=""
                width={70}
                height={64}
                unoptimized
                aria-hidden="true"
                className="w-[53.4%] h-auto"
              />
            </div>
          </div>

          <div className="mt-[33px] mx-auto w-full max-w-[520px] flex flex-col gap-[30px] lg:mt-[32px] lg:mx-0 lg:max-w-none lg:gap-[40px]">
            {STEPS.map((step, i) => (
              <div key={step.number} className="flex items-start gap-[29px] md:gap-[30px] lg:gap-[31px]">
                <div className="flex flex-col items-center self-stretch shrink-0">
                  <div className="relative z-10 shrink-0 size-[34px] md:size-[42px] lg:size-[50px] lg:mt-[9px] rounded-full bg-gradient-to-b from-accent to-primary text-white font-bold flex items-center justify-center text-[13.6px] tracking-[-0.408px] md:text-[16px] md:tracking-[-0.48px] lg:text-[20px] lg:tracking-[-0.6px]">
                    {step.number}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className="flex-1 w-0 -mb-[30px] border-l-[1.5px] border-dashed border-[#d9d9d9] lg:-mb-[49px] lg:border-l-2"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="mt-[4px] min-w-0 lg:mt-0">
                  <p className="font-semibold text-foreground text-[14px] leading-[20px] tracking-[-0.42px] md:text-[20px] md:leading-[26px] md:tracking-[-0.6px] lg:text-[24px] lg:leading-[30px] lg:tracking-[-0.72px]">
                    {step.title}
                  </p>
                  <p className="mt-[10px] text-foreground text-[14px] leading-[20px] tracking-[-0.42px] md:text-[15px] md:leading-[22px] md:tracking-[-0.45px] lg:text-[16px] lg:leading-[24px] lg:tracking-[-0.48px]">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
