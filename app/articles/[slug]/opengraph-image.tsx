import { getArticle, getArticleSlugs } from "@/lib/articles";
import { ogSize, ogContentType, renderOg } from "@/lib/og-image";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Essay — Basil Boh";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  return renderOg({
    eyebrow: "Writing",
    title: article?.title ?? "Essay",
    subtitle: article?.excerpt,
    accent: article?.accent ?? "violet",
  });
}
