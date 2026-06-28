import { projects, type Project } from "@/content/site";
import { projectBodies, type Block } from "@/content/details";

export type { Block };

/** URL-safe slug from a human title. Deterministic, no stored slugs needed. */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const projectSlug = (p: Project) => slugify(p.title);

export function getProject(slug: string) {
  const i = projects.findIndex((p) => projectSlug(p) === slug);
  if (i === -1) return null;
  return {
    project: projects[i],
    body: projectBodies[projects[i].id] ?? [],
    prev: projects[i - 1] ?? null,
    next: projects[i + 1] ?? null,
  };
}
