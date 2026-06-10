"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; text: string; level: number };

/**
 * Sticky table of contents for an article. Reads the rendered h2/h3 inside
 * `.prose`, tracks the active section via IntersectionObserver, and offers
 * smooth in-page jumps. Renders nothing on short posts (no headings) or
 * narrow viewports (hidden via CSS).
 */
export function ArticleToc() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".prose h2, .prose h3"),
    ).filter((n) => n.id);
    const items = nodes.map((n) => ({
      id: n.id,
      text: n.textContent ?? "",
      level: n.tagName === "H3" ? 3 : 2,
    }));
    setHeadings(items);
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
        }
      },
      { rootMargin: "0px 0px -72% 0px", threshold: 0 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  if (headings.length < 2) return null;

  return (
    <aside className="article-toc" aria-label="On this page">
      <p className="article-toc__title">On this page</p>
      <ul>
        {headings.map((h) => (
          <li key={h.id} data-level={h.level}>
            <a
              href={`#${h.id}`}
              className={active === h.id ? "is-active" : ""}
              aria-current={active === h.id ? "true" : undefined}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
