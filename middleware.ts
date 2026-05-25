import { NextResponse, type NextRequest } from "next/server";

import { COOKIE as ADMIN_COOKIE, verifyToken as verifyAdminToken } from "@/lib/admin-auth";
import { USER_COOKIE, readSessionEmail } from "@/lib/auth";
import {
  DEFAULT_LOCALE,
  isNonLocalePath,
  pickLocaleFromAcceptLanguage,
  splitLocaleFromPath,
  withLocale,
} from "@/lib/i18n/url";

const ADMIN_PUBLIC_PATHS = new Set(["/admin/login"]);
// Account auth-gate must run *after* locale resolution because account
// routes now live under /<locale>/account/*. The set holds the suffix
// (everything past the locale prefix) that is allowed without a session.
const ACCOUNT_PUBLIC_SUFFIXES = new Set(["/account/login", "/account/signup"]);

const LOCALE_COOKIE = "azdome-locale";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Admin guard (no locale segment) ─────────────────────────────────
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (ADMIN_PUBLIC_PATHS.has(pathname)) return NextResponse.next();
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    if (await verifyAdminToken(token)) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // ── Skip API + Next.js internals (matcher already excludes most). ───
  if (isNonLocalePath(pathname)) return NextResponse.next();

  // ── Locale resolution ──────────────────────────────────────────────
  const { locale: urlLocale, rest } = splitLocaleFromPath(pathname);

  if (urlLocale === null) {
    // No locale prefix → pick one and redirect. Prefer the user's saved
    // locale cookie (set on previous visits or via the LanguageSwitcher);
    // fall back to Accept-Language; fall back to DEFAULT_LOCALE.
    const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value;
    const detected =
      cookieLocale && cookieLocale.length === 2
        ? cookieLocale
        : pickLocaleFromAcceptLanguage(req.headers.get("accept-language"));
    const url = req.nextUrl.clone();
    url.pathname = withLocale(rest, detected as never);
    return NextResponse.redirect(url, { status: 308 });
  }

  // ── Account guard (now lives under /<locale>/account/*) ────────────
  if (rest === "/account" || rest.startsWith("/account/")) {
    if (!ACCOUNT_PUBLIC_SUFFIXES.has(rest)) {
      const token = req.cookies.get(USER_COOKIE)?.value;
      const email = await readSessionEmail(token);
      if (!email) {
        const url = req.nextUrl.clone();
        url.pathname = `/${urlLocale}/account/login`;
        url.searchParams.set("next", pathname);
        return NextResponse.redirect(url);
      }
    }
  }

  // ── Forward locale to server components via header ─────────────────
  // app/layout.tsx reads "x-locale" to set <html lang> + dir;
  // lib/i18n/server.getCurrentLocale prefers it over the legacy cookie.
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-locale", urlLocale);

  const res = NextResponse.next({ request: { headers: requestHeaders } });
  // Persist locale choice so subsequent no-prefix visits skip detection.
  if (req.cookies.get(LOCALE_COOKIE)?.value !== urlLocale) {
    res.cookies.set(LOCALE_COOKIE, urlLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }
  return res;
}

export const config = {
  // Match everything except Next.js internals and static assets. The
  // handler itself decides whether to apply locale routing or auth
  // guards (or both) based on the path.
  matcher: [
    "/((?!_next/static|_next/image|_next/data|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js)).*)",
  ],
};
