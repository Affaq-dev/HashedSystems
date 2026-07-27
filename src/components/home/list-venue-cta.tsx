import Image from "next/image";

export function ListVenueCta() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="rounded-card overflow-hidden bg-gradient-to-r from-primary to-accent p-8 md:p-14 grid md:grid-cols-2 items-center gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight text-balance">
              Turn Your Venue into a Destination
            </h2>
            <p className="text-white/85 mt-4 leading-relaxed">
              List your space on Venuze and unlock new revenue opportunities. Reach clients looking
              for venues just like yours.
            </p>
            <button
              type="button"
              className="mt-6 h-12 px-8 rounded-full bg-black text-white font-semibold hover:bg-black/85 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              List Your Venue
            </button>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-[420px] aspect-[4/3]">
              <Image
                src="/images/cta-stage.png"
                alt="Stage illustration"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
