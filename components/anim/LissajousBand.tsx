"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { readThemeTokens } from "@/lib/theme";

/**
 * Divider band #6 — a panel of phase portraits. Each cell traces a Lissajous
 * curve with its own frequency ratio; the phase drifts so every figure slowly
 * morphs. Scroll velocity speeds the drift. Static under reduced motion.
 */
export default function LissajousBand() {
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

      const draw = (t: number) => {
        ctx.clearRect(0, 0, W, H);
        const size = H;
        const cols = Math.ceil(W / size) + 1;
        const r = H * 0.32;
        const steps = 120;

        for (let i = 0; i < cols; i++) {
          const cx = i * size + size / 2;
          const cy = H / 2;
          const a = 2 + (i % 3);
          const b = 3 + ((i + 1) % 3);
          const delta = t * 0.6 + i * 0.5;

          // cell divider
          ctx.strokeStyle = C.gridSoft;
          ctx.lineWidth = 1 * dpr;
          ctx.beginPath();
          ctx.moveTo(i * size, 0);
          ctx.lineTo(i * size, H);
          ctx.stroke();

          // the curve
          ctx.strokeStyle = C.accentInk;
          ctx.lineWidth = 1.4 * dpr;
          ctx.beginPath();
          for (let s = 0; s <= steps; s++) {
            const u = (s / steps) * Math.PI * 2;
            const x = cx + r * Math.sin(a * u + delta);
            const y = cy + r * Math.sin(b * u);
            s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.stroke();

          // leading dot
          const hx = cx + r * Math.sin(a * delta + delta);
          const hy = cy + r * Math.sin(b * delta);
          ctx.fillStyle = C.accentInk;
          ctx.beginPath();
          ctx.arc(hx, hy, 2.2 * dpr, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      let t = 0;
      const onTheme = () => {
        C = readThemeTokens();
        if (reduced) draw(0);
      };
      document.addEventListener("themechange", onTheme);

      if (reduced) {
        draw(0.6);
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
          (velBoost = gsap.utils.clamp(0, 5, Math.abs(self.getVelocity()) / 280)),
      });

      let raf = 0;
      let last = 0;
      let running = false;
      const loop = (now: number) => {
        const dt = last ? Math.min(40, now - last) : 16;
        last = now;
        t += dt * 0.0016 * (1 + velBoost);
        draw(t);
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
      id="b-lissajous"
      className="line-t line-b relative z-10 h-24 w-full overflow-hidden bg-[var(--color-bg)] md:h-28"
    >
      <div className="label absolute left-4 top-3 z-10">/ PHASE · PORTRAIT</div>
      <div ref={host} className="absolute inset-0">
        <canvas ref={canvas} className="block h-full w-full" />
      </div>
    </div>
  );
}
