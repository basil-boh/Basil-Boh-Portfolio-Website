"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { readThemeTokens } from "@/lib/theme";

/**
 * Divider band — small orbital systems. A few stars sit across the band, each
 * with planets on elliptical (Kepler-ish: inner = faster) orbits that leave
 * fading trails. Calm, planetary motion. On-screen-only; static under reduced
 * motion.
 */
export default function OrbitalBand() {
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

      type Planet = {
        a: number;
        b: number;
        rot: number;
        ang: number;
        omega: number;
        trail: number;
      };
      type System = { cx: number; cy: number; planets: Planet[] };
      let systems: System[] = [];

      const build = () => {
        const sysN = gsap.utils.clamp(3, 7, Math.round(W / dpr / 240));
        const spacing = W / sysN;
        const aMax = spacing * 0.46;
        const bCap = H * 0.42;
        const R0 = H * 0.34;
        systems = Array.from({ length: sysN }, (_, i) => {
          const cx = spacing * (i + 0.5);
          const cy = H / 2 + (Math.random() - 0.5) * H * 0.12;
          const pn = 2 + (Math.random() < 0.4 ? 1 : 0);
          const planets = Array.from({ length: pn }, (_, k) => {
            const a = aMax * (0.42 + (k / pn) * 0.55 + Math.random() * 0.1);
            const b = Math.min(bCap, a * (0.45 + Math.random() * 0.4));
            const dir = Math.random() < 0.5 ? 1 : -1;
            return {
              a,
              b,
              rot: Math.random() * Math.PI,
              ang: Math.random() * Math.PI * 2,
              omega: dir * (0.013 / Math.sqrt(a / R0)),
              trail: 0.7 + Math.random() * 0.7,
            };
          });
          return { cx, cy, planets };
        });
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

      const pt = (
        cx: number,
        cy: number,
        a: number,
        b: number,
        rot: number,
        ang: number
      ): [number, number] => {
        const ex = a * Math.cos(ang);
        const ey = b * Math.sin(ang);
        const c = Math.cos(rot);
        const s = Math.sin(rot);
        return [cx + ex * c - ey * s, cy + ex * s + ey * c];
      };

      const draw = (move: boolean, boost: number) => {
        ctx.clearRect(0, 0, W, H);
        const segs = 16;

        for (const sys of systems) {
          for (const p of sys.planets) {
            if (move) p.ang += p.omega * (1 + boost);

            // faint full orbit
            ctx.strokeStyle = C.line;
            ctx.globalAlpha = 0.3;
            ctx.lineWidth = 1 * dpr;
            ctx.beginPath();
            ctx.ellipse(sys.cx, sys.cy, p.a, p.b, p.rot, 0, Math.PI * 2);
            ctx.stroke();

            // fading trail behind the planet
            ctx.strokeStyle = C.accentInk;
            ctx.lineWidth = 1.6 * dpr;
            let prev = pt(sys.cx, sys.cy, p.a, p.b, p.rot, p.ang - p.trail);
            for (let i = 1; i <= segs; i++) {
              const f = i / segs;
              const cur = pt(
                sys.cx,
                sys.cy,
                p.a,
                p.b,
                p.rot,
                p.ang - p.trail * (1 - f)
              );
              ctx.globalAlpha = f * 0.9;
              ctx.beginPath();
              ctx.moveTo(prev[0], prev[1]);
              ctx.lineTo(cur[0], cur[1]);
              ctx.stroke();
              prev = cur;
            }

            // the planet
            ctx.globalAlpha = 1;
            ctx.fillStyle = C.accentInk;
            ctx.beginPath();
            ctx.arc(prev[0], prev[1], 2.2 * dpr, 0, Math.PI * 2);
            ctx.fill();
          }

          // the star
          ctx.globalAlpha = 0.35;
          ctx.strokeStyle = C.lineBright;
          ctx.beginPath();
          ctx.arc(sys.cx, sys.cy, 6 * dpr, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
          ctx.fillStyle = C.accentInk;
          ctx.beginPath();
          ctx.arc(sys.cx, sys.cy, 3.2 * dpr, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      };

      const onTheme = () => {
        C = readThemeTokens();
        if (reduced) draw(false, 0);
      };
      document.addEventListener("themechange", onTheme);

      if (reduced) {
        draw(false, 0);
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
          (velBoost = gsap.utils.clamp(0, 4, Math.abs(self.getVelocity()) / 340)),
      });

      let raf = 0;
      let running = false;
      const loop = () => {
        draw(true, velBoost);
        velBoost *= 0.93;
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
      id="b-orbital"
      className="line-t line-b relative z-10 h-24 w-full overflow-hidden bg-[var(--color-bg)] md:h-28"
    >
      <div className="label absolute left-4 top-3 z-10 mix-blend-difference">
        / ORBITAL · SYSTEM
      </div>
      <div ref={host} className="absolute inset-0">
        <canvas ref={canvas} className="block h-full w-full" />
      </div>
    </div>
  );
}
