"use client";

import { useRef, type ReactNode } from "react";

/**
 * Wraps an interactive element so it eases toward the cursor on hover —
 * the subtle "magnetic" pull found on agency-grade sites. No-ops on touch
 * / coarse pointers and under `prefers-reduced-motion`, so it only ever
 * enhances a precise-pointer experience.
 */
export function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined") {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    }
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`magnetic ${className}`}
    >
      {children}
    </span>
  );
}
