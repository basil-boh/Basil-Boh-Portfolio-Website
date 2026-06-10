import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const accentHex: Record<string, string> = {
  violet: "#6b70ff",
  teal: "#2bb8a3",
  "light-blue": "#58a6ff",
  pink: "#ff7eb6",
  green: "#43d39e",
  orange: "#ff9f45",
  yellow: "#ffd23f",
};

async function loadFonts() {
  const dir = join(process.cwd(), "assets", "fonts");
  const [inter, interSemi, schibsted] = await Promise.all([
    readFile(join(dir, "Inter-400.woff")),
    readFile(join(dir, "Inter-600.woff")),
    readFile(join(dir, "Schibsted-700.woff")),
  ]);
  return [
    { name: "Inter", data: inter, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: interSemi, weight: 600 as const, style: "normal" as const },
    { name: "Schibsted", data: schibsted, weight: 700 as const, style: "normal" as const },
  ];
}

export async function renderOg({
  eyebrow,
  title,
  subtitle,
  accent = "violet",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  accent?: string;
}) {
  const color = accentHex[accent] ?? accentHex.violet;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07070a",
          color: "#ffffff",
          fontFamily: "Inter",
          padding: "76px 84px",
        }}
      >
        {/* accent glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: `radial-gradient(60% 70% at 80% -5%, ${color}, transparent 55%)`,
            opacity: 0.5,
          }}
        />
        {/* grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(73,79,223,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(73,79,223,0.16) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.5,
          }}
        />

        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 22px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.82)",
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Schibsted",
              fontWeight: 700,
              fontSize: title.length > 28 ? 78 : 104,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 30,
                lineHeight: 1.35,
                color: "rgba(255,255,255,0.66)",
                maxWidth: 920,
              }}
            >
              {subtitle.length > 130 ? `${subtitle.slice(0, 127)}…` : subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 12,
                background: color,
                marginRight: 14,
                display: "flex",
              }}
            />
            <span style={{ color: "#ffffff", fontWeight: 600 }}>Basil Boh</span>
          </div>
          <div style={{ display: "flex", color: "#ffffff", fontWeight: 600 }}>basilboh.dev</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await loadFonts() },
  );
}
