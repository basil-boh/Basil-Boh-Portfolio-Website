import type { Metadata } from "next";
import Link from "next/link";
import NoteRow from "@/components/notes/NoteRow";
import { getAllNotes } from "@/lib/notes";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Notes — ${site.name}`,
  description: "Writing on high-performance systems, AI infrastructure, and statistics.",
};

export default function NotesIndex() {
  const notes = getAllNotes();

  return (
    <section className="relative z-10 min-h-screen bg-[var(--color-bg)]">
      <div className="mx-auto max-w-[1600px] px-4 pb-24 pt-28 md:px-8 md:pt-36">
        <Link
          href="/#notes"
          data-cursor="hover"
          className="invert-hover label inline-block border border-[var(--color-line-bright)] px-3 py-2"
        >
          ← HOME
        </Link>

        <div className="mt-10 line-b flex flex-wrap items-end justify-between gap-4 pb-5">
          <div className="flex items-end gap-4 md:gap-6">
            <span className="mono mb-1 text-sm text-[var(--color-muted-fg)]">06</span>
            <h1 className="display d-xl">NOTES</h1>
          </div>
          <span className="label mb-2">{notes.length} ENTRIES</span>
        </div>

        <div className="mt-8 border-t border-[var(--color-line-bright)]">
          {notes.map((n) => (
            <NoteRow key={n.slug} note={n} />
          ))}
        </div>
      </div>
    </section>
  );
}
