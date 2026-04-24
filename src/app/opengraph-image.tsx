import { ImageResponse } from "next/og";

export const alt = "AirQualityNest - Expert Air Quality Reviews & Guides";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #312e81 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #0d9488, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 800,
              color: "white",
            }}
          >
            A
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "rgba(255, 255, 255, 0.9)",
              letterSpacing: "-0.01em",
            }}
          >
            AirQualityNest
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 62,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: "900px",
            }}
          >
            Expert Air Quality
          </div>
          <div
            style={{
              fontSize: 62,
              fontWeight: 800,
              color: "#0d9488",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Reviews & Guides
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 300,
              color: "#94a3b8",
              marginTop: "8px",
            }}
          >
            Expert reviews of air purifiers, monitors, humidifiers &
            dehumidifiers
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#0d9488",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
            }}
          >
            AIRQUALITYNEST.COM
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
