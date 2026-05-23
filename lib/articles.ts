import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Accent } from "./data";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  tags: string[];
  accent: Accent;
  readingTime: string;
};

export type Article = ArticleMeta & {
  content: string;
};

function readSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getArticleSlugs(): string[] {
  return readSlugs();
}

export function getArticle(slug: string): Article | null {
  const fullPath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? "",
    date: data.date ?? new Date().toISOString(),
    tags: data.tags ?? [],
    accent: (data.accent as Accent) ?? "violet",
    readingTime: stats.text,
    content,
  };
}

export function getAllArticles(): ArticleMeta[] {
  return readSlugs()
    .map((slug) => {
      const article = getArticle(slug);
      if (!article) return null;
      const { content: _content, ...meta } = article;
      return meta;
    })
    .filter((a): a is ArticleMeta => a !== null)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
