"use client";

import { useEffect } from "react";

/**
 * One delegated pointer listener that gives every `.card` a cursor-follow
 * spotlight (via --mx/--my CSS vars) and a subtle 3D tilt. Smaller cards
 * tilt; large feature/CTA cards get spotlight only. No-op on touch /
 * reduced-motion. Mounted once in the layout — no per-card wrappers.
 */
export function CardFX() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let current: HTMLElement | null = null;

    function reset(el: HTMLElement) {
      el.classList.remove("card-fx-active");
      el.style.transition = "";
      el.style.transform = "";
      el.style.removeProperty("--mx");
      el.style.removeProperty("--my");
    }

    function onMove(e: PointerEvent) {
      const target = (e.target as HTMLElement)?.closest?.(".card") as HTMLElement | null;
      if (target !== current) {
        if (current) reset(current);
        current = target;
        if (current) current.classList.add("card-fx-active");
      }
      if (!current) return;

      const r = current.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      current.style.setProperty("--mx", `${x}px`);
      current.style.setProperty("--my", `${y}px`);

      // tilt only smaller cards so giant feature/CTA panels don't swing
      if (r.width < 560) {
        const rx = (0.5 - y / r.height) * 7;
        const ry = (x / r.width - 0.5) * 7;
        current.style.transition = "transform 0.08s ease-out";
        current.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      }
    }

    function onLeave() {
      if (current) reset(current);
      current = null;
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      if (current) reset(current);
    };
  }, []);

  return null;
}
