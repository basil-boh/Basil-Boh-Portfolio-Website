import type { Metadata } from "next";
import Link from "next/link";
import ProjectCard from "@/components/work/ProjectCard";
import { projects } from "@/content/site";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Projects — ${site.name}`,
  description: "Selected builds across high-performance systems and applied AI.",
};

export default function WorkIndex() {
  return (
    <section className="relative z-10 min-h-screen bg-[var(--color-bg)]">
      <div className="mx-auto max-w-[1600px] px-4 pb-24 pt-28 md:px-8 md:pt-36">
        <Link
          href="/#work"
          data-cursor="hover"
          className="invert-hover label inline-block border border-[var(--color-line-bright)] px-3 py-2"
        >
          ← HOME
        </Link>

        <div className="mt-10 line-b flex flex-wrap items-end justify-between gap-4 pb-5">
          <div className="flex items-end gap-4 md:gap-6">
            <span className="mono mb-1 text-sm text-[var(--color-muted-fg)]">02</span>
            <h1 className="display d-xl">PROJECTS</h1>
          </div>
          <span className="label mb-2">{projects.length} BUILDS</span>
        </div>

        <div className="mt-12 grid gap-px border border-[var(--color-line-bright)] bg-[var(--color-line-bright)] md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
