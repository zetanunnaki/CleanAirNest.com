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
          background: "linear-gradient(135deg, #0d9488, #06b6d4)",
          borderRadius: "40px",
        }}
      >
        <svg
          width="110"
          height="110"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 13.5C5 13.5 9.5 8.5 16 8.5C22.5 8.5 26 13 26 13"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            opacity="0.95"
          />
          <path
            d="M3 18.5C3 18.5 8.5 13 16.5 13C24.5 13 28 18 28 18"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M6 23C6 23 10.5 18.5 17 18.5C23.5 18.5 27 22.5 27 22.5"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            opacity="0.45"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
