import { getProjectBySlug, getProjectSlugs } from "@/lib/data";
import { ogSize, ogContentType, renderOg } from "@/lib/og-image";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Project — Basil Boh";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return renderOg({
    eyebrow: project?.year ? `Project · ${project.year}` : "Project",
    title: project?.title ?? "Project",
    subtitle: project?.summary,
    accent: project?.accent ?? "violet",
  });
}
