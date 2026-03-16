import { ImageResponse } from "next/og";

export const alt = "தேர்வு 2026 — Vote the policy. Not the flag. Civic awareness tool for Tamil Nadu Assembly Elections.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#F4F0E6",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Party gradient dots */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 60,
            display: "flex",
            gap: 12,
          }}
        >
          {[
            "linear-gradient(135deg, #111111 0%, #CC1A1A 100%)",
            "linear-gradient(135deg, #111111 0%, #BB1A1A 50%, #d0d0d0 100%)",
            "linear-gradient(135deg, #8B1010 0%, #F5C518 100%)",
            "linear-gradient(135deg, #FF6000 0%, #FFB800 100%)",
            "linear-gradient(135deg, #CC0000 0%, #FFD700 100%)",
          ].map((grad, i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: grad,
              }}
            />
          ))}
        </div>

        {/* Main tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 72,
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
              fontSize: 88,
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
              fontSize: 48,
              fontWeight: 300,
              color: "rgba(17,17,17,0.5)",
              letterSpacing: "-0.02em",
            }}
          >
            NOT THE FLAG.
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            fontSize: 24,
            fontWeight: 400,
            color: "#111111",
            opacity: 0.7,
          }}
        >
          தேர்வு 2026 · Tamil Nadu · Civic awareness tool
        </div>
      </div>
    ),
    { ...size }
  );
}
