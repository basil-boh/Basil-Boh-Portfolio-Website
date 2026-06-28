"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";
import ThemeToggle from "@/components/layout/ThemeToggle";

export const SECTIONS = [
  { id: "about", index: "01", label: "ABOUT" },
  { id: "work", index: "02", label: "PROJECTS" },
  { id: "hackathons", index: "03", label: "HACKATHONS" },
  { id: "experience", index: "04", label: "EXPERIENCE" },
  { id: "education", index: "05", label: "EDUCATION" },
  { id: "notes", index: "06", label: "NOTES" },
  { id: "contact", index: "07", label: "CONTACT" },
] as const;

export default function Nav() {
  const bar = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    if (!bar.current) return;
    // scroll-progress fill
    gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* scroll progress */}
      <div
        ref={bar}
        className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-[var(--color-accent-ink)]"
      />

      <div className="line-b bg-bg/75 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 md:px-8">
          {/* brand */}
          <a
            href="/#top"
            data-cursor="hover"
            className="group flex items-center gap-3"
            aria-label={`${site.name}, back to top`}
          >
            <Image
              src="/svg/logo.svg"
              alt=""
              width={26}
              height={26}
              aria-hidden
              className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90"
            />
            <span className="mono text-sm font-medium tracking-widest">
              {site.name}
            </span>
          </a>

          {/* desktop nav */}
          <ul className="hidden items-center gap-1 xl:flex">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`/#${s.id}`}
                  data-cursor="hover"
                  className="invert-hover flex items-baseline gap-1.5 border border-transparent px-3 py-1.5"
                >
                  <span className="label">{s.index}</span>
                  <span className="mono text-xs tracking-wide">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* status + mobile toggle */}
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 md:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent-ink)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-ink)]" />
              </span>
              <span className="label label-bright">{site.status}</span>
            </span>

            <ThemeToggle />

            <button
              onClick={() => setOpen((v) => !v)}
              data-cursor="hover"
              aria-expanded={open}
              aria-label="Toggle menu"
              className="invert-hover panel flex h-9 items-center gap-2 px-3 xl:hidden"
            >
              <span className="label">{open ? "CLOSE" : "MENU"}</span>
            </button>
          </div>
        </nav>
      </div>

      {/* mobile overlay */}
      {open && (
        <div className="line-b bg-bg/95 backdrop-blur-md xl:hidden">
          <ul className="mx-auto max-w-[1600px] px-4 py-2">
            {SECTIONS.map((s) => (
              <li key={s.id} className="line-b last:border-0">
                <a
                  href={`/#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="invert-hover flex items-baseline gap-3 px-2 py-4"
                >
                  <span className="label">{s.index}</span>
                  <span className="display text-2xl">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
