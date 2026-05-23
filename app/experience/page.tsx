import type { Metadata } from "next";
import { Container, Section, Eyebrow, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { Timeline } from "@/components/timeline";
import { Programmes } from "@/components/programmes";
import { experiences, education, programmes, profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Experience",
  description: "Roles, education and the path so far.",
};

export default function ExperiencePage() {
  return (
    <>
      {/* ---------------------------------------------------- EXPERIENCE */}
      <Section>
        <Container className="py-16 md:py-24">
          <Reveal>
            <Eyebrow>Experience</Eyebrow>
            <h1 className="font-display mt-5 text-5xl sm:text-6xl md:text-7xl">
              The <span className="text-primary">path</span> so far.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Software engineering internships and student leadership across AI, health-tech,
              fintech and developer tooling.
            </p>
            <div className="mt-8">
              <ButtonLink href={profile.resumeUrl} variant="ghost" withArrow external>
                Download résumé
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12">
              <Timeline items={experiences} />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ----------------------------------------------------- EDUCATION */}
      <Section tone="invert">
        <Container className="py-16 md:py-24">
          <Reveal>
            <Eyebrow>Education</Eyebrow>
            <h2 className="font-display mt-5 text-4xl sm:text-5xl md:text-6xl">
              Where I <span className="text-primary">studied</span>.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              A computing degree in progress at NUS, built on an engineering foundation from
              Temasek Polytechnic.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12">
              <Timeline items={education} />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------- PROGRAMMES */}
      <Section>
        <Container className="py-16 md:py-24">
          <Reveal>
            <Eyebrow>Programmes</Eyebrow>
            <h2 className="font-display mt-5 text-4xl sm:text-5xl md:text-6xl">
              Programmes & <span className="text-primary">mentorships</span>.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Selective programmes and industry mentorships that shaped how I build — from NUS
              Orbital to fintech and business mentorship.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12">
              <Programmes items={programmes} />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
