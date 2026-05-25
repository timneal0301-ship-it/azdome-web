import { ImageResponse } from "next/og";

import { getProductWithOverlay } from "@/lib/products-server";
import { isValidLocale } from "@/lib/i18n/url";

export const alt = "AZDOME — Product";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dynamic per-product OG card. Next.js calls this with the same params as
// the page, caches the response, and Next-injects the right <meta
// property="og:image"> tag into the rendered HTML. We can't import Tailwind
// here — ImageResponse renders via @vercel/og and only understands inline
// styles + a tight subset of CSS.
export default async function ProductOG({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  // Guard — if the slug doesn't match a real product, fall back to brand
  // card. Returning null breaks Next's metadata pipeline, so always emit
  // something renderable.
  const product = await getProductWithOverlay(params.slug);
  const locale = isValidLocale(params.locale) ? params.locale : "en";
  const name = product?.name ?? "AZDOME";
  const short = product?.short ?? "AZDOME";
  const tagline = product?.tagline ?? "Premium dash cams";
  const price = product ? `$${product.price.toFixed(2)}` : "";
  const compare =
    product?.comparePrice && product.comparePrice > product.price
      ? `$${product.comparePrice.toFixed(2)}`
      : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #020617 0%, #0f172a 55%, #1e293b 100%)",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "#0f172a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: "#3b82f6",
                }}
              />
            </div>
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            AZDOME
          </div>
          <div
            style={{
              marginLeft: "auto",
              fontSize: 16,
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {locale.toUpperCase()}
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "#94a3b8",
              letterSpacing: -0.5,
            }}
          >
            {short}
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              background:
                "linear-gradient(90deg, #ffffff 0%, #93c5fd 60%, #60a5fa 100%)",
              backgroundClip: "text",
              color: "transparent",
              maxWidth: 1040,
            }}
          >
            {name}
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 22,
              fontWeight: 400,
              color: "#cbd5e1",
              maxWidth: 920,
            }}
          >
            {tagline}
          </div>
        </div>

        {/* Footer row — price + domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: 56,
            fontSize: 18,
            color: "#64748b",
          }}
        >
          <div>azdome.com</div>
          {price && (
            <div style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
              {compare && (
                <span
                  style={{
                    color: "#475569",
                    textDecoration: "line-through",
                    fontSize: 22,
                  }}
                >
                  {compare}
                </span>
              )}
              <span
                style={{
                  color: "#ffffff",
                  fontSize: 36,
                  fontWeight: 800,
                  letterSpacing: -1,
                }}
              >
                {price}
              </span>
            </div>
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
