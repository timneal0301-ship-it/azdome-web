// Server-side locale resolution. Client-side LocaleProvider writes the
// current country code to a cookie on change; server pages read it here
// to pick the right dictionary defaults for SSR.

import "server-only";

import { cookies } from "next/headers";

import { LOCALES, type Locale } from "./dictionaries";
import { COUNTRIES, DEFAULT_COUNTRY_CODE } from "./regions";

/** Cookie name written by LocaleProvider on country change. */
export const COUNTRY_COOKIE = "azdome-country";

/** Read country code from cookie, with fallback to default. */
export function getCurrentCountry(): string {
  const code = cookies().get(COUNTRY_COOKIE)?.value;
  return code && COUNTRIES[code] ? code : DEFAULT_COUNTRY_CODE;
}

/** Read effective locale (derived from country) for server-side rendering. */
export function getCurrentLocale(): Locale {
  const country = getCurrentCountry();
  const entry = COUNTRIES[country] ?? COUNTRIES[DEFAULT_COUNTRY_CODE];
  return LOCALES.includes(entry.locale) ? entry.locale : "en";
}
