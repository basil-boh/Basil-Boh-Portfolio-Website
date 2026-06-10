"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a stat string up from zero when it scrolls into view. Preserves
 * any non-numeric prefix/suffix (e.g. "5K+", "100+", "2027"). Static under
 * reduced-motion.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const [display, setDisplay] = useState(() => (match ? `${match[1]}0${match[3]}` : value));

  useEffect(() => {
    if (!match) {
      setDisplay(value);
      return;
    }
    const prefix = match[1];
    const target = parseFloat(match[2]);
    const suffix = match[3];
    const decimals = (match[2].split(".")[1] || "").length;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const fmt = (n: number) => `${prefix}${decimals ? n.toFixed(decimals) : Math.round(n)}${suffix}`;
    let raf = 0;
    let start = 0;
    const dur = 1100;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(fmt(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          raf = requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    if (ref.current) io.observe(ref.current);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
