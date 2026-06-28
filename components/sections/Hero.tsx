"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import MatrixField from "@/components/anim/MatrixField";
import MagneticButton from "@/components/anim/MagneticButton";
import { site } from "@/content/site";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced || !root.current) return;

      const q = gsap.utils.selector(root);
      const name = SplitText.create(q(".hero-name"), {
        type: "chars",
        charsClass: "hero-char",
      });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(q(".hero-top > *"), {
        yPercent: -120,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.06,
      })
        .from(
          name.chars,
          {
            yPercent: 120,
            opacity: 0,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.03,
          },
          "-=0.4"
        )
        .to(
          q(".hero-role"),
          {
            duration: 1,
            ease: "none",
            scrambleText: {
              text: site.role,
              chars: "01<>/=+",
              revealDelay: 0.2,
              speed: 0.5,
            },
          },
          "-=0.5"
        )
        .from(
          q(".hero-fade"),
          { y: 24, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" },
          "-=0.6"
        );

      // gentle parallax drift of the foreground as you scroll out of hero
      gsap.to(q(".hero-fg"), {
        yPercent: 18,
        opacity: 0.0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => name.revert();
    },
    { scope: root }
  );

  const words = site.name.split(" ");

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* live linear-transformation canvas */}
      <MatrixField />

      {/* legibility wash (theme-aware) */}
      <div className="hero-wash pointer-events-none absolute inset-0" />

      <div className="hero-fg relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-4 pb-10 pt-24 md:px-8">
        {/* top meta row */}
        <div className="hero-top flex items-start justify-between">
          <span className="label">PORTFOLIO / 2026</span>
          <span className="label hidden text-right md:block">
            {site.location} · {site.status}
          </span>
        </div>

        {/* headline block */}
        <div className="mt-auto">
          <p className="hero-role mono mb-5 text-sm tracking-[0.2em] text-[var(--color-accent-ink)] md:text-base">
            {site.role}
          </p>

          <h1 className="hero-name display d-hero">
            {words.map((w, i) => (
              <span key={i} className="block">
                {w}
              </span>
            ))}
          </h1>

          <p className="hero-fade mono mt-7 max-w-xl text-sm leading-relaxed text-[var(--color-muted-fg)] md:text-base">
            {site.tagline}
          </p>

          <div className="hero-fade mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton
              href="#work"
              className="invert-hover panel px-6 py-3"
              ariaLabel="View selected work"
            >
              <span className="label">VIEW WORK</span>
              <span aria-hidden>↘</span>
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="px-4 py-3 text-[var(--color-muted-fg)] transition-colors hover:text-[var(--color-fg)]"
              ariaLabel="Get in touch"
            >
              <span className="mono text-xs tracking-widest">GET IN TOUCH</span>
            </MagneticButton>
          </div>
        </div>

        {/* bottom cue */}
        <div className="mt-12 flex items-center justify-between">
          <span className="label flex items-center gap-2">
            <span className="inline-block animate-bounce">↓</span> SCROLL
          </span>
          <span className="label hidden md:block">
            î = BASIS-X · ĵ = BASIS-Y · LIVE 2×2 MAP
          </span>
        </div>
      </div>
    </section>
  );
}
