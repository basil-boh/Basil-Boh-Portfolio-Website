import Head from 'next/head'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import {
  getAllArticles,
  getAllArticleSlugs,
  getArticleBySlug,
} from '@/lib/articles'

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const pad2 = (n) => String(n).padStart(2, '0')

/* ── Block components ──────────────────────────────────────────────
   Each content type renders as its own visually distinct component so
   the article reads in clear chunks instead of one wall of prose. */

/** Numbered section divider — gives the article obvious visual chapters. */
function SectionHeading({ num, text }) {
  return (
    <div className="pt-14 first:pt-0">
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono text-xs tracking-[0.2em] text-[#4ecdc4]">
          {pad2(num)}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
      </div>
      <h2 className="text-2xl md:text-[1.75rem] font-bold tracking-tight text-white leading-tight">
        {text}
      </h2>
    </div>
  )
}

/** Lead-in paragraph — slightly larger, sets the tone for the piece. */
function Lead({ text }) {
  return (
    <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
      {text}
    </p>
  )
}

function Paragraph({ text }) {
  return (
    <p className="text-[1.0625rem] md:text-lg text-gray-300/95 leading-[1.85]">
      {text}
    </p>
  )
}

/** Lists become a bordered card with numbered, divided rows. */
function ListCard({ items }) {
  return (
    <ul className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-4 px-5 py-4 md:px-6 md:py-5 border-t border-white/[0.05] first:border-t-0"
        >
          <span className="font-mono text-sm text-[#4ecdc4] tabular-nums pt-0.5 shrink-0">
            {pad2(i + 1)}
          </span>
          <span className="text-gray-300 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Pull-quote — a prominent panel that breaks up the prose. */
function PullQuote({ text }) {
  return (
    <figure className="relative rounded-2xl border border-[#4ecdc4]/25 bg-gradient-to-br from-[#4ecdc4]/[0.08] to-transparent px-7 py-8 md:px-10 md:py-9">
      <i
        className="ph ph-quotes text-[#4ecdc4] text-3xl mb-3 block"
        aria-hidden
      />
      <p className="text-xl md:text-[1.4rem] font-medium leading-snug text-white">
        {text}
      </p>
    </figure>
  )
}

function CodeBlock({ code, language }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/50 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]">
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        {language ? (
          <span className="ml-auto font-mono text-[11px] uppercase tracking-widest text-gray-500">
            {language}
          </span>
        ) : null}
      </div>
      <pre className="p-5 overflow-x-auto">
        <code className="font-mono text-sm text-gray-200 leading-relaxed">
          {code}
        </code>
      </pre>
    </div>
  )
}

/** Renders the full content array, tracking section + paragraph position. */
function ArticleBody({ content }) {
  let headingNum = 0
  let paragraphCount = 0

  return (
    <div className="space-y-7">
      {content.map((block, i) => {
        switch (block.type) {
          case 'heading':
            headingNum += 1
            return <SectionHeading key={i} num={headingNum} text={block.text} />
          case 'list':
            return <ListCard key={i} items={block.items} />
          case 'quote':
            return <PullQuote key={i} text={block.text} />
          case 'code':
            return (
              <CodeBlock key={i} code={block.code} language={block.language} />
            )
          case 'paragraph':
          default: {
            paragraphCount += 1
            // The very first paragraph of the article reads as a lead-in.
            return paragraphCount === 1 && i === 0 ? (
              <Lead key={i} text={block.text} />
            ) : (
              <Paragraph key={i} text={block.text} />
            )
          }
        }
      })}
    </div>
  )
}

export default function ArticlePage({ article, related }) {
  if (!article) return null

  return (
    <>
      <Head>
        <title>{article.title} | Basil Boh</title>
        <meta name="description" content={article.summary} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
      </Head>

      {/* Flat dark background — no ThreeBackground so the article stays readable. */}
      <div className="min-h-screen bg-[#050505] text-white antialiased">
        <Navigation />

        <main className="relative z-10 pt-28 pb-24 px-6">
          <article className="max-w-2xl mx-auto">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#4ecdc4] transition mb-10"
            >
              <i className="ph ph-arrow-left text-base" aria-hidden />
              All articles
            </Link>

            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {(article.tags || []).map((t) => (
                  <span
                    key={t}
                    className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full border border-[#4ecdc4]/30 text-[#4ecdc4] bg-[#4ecdc4]/[0.06]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-[2.75rem] font-bold tracking-tight leading-[1.12] mb-6">
                {article.title}
              </h1>

              <p className="text-lg text-gray-400 leading-relaxed mb-7">
                {article.summary}
              </p>

              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.14em] text-gray-500 pb-7 border-b border-white/10">
                <span className="text-gray-300">Basil Boh</span>
                <span aria-hidden>·</span>
                <span>{formatDate(article.date)}</span>
                {article.readingTime ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>{article.readingTime} read</span>
                  </>
                ) : null}
              </div>
            </header>

            {article.isPlaceholder ? (
              <div className="mb-10 rounded-xl border border-[#4ecdc4]/30 bg-[#4ecdc4]/[0.04] px-5 py-4 text-sm text-gray-200">
                <strong className="font-semibold text-[#4ecdc4]">Draft.</strong>{' '}
                This article is a starter outline. Edit{' '}
                <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10">
                  lib/articles.js
                </code>{' '}
                to flesh it out.
              </div>
            ) : null}

            <ArticleBody content={article.content} />

            <footer className="mt-20 pt-8 border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-sm text-gray-400">
                  Want to talk about this, or hire me to build something?
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
              <section className="mt-16">
                <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-[#4ecdc4] mb-5">
                  More articles
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/articles/${r.slug}`}
                      className="glass-panel rounded-xl p-5 border border-white/10 hover:border-[#4ecdc4]/40 transition group"
                    >
                      <h3 className="text-base font-semibold text-white group-hover:text-[#4ecdc4] transition mb-1">
                        {r.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {r.summary}
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
  return {
    paths: getAllArticleSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const article = getArticleBySlug(params.slug)
  const related = getAllArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2)

  return { props: { article, related } }
}
