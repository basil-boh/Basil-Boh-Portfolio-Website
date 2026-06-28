import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "content/notes");

export type NoteMeta = {
  slug: string;
  id: string;
  title: string;
  date: string;
  readingTime: string;
  tags: string[];
  excerpt: string;
};

function readFile(slug: string): { meta: NoteMeta; content: string } | null {
  const fp = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(fp)) return null;
  const { data, content } = matter(fs.readFileSync(fp, "utf8"));
  return {
    meta: {
      slug,
      id: data.id ?? "",
      title: data.title ?? slug,
      date: data.date ?? "",
      readingTime: data.readingTime ?? "",
      tags: data.tags ?? [],
      excerpt: data.excerpt ?? "",
    },
    content,
  };
}

export function getNoteSlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** All note metadata, newest first (date is "YYYY.MM"). */
export function getAllNotes(): NoteMeta[] {
  return getNoteSlugs()
    .map((s) => readFile(s)!.meta)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getNote(slug: string) {
  return readFile(slug);
}

export function getAdjacentNotes(slug: string) {
  const all = getAllNotes();
  const i = all.findIndex((n) => n.slug === slug);
  return { prev: all[i - 1] ?? null, next: all[i + 1] ?? null };
}
