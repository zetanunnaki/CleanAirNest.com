import { ImageResponse } from "next/og";
import { getArticle, getArticleSlugs } from "@/lib/articles";

export const alt = "AirQualityNest Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export async function generateStaticParams() {
  return getArticleSlugs("guides").map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle("guides", slug);
  const title = article?.frontmatter.title ?? "Guide";
  const category = article?.frontmatter.category ?? "Air Quality";

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
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #312e81 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top section: badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#6366f1",
              color: "white",
              fontSize: 18,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "8px 20px",
              borderRadius: "9999px",
            }}
          >
            Guide
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(99, 102, 241, 0.2)",
              color: "#a5b4fc",
              fontSize: 16,
              fontWeight: 600,
              padding: "8px 20px",
              borderRadius: "9999px",
              border: "1px solid rgba(99, 102, 241, 0.3)",
            }}
          >
            {category}
          </div>
        </div>

        {/* Middle: Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? 42 : title.length > 40 ? 50 : 58,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: branding + decorative line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 800,
                color: "white",
              }}
            >
              A
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "rgba(255, 255, 255, 0.85)",
                letterSpacing: "-0.01em",
              }}
            >
              AirQualityNest
            </div>
          </div>
          <div
            style={{
              fontSize: 16,
              color: "rgba(255, 255, 255, 0.4)",
              fontWeight: 500,
            }}
          >
            airqualitynest.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
