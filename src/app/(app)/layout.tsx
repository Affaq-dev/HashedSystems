import { Navbar } from "@/components/layout/navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar variant="solid" />
      <main className="flex-1 pt-[72px] md:pt-[88px]">{children}</main>
    </>
  );
}
