import Image from "next/image";
import type { Experience } from "@/lib/data";
import { Tag } from "./ui";

function CompanyLogo({
  name,
  logo,
  logoBg,
  logoFit = "contain",
}: {
  name: string;
  logo?: string;
  logoBg?: string;
  logoFit?: "contain" | "cover";
}) {
  if (logo) {
    return (
      <div
        className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border"
        style={{ background: logoBg ?? "#ffffff" }}
      >
        <Image
          src={logo}
          alt={`${name} logo`}
          fill
          sizes="64px"
          className={logoFit === "cover" ? "object-cover" : "object-contain p-1"}
        />
      </div>
    );
  }
  return (
    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl border border-border bg-surface font-display text-2xl text-muted">
      {name.replace(/^The\s+/i, "").charAt(0)}
    </span>
  );
}

export function Timeline({ items }: { items: Experience[] }) {
  return (
    <ol className="relative">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <li key={`${item.company}-${i}`} className="relative pb-12 pl-20 last:pb-0">
            {/* connecting line (logo node → next logo node) */}
            {!isLast ? (
              <span
                className="absolute bottom-0 left-[31px] top-[4.25rem] w-[2px] rounded-full bg-foreground/20"
                aria-hidden
              />
            ) : null}

            {/* node = company logo, centred on the line */}
            <div className="absolute left-0 top-0">
              <CompanyLogo
                name={item.company}
                logo={item.logo}
                logoBg={item.logoBg}
                logoFit={item.logoFit}
              />
            </div>

            {/* content */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-sm font-semibold text-muted">{item.period}</span>
              {item.current ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Now
                </span>
              ) : null}
              <span className="text-sm text-muted">· {item.location}</span>
            </div>

            <h3 className="font-display mt-2 text-2xl leading-tight md:text-3xl">{item.role}</h3>
            <p className="mt-1 text-base font-semibold text-primary">{item.company}</p>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{item.summary}</p>

            <ul className="mt-4 space-y-2.5">
              {item.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {item.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
