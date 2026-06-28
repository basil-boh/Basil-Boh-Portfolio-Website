"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const NODES = [
  { id: "Q", x: 34, y: 100, label: "QUERY" },
  { id: "R", x: 140, y: 52, label: "RETRIEVE" },
  { id: "V", x: 140, y: 148, label: "VECTORDB" },
  { id: "K", x: 246, y: 100, label: "RERANK" },
  { id: "L", x: 352, y: 52, label: "LLM" },
  { id: "A", x: 352, y: 148, label: "ANSWER" },
] as const;

const EDGES: [string, string][] = [
  ["Q", "R"],
  ["Q", "V"],
  ["R", "K"],
  ["V", "K"],
  ["K", "L"],
  ["L", "A"],
  ["K", "A"],
];

const pos = (id: string) => NODES.find((n) => n.id === id)!;
const FLOW = ["Q", "R", "K", "L", "A"].map(pos);

/**
 * An animated SVG of a RAG / orchestration graph: edges draw on with scroll,
 * nodes pop in, then an accent "token" flows through the pipeline on a loop.
 */
export default function NodeGraph({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const root = ref.current!;
      const edges = root.querySelectorAll<SVGPathElement>(".edge");
      const nodes = root.querySelectorAll<SVGGElement>(".node");
      const token = root.querySelector<SVGCircleElement>(".token");

      if (reduced) {
        gsap.set(edges, { strokeDashoffset: 0 });
        gsap.set(nodes, { opacity: 1, scale: 1 });
        gsap.set(token, { opacity: 0 });
        return;
      }

      gsap.set(edges, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(nodes, { opacity: 0, transformOrigin: "center", scale: 0.2 });
      gsap.set(token, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });

      tl.to(edges, {
        strokeDashoffset: 0,
        duration: 0.9,
        ease: "power2.inOut",
        stagger: 0.08,
      })
        .to(
          nodes,
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)", stagger: 0.06 },
          0.2
        )
        // token flows Q -> R -> K -> L -> A, forever
        .add(() => {
          const flow = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });
          flow.set(token, { opacity: 1, cx: FLOW[0].x, cy: FLOW[0].y });
          FLOW.slice(1).forEach((p) => {
            flow.to(token, { cx: p.x, cy: p.y, duration: 0.55, ease: "power1.inOut" });
          });
          flow.to(token, { opacity: 0, duration: 0.3 });
        });

      return () => tl.kill();
    },
    { scope: ref }
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 386 200"
      className={`draw w-full ${className ?? ""}`}
      fill="none"
      aria-label="Retrieval-augmented generation pipeline diagram"
      role="img"
    >
      {EDGES.map(([a, b], i) => {
        const p = pos(a);
        const q = pos(b);
        return (
          <path
            key={i}
            className="edge"
            d={`M${p.x} ${p.y} L${q.x} ${q.y}`}
            stroke="var(--color-line-bright)"
            strokeWidth={1.5}
            pathLength={1}
          />
        );
      })}

      <circle className="token" r={4.5} fill="var(--color-accent-ink)" />

      {NODES.map((n) => (
        <g className="node" key={n.id}>
          <rect
            x={n.x - 11}
            y={n.y - 11}
            width={22}
            height={22}
            stroke="var(--color-fg)"
            strokeWidth={1.5}
            fill="var(--color-bg)"
          />
          <text
            x={n.x}
            y={n.y + 3.5}
            textAnchor="middle"
            className="mono"
            fontSize={8}
            fill="var(--color-fg)"
          >
            {n.id}
          </text>
          <text
            x={n.x}
            y={n.y + 26}
            textAnchor="middle"
            className="mono"
            fontSize={6.5}
            letterSpacing={1}
            fill="var(--color-muted-fg)"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
