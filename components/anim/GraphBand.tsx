"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { readThemeTokens } from "@/lib/theme";

/**
 * Divider band — a living network graph. Nodes meander gently inside the band;
 * an edge is drawn (and brightens) between any two that drift within range, so
 * the topology continuously re-forms. Bounded, slow motion — a calm
 * constellation, not a jittery sim. On-screen-only; static under reduced motion.
 */
export default function GraphBand() {
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

      type Node = {
        x: number;
        y: number;
        vx: number;
        vy: number;
        hub: boolean;
      };
      let nodes: Node[] = [];

      const build = () => {
        const n = gsap.utils.clamp(12, 40, Math.round(W / dpr / 70));
        nodes = Array.from({ length: n }, (_, i) => {
          const s = 0.18 * dpr;
          return {
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * s,
            vy: (Math.random() - 0.5) * s,
            hub: i % 6 === 0,
          };
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

      const draw = (move: boolean, boost: number) => {
        ctx.clearRect(0, 0, W, H);
        const pad = 6 * dpr;
        const minV = 0.05 * dpr;
        const maxV = 0.5 * dpr;

        if (move) {
          for (const p of nodes) {
            // organic meander
            p.vx += (Math.random() - 0.5) * 0.02 * dpr;
            p.vy += (Math.random() - 0.5) * 0.02 * dpr;
            const sp = Math.hypot(p.vx, p.vy) || 1;
            const cl = gsap.utils.clamp(minV, maxV, sp);
            p.vx = (p.vx / sp) * cl;
            p.vy = (p.vy / sp) * cl;
            p.x += p.vx * (1 + boost);
            p.y += p.vy * (1 + boost);
            // bounce inside the band
            if (p.x < pad) (p.x = pad), (p.vx = Math.abs(p.vx));
            if (p.x > W - pad) (p.x = W - pad), (p.vx = -Math.abs(p.vx));
            if (p.y < pad) (p.y = pad), (p.vy = Math.abs(p.vy));
            if (p.y > H - pad) (p.y = H - pad), (p.vy = -Math.abs(p.vy));
          }
        }

        // edges (proximity)
        const thr = H * 1.25;
        ctx.lineWidth = 1 * dpr;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.hypot(dx, dy);
            if (dist < thr) {
              ctx.globalAlpha = (1 - dist / thr) * 0.7;
              ctx.strokeStyle = C.lineBright;
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.stroke();
            }
          }
        }
        ctx.globalAlpha = 1;

        // nodes
        for (const p of nodes) {
          if (p.hub) {
            ctx.fillStyle = C.accentInk;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3.2 * dpr, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = C.dot;
            ctx.fillRect(p.x - 2 * dpr, p.y - 2 * dpr, 4 * dpr, 4 * dpr);
          }
        }
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
          (velBoost = gsap.utils.clamp(0, 4, Math.abs(self.getVelocity()) / 320)),
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
      id="b-graph"
      className="line-t line-b relative z-10 h-24 w-full overflow-hidden bg-[var(--color-bg)] md:h-28"
    >
      <div className="label absolute left-4 top-3 z-10 mix-blend-difference">
        / NETWORK · TOPOLOGY
      </div>
      <div ref={host} className="absolute inset-0">
        <canvas ref={canvas} className="block h-full w-full" />
      </div>
    </div>
  );
}
