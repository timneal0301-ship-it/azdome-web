import { NextResponse, type NextRequest } from "next/server";

import { COOKIE as ADMIN_COOKIE, verifyToken as verifyAdminToken } from "@/lib/admin-auth";
import { USER_COOKIE, readSessionEmail } from "@/lib/auth";

const ADMIN_PUBLIC_PATHS = new Set(["/admin/login"]);
const ACCOUNT_PUBLIC_PATHS = new Set(["/account/login", "/account/signup"]);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Admin guard ──────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    if (ADMIN_PUBLIC_PATHS.has(pathname)) return NextResponse.next();
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    if (await verifyAdminToken(token)) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // ── User-account guard ───────────────────────────────────────────
  if (pathname.startsWith("/account")) {
    if (ACCOUNT_PUBLIC_PATHS.has(pathname)) return NextResponse.next();
    const token = req.cookies.get(USER_COOKIE)?.value;
    const email = await readSessionEmail(token);
    if (email) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.pathname = "/account/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
