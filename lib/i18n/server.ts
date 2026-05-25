// Server-side locale resolution. After the URL-locale migration the
// authoritative source is the path segment, which middleware decodes and
// forwards as the `x-locale` request header. The country cookie remains
// the legacy fallback (used by /admin/* and anywhere the middleware
// header isn't set).

import "server-only";

import { cookies, headers } from "next/headers";

import { LOCALES, type Locale } from "./dictionaries";
import { COUNTRIES, DEFAULT_COUNTRY_CODE } from "./regions";
import { isValidLocale } from "./url";

/** Cookie name written by LocaleProvider on country change. */
export const COUNTRY_COOKIE = "azdome-country";

/** Read country code from cookie, with fallback to default. */
export function getCurrentCountry(): string {
  const code = cookies().get(COUNTRY_COOKIE)?.value;
  return code && COUNTRIES[code] ? code : DEFAULT_COUNTRY_CODE;
}

/** Read effective locale for server-side rendering. */
export function getCurrentLocale(): Locale {
  // Middleware forwards the URL-derived locale here. Honor it first so
  // server components on /<locale>/* render in the right language even
  // when the country cookie is stale.
  const headerLocale = headers().get("x-locale");
  if (headerLocale && isValidLocale(headerLocale)) return headerLocale;

  // Legacy path — used on /admin/* (no locale segment) and during the
  // brief window before middleware runs (build-time SSG).
  const country = getCurrentCountry();
  const entry = COUNTRIES[country] ?? COUNTRIES[DEFAULT_COUNTRY_CODE];
  return LOCALES.includes(entry.locale) ? entry.locale : "en";
}
