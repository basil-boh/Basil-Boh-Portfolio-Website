import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/work/ProjectCard";
import { projects } from "@/content/site";

export default function Projects() {
  return (
    <section
      id="work"
      className="relative z-10 scroll-mt-20 bg-[var(--color-bg)]"
    >
      <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8 md:py-28">
        <SectionHeader
          index="02"
          title="PROJECTS"
          kicker={`${projects.length} BUILDS / SYSTEMS + AI`}
        />

        <div className="mt-12 grid gap-px border border-[var(--color-line-bright)] bg-[var(--color-line-bright)] md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            href="/work"
            data-cursor="hover"
            className="invert-hover panel inline-flex items-center gap-2 px-5 py-3"
          >
            <span className="label">ALL PROJECTS</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
