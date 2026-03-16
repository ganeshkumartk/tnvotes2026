import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";

export const alt = "தேர்வு 2026 — Vote the policy. Not the flag. Civic awareness tool for Tamil Nadu Assembly Elections.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Tamil text rendered as image (canvas + Noto Sans Tamil) for crisp OG preview.
// Run: node scripts/generate-og-tamil.mjs to regenerate.
const tamilPng = readFileSync(join(process.cwd(), "public/og-tamil-2026.png"));
const tamilDataUrl = `data:image/png;base64,${tamilPng.toString("base64")}`;

export default async function Image() {
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
          background: "#FAD949",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Soft dot-grid texture to match site background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(17,17,17,0.2) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.25,
          }}
        />

        {/* Brand strip */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 48,
            display: "flex",
            alignItems: "center",
            gap: 14,
            border: "3px solid #111111",
            padding: "10px 16px",
            background: "rgba(250,217,73,0.92)",
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: "0.16em", color: "#111111" }}>NAMMA VOTE</span>
          <span style={{ fontSize: 18, color: "rgba(17,17,17,0.7)" }}>2026</span>
        </div>

        {/* Main tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            border: "4px solid #111111",
            padding: "34px 44px",
            background: "rgba(250,217,73,0.88)",
          }}
        >
          <div
            style={{
              fontSize: 68,
              fontWeight: 300,
              color: "#111111",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            VOTE THE
          </div>
          <div
            style={{
              fontSize: 86,
              fontWeight: 600,
              fontStyle: "italic",
              color: "#111111",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            POLICY.
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 300,
              color: "rgba(17,17,17,0.5)",
              letterSpacing: "-0.02em",
            }}
          >
            NOT THE FLAG.
          </div>
        </div>

        {/* Subtitle: Tamil as image for crisp rendering; English as text */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 22,
            fontWeight: 400,
            lineHeight: 1,
            color: "#111111",
            opacity: 0.78,
            padding: "10px 14px",
            border: "2px solid rgba(17,17,17,0.55)",
            background: "rgba(250,217,73,0.85)",
          }}
        >
          <img
            src={tamilDataUrl}
            alt="தேர்வு 2026"
            width={133}
            height={24}
            style={{ display: "block", objectFit: "contain", margin: 0 }}
          />
          <span>·</span>
          <span>Civic awareness tool</span>
          <span>·</span>
          <span>tnvotes2026.vercel.app</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
