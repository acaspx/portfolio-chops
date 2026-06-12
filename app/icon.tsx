import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// The asterisk mark, dense state: the site's brand chrome.
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
        <svg viewBox="0 0 100 100" width="24" height="24">
          {[0, 30, 60, 90, 120, 150].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const r = 38;
            return (
              <line
                key={deg}
                x1={50 - r * Math.cos(rad)}
                y1={50 - r * Math.sin(rad)}
                x2={50 + r * Math.cos(rad)}
                y2={50 + r * Math.sin(rad)}
                stroke="#f7f5f0"
                strokeWidth="9"
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      </div>
    ),
    { ...size }
  );
}
