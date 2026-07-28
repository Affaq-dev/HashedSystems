import Image from "next/image";
import { ContactForm } from "./contact-form";

const LINK_COLUMNS = [
  { heading: "Venuze", links: ["About", "News", "Careers", "Investors"], order: "order-1" },
  {
    heading: "Support",
    links: ["Listings your venue", "Listing your service", "Help center", "FAQ"],
    order: "order-3 md:order-2",
  },
  {
    heading: "Explore",
    links: ["Venue types", "Venue features", "Service options", "Locations"],
    order: "order-2 md:order-3",
  },
  {
    heading: "Legal & Privacy",
    links: ["Terms of service", "Payment & refund policy", "Host agreement", "Vendor agreement"],
    order: "order-4",
  },
] as const;

function SocialIcon({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="text-white hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="bg-black rounded-t-[30px] md:rounded-t-[50px] pt-[100px] md:pt-[133px] pb-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[84px]">
        <div className="flex flex-col xl:flex-row xl:justify-between gap-12">
          <div className="w-full xl:max-w-[536px]">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Image
                src="/images/logo-mark.png"
                alt="Venuze"
                width={67}
                height={45}
                className="h-[45px] w-auto shrink-0"
              />
              <p className="text-white text-[20px] leading-[34px] md:text-[24px] md:leading-[45px] font-semibold max-w-[565px] sm:-mt-2">
                Make it memorable—book the perfect venue and the pros who make it shine.
              </p>
            </div>

            <div className="mt-[33px] grid grid-cols-2 gap-y-10 md:grid-cols-[166px_182px_165px_auto] md:gap-y-0">
              {LINK_COLUMNS.map((col) => (
                <div key={col.heading} className={col.order}>
                  <h3 className="text-[20px] leading-[24px] text-[#a6a6a6] font-normal">
                    {col.heading}
                  </h3>
                  <ul className="mt-[10px]">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="block text-[12px] leading-[21px] text-white hover:text-white/70 transition-colors whitespace-nowrap"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full xl:w-[516px] xl:shrink-0">
            <h3 className="text-white text-[24px] leading-[30px] font-semibold">Get in Touch</h3>
            <div className="mt-[17px]">
              <ContactForm />
            </div>
          </div>
        </div>

        <div className="border-t border-[#373737] mt-[43px] pt-[35px] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-[32px]">
            <SocialIcon label="Venuze on X">
              <svg width="26" height="26" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M11.9 8.6 18.4 1h-1.5l-5.7 6.6L6.7 1H1.4l6.8 9.9L1.4 19h1.5l6-6.9 4.8 6.9h5.3l-7.1-10.4Zm-2.1 2.4-.7-1L3.5 2.2h2.4l4.4 6.4.7 1 5.8 8.3h-2.4l-4.6-6.9Z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="Venuze on Facebook">
              <svg width="26" height="26" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M18 10a8 8 0 1 0-9.25 7.9v-5.59H6.72V10h2.03V8.24c0-2 1.2-3.11 3.02-3.11.88 0 1.8.16 1.8.16v1.97h-1.02c-1 0-1.3.62-1.3 1.25V10h2.22l-.36 2.31h-1.86v5.59A8 8 0 0 0 18 10Z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="Venuze on Instagram">
              <svg width="26" height="26" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="2" y="2" width="16" height="16" rx="4.5" />
                <circle cx="10" cy="10" r="3.8" />
                <circle cx="14.8" cy="5.2" r="0.9" fill="currentColor" stroke="none" />
              </svg>
            </SocialIcon>
          </div>
          <p className="text-[14px] leading-[30px] text-[#9a9a9a]">
            © 2026 Venuze. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
