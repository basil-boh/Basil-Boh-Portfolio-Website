"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  strength?: number;
  ariaLabel?: string;
};

/**
 * Magnetic hover: the element (and its inner label) ease toward the pointer
 * while hovered, snapping back on leave. Renders as <a> if href is given,
 * otherwise <button>. No-ops on coarse pointers / reduced motion.
 */
export default function MagneticButton({
  children,
  href,
  className,
  strength = 0.4,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const fine = window.matchMedia("(pointer: fine)").matches;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (!fine || reduced || !ref.current) return;

      const el = ref.current;
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
      const ix = gsap.quickTo(inner.current, "x", {
        duration: 0.5,
        ease: "power3",
      });
      const iy = gsap.quickTo(inner.current, "y", {
        duration: 0.5,
        ease: "power3",
      });

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        xTo(dx * strength);
        yTo(dy * strength);
        ix(dx * strength * 0.5);
        iy(dy * strength * 0.5);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
        ix(0);
        iy(0);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref }
  );

  const content = (
    <span ref={inner} className="inline-flex items-center gap-3">
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={className}
        aria-label={ariaLabel}
        data-cursor="hover"
      >
        {content}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={className}
      aria-label={ariaLabel}
      data-cursor="hover"
    >
      {content}
    </button>
  );
}
