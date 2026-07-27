import Image from "next/image";

export function VendorCtaBanner() {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="rounded-card overflow-hidden bg-gradient-to-r from-primary to-accent p-8 md:p-14 grid md:grid-cols-2 items-center gap-8">
          <div>
            <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight text-balance">
              Grow Your Business with Venuze
            </h2>
            <p className="text-white/85 mt-4 leading-relaxed">
              Showcase your services to thousands of event organizers and creators searching for talent like yours.
            </p>
            <button
              type="button"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors h-12 px-8 text-base bg-black text-white hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-50 disabled:pointer-events-none"
            >
              Join as a Vendor
            </button>
          </div>

          <div className="hidden md:flex justify-center md:justify-end">
            <Image
              src="/images/banner-vendors.png"
              alt="Vendor illustration"
              width={520}
              height={241}
              className="object-contain w-full max-w-[520px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
