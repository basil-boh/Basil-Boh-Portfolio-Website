import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllNotes, getNote, getAdjacentNotes } from "@/lib/notes";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const data = getNote(slug);
  if (!data) return {};
  return { title: `${data.meta.title} — Notes`, description: data.meta.excerpt };
}

export default async function NotePage({ params }: Params) {
  const { slug } = await params;
  const data = getNote(slug);
  if (!data) notFound();
  const { meta, content } = data;
  const { prev, next } = getAdjacentNotes(slug);

  return (
    <article className="relative z-10 min-h-screen bg-[var(--color-bg)]">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-28 md:px-8 md:pt-36">
        <Link
          href="/notes"
          data-cursor="hover"
          className="invert-hover label inline-block border border-[var(--color-line-bright)] px-3 py-2"
        >
          ← ALL NOTES
        </Link>

        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {meta.id && (
              <span className="mono text-sm text-[var(--color-accent-ink)]">
                {meta.id}
              </span>
            )}
            <span className="label">{meta.date}</span>
            <span className="label">{meta.readingTime} READ</span>
            <div className="flex flex-wrap gap-1.5">
              {meta.tags.map((t) => (
                <span
                  key={t}
                  className="mono border border-[var(--color-line)] px-2 py-0.5 text-[10px] text-[var(--color-muted-fg)]"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-[1.06] tracking-tight md:text-6xl">
            {meta.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted-fg)] md:text-xl">
            {meta.excerpt}
          </p>
        </header>

        <div className="prose mt-14">
          <MDXRemote source={content} />
        </div>

        <nav className="mt-20 grid gap-px border border-[var(--color-line-bright)] bg-[var(--color-line-bright)] md:grid-cols-2">
          {prev ? (
            <Link
              href={`/notes/${prev.slug}`}
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
              href={`/notes/${next.slug}`}
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
