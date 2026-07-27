import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/layout/logo";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Log in — Venuze",
};

export default function LoginPage() {
  return (
    <main className="relative min-h-svh flex items-center justify-center p-4">
      <Image
        src="/hero/hero-1.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md bg-surface rounded-card shadow-float p-8">
        <div className="flex justify-center">
          <Logo withWordmark />
        </div>
        <h1 className="text-2xl font-extrabold text-center mt-4 text-foreground">
          Welcome back
        </h1>
        <p className="text-muted text-sm text-center mt-1">
          Log in to manage your bookings and listings.
        </p>
        <div className="mt-6">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
