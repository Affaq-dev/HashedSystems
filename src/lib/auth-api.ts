import { ApiError } from "@/lib/api-client";
import type { AuthUser } from "@/types/user";

const REQRES_BASE = "https://reqres.in/api";

const SHARED_HEADERS = {
  "Content-Type": "application/json",
  "x-api-key": process.env.NEXT_PUBLIC_REQRES_API_KEY ?? "",
};

export interface LoginPayload {
  email: string;
  password: string;
}

export async function login(payload: LoginPayload): Promise<{ token: string }> {
  const res = await fetch(`${REQRES_BASE}/login`, {
    method: "POST",
    headers: SHARED_HEADERS,
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let message = "Login failed";
    try {
      const body = (await res.json()) as { error?: string };
      if (body.error) message = body.error;
    } catch {}
    throw new ApiError(res.status, message);
  }
  return res.json() as Promise<{ token: string }>;
}

export async function fetchAuthUser(id: number): Promise<AuthUser> {
  const res = await fetch(`${REQRES_BASE}/users/${id}`, {
    headers: SHARED_HEADERS,
  });
  if (!res.ok) {
    throw new ApiError(res.status, "Failed to fetch user");
  }
  const body = (await res.json()) as {
    data: { first_name: string; last_name: string; avatar: string };
  };
  return {
    firstName: body.data.first_name,
    lastName: body.data.last_name,
    avatar: body.data.avatar,
  };
}
