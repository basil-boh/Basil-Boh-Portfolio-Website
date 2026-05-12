import { useState } from 'react'
import { useRouter } from 'next/router'
import { getAllProjects } from '@/lib/projects'
import MunchlyHeroThumb from '@/components/MunchlyHeroThumb'

const projects = getAllProjects()

function ProjectMedia({ project }) {
  const commonClass =
    'w-full h-full object-cover transition-transform duration-500 ease-out group-hover/media:scale-105'

  // Custom-composed thumbnails (no image read by model — purely JSX + brand tokens).
  if (project.mediaType === 'custom' && project.customMedia === 'munchly-hero') {
    return (
      <div className="w-full h-full">
        <MunchlyHeroThumb variant="card" />
      </div>
    )
  }

  if (project.mediaType === 'placeholder') {
    return (
      <div
        className={`${commonClass} object-center bg-gradient-to-br from-[#4ecdc4]/25 via-[#050505] to-[#556270]/40 flex items-center justify-center`}
        aria-hidden
      >
        <span className="text-[#4ecdc4]/60 text-sm font-mono tracking-wider">Preview</span>
      </div>
    )
  }

  if (project.mediaType === 'video') {
    return (
      <video
        className={commonClass}
        src={project.image}
        autoPlay
        muted
        loop
        playsInline
        aria-label={`${project.title} preview`}
      />
    )
  }

  return (
    <img
      src={project.image}
      alt={project.title}
      className={commonClass}
      loading="lazy"
    />
  )
}

export default function Projects() {
  const router = useRouter()
  const [filter, setFilter] = useState('all')

  const goToProject = (slug) => router.push(`/projects/${slug}`)

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'web', label: 'Web' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'data', label: 'Data' },
  ]

  return (
    <section id="projects" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto fade-in-section">
        <h2 className="text-4xl font-bold mb-8 flex items-center">
          <span className="text-[#4ecdc4] text-2xl mr-4">05.</span> My Projects
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition duration-300 border ${
                filter === key
                  ? 'bg-[#4ecdc4]/15 border-[#4ecdc4] text-[#4ecdc4] shadow-[0_0_20px_rgba(78,205,196,0.15)]'
                  : 'glass-panel border-white/10 text-gray-300 hover:border-[#4ecdc4]/40 hover:text-[#4ecdc4]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const featured = !!project.featured
            const cardSpan = featured ? 'md:col-span-2 xl:col-span-3' : ''
            const mediaHeight = featured ? 'h-64 sm:h-72 md:h-80' : 'h-52'

            return (
              <article
                key={project.id}
                role="link"
                tabIndex={0}
                onClick={() => goToProject(project.slug)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    goToProject(project.slug)
                  }
                }}
                aria-label={`${project.title} — view details`}
                className={`relative cursor-pointer glass-panel rounded-xl overflow-hidden flex flex-col group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] hover:border-[#4ecdc4]/30 transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4ecdc4] ${cardSpan}`}
              >
                <div className={`relative ${mediaHeight} overflow-hidden group/media border-b border-white/5`}>
                  <ProjectMedia project={project} />

                  {/* Featured pill — only on non-custom thumbnails. Custom
                      thumbnails (e.g. MunchlyHeroThumb) own their own top strip. */}
                  {featured && project.mediaType !== 'custom' ? (
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#050505]/85 backdrop-blur-sm border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4ecdc4] animate-pulse" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-white">
                        Featured · Live product
                      </span>
                    </div>
                  ) : null}

                  {/* Hover CTA overlay — only for non-featured cards; the featured Munchly
                      card is intentionally cleaner so the brand reads through on hover. */}
                  {!featured ? (
                    <div
                      className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition duration-300"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(78,205,196,0.88) 0%, rgba(85,98,112,0.9) 100%)',
                      }}
                    >
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#050505] text-[#4ecdc4] text-sm font-semibold hover:bg-white hover:text-[#050505] transition"
                          aria-label={`${project.title} — GitHub repository`}
                        >
                          <i className="ph ph-github-logo text-lg"></i>
                          Code
                        </a>
                      ) : null}
                      {project.demo ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#050505] text-[#4ecdc4] text-sm font-semibold hover:bg-white hover:text-[#050505] transition"
                          aria-label={`${project.title} — live demo`}
                        >
                          <i className="ph ph-arrow-square-out text-lg"></i>
                          Demo
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#4ecdc4] transition-colors">
                      {project.title}
                    </h3>
                    {featured && project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4ecdc4]/10 border border-[#4ecdc4]/30 text-[#4ecdc4] text-[11px] font-semibold hover:bg-[#4ecdc4] hover:text-[#050505] transition"
                      >
                        <i className="ph ph-arrow-square-out text-xs" aria-hidden />
                        Live
                      </a>
                    ) : null}
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-[#4ecdc4]/10 text-[#4ecdc4] border border-[#4ecdc4]/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
