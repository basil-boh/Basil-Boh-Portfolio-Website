"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Drives the whole page through Lenis and hands scroll updates to ScrollTrigger
 * so GSAP scroll animations stay perfectly in sync with the smoothed scroll.
 * Disables itself when the user prefers reduced motion (native scroll instead).
 */
export default function SmoothScroll() {
  useEffect(() => {
    document.documentElement.classList.add("gsap-ready");

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", ScrollTrigger.update);
    // Expose the instance so programmatic scrolls (e.g. tooling, deep links)
    // go through Lenis instead of fighting it.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Route same-page anchor clicks through Lenis for smooth, offset-aware
    // jumps. Handles both "#id" and "/#id"; cross-page links fall through to
    // normal navigation (the destination scrolls to the hash on load, below).
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element)?.closest?.(
        'a[href*="#"]'
      ) as HTMLAnchorElement | null;
      if (!a) return;
      let url: URL;
      try {
        url = new URL(a.href, window.location.href);
      } catch {
        return;
      }
      if (
        url.pathname !== window.location.pathname ||
        !url.hash ||
        url.hash === "#"
      )
        return;
      const target = document.querySelector(url.hash);
      if (!target) return;
      e.preventDefault();
      history.pushState(null, "", url.hash);
      lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.2 });
    };
    document.addEventListener("click", onClick);

    // If we arrived with a hash (e.g. from a detail page), scroll to it.
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target)
        setTimeout(
          () => lenis.scrollTo(target as HTMLElement, { offset: -72, immediate: true }),
          80
        );
    }

    // Let images/fonts settle, then recalc trigger positions.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return null;
}
