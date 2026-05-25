import type { MetadataRoute } from "next";

import { LOCALES } from "@/lib/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/lib/i18n/url";
import { COLLECTIONS, PRODUCTS, SCENARIOS } from "@/lib/products";

const SITE = "https://azdome.com";

// Static top-level routes. Keep this list in sync with app/<dir>/page.tsx
// additions — there's no way to enumerate routes at build time short of
// crawling the filesystem.
const STATIC_PATHS: {
  path: string;
  priority: number;
  freq: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1.0, freq: "weekly" },
  { path: "/about", priority: 0.7, freq: "monthly" },
  { path: "/app", priority: 0.6, freq: "monthly" },
  { path: "/where-to-buy", priority: 0.8, freq: "weekly" },
  { path: "/buying-guide", priority: 0.7, freq: "monthly" },
  { path: "/support", priority: 0.6, freq: "weekly" },
  { path: "/support/contact", priority: 0.5, freq: "monthly" },
  { path: "/support/firmware", priority: 0.5, freq: "weekly" },
  { path: "/support/manuals", priority: 0.5, freq: "weekly" },
  { path: "/support/install", priority: 0.5, freq: "monthly" },
  { path: "/support/troubleshoot", priority: 0.4, freq: "monthly" },
  { path: "/careers", priority: 0.3, freq: "monthly" },
  { path: "/press", priority: 0.3, freq: "monthly" },
  { path: "/wholesale", priority: 0.4, freq: "monthly" },
  { path: "/affiliate", priority: 0.4, freq: "monthly" },
  { path: "/gift-cards", priority: 0.4, freq: "monthly" },
  { path: "/legal/privacy", priority: 0.2, freq: "yearly" },
  { path: "/legal/terms", priority: 0.2, freq: "yearly" },
  { path: "/legal/warranty", priority: 0.3, freq: "yearly" },
];

// Build the hreflang alternates map for a path (path without locale prefix).
// Defaults to using each locale's prefixed URL. Google reads this off the
// `xhtml:link rel="alternate"` entries Next.js emits from `alternates`.
function buildAlternates(pathSansLocale: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of LOCALES) {
    out[l] = `${SITE}/${l}${pathSansLocale === "/" ? "" : pathSansLocale}`;
  }
  // x-default points search engines at the canonical version for users
  // whose Accept-Language doesn't match any specific locale.
  out["x-default"] = `${SITE}/${DEFAULT_LOCALE}${pathSansLocale === "/" ? "" : pathSansLocale}`;
  return out;
}

function entryFor(
  pathSansLocale: string,
  priority: number,
  freq: MetadataRoute.Sitemap[number]["changeFrequency"],
  now: Date,
): MetadataRoute.Sitemap {
  const alternates = buildAlternates(pathSansLocale);
  // Emit one entry per locale; each carries the full alternates map so
  // crawlers see the symmetric hreflang graph required by Google.
  return LOCALES.map((l) => ({
    url: `${SITE}/${l}${pathSansLocale === "/" ? "" : pathSansLocale}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
    alternates: { languages: alternates },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...STATIC_PATHS.flatMap(({ path, priority, freq }) =>
      entryFor(path, priority, freq, now),
    ),
    ...COLLECTIONS.flatMap((c) =>
      entryFor(`/collections/${c.slug}`, 0.7, "weekly", now),
    ),
    ...PRODUCTS.filter((p) => !p.hidden).flatMap((p) =>
      entryFor(`/products/${p.slug}`, 0.9, "weekly", now),
    ),
    ...SCENARIOS.flatMap((s) =>
      entryFor(`/scenarios/${s.slug}`, 0.5, "monthly", now),
    ),
  ];
}
