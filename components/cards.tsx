import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github, Globe, Sparkles, Trophy } from "lucide-react";
import { accentVar, type Accent, type Hackathon, type Project } from "@/lib/data";
import type { ArticleMeta } from "@/lib/articles";
import { formatDate } from "@/lib/articles";
import { Tag } from "./ui";

/* --------------------------------------------------------------- AwardBadge
   Trophy pill matching the hackathon win badge — accent fill, dark text. */
export function AwardBadge({
  label,
  accent,
  className = "",
}: {
  label: string;
  accent: Accent;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${className}`}
      style={{ background: accentVar[accent], color: "#0b0b0d" }}
    >
      <Trophy className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

/* ----------------------------------------------------------------- Mockup
   The ONLY place the accent palette is allowed to live — a stand-in for a
   product screenshot. Full-bleed, no caption overlay (per the brief). */

export function Mockup({ accent, label }: { accent: Accent; label: string }) {
  const color = accentVar[accent];
  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px]"
      style={{
        background: `radial-gradient(120% 120% at 0% 0%, ${color} 0%, color-mix(in srgb, ${color} 35%, #0b0b0d) 55%, #0b0b0d 100%)`,
      }}
      aria-hidden
    >
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute left-5 top-5 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      </div>
      <div className="absolute bottom-6 left-6 right-6">
        <div className="h-2 w-1/3 rounded-full bg-white/70" />
        <div className="mt-3 h-2 w-2/3 rounded-full bg-white/30" />
        <div className="mt-2 h-2 w-1/2 rounded-full bg-white/20" />
      </div>
      <span className="absolute right-5 top-5 font-display text-sm text-white/80">{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------ ProjectCard */

export function ProjectCard({ project }: { project: Project }) {
  const { featured } = project;

  if (featured) {
    return (
      <article
        className="card group relative overflow-hidden p-8 md:col-span-2 md:p-12"
        style={{
          background:
            "radial-gradient(120% 130% at 0% 0%, #6b70ff 0%, var(--primary) 42%, #3b40c9 100%)",
          borderColor: "transparent",
        }}
      >
        {/* texture + glow */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:38px_38px]" />
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/25 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-black/20 blur-[120px]" />

        <div className="relative z-10 grid gap-10 md:grid-cols-[1fr_1.05fr] md:items-center">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white ring-1 ring-inset ring-white/20 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Featured project
            </span>
            <h3 className="font-display mt-5 text-5xl leading-[0.92] text-white md:text-6xl">
              {project.title}
            </h3>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/85">
              {project.tagline ?? project.description}
            </p>

            {project.metrics ? (
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
                {project.metrics.map((m, i) => (
                  <div key={m.label} className="flex items-center gap-5">
                    {i > 0 ? <span className="h-9 w-px bg-white/20" /> : null}
                    <div>
                      <div className="font-display text-2xl text-white">{m.value}</div>
                      <div className="mt-0.5 text-xs text-white/60">{m.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={`/projects/${project.slug}`}
                className="btn bg-white text-[var(--primary)] hover:opacity-90"
              >
                View project <ArrowUpRight className="h-[18px] w-[18px]" />
              </Link>
              {project.links.live ? (
                <Link
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border border-white/30 bg-transparent text-white hover:border-white"
                >
                  <Globe className="h-[18px] w-[18px]" /> Live
                </Link>
              ) : null}
              {project.links.repo ? (
                <Link
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border border-white/30 bg-transparent text-white hover:border-white"
                >
                  <Github className="h-[18px] w-[18px]" /> Code
                </Link>
              ) : null}
            </div>
          </div>

          <div className="relative md:pl-4">
            {project.image ? (
              <div className="relative">
                <div
                  className="absolute inset-0 translate-x-3 translate-y-4 rounded-[18px] bg-white/10"
                  aria-hidden
                />
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[18px] border border-white/20 shadow-2xl ring-1 ring-white/10 transition-transform duration-500 group-hover:-translate-y-1">
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized={project.image.endsWith(".gif")}
                    className="object-cover"
                  />
                </div>
              </div>
            ) : (
              <Mockup accent="violet" label={project.title} />
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card group flex flex-col overflow-hidden p-5 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative">
        {project.cardVideo ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] border border-border">
            <video
              src={project.cardVideo}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        ) : project.image ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] border border-border">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              unoptimized={project.image.endsWith(".gif")}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <Mockup accent={project.accent} label={project.title} />
        )}
        {project.award ? (
          <AwardBadge
            label={project.award}
            accent={project.accent}
            className="absolute left-3 top-3 shadow-lg"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-3 pt-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl">{project.title}</h3>
          <span className="mt-1 text-xs text-muted">{project.year}</span>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
          <span className="text-sm text-muted">{project.role}</span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold">
            View project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ---------------------------------------------------------- HackathonCard */

export function HackathonCard({ hackathon }: { hackathon: Hackathon }) {
  const color = accentVar[hackathon.accent];
  return (
    <article className="card group relative flex flex-col overflow-hidden p-8 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {hackathon.logo ? (
            <Image
              src={hackathon.logo}
              alt={`${hackathon.event} logo`}
              width={52}
              height={52}
              className="h-12 w-12 shrink-0 rounded-xl border border-border bg-surface object-cover"
            />
          ) : null}
          <span className="font-display text-2xl leading-tight">{hackathon.event}</span>
        </div>
        <span className="shrink-0 text-xs text-muted">{hackathon.year}</span>
      </div>

      <div
        className="mt-5 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
        style={{
          background: hackathon.isWin ? color : "var(--surface-2)",
          color: hackathon.isWin ? "#0b0b0d" : "var(--muted)",
        }}
      >
        {hackathon.isWin ? <Trophy className="h-3.5 w-3.5" /> : null}
        {hackathon.result}
      </div>

      <p className="mt-5 text-sm leading-relaxed text-muted">{hackathon.description}</p>

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <span className="font-semibold">{hackathon.project}</span>
        <span className="text-muted">·</span>
        <span className="text-muted">{hackathon.location}</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {hackathon.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      {hackathon.link ? (
        <Link
          href={hackathon.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-70"
        >
          Event <ArrowUpRight className="h-4 w-4" />
        </Link>
      ) : null}
    </article>
  );
}

/* ------------------------------------------------------------ ArticleCard */

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="card group flex flex-col p-7 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center gap-3 text-xs text-muted">
        <span>{formatDate(article.date)}</span>
        <span className="h-1 w-1 rounded-full bg-muted" />
        <span>{article.readingTime}</span>
      </div>

      <h3 className="font-display mt-4 text-2xl leading-tight">{article.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{article.excerpt}</p>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {article.tags.slice(0, 2).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-semibold">
          Read
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
