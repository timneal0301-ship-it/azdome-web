import type { MetadataRoute } from "next";

import { COLLECTIONS, PRODUCTS, SCENARIOS } from "@/lib/products";

const SITE = "https://azdome.com";

// Static top-level routes. Keep this list in sync with app/<dir>/page.tsx
// additions — there's no way to enumerate routes at build time short of
// crawling the filesystem.
const STATIC_PATHS: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...STATIC_PATHS.map(({ path, priority, freq }) => ({
      url: `${SITE}${path}`,
      lastModified: now,
      changeFrequency: freq,
      priority,
    })),
    ...COLLECTIONS.map((c) => ({
      url: `${SITE}/collections/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...PRODUCTS.filter((p) => !p.hidden).map((p) => ({
      url: `${SITE}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...SCENARIOS.map((s) => ({
      url: `${SITE}/scenarios/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
