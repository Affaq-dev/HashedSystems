import { apiFetch } from "@/lib/api-client";
import type { AuthUser } from "@/types/user";

export interface LoginPayload {
  email: string;
  password: string;
}

export async function login(payload: LoginPayload): Promise<{ token: string }> {
  return apiFetch<{ token: string }>("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function logout(): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>("/api/auth/logout", { method: "POST" });
}

export async function fetchAuthUser(id: number): Promise<AuthUser> {
  return apiFetch<AuthUser>(`/api/auth/user?id=${id}`);
}
