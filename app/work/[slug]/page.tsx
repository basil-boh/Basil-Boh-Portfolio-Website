import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/site";
import { getProject, projectSlug } from "@/lib/content";
import Blocks from "@/components/reading/Blocks";
import Counter from "@/components/anim/Counter";
import Shot from "@/components/work/Shot";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: projectSlug(p) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const data = getProject(slug);
  if (!data) return {};
  return { title: `${data.project.title} — Work`, description: data.project.blurb };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const data = getProject(slug);
  if (!data) notFound();
  const { project: p, body, prev, next } = data;

  return (
    <article className="relative z-10 min-h-screen bg-[var(--color-bg)]">
      <div className="mx-auto max-w-4xl px-4 pb-24 pt-28 md:px-8 md:pt-36">
        <Link
          href="/work"
          data-cursor="hover"
          className="invert-hover label inline-block border border-[var(--color-line-bright)] px-3 py-2"
        >
          ← ALL PROJECTS
        </Link>

        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="mono text-sm text-[var(--color-accent-ink)]">{p.id}</span>
            <span className="label">{p.year}</span>
            <span className="label">{p.role}</span>
          </div>

          <h1 className="display mt-6 text-4xl leading-[1.02] md:text-7xl">
            {p.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted-fg)] md:text-xl">
            {p.blurb}
          </p>

          {p.repo && (
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="invert-hover panel mt-8 inline-flex items-center gap-2 px-5 py-3"
            >
              <span className="label">SOURCE ON GITHUB</span>
              <span aria-hidden>↗</span>
            </a>
          )}
        </header>

        {/* metrics */}
        <div className="mt-10 grid grid-cols-1 gap-px border border-[var(--color-line-bright)] bg-[var(--color-line-bright)] sm:grid-cols-3">
          {p.metrics.map((m) => (
            <div key={m.label} className="bg-[var(--color-bg)] px-5 py-5">
              <div className="display text-2xl tabular-nums md:text-4xl">
                <Counter value={m.value} />
              </div>
              <div className="label mt-2">{m.label}</div>
            </div>
          ))}
        </div>

        {/* captures from the project itself */}
        {p.shots && p.shots.length > 0 && (
          <section className="mt-14">
            <div className="label mb-4">/ CAPTURES</div>
            <div className="grid gap-px border border-[var(--color-line-bright)] bg-[var(--color-line-bright)]">
              {p.shots.map((s, i) => (
                <div key={s.src} className="bg-[var(--color-bg)] p-4 md:p-6">
                  <Shot
                    shot={s}
                    sizes="(max-width: 896px) 92vw, 848px"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="prose mt-14">
          <Blocks blocks={body} />
        </div>

        {/* the project's own slide deck, embedded and openable full-screen */}
        {p.deck && (
          <section className="mt-14">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <div className="label">/ SLIDE DECK</div>
              <a
                href={p.deck.src}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="label transition-colors hover:text-[var(--color-accent-ink)]"
              >
                OPEN FULL SCREEN ↗
              </a>
            </div>
            <div className="border border-[var(--color-line-bright)] p-4 md:p-6">
              <iframe
                src={p.deck.src}
                title={p.deck.title}
                loading="lazy"
                className="aspect-[16/10] min-h-[420px] w-full border border-[var(--color-line)] bg-[var(--color-muted)]"
              />
              {p.deck.note && (
                <p className="label mt-3 text-[10px]">{p.deck.note}</p>
              )}
            </div>
          </section>
        )}

        {/* stack */}
        <div className="mt-14 border-t border-[var(--color-line)] pt-8">
          <div className="label mb-4">/ STACK</div>
          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span
                key={s}
                className="mono border border-[var(--color-line)] px-2.5 py-1 text-xs text-[var(--color-muted-fg)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <nav className="mt-20 grid gap-px border border-[var(--color-line-bright)] bg-[var(--color-line-bright)] md:grid-cols-2">
          {prev ? (
            <Link
              href={`/work/${projectSlug(prev)}`}
              data-cursor="hover"
              className="invert-hover flex flex-col gap-2 bg-[var(--color-bg)] px-5 py-6"
            >
              <span className="label">← PREVIOUS</span>
              <span className="display text-lg">{prev.title}</span>
            </Link>
          ) : (
            <span className="bg-[var(--color-bg)]" />
          )}
          {next ? (
            <Link
              href={`/work/${projectSlug(next)}`}
              data-cursor="hover"
              className="invert-hover flex flex-col items-end gap-2 bg-[var(--color-bg)] px-5 py-6 text-right"
            >
              <span className="label">NEXT →</span>
              <span className="display text-lg">{next.title}</span>
            </Link>
          ) : (
            <span className="bg-[var(--color-bg)]" />
          )}
        </nav>
      </div>
    </article>
  );
}
