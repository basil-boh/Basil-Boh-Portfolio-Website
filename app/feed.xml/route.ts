import { getAllArticles, formatDate } from "@/lib/articles";
import { profile } from "@/lib/data";

const base = "https://basilboh.dev";

export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const articles = getAllArticles();
  const updated = articles[0] ? new Date(articles[0].date).toUTCString() : new Date().toUTCString();

  const items = articles
    .map(
      (a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>${base}/articles/${a.slug}</link>
      <guid isPermaLink="true">${base}/articles/${a.slug}</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <description>${esc(a.excerpt)}</description>
      ${a.tags.map((t) => `<category>${esc(t)}</category>`).join("")}
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(profile.name)} — Writing</title>
    <link>${base}/articles</link>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Long-form notes on systems, payments and the craft of building.</description>
    <language>en</language>
    <lastBuildDate>${updated}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
