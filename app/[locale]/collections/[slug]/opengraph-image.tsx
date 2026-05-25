import { ImageResponse } from "next/og";

import { getCollection } from "@/lib/products";

export const alt = "AZDOME — Collection";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Per-collection 1200×630 OG card. Reads title + description from the
// (auto-derived) COLLECTIONS list so single-channel, dual-channel,
// three-channel, four-channel, accessories, and feature pivots each get
// their own social preview without manual asset creation.
export default function CollectionOG({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const collection = getCollection(params.slug);
  const title = collection?.title ?? "Dash Cams";
  const description =
    collection?.description ??
    "Premium dash cams engineered for clarity on every drive.";

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
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -1 }}>
            AZDOME
          </div>
          <div
            style={{
              marginLeft: "auto",
              padding: "8px 16px",
              borderRadius: 999,
              background: "rgba(59, 130, 246, 0.18)",
              color: "#93c5fd",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Collection
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 76,
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
            {title}
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#cbd5e1",
              maxWidth: 920,
              lineHeight: 1.4,
            }}
          >
            {description.length > 180
              ? `${description.slice(0, 177)}…`
              : description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 56,
            fontSize: 18,
            color: "#64748b",
          }}
        >
          <div>azdome.com/collections/{collection?.slug ?? params.slug}</div>
          <div>{collection?.productSlugs.length ?? 0} products</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
