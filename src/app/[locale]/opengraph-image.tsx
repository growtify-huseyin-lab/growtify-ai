import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Growtify.ai — Yapay Zeka ile İşini Büyüten Profesyonellerin Platformu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f0f13",
          backgroundImage:
            "radial-gradient(circle at 30% 40%, rgba(93,71,240,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(6,182,212,0.1) 0%, transparent 50%)",
        }}
      >
        {/* Logo text */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 4,
          }}
        >
          <span
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: -3,
            }}
          >
            growtify
          </span>
          {/* Gradient dot */}
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8B5CF6, #06B6D4)",
              marginBottom: 8,
            }}
          />
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            color: "#9090a0",
            marginTop: 24,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Yapay zeka ile işini büyüten profesyonellerin platformu
        </div>

        {/* GROWT letters */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 48,
          }}
        >
          {["G", "R", "O", "W", "T"].map((letter, i) => (
            <div
              key={letter}
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 800,
                color: "#ffffff",
                backgroundColor: [
                  "#EF4444",
                  "#F97316",
                  "#EAB308",
                  "#22C55E",
                  "#5d47f0",
                ][i],
              }}
            >
              {letter}
            </div>
          ))}
        </div>

        {/* Badge */}
        <div
          style={{
            marginTop: 32,
            padding: "8px 24px",
            borderRadius: 20,
            backgroundColor: "rgba(93,71,240,0.15)",
            color: "#9886fe",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          GROWT Method™ ile 5 Seviyede Dönüşüm
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            fontSize: 16,
            color: "#4a4a5a",
          }}
        >
          growtify.ai
        </div>
      </div>
    ),
    { ...size },
  );
}
