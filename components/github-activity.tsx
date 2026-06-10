"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

/**
 * Live GitHub contribution heatmap. Pulls the last year of activity from the
 * public jogruber contributions API (no token needed) and renders a
 * GitHub-style grid in the brand indigo. Degrades to a quiet link on failure.
 */
export function GithubActivity({ username }: { username: string }) {
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    let cancelled = false;
    // server route includes private contributions when a token is set;
    // falls back to the public scraper if the route is unavailable.
    const apply = (data: { contributions?: Day[]; total?: number }) => {
      if (cancelled) return false;
      if (!Array.isArray(data?.contributions)) return false;
      setDays(data.contributions);
      setTotal(
        typeof data.total === "number"
          ? data.total
          : data.contributions.reduce((a, c) => a + c.count, 0),
      );
      return true;
    };

    fetch(`/api/github?login=${username}&year=${year}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("route failed"))))
      .then((d) => apply(d) || Promise.reject(new Error("empty")))
      .catch(() =>
        fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`)
          .then((r) => (r.ok ? r.json() : Promise.reject(new Error("public failed"))))
          .then((d) => apply(d) || Promise.reject(new Error("empty")))
          .catch(() => !cancelled && setFailed(true)),
      );
    return () => {
      cancelled = true;
    };
  }, [username, year]);

  if (failed) {
    return (
      <div className="card p-8 text-sm text-muted">
        Live activity is taking a break.{" "}
        <Link href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:text-primary">
          See the graph on GitHub →
        </Link>
      </div>
    );
  }

  // group days into week columns (Sunday-led)
  const weeks: (Day | null)[][] = [];
  if (days) {
    let week: (Day | null)[] = [];
    days.forEach((d) => {
      const wd = new Date(d.date).getDay();
      if (week.length === 0 && wd !== 0) for (let i = 0; i < wd; i++) week.push(null);
      week.push(d);
      if (wd === 6) {
        weeks.push(week);
        week = [];
      }
    });
    if (week.length) weeks.push(week);
  }

  // month label per week column — shown when the month first appears
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let seenMonth = -1;
  const monthAt = weeks.map((w) => {
    const first = w.find(Boolean);
    if (!first) return "";
    const m = new Date(first.date).getMonth();
    if (m !== seenMonth) {
      seenMonth = m;
      return MONTHS[m];
    }
    return "";
  });

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <div className="card p-6 md:p-8">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <span className="text-sm text-muted">
          {days ? (
            <>
              <span className="font-semibold text-foreground">{(total ?? 0).toLocaleString()}</span> contributions
              in {year}
            </>
          ) : (
            "Loading contributions…"
          )}
        </span>
      </div>

      <div className="no-scrollbar overflow-x-auto">
        {days ? (
          <div className="inline-flex w-max flex-col gap-1.5">
            {/* month labels */}
            <div className="flex h-[16px] gap-[4px] text-[10px] leading-none text-muted">
              {monthAt.map((m, i) => (
                <div key={i} className="relative w-[16px]">
                  {m ? <span className="absolute bottom-0 left-0 whitespace-nowrap">{m}</span> : null}
                </div>
              ))}
            </div>
            {/* contribution grid */}
            <div className="flex gap-[4px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[4px]">
                  {Array.from({ length: 7 }).map((_, di) => {
                    const d = week[di];
                    return (
                      <span
                        key={di}
                        className="gh-cell"
                        data-level={d ? d.level : 0}
                        onMouseEnter={
                          d
                            ? (e) => {
                                const r = e.currentTarget.getBoundingClientRect();
                                setTip({
                                  x: r.left + r.width / 2,
                                  y: r.top,
                                  text: `${d.count} contribution${d.count === 1 ? "" : "s"} · ${fmtDate(d.date)}`,
                                });
                              }
                            : undefined
                        }
                        onMouseLeave={() => setTip(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex gap-[4px]">
            {Array.from({ length: 52 }).map((_, wi) => (
              <div key={wi} className="flex flex-col gap-[4px]">
                {Array.from({ length: 7 }).map((_, di) => (
                  <span key={di} className="gh-cell animate-pulse" data-level={0} />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {tip && typeof document !== "undefined"
        ? createPortal(
            <div
              className="pointer-events-none fixed z-[80] -translate-x-1/2 -translate-y-[calc(100%+8px)] whitespace-nowrap rounded-md bg-foreground px-2.5 py-1.5 text-xs font-medium text-background shadow-lg"
              style={{ left: tip.x, top: tip.y }}
            >
              {tip.text}
            </div>,
            document.body,
          )
        : null}

      <div className="mt-4 flex items-center gap-2 text-xs text-muted">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <span key={l} className="gh-cell" data-level={l} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
