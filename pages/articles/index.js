import Head from 'next/head'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { getAllArticles } from '@/lib/articles'

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function Meta({ article, className = '' }) {
  return (
    <div
      className={`flex items-center gap-3 text-xs font-mono uppercase tracking-[0.14em] text-gray-500 ${className}`}
    >
      <span>{formatDate(article.date)}</span>
      {article.readingTime ? (
        <>
          <span aria-hidden>·</span>
          <span>{article.readingTime} read</span>
        </>
      ) : null}
    </div>
  )
}

function Tags({ tags }) {
  return (
    <div className="flex flex-wrap gap-2">
      {(tags || []).map((t) => (
        <span
          key={t}
          className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full border border-white/10 text-gray-400"
        >
          {t}
        </span>
      ))}
    </div>
  )
}

/** Large hero card for the most recent article. */
function FeaturedCard({ article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="block glass-panel rounded-2xl p-7 md:p-9 border border-white/10 hover:border-[#4ecdc4]/40 transition group"
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full border border-[#4ecdc4]/40 text-[#4ecdc4] bg-[#4ecdc4]/10">
          Latest
        </span>
        <Meta article={article} />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-[#4ecdc4] transition mb-3 leading-tight">
        {article.title}
      </h2>
      <p className="text-gray-400 leading-relaxed mb-6 max-w-2xl">
        {article.summary}
      </p>
      <div className="flex items-center justify-between gap-4">
        <Tags tags={article.tags} />
        <span className="text-sm text-[#4ecdc4] font-semibold inline-flex items-center gap-1 whitespace-nowrap">
          Read article
          <i className="ph ph-arrow-right text-base" aria-hidden />
        </span>
      </div>
    </Link>
  )
}

/** Compact numbered row for older articles — scannable, not clumped. */
function ArticleRow({ article, index }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="flex gap-5 md:gap-7 py-7 border-t border-white/[0.07] group"
    >
      <span className="font-mono text-sm text-gray-600 group-hover:text-[#4ecdc4] transition pt-1 tabular-nums">
        {String(index).padStart(2, '0')}
      </span>
      <div className="flex-1 min-w-0">
        <Meta article={article} className="mb-2" />
        <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-[#4ecdc4] transition mb-2 leading-snug">
          {article.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-3">
          {article.summary}
        </p>
        <Tags tags={article.tags} />
      </div>
      <i
        className="ph ph-arrow-right text-gray-600 group-hover:text-[#4ecdc4] transition self-center text-lg"
        aria-hidden
      />
    </Link>
  )
}

export default function ArticlesIndex({ articles }) {
  const [featured, ...rest] = articles

  return (
    <>
      <Head>
        <title>Articles | Basil Boh</title>
        <meta
          name="description"
          content="Write-ups of things I've learned and figured out building software."
        />
      </Head>

      {/* Flat dark background — no ThreeBackground here so articles stay easy to read. */}
      <div className="min-h-screen bg-[#050505] text-white antialiased">
        <Navigation />

        <main className="relative z-10 pt-28 pb-24 px-6">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/#home"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#4ecdc4] transition mb-10"
            >
              <i className="ph ph-arrow-left text-base" aria-hidden />
              Back home
            </Link>

            <header className="mb-12">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#4ecdc4] mb-4">
                Articles
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
                Learnings &amp; findings
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                Short write-ups of things I&apos;ve figured out while building, the
                decisions, the dead ends, and the parts that turned out to matter.
              </p>
            </header>

            {articles.length === 0 ? (
              <p className="text-gray-400">No articles yet, check back soon.</p>
            ) : (
              <>
                <FeaturedCard article={featured} />

                {rest.length > 0 ? (
                  <section className="mt-14">
                    <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-gray-500 mb-2">
                      More articles
                    </h2>
                    <div>
                      {rest.map((a, i) => (
                        <ArticleRow key={a.slug} article={a} index={i + 1} />
                      ))}
                    </div>
                  </section>
                ) : null}
              </>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

export async function getStaticProps() {
  return { props: { articles: getAllArticles() } }
}
