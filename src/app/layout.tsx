import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { ToastViewport } from "@/components/ui/toast-viewport";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Venuze — Celebrate in venues big and small",
  description: "Book the perfect venue and the pros who make it shine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          {children}
          <ToastViewport />
        </QueryProvider>
      </body>
    </html>
  );
}
