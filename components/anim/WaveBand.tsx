"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { readThemeTokens } from "@/lib/theme";

/**
 * Divider band #1 — a systems-telemetry oscilloscope. A latency-like signal
 * (calm baseline with periodic sharp spikes) scrolls across a canvas; scroll
 * velocity briefly speeds it up. Runs only while on-screen; static under
 * reduced motion.
 */
export default function WaveBand() {
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
      const resize = () => {
        const r = host.current!.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        cv.width = Math.max(1, Math.floor(r.width * dpr));
        cv.height = Math.max(1, Math.floor(r.height * dpr));
        cv.style.width = `${r.width}px`;
        cv.style.height = `${r.height}px`;
        W = cv.width;
        H = cv.height;
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host.current!);

      // 0..~1.1 latency signal: flat baseline + periodic sharp spikes + ripple
      const signal = (x: number) => {
        const ripple = Math.sin(x * 0.012) * 0.1 + Math.sin(x * 0.027) * 0.06;
        const spike = Math.pow(Math.max(0, Math.sin(x * 0.006)), 18) * 0.95;
        const spike2 =
          Math.pow(Math.max(0, Math.sin(x * 0.0037 + 2.1)), 26) * 0.7;
        return Math.abs(ripple) + spike + spike2;
      };

      const draw = () => {
        ctx.clearRect(0, 0, W, H);
        const mid = H * 0.74;
        const amp = H * 0.5;

        // baseline + faint vertical ticks
        ctx.strokeStyle = C.grid;
        ctx.lineWidth = 1 * dpr;
        ctx.beginPath();
        ctx.moveTo(0, mid);
        ctx.lineTo(W, mid);
        ctx.stroke();
        ctx.strokeStyle = C.gridSoft;
        for (let gx = -(offset % (64 * dpr)); gx < W; gx += 64 * dpr) {
          ctx.beginPath();
          ctx.moveTo(gx, mid - 8 * dpr);
          ctx.lineTo(gx, mid + 8 * dpr);
          ctx.stroke();
        }

        // signal trace
        ctx.beginPath();
        for (let px = 0; px <= W; px += 2 * dpr) {
          const y = mid - signal(px + offset) * amp;
          px === 0 ? ctx.moveTo(px, y) : ctx.lineTo(px, y);
        }
        ctx.strokeStyle = C.accentInk;
        ctx.lineWidth = 2 * dpr;
        ctx.lineJoin = "round";
        ctx.stroke();
      };

      let offset = 0;
      const onTheme = () => {
        C = readThemeTokens();
        if (reduced) draw();
      };
      document.addEventListener("themechange", onTheme);

      if (reduced) {
        draw();
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
          (velBoost = gsap.utils.clamp(0, 9, Math.abs(self.getVelocity()) / 220)),
      });

      let raf = 0;
      let last = 0;
      let running = false;
      const loop = (t: number) => {
        const dt = last ? Math.min(40, t - last) : 16;
        last = t;
        offset += (0.7 * dpr + velBoost * dpr) * (dt / 16);
        velBoost *= 0.9;
        draw();
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
      id="b-wave"
      className="line-t line-b relative z-10 h-24 w-full overflow-hidden bg-[var(--color-bg)] md:h-28"
    >
      <div className="label absolute left-4 top-3 z-10">/ LATENCY · LIVE</div>
      <div ref={host} className="absolute inset-0">
        <canvas ref={canvas} className="block h-full w-full" />
      </div>
    </div>
  );
}
