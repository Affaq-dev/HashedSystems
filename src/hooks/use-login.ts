"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiError } from "@/lib/api-client";
import { login, fetchAuthUser, type LoginPayload } from "@/lib/auth-api";
import { useAuthStore } from "@/stores/auth-store";
import { useUiStore } from "@/stores/ui-store";

function safeRedirect(target: string | null): string {
  if (!target || !target.startsWith("/") || target.startsWith("//") || target.startsWith("/\\")) {
    return "/search";
  }
  return target;
}

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const setAuth = useAuthStore((s) => s.setAuth);
  const pushToast = useUiStore((s) => s.pushToast);

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: async ({ token }) => {
      let user;
      try {
        user = await fetchAuthUser(4);
      } catch {
        user = { firstName: "Eve", lastName: "Holt", avatar: "" };
      }
      setAuth(token, user);
      pushToast("success", `Welcome back, ${user.firstName}!`);
      router.replace(safeRedirect(from));
      router.refresh();
    },
    onError: (err) => {
      const message =
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again.";
      pushToast("error", message);
    },
  });
}
