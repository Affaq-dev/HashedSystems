import { NextResponse } from "next/server";

const REQRES_BASE = "https://reqres.in/api";

type ReqresError = {
  error?: string;
  message?: string;
};

export function reqresHeaders(): HeadersInit {
  const key = process.env.REQRES_API_KEY;
  return {
    "Content-Type": "application/json",
    ...(key ? { "x-api-key": key } : {}),
  };
}

export function reqresUrl(path: string): string {
  return `${REQRES_BASE}${path}`;
}

export function missingKeyResponse(): NextResponse | null {
  if (process.env.REQRES_API_KEY) return null;
  return NextResponse.json(
    { error: "Authentication is not configured. Set REQRES_API_KEY in .env.local." },
    { status: 500 },
  );
}

export async function forwardError(res: Response, fallback: string): Promise<NextResponse> {
  let message = fallback;
  try {
    const body = (await res.json()) as ReqresError;
    message = body.error ?? body.message ?? fallback;
  } catch {}
  return NextResponse.json({ error: message }, { status: res.status });
}
