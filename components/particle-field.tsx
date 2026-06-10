"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

/**
 * Interactive constellation network for the hero. Glowing points drift
 * through space, draw links to their neighbours, and are pushed apart by
 * the cursor (which also wires itself into the nearest nodes). Pure 2D
 * canvas — DPR-aware, pauses when the tab is hidden, and degrades to a
 * single static frame under `prefers-reduced-motion`.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const dark = resolvedTheme === "dark";
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- palette (indigo on both themes; brighter + glowing in the dark) ----
    const node = dark ? "130,136,255" : "73,79,223";
    const link = dark ? "120,126,245" : "73,79,223";
    const spark = dark ? "138,180,255" : "73,79,223";
    const linkAlpha = dark ? 0.55 : 0.42;
    const sparkAlpha = dark ? 0.7 : 0.62;
    const dotAlpha = dark ? 0.95 : 0.74;
    const glow = dark ? 7 : 4;

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    const CONNECT = 132;
    const MOUSE_R = 168;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let dots: P[] = [];
    const mouse = { x: -9999, y: -9999, active: false };

    function seed() {
      const count = Math.min(96, Math.max(26, Math.floor((width * height) / 13000)));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        r: 1 + Math.random() * 1.7,
      }));
    }

    function resize() {
      const rect = parent!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of dots) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_R * MOUSE_R) {
            const d = Math.sqrt(d2) || 1;
            const f = ((MOUSE_R - d) / MOUSE_R) * 1.8;
            p.x += (dx / d) * f;
            p.y += (dy / d) * f;
          }
        }
      }

      // links between neighbours
      ctx!.lineWidth = 1;
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < CONNECT) {
            ctx!.strokeStyle = `rgba(${link},${(1 - d / CONNECT) * linkAlpha})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
        // wire into the cursor
        if (mouse.active) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE_R) {
            ctx!.strokeStyle = `rgba(${spark},${(1 - d / MOUSE_R) * sparkAlpha})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(mouse.x, mouse.y);
            ctx!.stroke();
          }
        }
      }

      // nodes
      ctx!.shadowBlur = glow;
      ctx!.shadowColor = `rgba(${node},0.9)`;
      for (const p of dots) {
        ctx!.fillStyle = `rgba(${node},${dotAlpha})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.shadowBlur = 0;
    }

    function loop() {
      if (!running) return;
      draw();
      raf = requestAnimationFrame(loop);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      mouse.x = x;
      mouse.y = y;
    }
    function onPointerLeave() {
      mouse.active = false;
    }
    function onVisibility() {
      running = !document.hidden && !reduce;
      if (running) loop();
      else cancelAnimationFrame(raf);
    }

    resize();

    if (reduce) {
      draw(); // one static frame, no animation, no cursor wiring
    } else {
      const ro = new ResizeObserver(resize);
      ro.observe(parent);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
      document.addEventListener("visibilitychange", onVisibility);
      loop();
      return () => {
        running = false;
        cancelAnimationFrame(raf);
        ro.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerleave", onPointerLeave);
        document.removeEventListener("visibilitychange", onVisibility);
      };
    }
  }, [resolvedTheme]);

  return (
    <div className="hero-field" aria-hidden>
      <div className="hero-field__static" />
      <canvas ref={canvasRef} className="hero-field__canvas" />
      <div className="hero-field__fade" />
    </div>
  );
}
