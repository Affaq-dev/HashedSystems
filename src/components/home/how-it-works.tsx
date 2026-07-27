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

export function HowItWorks() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <SectionHeading
          title="Your Path to the Perfect Venue"
          subtitle="Planning an event, production, or gathering shouldn't feel complicated. Our streamlined process connects you with the right venues and trusted professionals, taking the stress out of logistics so you can focus on what matters most  making it a success."
        />

        <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative grid grid-cols-2 gap-4">
            <div className="relative rounded-card overflow-hidden aspect-[3/5]">
              <Image
                src="/images/how-it-works/collage-1.png"
                alt="Venue in New York City"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 40vw, 20vw"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative rounded-card overflow-hidden aspect-[4/5]">
                <Image
                  src="/images/how-it-works/collage-2.png"
                  alt="Venue in London"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 40vw, 20vw"
                />
              </div>
              <div className="relative rounded-card overflow-hidden aspect-[4/3]">
                <Image
                  src="/images/how-it-works/collage-3.png"
                  alt="Venue in Dubai"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 40vw, 20vw"
                />
              </div>
            </div>

            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-28 w-28 rounded-full bg-white shadow-float flex items-center justify-center"
              aria-hidden="true"
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <line x1="6" y1="8" x2="42" y2="8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M8 8V42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M40 8V42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="6" y1="42" x2="42" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M8 16Q16 22 14 34L14 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M40 16Q32 22 34 34L34 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path
                  d="M8 8C8 8 14 12 24 12C34 12 40 8 40 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            {STEPS.map((step, i) => (
              <div key={step.number} className="relative flex gap-4">
                {i < STEPS.length - 1 && (
                  <div
                    className="absolute left-5 top-10 h-[calc(100%+2.5rem)] border-l border-dashed border-border"
                    aria-hidden="true"
                  />
                )}
                <div className="relative z-10 h-10 w-10 rounded-full bg-gradient-to-b from-accent to-primary text-white font-bold flex items-center justify-center shrink-0 text-sm">
                  {step.number}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{step.title}</p>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
