import Link from "next/link";
import Image from "next/image";
import { ArrowDown, MapPin, Sparkles } from "lucide-react";
import { Container, Section, SectionHeader, ButtonLink, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { Marquee } from "@/components/marquee";
import { ProjectCard, HackathonCard, ArticleCard } from "@/components/cards";
import { Timeline } from "@/components/timeline";
import { profile, stats, projects, hackathons, experiences } from "@/lib/data";
import { getAllArticles } from "@/lib/articles";

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured).concat(
    projects.filter((p) => !p.featured).slice(0, 2),
  );
  const topHackathons = hackathons.slice(0, 3);
  const articles = getAllArticles().slice(0, 3);

  return (
    <>
      {/* ---------------------------------------------------------- HERO */}
      <Section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-primary/15 blur-[120px]" />
        <Container className="relative pb-20 pt-16 md:pb-28 md:pt-24">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border hairline bg-surface px-4 py-2 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
              </span>
              <span className="text-muted">
                {profile.available ? "Available for new work" : "Currently heads-down"} · {profile.location}
              </span>
            </div>
          </Reveal>

          <div className="mt-8 grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <Reveal delay={80}>
              <h1 className="font-display">
                <span className="block text-2xl font-normal text-muted sm:text-3xl">Hi, I&apos;m</span>
                <span className="mt-2 block whitespace-nowrap text-[clamp(2.5rem,8vw,6.5rem)] leading-[1.02]">
                  {profile.name}
                  <span className="text-primary">.</span>
                </span>
              </h1>
            </Reveal>

            {/* Display picture — circular, sits to the right of the name */}
            <Reveal delay={160}>
              <div className="relative mx-auto w-[240px] sm:w-[280px] md:mx-0 md:w-[300px]">
                <div className="pointer-events-none absolute -inset-6 rounded-full bg-primary/25 blur-3xl" />
                <div className="relative aspect-square overflow-hidden rounded-full border border-border bg-surface">
                  <Image
                    src={profile.photo}
                    alt={profile.name}
                    width={640}
                    height={640}
                    priority
                    className="h-full w-full object-cover object-[center_25%]"
                  />
                </div>
                <span className="absolute -bottom-1 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                  <MapPin className="h-3.5 w-3.5" />
                  {profile.location}
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={220}>
            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="max-w-xl text-lg leading-relaxed text-muted md:text-xl">
                {profile.tagline}
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/projects" variant="accent" withArrow>
                  View work
                </ButtonLink>
                <ButtonLink href="/articles" variant="ghost">
                  Read writing
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-14 flex items-center gap-6 text-sm text-muted">
              <Link href="#work" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
                <ArrowDown className="h-4 w-4 animate-bounce" />
                Scroll to explore
              </Link>
              <span className="hidden h-px flex-1 bg-border sm:block" />
              <div className="hidden gap-5 sm:flex">
                {profile.socials.slice(0, 3).map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>

        <Marquee />
      </Section>

      {/* --------------------------------------------------------- STATS */}
      <Section tone="invert">
        <Container className="py-16 md:py-24">
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:flex lg:justify-between lg:gap-x-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="text-center">
                  <div className="font-display text-5xl md:text-6xl">{s.value}</div>
                  <div className="mt-2 text-sm text-muted">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- WORK */}
      <Section id="work">
        <Container className="py-20 md:py-28">
          <Reveal>
            <SectionHeader
              eyebrow="Selected work"
              title={
                <>
                  Products I&apos;ve <span className="text-primary">shipped</span>
                </>
              }
              description="A few things I've designed, built and taken to production — from payment rails to AI tooling."
              action={<ButtonLink href="/projects" variant="ghost" withArrow>All projects</ButtonLink>}
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 80} className={project.featured ? "md:col-span-2" : ""}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------- HACKATHONS */}
      <Section tone="invert">
        <Container className="py-20 md:py-28">
          <Reveal>
            <SectionHeader
              eyebrow="Hackathons"
              title={
                <>
                  Built fast, <span className="text-primary">shipped real</span>
                </>
              }
              description="36-hour sprints are where most of my best ideas start — including a 2nd-place finish at Ralphthon @SG 2026."
              action={<ButtonLink href="/hackathons" variant="ghost" withArrow>All hackathons</ButtonLink>}
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {topHackathons.map((h, i) => (
              <Reveal key={h.slug} delay={i * 80}>
                <HackathonCard hackathon={h} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------- EXPERIENCE */}
      <Section>
        <Container className="py-20 md:py-28">
          <Reveal>
            <SectionHeader
              eyebrow="Experience"
              title="Where I've worked"
              description="Software engineering internships across AI, health-tech and internal tooling — alongside student leadership at NUS."
              action={<ButtonLink href="/experience" variant="ghost" withArrow>Full timeline</ButtonLink>}
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10">
              <Timeline items={experiences.slice(0, 3)} />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ----------------------------------------------------- WRITING */}
      <Section tone="invert">
        <Container className="py-20 md:py-28">
          <Reveal>
            <SectionHeader
              eyebrow="Writing"
              title="Notes & essays"
              description="Long-form thinking on systems, payments and the craft of building."
              action={<ButtonLink href="/articles" variant="ghost" withArrow>All articles</ButtonLink>}
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- CTA */}
      <Section>
        <Container className="py-24 md:py-36">
          <Reveal>
            <div className="card flex flex-col items-center gap-8 p-12 text-center md:p-20">
              <Eyebrow>Let&apos;s talk</Eyebrow>
              <h2 className="font-display max-w-3xl text-5xl leading-[0.95] md:text-7xl">
                Got something worth <span className="text-primary">building?</span>
              </h2>
              <p className="max-w-lg text-lg text-muted">
                I&apos;m always up for an interesting problem — whether it&apos;s an internship, a
                freelance build, or a weekend hack.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <ButtonLink href={`mailto:${profile.email}`} variant="accent" withArrow external>
                  <Sparkles className="h-[18px] w-[18px]" /> Get in touch
                </ButtonLink>
                <ButtonLink href={profile.resumeUrl} variant="ghost" external>
                  Download résumé
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
