import Image from "next/image";

export function VendorCtaBanner() {
  return (
    <section className="pb-0 lg:pb-6">
      <div className="relative">
        <div aria-hidden className="absolute inset-x-0 top-0 h-[53%] bg-surface-alt" />

        <div className="relative max-w-[1440px] mx-auto px-4 md:px-6 lg:px-[80px]">
          <div className="rounded-[20px] overflow-hidden bg-[linear-gradient(to_right,#ff786a,#ff4f37_50%,#ffc331)] grid md:grid-cols-2 items-center gap-5 md:gap-8 md:p-14">
            <div className="flex flex-col items-center text-center px-7 pt-9 md:p-0 md:items-start md:text-left">
              <h2 className="text-white font-semibold text-balance text-[24px] leading-[30px] md:text-[32px] md:leading-[38px] lg:text-[44px] lg:leading-[50px]">
                Grow Your Business with Venuze
              </h2>
              <p className="text-white font-medium mt-[10px] text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] lg:text-[20px] lg:leading-[30px]">
                Showcase your services to thousands of event organizers and creators searching for talent like yours.
              </p>
              <button
                type="button"
                className="mt-6 inline-flex items-center justify-center h-[50px] px-[37px] rounded-[10px] text-[20px] font-normal bg-black text-white hover:bg-black/85 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:opacity-50 disabled:pointer-events-none"
              >
                Join as a Vendor
              </button>
            </div>

            <div className="flex justify-center md:justify-end">
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
      </div>
    </section>
  );
}
