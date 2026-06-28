"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { readThemeTokens } from "@/lib/theme";
import {
  applyMat,
  lerpMat,
  determinant,
  IDENTITY,
  TRANSFORMS,
  type Mat2,
  type Vec2,
} from "@/lib/math";

/**
 * The hero centerpiece: a coordinate space + data point-cloud + basis vectors
 * that continuously morph through a sequence of real 2x2 linear maps. A live
 * matrix readout shows the exact numbers being multiplied each frame.
 *
 * Everything is drawn on a DPR-aware canvas; the morph is a single scalar tween
 * (GSAP) interpolating between named transforms, with subtle pointer parallax.
 * Under reduced motion it renders a single static identity grid.
 */
export default function MatrixField() {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const nameEl = useRef<HTMLSpanElement>(null);
  const detEl = useRef<HTMLSpanElement>(null);
  const cells = [
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
    useRef<HTMLSpanElement>(null),
  ];

  useGSAP(
    () => {
      const cv = canvas.current!;
      const ctx = cv.getContext("2d")!;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      let C = readThemeTokens();

      // --- the data point-cloud (fixed in object space, transformed each frame).
      // Each point also carries a `glow` value that randomly ignites and decays,
      // giving a scattered firefly twinkle across the plane.
      type Pt = { o: Vec2; glow: number };
      const pts: Pt[] = [];
      let seed = 1337;
      const rnd = () => {
        // deterministic PRNG so SSR/CSR + reruns stay stable
        seed = (seed * 1664525 + 1013904223) % 4294967296;
        return seed / 4294967296;
      };
      for (let i = 0; i < 140; i++) {
        pts.push({ o: [(rnd() - 0.5) * 6, (rnd() - 0.5) * 6], glow: 0 });
      }

      const view = { m: IDENTITY as Mat2, name: "IDENTITY" };
      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

      let scale = 46;
      let cx = 0;
      let cy = 0;
      let dpr = 1;

      const resize = () => {
        const r = host.current!.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        cv.width = Math.floor(r.width * dpr);
        cv.height = Math.floor(r.height * dpr);
        cv.style.width = `${r.width}px`;
        cv.style.height = `${r.height}px`;
        cx = cv.width / 2;
        cy = cv.height / 2;
        scale = Math.max(30, Math.min(r.width, r.height) / 9) * dpr;
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host.current!);

      const toScreen = (v: Vec2): Vec2 => [
        cx + scale * v[0] + pointer.tx,
        cy - scale * v[1] + pointer.ty,
      ];

      const line = (a: Vec2, b: Vec2, color: string, w: number) => {
        const p = toScreen(a);
        const q = toScreen(b);
        ctx.strokeStyle = color;
        ctx.lineWidth = w * dpr;
        ctx.beginPath();
        ctx.moveTo(p[0], p[1]);
        ctx.lineTo(q[0], q[1]);
        ctx.stroke();
      };

      const arrow = (to: Vec2, color: string) => {
        const o = toScreen([0, 0]);
        const t = toScreen(to);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 2.5 * dpr;
        ctx.beginPath();
        ctx.moveTo(o[0], o[1]);
        ctx.lineTo(t[0], t[1]);
        ctx.stroke();
        const ang = Math.atan2(t[1] - o[1], t[0] - o[0]);
        const h = 11 * dpr;
        ctx.beginPath();
        ctx.moveTo(t[0], t[1]);
        ctx.lineTo(
          t[0] - h * Math.cos(ang - 0.4),
          t[1] - h * Math.sin(ang - 0.4)
        );
        ctx.lineTo(
          t[0] - h * Math.cos(ang + 0.4),
          t[1] - h * Math.sin(ang + 0.4)
        );
        ctx.closePath();
        ctx.fill();
      };

      const draw = () => {
        const m = view.m;
        ctx.clearRect(0, 0, cv.width, cv.height);

        const K = 7;
        // transformed grid
        for (let i = -K; i <= K; i++) {
          const axis = i === 0;
          const col = axis ? C.lineBright : C.grid;
          line(applyMat(m, [i, -K]), applyMat(m, [i, K]), col, axis ? 1.4 : 1);
          line(applyMat(m, [-K, i]), applyMat(m, [K, i]), col, axis ? 1.4 : 1);
        }

        // unit-square (signed area = det) fill
        const sq: Vec2[] = [
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
        ].map((p) => applyMat(m, p as Vec2));
        ctx.beginPath();
        sq.forEach((p, i) => {
          const s = toScreen(p);
          i === 0 ? ctx.moveTo(s[0], s[1]) : ctx.lineTo(s[0], s[1]);
        });
        ctx.closePath();
        ctx.fillStyle = C.fillAccent;
        ctx.fill();

        // data point-cloud — calm base dots, batched into a single fill
        ctx.fillStyle = C.dot;
        ctx.beginPath();
        for (const p of pts) {
          if (p.glow > 0.03) continue;
          const s = toScreen(applyMat(m, p.o));
          ctx.moveTo(s[0] + 1.3 * dpr, s[1]);
          ctx.arc(s[0], s[1], 1.3 * dpr, 0, Math.PI * 2);
        }
        ctx.fill();

        // …and the points currently mid-flare, each with an accent glow halo
        for (const p of pts) {
          if (p.glow <= 0.03) continue;
          const s = toScreen(applyMat(m, p.o));
          const g = p.glow;
          ctx.save();
          ctx.beginPath();
          ctx.arc(s[0], s[1], (1.6 + g * 2.6) * dpr, 0, Math.PI * 2);
          ctx.shadowBlur = g * 16 * dpr;
          ctx.shadowColor = C.accent;
          ctx.globalAlpha = 0.4 + g * 0.6;
          ctx.fillStyle = C.accent;
          ctx.fill();
          ctx.restore();
        }

        // basis vectors
        arrow(applyMat(m, [1, 0]), C.vecI); // î
        arrow(applyMat(m, [0, 1]), C.vecJ); // ĵ

        // origin
        const o = toScreen([0, 0]);
        ctx.fillStyle = C.fg;
        ctx.beginPath();
        ctx.arc(o[0], o[1], 3 * dpr, 0, Math.PI * 2);
        ctx.fill();
      };

      const writeReadout = () => {
        const m = view.m;
        cells[0].current && (cells[0].current.textContent = m[0].toFixed(2));
        cells[1].current && (cells[1].current.textContent = m[1].toFixed(2));
        cells[2].current && (cells[2].current.textContent = m[2].toFixed(2));
        cells[3].current && (cells[3].current.textContent = m[3].toFixed(2));
        detEl.current &&
          (detEl.current.textContent = determinant(m).toFixed(2));
        nameEl.current && (nameEl.current.textContent = view.name);
      };

      // re-read palette when the theme flips
      const onTheme = () => {
        C = readThemeTokens();
        if (reduced) draw();
      };
      document.addEventListener("themechange", onTheme);

      if (reduced) {
        view.m = IDENTITY;
        view.name = "IDENTITY";
        draw();
        writeReadout();
        return () => {
          ro.disconnect();
          document.removeEventListener("themechange", onTheme);
        };
      }

      // pointer parallax
      const onMove = (e: PointerEvent) => {
        const r = host.current!.getBoundingClientRect();
        pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      host.current!.addEventListener("pointermove", onMove);

      // rAF render loop (independent of the morph tween for buttery parallax)
      let raf = 0;
      // random firefly glow: every point slowly decays, with a small chance
      // each frame of igniting to near-full brightness.
      const tickGlow = () => {
        for (const p of pts) {
          p.glow *= 0.94;
          if (Math.random() < 0.0016) p.glow = 0.75 + Math.random() * 0.25;
        }
      };
      const loop = () => {
        pointer.tx += (pointer.x * 18 * dpr - pointer.tx) * 0.06;
        pointer.ty += (pointer.y * 18 * dpr - pointer.ty) * 0.06;
        tickGlow();
        draw();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      // the morph: one scalar walks through the transform list; matrix is the
      // lerp between the two it currently sits between.
      const prog = { t: 0 };
      const N = TRANSFORMS.length;
      const recompute = () => {
        const f = Math.floor(prog.t) % N;
        const c = (f + 1) % N;
        const frac = prog.t - Math.floor(prog.t);
        view.m = lerpMat(TRANSFORMS[f].m, TRANSFORMS[c].m, frac);
        view.name = frac < 0.5 ? TRANSFORMS[f].name : TRANSFORMS[c].name;
        writeReadout();
      };

      const tl = gsap.timeline({ repeat: -1 });
      for (let i = 0; i < N; i++) {
        tl.to(prog, {
          t: i + 1,
          duration: 2.4,
          ease: "power2.inOut",
          onUpdate: recompute,
        }).to({}, { duration: 0.7 }); // hold on each transform
      }

      return () => {
        cancelAnimationFrame(raf);
        tl.kill();
        ro.disconnect();
        document.removeEventListener("themechange", onTheme);
        host.current?.removeEventListener("pointermove", onMove);
      };
    },
    { scope: host }
  );

  return (
    <div ref={host} className="absolute inset-0">
      <canvas ref={canvas} className="block h-full w-full" />

      {/* live matrix readout */}
      <div className="pointer-events-none absolute bottom-5 right-5 select-none md:bottom-7 md:right-7">
        <div className="label mb-2 text-right">
          TRANSFORM = <span ref={nameEl} className="label-bright">IDENTITY</span>
        </div>
        <div className="flex items-stretch gap-2">
          <span className="w-[2px] bg-[var(--color-line-bright)]" />
          <div className="mono grid grid-cols-2 gap-x-5 gap-y-1 text-sm tabular-nums md:text-base">
            <span ref={cells[0]} className="text-[color:var(--color-vec-i)]">1.00</span>
            <span ref={cells[1]} className="text-[color:var(--color-vec-j)]">0.00</span>
            <span ref={cells[2]} className="text-[color:var(--color-vec-i)]">0.00</span>
            <span ref={cells[3]} className="text-[color:var(--color-vec-j)]">1.00</span>
          </div>
          <span className="w-[2px] bg-[var(--color-line-bright)]" />
        </div>
        <div className="label mt-2 text-right">
          det = <span ref={detEl} className="label-bright">1.00</span>
        </div>
      </div>
    </div>
  );
}
