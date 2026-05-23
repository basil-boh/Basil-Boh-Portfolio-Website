import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { HackathonCard } from "@/components/cards";
import { hackathons } from "@/lib/data";

export const metadata: Metadata = {
  title: "Hackathons",
  description: "Hackathon wins, finals and the prototypes that became products.",
};

export default function HackathonsPage() {
  return (
    <Section>
      <Container className="py-16 md:py-24">
        <Reveal>
          <Eyebrow>Hackathons</Eyebrow>
          <h1 className="font-display mt-5 text-5xl sm:text-6xl md:text-7xl">
            One day, <span className="text-primary">one build</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            A 2nd-place finish and {hackathons.length} builds across Singapore&apos;s hackathon
            scene — several of which grew into real projects.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hackathons.map((h, i) => (
            <Reveal key={h.slug} delay={(i % 3) * 70}>
              <HackathonCard hackathon={h} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
