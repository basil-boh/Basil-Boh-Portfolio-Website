"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { readThemeTokens } from "@/lib/theme";

/**
 * Divider band #3 — a spectrum-analyzer / throughput histogram. A row of bars
 * breathes via layered sines (smooth, deterministic); scroll velocity pushes
 * the amplitude. On-screen-only; static varied heights under reduced motion.
 */
export default function EqualizerBars() {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      const cv = canvas.current!;
      const ctx = cv.getContext("2d")!;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      let C = readThemeTokens();

      let dpr = 1;
      let W = 0;
      let H = 0;
      let N = 0;
      let barW = 0;
      const GAP = 3;

      const resize = () => {
        const r = host.current!.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        cv.width = Math.max(1, Math.floor(r.width * dpr));
        cv.height = Math.max(1, Math.floor(r.height * dpr));
        cv.style.width = `${r.width}px`;
        cv.style.height = `${r.height}px`;
        W = cv.width;
        H = cv.height;
        N = Math.max(16, Math.floor(r.width / 16));
        barW = W / N - GAP * dpr;
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host.current!);

      const height = (i: number, t: number, boost: number) => {
        const phase = i * 0.5;
        const base =
          0.5 +
          0.5 *
            Math.sin(t * 0.045 + phase) *
            Math.cos(t * 0.013 + phase * 0.7);
        const flick = 0.08 * Math.sin(t * 0.21 + i);
        return gsap.utils.clamp(0.06, 1, (0.18 + base * 0.7 + flick) * (1 + boost * 0.12));
      };

      const draw = (t: number, boost: number) => {
        ctx.clearRect(0, 0, W, H);
        const pad = 6 * dpr;
        for (let i = 0; i < N; i++) {
          const h = height(i, t, boost) * (H - pad * 2);
          const x = i * (barW + GAP * dpr) + (GAP * dpr) / 2;
          const y = H - pad - h;
          // every 4th bar brighter for rhythm
          ctx.fillStyle = i % 4 === 0 ? C.accentInk : C.lineBright;
          ctx.fillRect(x, y, barW, h);
          // cap tick
          ctx.fillStyle = C.accentInk;
          ctx.fillRect(x, y - 2 * dpr, barW, 2 * dpr);
        }
      };

      const onTheme = () => {
        C = readThemeTokens();
        if (reduced) draw(0, 0);
      };
      document.addEventListener("themechange", onTheme);

      if (reduced) {
        draw(0, 0);
        return () => {
          ro.disconnect();
          document.removeEventListener("themechange", onTheme);
        };
      }

      let velBoost = 0;
      const st = ScrollTrigger.create({
        trigger: host.current!,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) =>
          (velBoost = gsap.utils.clamp(0, 8, Math.abs(self.getVelocity()) / 240)),
      });

      let raf = 0;
      let t = 0;
      let last = 0;
      let running = false;
      const loop = (now: number) => {
        const dt = last ? Math.min(40, now - last) : 16;
        last = now;
        t += dt * 0.06 * (1 + velBoost * 0.15);
        draw(t, velBoost);
        velBoost *= 0.93;
        raf = requestAnimationFrame(loop);
      };
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          last = 0;
          raf = requestAnimationFrame(loop);
        } else if (!e.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      });
      io.observe(host.current!);

      return () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        st.kill();
        ro.disconnect();
        document.removeEventListener("themechange", onTheme);
      };
    },
    { scope: host }
  );

  return (
    <div
      id="b-eq"
      className="line-t line-b relative z-10 h-24 w-full overflow-hidden bg-[var(--color-bg)] md:h-28"
    >
      <div className="label absolute left-4 top-3 z-10">/ DISTRIBUTION · SPECTRUM</div>
      <div ref={host} className="absolute inset-0">
        <canvas ref={canvas} className="block h-full w-full" />
      </div>
    </div>
  );
}
