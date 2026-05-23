import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ArticleCard } from "@/components/cards";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and notes on systems, payments and the craft of building.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <Section>
      <Container className="py-16 md:py-24">
        <Reveal>
          <Eyebrow>Writing</Eyebrow>
          <h1 className="font-display mt-5 text-5xl sm:text-6xl md:text-7xl">
            Notes & <span className="text-primary">essays</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Long-form thinking on distributed systems, payments, AI and the craft of shipping
            software.
          </p>
        </Reveal>

        {articles.length === 0 ? (
          <p className="mt-14 text-muted">No articles yet — check back soon.</p>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 70}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
