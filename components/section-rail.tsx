"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "hackathons", label: "Hackathons" },
  { id: "experience", label: "Experience" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

/** Fixed right-edge dot rail that tracks the active homepage section. */
export function SectionRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="section-rail" aria-label="Page sections">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`section-rail__item ${active === s.id ? "is-active" : ""}`}
          aria-current={active === s.id ? "true" : undefined}
        >
          <span className="section-rail__label">{s.label}</span>
          <span className="section-rail__dot" />
        </a>
      ))}
    </nav>
  );
}
