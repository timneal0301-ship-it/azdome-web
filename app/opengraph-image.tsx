import { ImageResponse } from "next/og";

export const alt = "AZDOME — Capture Every Detail, Day or Night";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
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
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "#0f172a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: "50%",
                  background: "#3b82f6",
                }}
              />
            </div>
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            AZDOME
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2.5,
          }}
        >
          Capture Every Detail,
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2.5,
            background:
              "linear-gradient(90deg, #ffffff 0%, #93c5fd 60%, #60a5fa 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Day or Night.
        </div>

        <div
          style={{
            marginTop: 32,
            fontSize: 26,
            fontWeight: 400,
            color: "#94a3b8",
            maxWidth: 800,
          }}
        >
          True 4K · Starvis 2 sensor · 5GHz WiFi · 24h parking mode
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
          <div>azdome.com</div>
          <div style={{ display: "flex", gap: 24 }}>
            <span>M550 Pro</span>
            <span>·</span>
            <span>$129.99</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
