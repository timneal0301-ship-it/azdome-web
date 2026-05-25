import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LOCALES } from "@/lib/i18n/dictionaries";
import { isValidLocale, LOCALE_OG } from "@/lib/i18n/url";

// Pre-render the locale tree for every supported locale at build time.
// Combined with `generateStaticParams` on nested dynamic segments
// (collections, products, scenarios), Next.js multiplies — so every
// product page exists at every locale URL.
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

// Mirror the root layout's force-dynamic so admin uploads in KV (catalog
// overlay, image overrides, content section edits) surface immediately on
// the public frontend instead of staying frozen at build-time snapshot.
export const dynamic = "force-dynamic";

/**
 * Locale-scoped Open Graph metadata. Sits between the root layout's
 * brand-wide OG block (site_name, type, image) and each page's
 * page-specific OG (title, description, alternates) — Next.js merges
 * left-to-right with child winning.
 *
 * Facebook / LinkedIn read these to render the right language preview
 * card. alternateLocale signals that the same content exists in every
 * other locale; the platforms will switch the preview if the viewer's
 * language matches one of them.
 */
export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isValidLocale(params.locale)) return {};
  const active = params.locale;
  return {
    openGraph: {
      locale: LOCALE_OG[active],
      alternateLocale: LOCALES.filter((l) => l !== active).map(
        (l) => LOCALE_OG[l],
      ),
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Defensive — middleware redirects unknown locales to the default, but
  // a direct hit on /xx/foo with an unsupported code should still 404
  // rather than silently rendering EN content under the wrong URL.
  if (!isValidLocale(params.locale)) notFound();
  return <>{children}</>;
}
