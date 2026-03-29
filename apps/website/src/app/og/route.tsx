import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0b0b0b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "white",
          fontSize: 64,
          fontWeight: 700,
        }}
      >
        <div style={{ fontSize: 36, opacity: 0.7 }}>
          GRIT DIGITAL PERFORMANCE
        </div>

        <div style={{ marginTop: 20 }}>
          High-Performance Websites
        </div>

        <div style={{ fontSize: 48 }}>
          for Sports Events
        </div>

        <div style={{ marginTop: 40, fontSize: 28, opacity: 0.7 }}>
          Event Registration • Athlete Platforms • Race Websites
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}