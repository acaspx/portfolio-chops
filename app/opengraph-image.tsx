import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Anton Castro · Product Designer & Design Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f5f0",
          color: "#16140f",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#76716a" }}>
          anton castro_
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 600, letterSpacing: -2 }}>
            Designs AI products
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 600, letterSpacing: -2 }}>
            that{" "}
            <span style={{ color: "#0e6f88", marginLeft: 18, marginRight: 18 }}>
              ship and scale.
            </span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#76716a" }}>
          Product Designer & Design Engineer · San Francisco · 0→1 four times across
          healthcare, fintech, and govtech AI
        </div>
      </div>
    ),
    { ...size }
  );
}
