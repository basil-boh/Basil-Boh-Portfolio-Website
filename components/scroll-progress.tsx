"use client";

import { useEffect, useRef } from "react";

/**
 * Thin indigo progress bar pinned to the top of the viewport.
 *
 * Written to be Safari-safe: rubber-band overscroll there reports a negative
 * scrollTop at the top and overshoots the max at the bottom, so the ratio is
 * clamped to [0, 1] (an unclamped negative value flips scaleX and makes the
 * bar jitter long/short). Updates are rAF-throttled and written straight to
 * the node — no per-scroll React render and no CSS transition to "chase".
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const apply = () => {
      raf = 0;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const y = window.scrollY || el.scrollTop || 0;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div ref={ref} className="scroll-progress" aria-hidden />;
}
