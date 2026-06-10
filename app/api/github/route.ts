import { NextRequest } from "next/server";

/**
 * GitHub contribution calendar for the heatmap.
 *
 * With a `GITHUB_TOKEN` set, this queries the GraphQL API as the token's
 * owner (`viewer`), whose calendar INCLUDES private contributions (repo
 * names stay hidden — only the daily counts are returned). Without a token
 * it falls back to the public jogruber scraper, so the heatmap still works.
 *
 * Response shape matches the jogruber API the client already understands:
 *   { total: number, contributions: [{ date, count, level }] }
 */

export const revalidate = 3600; // cache for an hour

type Day = { date: string; count: number; level: number };

const LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

function publicFallback(login: string, year: string) {
  return fetch(`https://github-contributions-api.jogruber.de/v4/${login}?y=${year}`, {
    next: { revalidate },
  })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error("jogruber failed"))))
    .then((d) => {
      const contributions: Day[] = Array.isArray(d?.contributions) ? d.contributions : [];
      const total = contributions.reduce((a, c) => a + c.count, 0);
      return { total, contributions, source: "public" };
    });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const login = (searchParams.get("login") || "basil-boh").replace(/[^a-zA-Z0-9-]/g, "");
  const year = (searchParams.get("year") || `${new Date().getFullYear()}`).replace(/[^0-9]/g, "");
  const token = process.env.GITHUB_TOKEN;

  const json = (data: unknown) =>
    new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" },
    });

  if (!token) {
    try {
      return json(await publicFallback(login, year));
    } catch {
      return json({ total: 0, contributions: [], source: "none" });
    }
  }

  const query = `query($from:DateTime!,$to:DateTime!){
    viewer{ contributionsCollection(from:$from,to:$to){
      contributionCalendar{ totalContributions weeks{ contributionDays{ date contributionCount contributionLevel } } }
    } }
  }`;
  const variables = { from: `${year}-01-01T00:00:00Z`, to: `${year}-12-31T23:59:59Z` };

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "basilboh.dev",
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate },
    });
    const data = await res.json();
    const cal = data?.data?.viewer?.contributionsCollection?.contributionCalendar;
    if (!cal) throw new Error("no calendar");

    const contributions: Day[] = cal.weeks.flatMap((w: { contributionDays: Array<{ date: string; contributionCount: number; contributionLevel: string }> }) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: LEVELS[d.contributionLevel] ?? 0,
      })),
    );
    return json({ total: cal.totalContributions, contributions, source: "private" });
  } catch {
    // token present but request failed → fall back to public data
    try {
      return json(await publicFallback(login, year));
    } catch {
      return json({ total: 0, contributions: [], source: "none" });
    }
  }
}
