import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("venuze_token")?.value;
  const { pathname } = request.nextUrl;

  if (!token && pathname.startsWith("/search")) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname + request.nextUrl.search);
    return NextResponse.redirect(url);
  }

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/search", request.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/search/:path*", "/login"] };
