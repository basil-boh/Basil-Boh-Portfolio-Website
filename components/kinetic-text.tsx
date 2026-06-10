"use client";

import { Fragment } from "react";

/**
 * Splits text into per-character spans inside a clipping mask so each
 * glyph wipes up from its own baseline with a staggered delay — a
 * title-sequence reveal rather than a flat fade. Whitespace is preserved
 * as non-animated gaps. Honours `prefers-reduced-motion` via CSS.
 */
export function KineticText({
  text,
  className = "",
  delay = 0,
  stagger = 38,
}: {
  text: string;
  className?: string;
  /** ms before the first glyph starts */
  delay?: number;
  /** ms between successive glyphs */
  stagger?: number;
}) {
  const chars = [...text];
  let i = 0; // animation index that skips spaces so timing stays even

  return (
    <span className={`kinetic ${className}`} aria-label={text} role="text">
      {chars.map((ch, idx) => {
        if (ch === " ") return <Fragment key={idx}> </Fragment>;
        const d = delay + i * stagger;
        i += 1;
        return (
          <span key={idx} className="kinetic__mask" aria-hidden>
            <span className="kinetic__char" style={{ animationDelay: `${d}ms` }}>
              {ch}
            </span>
          </span>
        );
      })}
    </span>
  );
}
