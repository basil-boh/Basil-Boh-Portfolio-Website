"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { experience } from "@/content/site";

export default function Experience() {
  const root = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced || !fill.current) return;

      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 60%",
            end: "bottom 75%",
            scrub: true,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section
      id="experience"
      className="relative z-10 scroll-mt-20 bg-[var(--color-bg)]"
    >
      <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8 md:py-28">
        <SectionHeader
          index="04"
          title="EXPERIENCE"
          kicker="WHERE I'VE SHIPPED"
        />

        <div ref={root} className="relative mt-12 pl-8 md:pl-12">
          {/* rail */}
          <div className="absolute bottom-0 left-0 top-2 w-px bg-[var(--color-line)] md:left-2">
            <div
              ref={fill}
              className="absolute inset-0 origin-top bg-[var(--color-accent)]"
            />
          </div>

          <ol className="space-y-px">
            {experience.map((e) => (
              <li key={e.org}>
                <Reveal>
                  <div className="group relative grid gap-5 py-8 md:grid-cols-12 md:gap-8">
                    {/* node */}
                    <span className="absolute -left-8 top-9 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:-left-10">
                      <span className="h-3 w-3 border-2 border-[var(--color-accent)] bg-[var(--color-bg)] transition-colors duration-200 group-hover:bg-[var(--color-accent)]" />
                    </span>

                    <div className="md:col-span-4">
                      <div className="label mb-3">{e.period}</div>
                      <h3 className="display text-2xl md:text-3xl">{e.org}</h3>
                      <div className="mono mt-2 text-sm text-[var(--color-muted-fg)]">
                        {e.location}
                      </div>
                    </div>

                    <div className="md:col-span-8">
                      <div className="mono text-sm text-[var(--color-accent-ink)]">
                        {e.role}
                      </div>
                      <ul className="mt-4 space-y-2.5">
                        {e.points.map((pt, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-sm leading-relaxed text-[var(--color-muted-fg)] md:text-base"
                          >
                            <span className="mono mt-1 text-[var(--color-line-bright)]">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {e.stack.map((s) => (
                          <span
                            key={s}
                            className="mono border border-[var(--color-line)] px-2 py-1 text-[11px] text-[var(--color-muted-fg)]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
