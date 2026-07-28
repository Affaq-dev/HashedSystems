import { NextResponse } from "next/server";
import { z } from "zod";
import { forwardError, missingKeyResponse, reqresHeaders, reqresUrl } from "@/lib/reqres";

const idSchema = z.coerce.number().int().positive();

export async function GET(request: Request) {
  const parsed = idSchema.safeParse(new URL(request.url).searchParams.get("id"));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  const notConfigured = missingKeyResponse();
  if (notConfigured) return notConfigured;

  const res = await fetch(reqresUrl(`/users/${parsed.data}`), {
    headers: reqresHeaders(),
    cache: "no-store",
  });

  if (!res.ok) return forwardError(res, "Failed to fetch user");

  const body = (await res.json()) as {
    data?: { first_name?: string; last_name?: string; avatar?: string };
  };

  return NextResponse.json({
    firstName: body.data?.first_name ?? "",
    lastName: body.data?.last_name ?? "",
    avatar: body.data?.avatar ?? "",
  });
}
