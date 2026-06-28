"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { readThemeTokens } from "@/lib/theme";

/**
 * Divider band #2 — a data-packet flow field. Accent packets stream left→right
 * across faint lanes (continuing the connection-pool metaphor from About);
 * scroll velocity surges the flow. On-screen-only; static under reduced motion.
 */
export default function PacketStream() {
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
      const LANES = 5;

      type P = { x: number; lane: number; vx: number; s: number; a: number };
      let parts: P[] = [];

      const laneY = (lane: number) => H * ((lane + 1) / (LANES + 1));

      const seed = (p: P, atLeft: boolean) => {
        p.lane = Math.floor(Math.random() * LANES);
        p.x = atLeft ? -Math.random() * W * 0.4 : Math.random() * W;
        p.vx = (0.6 + Math.random() * 1.6) * dpr;
        p.s = (2 + Math.random() * 2.5) * dpr;
        p.a = 0.35 + Math.random() * 0.65;
        return p;
      };

      const build = () => {
        const count = Math.round((W / dpr / 22) * (LANES / 5));
        parts = Array.from({ length: count }, () =>
          seed({ x: 0, lane: 0, vx: 0, s: 0, a: 0 }, false)
        );
      };

      const resize = () => {
        const r = host.current!.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        cv.width = Math.max(1, Math.floor(r.width * dpr));
        cv.height = Math.max(1, Math.floor(r.height * dpr));
        cv.style.width = `${r.width}px`;
        cv.style.height = `${r.height}px`;
        W = cv.width;
        H = cv.height;
        build();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host.current!);

      const draw = (boost: number) => {
        ctx.clearRect(0, 0, W, H);
        // faint lanes
        ctx.strokeStyle = C.gridSoft;
        ctx.lineWidth = 1 * dpr;
        for (let l = 0; l < LANES; l++) {
          const y = laneY(l);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(W, y);
          ctx.stroke();
        }
        ctx.fillStyle = C.accentInk;
        for (const p of parts) {
          if (boost >= 0) {
            p.x += p.vx * (1 + boost);
            if (p.x > W + 8 * dpr) seed(p, true);
          }
          const y = laneY(p.lane);
          // short trail
          ctx.globalAlpha = p.a * 0.18;
          ctx.fillRect(p.x - p.s * 4, y - p.s / 2, p.s * 4, p.s);
          ctx.globalAlpha = p.a;
          ctx.fillRect(p.x, y - p.s / 2, p.s, p.s);
        }
        ctx.globalAlpha = 1;
      };

      const onTheme = () => {
        C = readThemeTokens();
        if (reduced) draw(-1);
      };
      document.addEventListener("themechange", onTheme);

      if (reduced) {
        draw(-1);
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
          (velBoost = gsap.utils.clamp(0, 6, Math.abs(self.getVelocity()) / 300)),
      });

      let raf = 0;
      let running = false;
      const loop = () => {
        draw(velBoost);
        velBoost *= 0.92;
        raf = requestAnimationFrame(loop);
      };
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
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
      id="b-packets"
      className="line-t line-b relative z-10 h-24 w-full overflow-hidden bg-[var(--color-bg)] md:h-28"
    >
      <div className="label absolute left-4 top-3 z-10">/ THROUGHPUT · STREAM</div>
      <div ref={host} className="absolute inset-0">
        <canvas ref={canvas} className="block h-full w-full" />
      </div>
    </div>
  );
}
