import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Container, Section, Tag } from "@/components/ui";
import { mdxComponents } from "@/components/mdx";
import { getArticle, getArticleSlugs, getAllArticles, formatDate } from "@/lib/articles";
import { ArticleCard } from "@/components/cards";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, type: "article" },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const more = getAllArticles().filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <Section>
      <Container className="py-14 md:py-20">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All writing
        </Link>

        <article className="mx-auto mt-10 max-w-2xl">
          <header>
            <div className="flex items-center gap-3 text-sm text-muted">
              <span>{formatDate(article.date)}</span>
              <span className="h-1 w-1 rounded-full bg-muted" />
              <span>{article.readingTime}</span>
            </div>
            <h1 className="font-display mt-5 text-4xl leading-[1.05] sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{article.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {article.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </header>

          <div className="prose prose-lg mt-12 max-w-none">
            <MDXRemote
              source={article.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </div>
        </article>
      </Container>

      {more.length > 0 ? (
        <div className="tone-invert bg-background text-foreground">
          <Container className="py-16 md:py-24">
            <h2 className="font-display text-3xl md:text-4xl">Keep reading</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {more.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </Container>
        </div>
      ) : null}
    </Section>
  );
}
