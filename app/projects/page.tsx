import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/cards";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects — payment rails, AI tooling and developer platforms.",
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section>
      <Container className="py-16 md:py-24">
        <Reveal>
          <Eyebrow>Selected work</Eyebrow>
          <h1 className="font-display mt-5 text-5xl sm:text-6xl md:text-7xl">
            Things I&apos;ve <span className="text-primary">built</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            From production payment infrastructure to open-source tooling — a catalogue of work,
            shipped and maintained.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <Reveal key={project.slug} className="md:col-span-2">
              <ProjectCard project={project} />
            </Reveal>
          ))}
          {rest.map((project, i) => (
            <Reveal key={project.slug} delay={i * 60}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
