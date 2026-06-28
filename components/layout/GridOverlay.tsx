/**
 * Fixed blueprint chrome that sits behind/around the content:
 * faint full-bleed grid + four vertical column rails + edge tick labels.
 * Purely decorative, non-interactive, and cheap (no JS).
 */
export default function GridOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    >
      {/* faint grid wash */}
      <div className="grid-bg absolute inset-0 opacity-[0.18]" />

      {/* column rails */}
      <div className="absolute inset-0 mx-auto hidden max-w-[1600px] grid-cols-4 px-6 md:grid">
        <div className="line-l h-full" />
        <div className="line-l h-full" />
        <div className="line-l h-full" />
        <div className="line-l line-r h-full" />
      </div>

      {/* edge label, left */}
      <div className="label absolute left-3 top-1/2 hidden -translate-y-1/2 -rotate-90 md:block">
        SYS / PORTFOLIO — V1.0
      </div>
      {/* edge label, right */}
      <div className="label absolute right-3 top-1/2 hidden -translate-y-1/2 rotate-90 md:block">
        LAT 1.279 / LON 103.851
      </div>
    </div>
  );
}
