import Link from "next/link";
import ScrambleHeading from "@/components/anim/ScrambleHeading";
import Counter from "@/components/anim/Counter";
import Reveal from "@/components/ui/Reveal";
import { type Project } from "@/content/site";
import { projectSlug } from "@/lib/content";

function Metrics({ items }: { items: Project["metrics"] }) {
  return (
    <div className="grid grid-cols-3 gap-px border border-[var(--color-line)] bg-[var(--color-line)]">
      {items.map((m) => (
        <div key={m.label} className="bg-[var(--color-bg)] px-3 py-3">
          <div className="display text-lg tabular-nums md:text-2xl">
            <Counter value={m.value} />
          </div>
          <div className="label mt-1.5">{m.label}</div>
        </div>
      ))}
    </div>
  );
}

function Tags({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {stack.map((s) => (
        <span
          key={s}
          className="mono border border-[var(--color-line)] px-2 py-1 text-[11px] text-[var(--color-muted-fg)] transition-colors group-hover:border-[var(--color-line-bright)]"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

/** Clickable project card — shared by the home Work grid and /work. */
export default function ProjectCard({ p }: { p: Project }) {
  const featured = !!p.featured;
  return (
    <Reveal y={56} className={`h-full ${featured ? "md:col-span-2" : "md:col-span-1"}`}>
      <Link
        href={`/work/${projectSlug(p)}`}
        className="group relative flex h-full flex-col bg-[var(--color-bg-raised)] p-6 transition-colors duration-150 hover:bg-[var(--color-muted)] md:p-8"
        data-cursor="hover"
      >
        <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[var(--color-accent-ink)] transition-transform duration-300 group-hover:scale-x-100" />

        <header className="flex items-center justify-between">
          <span className="mono text-sm text-[var(--color-accent-ink)]">{p.id}</span>
          <div className="flex items-center gap-4">
            <span className="label">{p.role}</span>
            <span className="mono text-sm text-[var(--color-muted-fg)]">{p.year}</span>
          </div>
        </header>

        <div className={featured ? "mt-8 grid gap-8 md:grid-cols-2" : "mt-8"}>
          <div className="flex flex-col">
            <ScrambleHeading
              text={p.title}
              as="h3"
              className={`display leading-tight ${
                featured ? "text-3xl md:text-5xl" : "text-2xl"
              }`}
            />
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-[var(--color-muted-fg)] md:text-base">
              {p.blurb}
            </p>
            <div className="mt-auto pt-6">
              <Tags stack={p.stack} />
            </div>
          </div>

          <div className={featured ? "flex flex-col justify-end" : "mt-6"}>
            <Metrics items={p.metrics} />
          </div>
        </div>

        <span className="label pointer-events-none absolute bottom-6 right-6 translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 md:bottom-8 md:right-8">
          OPEN ↗
        </span>
      </Link>
    </Reveal>
  );
}
