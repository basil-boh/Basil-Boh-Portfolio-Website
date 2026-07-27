import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { hackathons, type Hackathon } from "@/content/site";

function ResultBadge({ h }: { h: Hackathon }) {
  if (h.isWin) {
    return (
      <span className="inline-flex items-center gap-2 bg-[var(--color-accent)] px-3.5 py-2 text-[var(--color-accent-fg)]">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
        <span className="mono text-sm font-bold uppercase tracking-wider">
          {h.result}
        </span>
      </span>
    );
  }
  return (
    <span className="label border border-[var(--color-line-bright)] px-2.5 py-1 text-[var(--color-fg)]">
      {h.result}
    </span>
  );
}

function Stack({ items }: { items: string[] }) {
  return (
    <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
      {items.map((s) => (
        <span
          key={s}
          className="mono border border-[var(--color-line)] px-2 py-1 text-[11px] text-[var(--color-muted-fg)]"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

function Card({ h }: { h: Hackathon }) {
  const featured = !!h.isWin;
  return (
    <Reveal y={48} className={`h-full ${featured ? "md:col-span-2" : ""}`}>
      <article className="group relative flex h-full flex-col bg-[var(--color-bg)] p-6 transition-colors duration-150 hover:bg-[var(--color-bg-raised)] md:p-8">
        {featured && (
          <span className="absolute inset-x-0 top-0 h-1 bg-[var(--color-accent)]" />
        )}
        <header className="flex items-start justify-between gap-4">
          <span className="mono text-sm text-[var(--color-accent-ink)]">{h.id}</span>
          <ResultBadge h={h} />
        </header>

        <div className={featured ? "mt-8 grid gap-8 md:grid-cols-2" : "mt-8 flex flex-1 flex-col"}>
          <div className="flex flex-col">
            <h3 className={`display leading-tight ${featured ? "text-3xl md:text-5xl" : "text-2xl"}`}>
              {h.event}
            </h3>
            <div className="mono mt-3 text-sm text-[var(--color-accent-ink)] md:text-base">
              {h.project}
            </div>
            <div className="label mt-2">
              {h.date} · {h.location}
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            <p className="max-w-prose text-sm leading-relaxed text-[var(--color-muted-fg)] md:text-base">
              {h.desc}
            </p>
            <Stack items={h.stack} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Hackathons() {
  return (
    <section
      id="hackathons"
      className="relative z-10 scroll-mt-20 bg-[var(--color-bg)]"
    >
      <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8 md:py-28">
        <SectionHeader
          index="03"
          title="HACKATHONS"
          kicker="6 BUILDS · 2 PODIUMS"
        />

        <div className="mt-12 grid gap-px border border-[var(--color-line-bright)] bg-[var(--color-line-bright)] md:grid-cols-2">
          {hackathons.map((h) => (
            <Card key={h.id} h={h} />
          ))}
        </div>
      </div>
    </section>
  );
}
