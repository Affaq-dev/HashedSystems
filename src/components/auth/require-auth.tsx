"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

export function RequireAuth({ children }: { children: ReactNode }) {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }
    return useAuthStore.persist.onFinishHydration(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (!hydrated || token) return;
    const from = `${window.location.pathname}${window.location.search}`;
    router.replace(`/login?from=${encodeURIComponent(from)}`);
  }, [hydrated, token, router]);

  if (!hydrated || !token) return null;

  return <>{children}</>;
}
