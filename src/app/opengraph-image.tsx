import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Growtify.ai — AI ile İşini Büyüten Profesyonellerin Platformu";
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
          backgroundColor: "#0f172a",
          backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "#ffffff",
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <span>Growtify</span>
            <span style={{ color: "#3b82f6", marginLeft: 4 }}>.ai</span>
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#94a3b8",
              marginTop: 20,
              textAlign: "center",
              maxWidth: 800,
            }}
          >
            AI ile İşini Büyüten Profesyonellerin Platformu
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 40,
            }}
          >
            {["G", "R", "O", "W", "T"].map((letter, i) => (
              <div
                key={letter}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#ffffff",
                  backgroundColor: ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"][i],
                }}
              >
                {letter}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
