import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#16140f",
          borderRadius: 8,
        }}
      >
        <svg viewBox="0 0 100 100" width="28" height="28">
          <circle cx="50" cy="50" r="46" fill="#ffffff" />
          <path
            d="M30 39 c 3 10, 15 10, 18 0"
            fill="none"
            stroke="#2b2b2b"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M62 43 c 2.5 8, 12 8, 14.5 -1"
            fill="none"
            stroke="#2b2b2b"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M44 62 c 3.5 7, 13 7, 16.5 0"
            fill="none"
            stroke="#2b2b2b"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
