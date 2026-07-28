import { NextResponse } from "next/server";
import { z } from "zod";
import { forwardError, missingKeyResponse, reqresHeaders, reqresUrl } from "@/lib/reqres";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email and password" }, { status: 400 });
  }

  const notConfigured = missingKeyResponse();
  if (notConfigured) return notConfigured;

  const res = await fetch(reqresUrl("/login"), {
    method: "POST",
    headers: reqresHeaders(),
    body: JSON.stringify(parsed.data),
    cache: "no-store",
  });

  if (!res.ok) return forwardError(res, "Login failed");

  const body = (await res.json()) as { token?: string };
  if (!body.token) {
    return NextResponse.json({ error: "Login failed" }, { status: 502 });
  }

  return NextResponse.json({ token: body.token });
}
