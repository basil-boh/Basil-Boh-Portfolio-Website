import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/data";
import { getArticleSlugs } from "@/lib/articles";

const base = "https://basilboh.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/projects", "/hackathons", "/experience", "/articles"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const projects = getProjectSlugs().map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  const articles = getArticleSlugs().map((slug) => ({
    url: `${base}/articles/${slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [...routes, ...projects, ...articles];
}
