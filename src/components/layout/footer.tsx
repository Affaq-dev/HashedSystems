import { ContactForm } from "@/components/layout/contact-form";

type LinkColumn = {
  heading: string;
  links: string[];
};

const LINK_COLUMNS: LinkColumn[] = [
  {
    heading: "Venuze",
    links: ["About", "News", "Careers", "Investors"],
  },
  {
    heading: "Explore",
    links: ["Venue types", "Venue features", "Service options", "Locations"],
  },
  {
    heading: "Support",
    links: ["Listings your venue", "Listing your service", "Help center", "FAQ"],
  },
  {
    heading: "Legal & Privacy",
    links: [
      "Terms of service",
      "Payment & refund policy",
      "Host agreement",
      "Vendor agreement",
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-footer text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-8 gap-8 lg:gap-10">
          <div className="md:col-span-3 lg:col-span-2 flex flex-col gap-4">
            <span className="font-extrabold text-2xl text-primary">venuze</span>
            <p className="text-faint text-sm max-w-xs">
              Make it memorable—book the perfect venue and the pros who make it shine.
            </p>
          </div>

          {LINK_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-white font-semibold text-sm mb-4">{col.heading}</h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-faint text-sm hover:text-white transition-colors block py-1.5"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="text-white font-semibold text-sm mb-4">Get in Touch</h3>
            <ContactForm />
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-faint text-sm">© 2026 Venuze. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Venuze on X"
              className="h-9 w-9 rounded-full border border-white/15 text-faint hover:text-white hover:border-white/40 inline-flex items-center justify-center transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.866L2.154 2.25H8.08l4.261 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Venuze on Facebook"
              className="h-9 w-9 rounded-full border border-white/15 text-faint hover:text-white hover:border-white/40 inline-flex items-center justify-center transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Venuze on Instagram"
              className="h-9 w-9 rounded-full border border-white/15 text-faint hover:text-white hover:border-white/40 inline-flex items-center justify-center transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
