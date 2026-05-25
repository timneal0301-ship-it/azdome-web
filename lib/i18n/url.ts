// URL-based locale routing utilities.
//
// The site historically routed all locales through a single URL space and
// resolved the active locale from the `azdome-country` cookie. That's fine
// for in-app navigation but invisible to search engines: Google sees the
// same URL serving 15 languages and dedupes them as one page.
//
// This module is the centerpiece of the migration to URL-segmented locales
// (e.g. `/zh/products/m550-pro`). Importers should NOT touch
// `lib/i18n/server` directly anymore for routing decisions — use the
// helpers here to parse and emit locale-aware paths consistently.

import { LOCALES, type Locale } from "./dictionaries";

export const DEFAULT_LOCALE: Locale = "en";

/** Paths that bypass locale routing entirely (admin, API, static metadata). */
const NON_LOCALE_PREFIXES = ["/admin", "/api"] as const;

export function isNonLocalePath(pathname: string): boolean {
  return NON_LOCALE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function isValidLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Split a pathname into its locale prefix (if any) and the remainder.
 * `pathname` must start with "/".
 *
 *   "/zh/products/x" → { locale: "zh", rest: "/products/x" }
 *   "/products/x"    → { locale: null, rest: "/products/x" }
 *   "/en"            → { locale: "en", rest: "/" }
 */
export function splitLocaleFromPath(
  pathname: string,
): { locale: Locale | null; rest: string } {
  const match = pathname.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)(\/.*|$)/);
  if (!match) return { locale: null, rest: pathname };
  const candidate = match[1];
  if (!isValidLocale(candidate)) return { locale: null, rest: pathname };
  return { locale: candidate, rest: match[2] || "/" };
}

/** Build a locale-prefixed path. Idempotent — re-prefixing is a no-op. */
export function withLocale(pathname: string, locale: Locale): string {
  if (isNonLocalePath(pathname)) return pathname;
  const { rest } = splitLocaleFromPath(pathname);
  const trimmed = rest === "/" ? "" : rest;
  return `/${locale}${trimmed}` || `/${locale}`;
}

/** Strip locale prefix if present; returns the canonical "language-free" path. */
export function withoutLocale(pathname: string): string {
  const { rest } = splitLocaleFromPath(pathname);
  return rest;
}

/**
 * Pick the best locale from an Accept-Language header. Falls back to
 * DEFAULT_LOCALE when no listed locale is supported.
 *
 * The header format is roughly: "zh-CN,zh;q=0.9,en;q=0.8". We split,
 * normalise (drop the region suffix when the bare language is in LOCALES,
 * e.g. "zh-CN" → "zh"), and return the first supported entry.
 */
export function pickLocaleFromAcceptLanguage(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;
  const candidates = header
    .split(",")
    .map((part) => part.trim().split(";")[0].toLowerCase())
    .filter(Boolean);
  for (const c of candidates) {
    if (isValidLocale(c)) return c;
    const bare = c.split("-")[0];
    if (isValidLocale(bare)) return bare;
  }
  return DEFAULT_LOCALE;
}

/** BCP-47 lang attribute per locale, used for <html lang="..."> and hreflang. */
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
  ja: "ja",
  de: "de",
  fr: "fr",
  es: "es",
  it: "it-IT",
  ru: "ru-RU",
  pl: "pl-PL",
  ro: "ro-RO",
  tr: "tr-TR",
  pt: "pt-BR",
  ar: "ar-SA",
  th: "th-TH",
  vi: "vi-VN",
};

/**
 * Open Graph locale code (underscore-separated, region-suffixed). OG uses
 * its own format that differs from BCP-47 hreflang: en_US, not en-US;
 * always region-qualified. Facebook / Twitter / LinkedIn consume this to
 * pick the right preview locale.
 */
export const LOCALE_OG: Record<Locale, string> = {
  en: "en_US",
  zh: "zh_CN",
  ja: "ja_JP",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
  it: "it_IT",
  ru: "ru_RU",
  pl: "pl_PL",
  ro: "ro_RO",
  tr: "tr_TR",
  pt: "pt_BR",
  ar: "ar_SA",
  th: "th_TH",
  vi: "vi_VN",
};

/** RTL locales — need dir="rtl" on <html>. */
export const RTL_LOCALES: ReadonlySet<Locale> = new Set<Locale>(["ar"]);

export function isRtlLocale(locale: Locale): boolean {
  return RTL_LOCALES.has(locale);
}

/**
 * Build a `Metadata.alternates` block (canonical + languages map) for a
 * given locale + locale-free path. Mount into generateMetadata so each
 * page emits its own <link rel="alternate" hreflang="..."> set on top of
 * the symmetric sitemap signals.
 *
 *   buildPathAlternates("en", "/products/m550-pro")
 *   → { canonical: "/en/products/m550-pro",
 *       languages: { en: "/en/products/m550-pro", zh: "/zh/...", ..., x-default: "/en/..." } }
 */
export function buildPathAlternates(
  activeLocale: Locale,
  pathSansLocale: string,
): { canonical: string; languages: Record<string, string> } {
  const seg = pathSansLocale === "/" ? "" : pathSansLocale;
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `/${l}${seg}`;
  }
  languages["x-default"] = `/${DEFAULT_LOCALE}${seg}`;
  return {
    canonical: `/${activeLocale}${seg}`,
    languages,
  };
}
