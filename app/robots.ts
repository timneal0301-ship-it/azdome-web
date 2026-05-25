import type { MetadataRoute } from "next";

const SITE = "https://azdome.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Admin and authed user surfaces aren't useful in search indexes
        // and may leak token-protected URLs into logs.
        disallow: ["/admin/", "/account/", "/api/", "/cart", "/checkout"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
