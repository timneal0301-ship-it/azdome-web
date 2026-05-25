import { ImageResponse } from "next/og";

export const alt = "About AZDOME — Engineered in California, built in Shenzhen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Static About-page OG card. Keeps the brand-narrative claim visible
// when someone shares the company-story page (press hits, partnership
// pitches, employee-recruiting threads).
export default function AboutOG() {
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
            About
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
              fontSize: 32,
              fontWeight: 500,
              color: "#94a3b8",
              letterSpacing: -0.5,
            }}
          >
            Since 2014
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -3,
              maxWidth: 1040,
            }}
          >
            Engineered in California,
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -3,
              background:
                "linear-gradient(90deg, #ffffff 0%, #93c5fd 60%, #60a5fa 100%)",
              backgroundClip: "text",
              color: "transparent",
              maxWidth: 1040,
            }}
          >
            built in Shenzhen.
          </div>
        </div>

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
          <div>azdome.com/about</div>
          <div style={{ display: "flex", gap: 24 }}>
            <span>200K+ drivers · 60+ countries</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
