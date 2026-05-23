import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Github, Globe } from "lucide-react";
import { Container, Section, Tag, ButtonLink, Eyebrow } from "@/components/ui";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectCard, AwardBadge } from "@/components/cards";
import { getProjectBySlug, getProjectSlugs, projects, accentVar } from "@/lib/data";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline ?? project.summary,
    openGraph: {
      title: project.title,
      description: project.tagline ?? project.summary,
      type: "article",
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const more = projects.filter((p) => p.slug !== slug).slice(0, 3);
  const accent = accentVar[project.accent];

  return (
    <Section>
      <Container className="py-14 md:py-20">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>

        {/* Header */}
        <div className="mt-10 max-w-3xl">
          <span className="label inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
            {project.role} · {project.year}
          </span>
          {project.award ? (
            <div className="mt-4">
              <AwardBadge label={project.award} accent={project.accent} />
            </div>
          ) : null}
          <h1 className="font-display mt-5 text-5xl leading-[1] sm:text-6xl">{project.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted md:text-xl">
            {project.tagline ?? project.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            {project.links.live ? (
              <ButtonLink href={project.links.live} variant="accent" external withArrow>
                <Globe className="h-[18px] w-[18px]" /> Visit live
              </ButtonLink>
            ) : null}
            {project.links.repo ? (
              <ButtonLink href={project.links.repo} variant="ghost" external>
                <Github className="h-[18px] w-[18px]" /> Source
              </ButtonLink>
            ) : null}
          </div>
        </div>

        {/* Hero media */}
        {project.image ? (
          <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-[24px] border border-border bg-surface">
            <Image
              src={project.image}
              alt={`${project.title} cover`}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              unoptimized={project.image.endsWith(".gif")}
              className="object-cover"
            />
          </div>
        ) : null}

        {/* Metrics */}
        {project.metrics ? (
          <div className="mt-12 grid grid-cols-2 gap-y-8 border-y border-border py-8 sm:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-display text-3xl md:text-4xl">{m.value}</div>
                <div className="mt-1 text-sm text-muted">{m.label}</div>
              </div>
            ))}
          </div>
        ) : null}

        {/* Overview */}
        {project.overview ? (
          <div className="mt-14 max-w-3xl">
            <Eyebrow>Overview</Eyebrow>
            <div className="mt-5 space-y-5 text-lg leading-relaxed text-muted">
              {project.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-14 max-w-3xl">
            <Eyebrow>Overview</Eyebrow>
            <p className="mt-5 text-lg leading-relaxed text-muted">{project.description}</p>
          </div>
        )}

        {/* Engineering highlights */}
        {project.highlights && project.highlights.length > 0 ? (
          <div className="mt-16">
            <Eyebrow>Engineering highlights</Eyebrow>
            <div className="mt-6 grid gap-px overflow-hidden rounded-[20px] border border-border bg-border md:grid-cols-2">
              {project.highlights.map((h) => (
                <div key={h.title} className="bg-background p-7">
                  <h3 className="font-display text-xl">{h.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{h.blurb}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Features */}
        {project.features && project.features.length > 0 ? (
          <div className="mt-16 max-w-3xl">
            <Eyebrow>What it does</Eyebrow>
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Tech stack */}
        {project.techStack && project.techStack.length > 0 ? (
          <div className="mt-16">
            <Eyebrow>Tech stack</Eyebrow>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {project.techStack.map((group) => (
                <div key={group.category}>
                  <p className="text-sm font-semibold">{group.category}</p>
                  <ul className="mt-3 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 ? (
          <div className="mt-16">
            <Eyebrow>Screenshots</Eyebrow>
            <div className="mt-8">
              <ProjectGallery shots={project.gallery} />
            </div>
          </div>
        ) : null}

        {/* Video embed */}
        {project.videoEmbed ? (
          <div className="mt-16">
            <Eyebrow>Demo</Eyebrow>
            <div className="mt-6 aspect-video w-full overflow-hidden rounded-[20px] border border-border bg-surface">
              <iframe
                src={project.videoEmbed}
                title={`${project.title} demo`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        ) : null}

        {/* Notes — rendered in the same prose style as the articles */}
        {project.notes && project.notes.length > 0 ? (
          <div className="mt-16 max-w-2xl">
            <Eyebrow>Notes</Eyebrow>
            <div className="prose prose-lg mt-6 max-w-none">
              {project.notes.map((n, i) => (
                <p key={i}>{n}</p>
              ))}
            </div>
          </div>
        ) : null}
      </Container>

      {/* More projects */}
      <div className="tone-invert bg-background text-foreground">
        <Container className="py-16 md:py-24">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl md:text-4xl">More projects</h2>
            <ButtonLink href="/projects" variant="ghost" withArrow>
              View all
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {more.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
}
