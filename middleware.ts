import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (host === "www.ventriq.io") {
    const url = new URL(request.url);
    url.host = "ventriq.io";
    return NextResponse.redirect(url, 301);
  }
  // /about removed for v1 (D21 — Justin's bandwidth; phase-2 rebuild agreed).
  // 301 because the URL was live, sitemapped and possibly crawled for 6 days.
  if (request.nextUrl.pathname === "/about") {
    const url = new URL(request.url);
    url.pathname = "/";
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico).*)"],
};
