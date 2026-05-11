import Head from 'next/head'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import {
  getAllProjects,
  getAllProjectSlugs,
  getProjectBySlug,
} from '@/lib/projects'

function HeroMedia({ project }) {
  if (project.mediaType === 'video') {
    return (
      <video
        className="w-full h-auto"
        src={project.image}
        autoPlay
        muted
        loop
        playsInline
      />
    )
  }
  return <img src={project.image} alt={project.title} className="w-full h-auto" />
}

function Screenshot({ shot }) {
  if (shot.isVideo) {
    return (
      <video
        className="w-full h-auto block"
        src={shot.src}
        autoPlay
        muted
        loop
        playsInline
      />
    )
  }
  return <img src={shot.src} alt={shot.caption || ''} className="w-full h-auto block" />
}

function Paragraphs({ text }) {
  if (!text) return null
  const items = Array.isArray(text) ? text : [text]
  return (
    <div className="space-y-4">
      {items.map((p, i) => (
        <p key={i} className="text-gray-300 leading-relaxed">
          {p}
        </p>
      ))}
    </div>
  )
}

export default function ProjectPage({ project, related }) {
  if (!project) return null

  const ogImage =
    project.image && !project.image.match(/\.(mp4|webm|mov)$/i) ? project.image : null

  return (
    <>
      <Head>
        <title>{project.title} | Basil Boh</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description} />
        {ogImage ? <meta property="og:image" content={ogImage} /> : null}
      </Head>

      {/* Flat dark background — no ThreeBackground here so text stays readable. */}
      <div className="min-h-screen bg-[#050505] text-white antialiased">
        <Navigation />

        <main className="relative z-10 pt-28 pb-24 px-6">
          <article className="max-w-4xl mx-auto">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#4ecdc4] transition mb-10"
            >
              <i className="ph ph-arrow-left text-base" aria-hidden />
              All projects
            </Link>

            <header className="mb-12">
              {project.role ? (
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#4ecdc4] mb-5">
                  {project.role}
                </p>
              ) : null}

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
                {project.title}
              </h1>

              {project.tagline ? (
                <p className="text-lg md:text-xl text-gray-300 leading-snug mb-8 max-w-2xl">
                  {project.tagline}
                </p>
              ) : (
                <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl">
                  {project.description}
                </p>
              )}

              <div className="flex flex-wrap gap-3">
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#4ecdc4] text-[#050505] text-sm font-semibold hover:bg-white transition"
                  >
                    <i className="ph ph-arrow-square-out text-base" aria-hidden />
                    Live demo
                  </a>
                ) : null}
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 text-gray-200 text-sm font-semibold hover:border-[#4ecdc4] hover:text-[#4ecdc4] transition"
                  >
                    <i className="ph ph-github-logo text-base" aria-hidden />
                    GitHub
                  </a>
                ) : null}
                {project.videoEmbed ? (
                  <a
                    href={project.videoEmbed.replace('/preview', '/view')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 text-gray-200 text-sm font-semibold hover:border-[#4ecdc4] hover:text-[#4ecdc4] transition"
                  >
                    <i className="ph ph-play-circle text-base" aria-hidden />
                    Watch demo video
                  </a>
                ) : null}
              </div>
            </header>

            <div className="rounded-xl overflow-hidden border border-white/10 bg-black/30 mb-14">
              <HeroMedia project={project} />
            </div>

            {project.isPlaceholder ? (
              <div className="mb-12 rounded-lg border border-[#4ecdc4]/30 bg-[#4ecdc4]/[0.04] px-5 py-4 text-sm text-gray-200">
                <strong className="font-semibold text-[#4ecdc4]">
                  Placeholder content.
                </strong>{' '}
                Some details below are inferred from the GitHub repo or the card
                metadata. Edit{' '}
                <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10">
                  lib/projects.js
                </code>{' '}
                to fill in real content.
              </div>
            ) : null}

            {project.overview ? (
              <section className="mb-14">
                <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-[#4ecdc4] mb-4">
                  Overview
                </h2>
                <Paragraphs text={project.overview} />
              </section>
            ) : null}

            {project.videoEmbed ? (
              <section className="mb-14">
                <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-[#4ecdc4] mb-4">
                  Demo video
                </h2>
                <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-black/30 aspect-video">
                  <iframe
                    src={project.videoEmbed}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay"
                    allowFullScreen
                    title={`${project.title} demo video`}
                  />
                </div>
              </section>
            ) : null}

            {project.features && project.features.length > 0 ? (
              <section className="mb-14">
                <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-[#4ecdc4] mb-4">
                  Features
                </h2>
                <ul className="space-y-3">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex gap-3 text-gray-300 leading-relaxed">
                      <i className="ph ph-check text-[#4ecdc4] text-lg flex-shrink-0 mt-0.5" aria-hidden />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {project.techStack && project.techStack.length > 0 ? (
              <section className="mb-14">
                <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-[#4ecdc4] mb-4">
                  Tech stack
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.techStack.map((group) => (
                    <div
                      key={group.category}
                      className="glass-panel rounded-lg p-5 border border-white/10"
                    >
                      <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#4ecdc4] mb-3">
                        {group.category}
                      </p>
                      <ul className="space-y-1.5">
                        {group.items.map((item, i) => (
                          <li key={i} className="text-sm text-gray-200">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              <section className="mb-14">
                <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-[#4ecdc4] mb-4">
                  Tech stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-[#4ecdc4]/10 text-[#4ecdc4] border border-[#4ecdc4]/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {project.screenshots && project.screenshots.length > 1 ? (
              <section className="mb-14">
                <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-[#4ecdc4] mb-4">
                  Screenshots
                </h2>
                <div className="space-y-6">
                  {project.screenshots.map((shot, i) => (
                    <figure
                      key={i}
                      className="rounded-xl overflow-hidden border border-white/10 bg-black/30"
                    >
                      <Screenshot shot={shot} />
                      {shot.caption ? (
                        <figcaption className="px-4 py-3 text-sm text-gray-400 border-t border-white/5">
                          {shot.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  ))}
                </div>
              </section>
            ) : null}

            {project.notes ? (
              <section className="mb-14">
                <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-[#4ecdc4] mb-4">
                  Notes
                </h2>
                <Paragraphs text={project.notes} />
              </section>
            ) : null}

            <footer className="mt-20 pt-8 border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-sm text-gray-400">
                  Want to talk about this project, or hire me to build something similar?
                </p>
                <a
                  href="mailto:basil.boh001@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 text-gray-200 text-sm font-semibold hover:border-[#4ecdc4] hover:text-[#4ecdc4] transition w-fit"
                >
                  <i className="ph ph-paper-plane-tilt text-base" aria-hidden />
                  Get in touch
                </a>
              </div>
            </footer>

            {related.length > 0 ? (
              <section className="mt-20">
                <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-[#4ecdc4] mb-5">
                  Other projects
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/projects/${r.slug}`}
                      className="glass-panel rounded-lg p-5 border border-white/10 hover:border-[#4ecdc4]/40 transition group"
                    >
                      <p className="text-xs font-mono uppercase tracking-[0.18em] text-gray-500 mb-2">
                        {r.category}
                      </p>
                      <h3 className="text-base font-semibold text-white group-hover:text-[#4ecdc4] transition mb-1">
                        {r.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {r.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </article>
        </main>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const slugs = getAllProjectSlugs()
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const project = getProjectBySlug(params.slug)
  const all = getAllProjects()
  const others = all.filter((p) => p.slug !== project.slug)
  const sameCategory = others.filter((p) => p.category === project.category)
  const related = (sameCategory.length ? sameCategory : others).slice(0, 2)

  return { props: { project, related } }
}
