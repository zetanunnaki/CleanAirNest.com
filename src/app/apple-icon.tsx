import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#6366f1",
          borderRadius: "40px",
        }}
      >
        <svg
          width="120"
          height="140"
          viewBox="0 0 120 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M60 5C52.5 5 45 12 40 22C30 42 33 62 40 78C47 94 55 106 60 125C65 106 73 94 80 78C87 62 90 42 80 22C75 12 67.5 5 60 5Z"
            fill="white"
            opacity="0.95"
          />
          <path
            d="M60 30C55 30 50 35 47 42C42 52 44 62 48 70C52 78 56 84 60 95C64 84 68 78 72 70C76 62 78 52 73 42C70 35 65 30 60 30Z"
            fill="#6366f1"
            opacity="0.35"
          />
          <path
            d="M30 68C38 62 48 64 56 72"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M90 68C82 62 72 64 64 72"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
