import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import type { NoteMeta } from "@/lib/notes";

/** A single clickable note row — shared by the home Notes section and /notes. */
export default function NoteRow({ note: n }: { note: NoteMeta }) {
  return (
    <Reveal y={24}>
      <Link
        href={`/notes/${n.slug}`}
        data-cursor="hover"
        className="invert-hover group line-b grid grid-cols-12 items-center gap-3 px-1 py-6 md:gap-6 md:px-3"
      >
        <span className="mono col-span-2 text-xs text-[var(--color-muted-fg)] md:col-span-1">
          {n.id || "N"}
        </span>

        <div className="col-span-10 md:col-span-6">
          <h3 className="display text-xl leading-tight md:text-3xl">{n.title}</h3>
          <p className="mt-2 hidden max-w-xl text-sm text-[var(--color-muted-fg)] group-hover:text-[var(--color-accent-fg)] md:block">
            {n.excerpt}
          </p>
        </div>

        <div className="col-span-8 col-start-3 flex flex-wrap gap-1.5 md:col-span-3 md:col-start-8">
          {n.tags.map((t) => (
            <span
              key={t}
              className="mono border border-[var(--color-line)] px-2 py-0.5 text-[10px] text-[var(--color-muted-fg)] group-hover:border-[var(--color-accent-fg)] group-hover:text-[var(--color-accent-fg)]"
            >
              #{t}
            </span>
          ))}
        </div>

        <div className="col-span-3 col-start-10 hidden text-right md:block">
          <div className="mono text-sm">{n.date}</div>
          <div className="label mt-1">{n.readingTime}</div>
        </div>

        <span className="col-span-1 hidden text-right text-xl md:block">↗</span>
      </Link>
    </Reveal>
  );
}
