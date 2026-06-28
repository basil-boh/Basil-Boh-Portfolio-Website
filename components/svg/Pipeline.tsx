"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// 4 pooled lanes; packets flow left (ingress queue) → right (database sink).
const LANES = [48, 84, 120, 156];
const X0 = 60; // lane start (after the queue)
const X1 = 286; // lane end (the pool bus)
const DIST = X1 - X0;

// per-lane packet timings → staggered, varied speed = visible concurrency
const PACKETS = LANES.flatMap((y, lane) =>
  [0, 1, 2].map((k) => ({
    y,
    dur: [1.7, 2.1, 1.5, 1.9][lane],
    delay: k * ([1.7, 2.1, 1.5, 1.9][lane] / 3) + lane * 0.18,
  }))
);

const QUEUE = [44, 70, 96, 122, 148]; // ingress request y-positions

/**
 * High-performance-systems motif: an animated SVG of a connection pool /
 * async pipeline. The structure draws on with scroll, the ingress queue pops
 * in, then accent packets stream concurrently across the pooled lanes into a
 * database that pulses under load. Static under reduced motion.
 */
export default function Pipeline({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const root = ref.current!;
      const structure = root.querySelectorAll<SVGPathElement>(".draw-on");
      const queue = root.querySelectorAll<SVGRectElement>(".req");
      const packets = root.querySelectorAll<SVGRectElement>(".packet");
      const pulse = root.querySelector(".db-pulse");

      if (reduced) {
        gsap.set(structure, { strokeDashoffset: 0 });
        gsap.set(queue, { opacity: 1, scale: 1 });
        gsap.set(packets, { opacity: 0 });
        gsap.set(pulse, { opacity: 0 });
        return;
      }

      gsap.set(structure, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(queue, { opacity: 0, scale: 0, transformOrigin: "center" });
      gsap.set(packets, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });

      tl.to(structure, {
        strokeDashoffset: 0,
        duration: 0.9,
        ease: "power2.inOut",
        stagger: 0.05,
      })
        .to(
          queue,
          { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", stagger: 0.06 },
          0.2
        )
        .add(() => {
          // packets stream forever across the lanes
          packets.forEach((p, i) => {
            const { dur, delay } = PACKETS[i];
            gsap.fromTo(
              p,
              { x: 0, opacity: 1 },
              {
                x: DIST,
                duration: dur,
                ease: "none",
                repeat: -1,
                delay,
                immediateRender: true,
              }
            );
          });
          // database pulses under load
          gsap.fromTo(
            pulse,
            { opacity: 0.05, scale: 0.85, transformOrigin: "center" },
            {
              opacity: 0.5,
              scale: 1.12,
              duration: 0.7,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            }
          );
        });

      return () => {
        tl.kill();
        gsap.killTweensOf([packets, pulse]);
      };
    },
    { scope: ref }
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 386 200"
      className={`draw w-full ${className ?? ""}`}
      fill="none"
      aria-label="Connection pool and async throughput pipeline diagram"
      role="img"
    >
      {/* ingress queue */}
      {QUEUE.map((y, i) => (
        <rect
          key={i}
          className="req"
          x={20}
          y={y - 6}
          width={12}
          height={12}
          stroke="var(--color-fg)"
          strokeWidth={1.5}
          fill="var(--color-bg)"
        />
      ))}
      <text
        x={26}
        y={178}
        textAnchor="middle"
        className="mono"
        fontSize={7}
        letterSpacing={1}
        fill="var(--color-muted-fg)"
      >
        REQ
      </text>

      {/* pooled lanes */}
      {LANES.map((y, i) => (
        <path
          key={i}
          className="draw-on"
          d={`M${X0} ${y} L${X1} ${y}`}
          stroke="var(--color-line-bright)"
          strokeWidth={1.5}
          pathLength={1}
        />
      ))}

      {/* pool bus */}
      <path
        className="draw-on"
        d={`M${X1} 40 L${X1} 164`}
        stroke="var(--color-fg)"
        strokeWidth={1.5}
        pathLength={1}
      />
      <text
        x={X1}
        y={184}
        textAnchor="middle"
        className="mono"
        fontSize={7}
        letterSpacing={1}
        fill="var(--color-muted-fg)"
      >
        POOL
      </text>

      {/* feed pipe to db */}
      <path
        className="draw-on"
        d={`M${X1} 102 L320 102`}
        stroke="var(--color-line-bright)"
        strokeWidth={1.5}
        pathLength={1}
      />

      {/* database sink (pulse glow behind, then outline) */}
      <ellipse
        className="db-pulse"
        cx={348}
        cy={102}
        rx={20}
        ry={26}
        fill="var(--color-accent-ink)"
      />
      <path
        className="draw-on"
        d="M334 86 a14 5 0 0 0 28 0 M334 86 a14 5 0 0 1 28 0 v32 a14 5 0 0 1 -28 0 z M334 102 a14 5 0 0 0 28 0"
        stroke="var(--color-fg)"
        strokeWidth={1.5}
        pathLength={1}
      />
      <text
        x={348}
        y={150}
        textAnchor="middle"
        className="mono"
        fontSize={7}
        letterSpacing={1}
        fill="var(--color-muted-fg)"
      >
        DB
      </text>

      {/* in-flight packets */}
      {PACKETS.map((p, i) => (
        <rect
          key={i}
          className="packet"
          x={X0}
          y={p.y - 3}
          width={6}
          height={6}
          fill="var(--color-accent-ink)"
        />
      ))}
    </svg>
  );
}
