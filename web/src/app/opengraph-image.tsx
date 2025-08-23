import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MeridianSolutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#0b0f16 0%,#070a0f 60%)",
          color: "#e6f1ff",
          fontSize: 72,
          fontWeight: 700,
        }}
      >
        MeridianSolutions
      </div>
    ),
    { ...size }
  );
}


