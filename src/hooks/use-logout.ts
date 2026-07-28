"use client";

import { useRouter } from "next/navigation";
import { logout as logoutRequest } from "@/lib/auth-api";
import { useAuthStore } from "@/stores/auth-store";
import { useUiStore } from "@/stores/ui-store";

export function useLogout() {
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.logout);
  const pushToast = useUiStore((s) => s.pushToast);

  return async function logout() {
    await logoutRequest().catch(() => undefined);
    clearAuth();
    pushToast("success", "You have been logged out.");
    router.replace("/login");
    router.refresh();
  };
}
