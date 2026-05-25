import { notFound } from "next/navigation";

import { LOCALES } from "@/lib/i18n/dictionaries";
import { isValidLocale } from "@/lib/i18n/url";

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
