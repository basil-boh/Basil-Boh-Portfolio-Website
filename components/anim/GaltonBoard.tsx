"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { readThemeTokens } from "@/lib/theme";

/**
 * Statistics motif — a live Galton board (bean machine). Balls drop from the
 * top, bounce left/right through a triangular peg field (a Bernoulli trial at
 * each row), and collect in bins that build up a normal distribution: tall
 * stacks in the middle, few at the edges. Runs continuously while on screen;
 * when the centre bin fills it fades and refills. Static under reduced motion.
 */
export default function GaltonBoard({ className }: { className?: string }) {
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

      const R = 7; // peg rows → R+1 bins
      let dpr = 1;
      let W = 0;
      let H = 0;
      let sx = 0;
      let ballR = 0;
      let ballD = 0;
      let centerX = 0;
      let binX0 = 0;
      let pegTop = 0;
      let pegBottom = 0;
      let rowGap = 0;
      let binBase = 0;
      let maxStack = 0;
      let pegRowY: number[] = [];

      let counts: number[] = new Array(R + 1).fill(0);
      type Ball = { x: number; tx: number; y: number; row: number; dead: boolean };
      let balls: Ball[] = [];

      const binCenterX = (k: number) => binX0 + k * sx;

      const geom = () => {
        const r = host.current!.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        cv.width = Math.max(1, Math.floor(r.width * dpr));
        cv.height = Math.max(1, Math.floor(r.height * dpr));
        cv.style.width = `${r.width}px`;
        cv.style.height = `${r.height}px`;
        W = cv.width;
        H = cv.height;
        centerX = W / 2;
        sx = (W * 0.74) / R;
        ballD = gsap.utils.clamp(3 * dpr, 5.5 * dpr, sx * 0.46);
        ballR = ballD / 2;
        pegTop = H * 0.16;
        pegBottom = H * 0.52;
        rowGap = (pegBottom - pegTop) / (R - 1);
        binBase = H * 0.97;
        binX0 = centerX - (R / 2) * sx;
        maxStack = Math.max(4, Math.floor((binBase - pegBottom - 2 * dpr) / ballD));
        pegRowY = Array.from({ length: R }, (_, r) => pegTop + r * rowGap);
        counts = new Array(R + 1).fill(0);
        balls = [];
      };
      geom();
      const ro = new ResizeObserver(geom);
      ro.observe(host.current!);

      const drawPegs = () => {
        ctx.fillStyle = C.lineBright;
        for (let r = 0; r < R; r++) {
          for (let k = 0; k <= r; k++) {
            const x = centerX + (k - r / 2) * sx;
            ctx.beginPath();
            ctx.arc(x, pegRowY[r], 1.4 * dpr, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        // bin baseline
        ctx.strokeStyle = C.line;
        ctx.lineWidth = 1 * dpr;
        ctx.beginPath();
        ctx.moveTo(binX0 - sx * 0.5, binBase + ballR);
        ctx.lineTo(binX0 + (R + 0.5) * sx, binBase + ballR);
        ctx.stroke();
      };

      const drawCurve = () => {
        // target normal (binomial) outline over the bins
        const sigma = (Math.sqrt(R) / 2) * sx;
        const peak = maxStack * ballD;
        ctx.strokeStyle = C.accentInk;
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 1.4 * dpr;
        ctx.beginPath();
        for (let px = binX0 - sx * 0.5; px <= binX0 + (R + 0.5) * sx; px += 2 * dpr) {
          const z = (px - centerX) / sigma;
          const y = binBase - peak * Math.exp(-0.5 * z * z);
          px === binX0 - sx * 0.5 ? ctx.moveTo(px, y) : ctx.lineTo(px, y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      };

      const drawStacks = (alpha: number) => {
        ctx.globalAlpha = alpha;
        for (let k = 0; k <= R; k++) {
          const n = Math.min(counts[k], maxStack);
          const x = binCenterX(k);
          for (let i = 0; i < n; i++) {
            ctx.fillStyle = i === n - 1 ? C.accentInk : C.vecI;
            ctx.beginPath();
            ctx.arc(x, binBase - i * ballD - ballR, ballR * 0.92, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      };

      // ---- reduced motion: a single settled bell ----
      if (reduced) {
        const expected = Array.from({ length: R + 1 }, (_, k) => {
          // binomial coefficient C(R,k)
          let c = 1;
          for (let i = 0; i < k; i++) c = (c * (R - i)) / (i + 1);
          return c;
        });
        const mx = Math.max(...expected);
        counts = expected.map((e) => Math.round((e / mx) * maxStack));
        const render = () => {
          ctx.clearRect(0, 0, W, H);
          drawPegs();
          drawStacks(1);
          drawCurve();
        };
        render();
        const onTheme = () => {
          C = readThemeTokens();
          render();
        };
        document.addEventListener("themechange", onTheme);
        return () => {
          ro.disconnect();
          document.removeEventListener("themechange", onTheme);
        };
      }

      const onTheme = () => (C = readThemeTokens());
      document.addEventListener("themechange", onTheme);

      let resetting = false;
      let fade = 1;
      let spawnAcc = 0;
      const spawnEvery = 150; // ms
      const fall = 1.35 * dpr;

      const update = (dt: number) => {
        const f = dt / 16;
        // spawn
        spawnAcc += dt;
        if (!resetting && spawnAcc >= spawnEvery && balls.length < 20) {
          spawnAcc = 0;
          balls.push({ x: centerX, tx: centerX, y: pegTop - rowGap, row: 0, dead: false });
        }
        // advance balls
        for (const b of balls) {
          b.y += fall * f;
          b.x += (b.tx - b.x) * 0.22;
          while (b.row < R && b.y >= pegRowY[b.row]) {
            b.tx += (Math.random() < 0.5 ? -1 : 1) * (sx / 2);
            b.row++;
          }
          if (b.row >= R) {
            const bin = gsap.utils.clamp(0, R, Math.round((b.tx - binX0) / sx));
            b.tx = binCenterX(bin);
            const landY = binBase - counts[bin] * ballD - ballR;
            if (b.y >= landY) {
              counts[bin] += 1;
              b.dead = true;
            }
          }
        }
        balls = balls.filter((b) => !b.dead);

        // refill cycle
        if (!resetting && counts[Math.round(R / 2)] >= maxStack) resetting = true;
        if (resetting) {
          fade -= dt / 700;
          if (fade <= 0) {
            counts = new Array(R + 1).fill(0);
            balls = [];
            fade = 1;
            resetting = false;
          }
        }
      };

      const render = () => {
        ctx.clearRect(0, 0, W, H);
        drawPegs();
        drawCurve();
        drawStacks(resetting ? Math.max(0, fade) : 1);
        // falling balls
        ctx.fillStyle = C.accentInk;
        for (const b of balls) {
          ctx.beginPath();
          ctx.arc(b.x, b.y, ballR, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      let raf = 0;
      let last = 0;
      let running = false;
      const loop = (now: number) => {
        const dt = last ? Math.min(48, now - last) : 16;
        last = now;
        update(dt);
        render();
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
        ro.disconnect();
        document.removeEventListener("themechange", onTheme);
      };
    },
    { scope: host }
  );

  return (
    <div
      ref={host}
      id="b-galton"
      className={`relative h-full w-full ${className ?? ""}`}
    >
      <canvas ref={canvas} className="block h-full w-full" />
    </div>
  );
}
