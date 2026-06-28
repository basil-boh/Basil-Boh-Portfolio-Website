"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  value: string; // e.g. "0.82ms", "1.2M qps", "+37%", "∞"
  className?: string;
};

/**
 * Count-up for the numeric portion of a metric string. Preserves any
 * prefix/suffix (units, %, +, ×) and decimal precision, and animates only
 * when the metric scrolls into view. Non-numeric values (e.g. "∞") render as-is.
 */
export default function Counter({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced || !ref.current) return;

      const match = value.match(/-?\d+(\.\d+)?/);
      if (!match) return;

      const target = parseFloat(match[0]);
      const decimals = match[0].includes(".")
        ? match[0].split(".")[1].length
        : 0;
      const prefix = value.slice(0, match.index);
      const suffix = value.slice(match.index! + match[0].length);
      const proxy = { n: 0 };
      const el = ref.current;

      gsap.to(proxy, {
        n: target,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${proxy.n.toFixed(decimals)}${suffix}`;
        },
      });
    },
    { scope: ref, dependencies: [value] }
  );

  return (
    <span ref={ref} className={`tnum ${className ?? ""}`}>
      {value}
    </span>
  );
}
