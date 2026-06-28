"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** stagger between lines, seconds */
  stagger?: number;
  start?: string;
};

/**
 * Masked line-by-line reveal: each line rises from behind a clip edge,
 * staggered, driven by a one-shot ScrollTrigger. Falls back to plain
 * visible text under reduced motion.
 */
export default function SplitReveal({
  children,
  className,
  stagger = 0.1,
  start = "top 82%",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced || !ref.current) return;

      const split = SplitText.create(ref.current, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
      });

      gsap.from(split.lines, {
        yPercent: 115,
        duration: 1,
        ease: "power4.out",
        stagger,
        scrollTrigger: { trigger: ref.current, start, once: true },
      });

      return () => split.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
