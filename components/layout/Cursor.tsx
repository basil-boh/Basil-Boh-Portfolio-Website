"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Brutalist crosshair cursor with live coordinate readout.
 * - Follows the pointer with a touch of inertia.
 * - Grows + flips to the accent when hovering interactive elements.
 * - Disabled on touch / coarse pointers and under reduced-motion.
 */
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const hRef = useRef<HTMLDivElement>(null);
  const vRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!fine || reduced) return;

    const el = root.current!;
    const xTo = gsap.quickTo(el, "x", { duration: 0.18, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.18, ease: "power3" });
    gsap.set(el, { opacity: 0 });

    let visible = false;
    const onMove = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to(el, { opacity: 1, duration: 0.3 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
      if (readout.current) {
        readout.current.textContent = `${String(e.clientX).padStart(
          4,
          "0"
        )} ${String(e.clientY).padStart(4, "0")}`;
      }
    };

    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element &&
      !!t.closest('a, button, [role="button"], input, [data-cursor="hover"]');

    const onOver = (e: PointerEvent) => {
      const active = isInteractive(e.target);
      gsap.to(ringRef.current, {
        scale: active ? 2.1 : 1,
        backgroundColor: active ? "var(--color-accent)" : "transparent",
        duration: 0.25,
        ease: "power3",
      });
      gsap.to([hRef.current, vRef.current], {
        opacity: active ? 0 : 1,
        duration: 0.2,
      });
    };

    const onLeave = () => gsap.to(el, { opacity: 0, duration: 0.3 });

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      style={{ mixBlendMode: "difference" }}
    >
      <div className="relative h-0 w-0">
        <div
          ref={ringRef}
          className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 border border-white"
        />
        <div
          ref={hRef}
          className="absolute left-1/2 top-1/2 h-px w-7 -translate-x-1/2 -translate-y-1/2 bg-white"
        />
        <div
          ref={vRef}
          className="absolute left-1/2 top-1/2 h-7 w-px -translate-x-1/2 -translate-y-1/2 bg-white"
        />
        <span
          ref={readout}
          className="mono absolute left-5 top-4 whitespace-nowrap text-[9px] tracking-widest text-white"
        >
          0000 0000
        </span>
      </div>
    </div>
  );
}
