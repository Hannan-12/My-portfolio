import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Muhammad Hannan Hafeez, Full Stack Developer";
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#0a0a0a", color: "#fff" }}>
        <div style={{ fontSize: 76, fontWeight: 700 }}>Muhammad Hannan Hafeez</div>
        <div style={{ fontSize: 40, marginTop: 20, color: "#a1a1aa" }}>Full Stack Developer</div>
      </div>
    ),
    size
  );
}
