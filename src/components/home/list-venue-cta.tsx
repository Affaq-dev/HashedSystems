import Image from "next/image";

export function ListVenueCta() {
  return (
    <section className="relative z-10 pt-12 md:pt-20 -mb-[40px] md:-mb-[70px]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-[80px]">
        <div className="relative overflow-hidden rounded-[24px] md:rounded-[48px] bg-[linear-gradient(to_right,#ff786a,#ff5037_50%,#ffc331)] flex flex-col items-center px-6 pt-10 md:flex-row md:items-center md:px-0 md:pt-0 md:h-[300px]">
          <div className="flex flex-col gap-[20px] items-center text-center md:items-start md:text-left md:pl-[81px] md:max-w-[726px]">
            <div className="flex flex-col gap-[10px] text-white">
              <h2 className="text-[30px] leading-[38px] md:text-[44px] md:leading-[50px] font-semibold">
                Turn Your Venue into a Destination
              </h2>
              <p className="text-[16px] leading-[26px] md:text-[20px] md:leading-[30px] font-medium">
                List your space on Venuze and unlock new revenue opportunities. Reach clients
                looking for venues just like yours.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center h-[50px] px-[37px] rounded-[10px] bg-black text-white text-[20px] font-normal hover:bg-black/85 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              List Your Venue
            </button>
          </div>

          <div className="relative mt-8 w-[240px] h-[150px] md:hidden">
            <Image
              src="/images/cta-stage.png"
              alt="Stage illustration"
              fill
              className="object-contain object-bottom"
              sizes="240px"
            />
          </div>

          <svg
            width="196"
            height="57"
            viewBox="0 0 196 57"
            fill="none"
            aria-hidden="true"
            className="hidden xl:block absolute right-[473px] top-[207px] text-white/95"
          >
            <path
              d="M190 5C158 44 88 55 12 39"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="8 9"
            />
            <path
              d="M22 29L10 38.5L24 46"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="hidden md:block absolute right-[82px] top-[76px] w-[327px] h-[224px]">
            <Image
              src="/images/cta-stage.png"
              alt="Stage illustration"
              fill
              className="object-contain"
              sizes="327px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
