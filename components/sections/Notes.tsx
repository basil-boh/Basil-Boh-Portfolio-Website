import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import NoteRow from "@/components/notes/NoteRow";
import { getAllNotes } from "@/lib/notes";

export default function Notes() {
  const notes = getAllNotes();

  return (
    <section
      id="notes"
      className="relative z-10 scroll-mt-20 bg-[var(--color-bg)]"
    >
      <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8 md:py-28">
        <SectionHeader
          index="06"
          title="NOTES"
          kicker="THINGS I'VE WRITTEN DOWN"
        />

        <div className="mt-10 border-t border-[var(--color-line-bright)]">
          {notes.map((n) => (
            <NoteRow key={n.slug} note={n} />
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            href="/notes"
            data-cursor="hover"
            className="invert-hover panel inline-flex items-center gap-2 px-5 py-3"
          >
            <span className="label">ALL NOTES</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
