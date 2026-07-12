import { ImageResponse } from "next/og";
import { brand } from "@/lib/constants";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F1EFEA",
          color: "#5D5E4D",
          padding: 72,
        }}
      >
        <div>
          <div style={{ fontSize: 118, fontWeight: 600 }}>{brand.name}</div>
          <div style={{ marginTop: 24, fontSize: 36 }}>
            Sepatu Wanita Premium Indonesia
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
