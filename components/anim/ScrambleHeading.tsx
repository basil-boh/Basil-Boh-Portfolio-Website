"use client";

import { useRef, createElement } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  chars?: string;
  start?: string;
  delay?: number;
};

/**
 * Decodes its text on scroll-in: scrambles through glyphs, then resolves
 * left-to-right to the real string. The real text is always in the DOM,
 * so it stays accessible and renders correctly with JS off / reduced motion.
 */
export default function ScrambleHeading({
  text,
  as = "h2",
  className,
  chars = "01<>/{}ΣΛ#%*+=",
  start = "top 85%",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced || !ref.current) return;

      gsap.to(ref.current, {
        duration: 1.1,
        delay,
        ease: "none",
        scrambleText: {
          text,
          chars,
          revealDelay: 0.35,
          speed: 0.45,
          tweenLength: false,
        },
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    },
    { scope: ref, dependencies: [text] }
  );

  return createElement(as, { ref, className }, text);
}
