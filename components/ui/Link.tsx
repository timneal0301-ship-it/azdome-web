"use client";

// Drop-in replacement for `next/link` that auto-prefixes internal hrefs
// with the active locale segment. Anywhere a Link points at a normal
// internal route ("/", "/products/x", etc.) the wrapper expands it to
// "/<locale>/...". External URLs, mailto/tel, admin/api routes, and
// hrefs that already carry a locale prefix pass through untouched.
//
// Replacing imports of `next/link` with this module is the bulk of the
// URL-locale migration — every existing `<Link>` becomes locale-correct
// without code-level churn beyond the import path.

import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, type AnchorHTMLAttributes, type Ref } from "react";

import {
  DEFAULT_LOCALE,
  isNonLocalePath,
  splitLocaleFromPath,
} from "@/lib/i18n/url";

type LinkProps = Omit<NextLinkProps, "href"> &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string | NextLinkProps["href"];
  };

const Link = forwardRef(function LocaleLink(
  { href, ...rest }: LinkProps,
  ref: Ref<HTMLAnchorElement>,
) {
  // Hook must run unconditionally — even when href isn't a string we
  // still pay the cost of reading pathname (cheap; same render anyway).
  const pathname = usePathname();
  const { locale } = splitLocaleFromPath(pathname ?? "/");
  const activeLocale = locale ?? DEFAULT_LOCALE;

  if (typeof href !== "string") {
    // UrlObject form — leave it alone (consumer is being explicit).
    return <NextLink ref={ref} href={href as NextLinkProps["href"]} {...rest} />;
  }

  return (
    <NextLink ref={ref} href={prefixIfInternal(href, activeLocale)} {...rest} />
  );
});

export default Link;

function prefixIfInternal(href: string, locale: string): string {
  // External URLs and protocol-relative
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return href;
  if (href.startsWith("//")) return href;
  if (href.startsWith("#")) return href;
  // Internal routes only — relative paths are passed through (rare here)
  if (!href.startsWith("/")) return href;
  // Admin, API, and other locale-exempt prefixes stay raw
  if (isNonLocalePath(href)) return href;
  // Already locale-prefixed — don't double-prefix
  const { locale: hrefLocale } = splitLocaleFromPath(href);
  if (hrefLocale !== null) return href;
  // Plain internal route → prefix
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}
