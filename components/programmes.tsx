import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Programme } from "@/lib/data";
import { Tag } from "./ui";

function ProgrammeLogo({ programme }: { programme: Programme }) {
  if (programme.logo) {
    return (
      <div
        className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border"
        style={{ background: programme.logoBg ?? "#ffffff" }}
      >
        <Image
          src={programme.logo}
          alt={`${programme.org} logo`}
          fill
          sizes="56px"
          className={programme.logoFit === "cover" ? "object-cover" : "object-contain p-1"}
        />
      </div>
    );
  }
  return (
    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-border bg-surface font-display text-xl text-muted">
      {programme.org.replace(/^(The|NUS)\s+/i, "").charAt(0)}
    </span>
  );
}

function Programme({ programme }: { programme: Programme }) {
  return (
    <article className="card p-7 md:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <ProgrammeLogo programme={programme} />
        <div className="flex-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-display text-2xl leading-tight">{programme.title}</h3>
              <p className="mt-1 text-base font-semibold text-primary">{programme.org}</p>
            </div>
            <span className="shrink-0 text-sm text-muted">{programme.period}</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted">{programme.description}</p>

          {programme.tags ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {programme.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          ) : null}

          {/* Credential */}
          {programme.credential ? (
            <div className="mt-6 border-t border-border pt-5">
              <Link
                href={programme.credential.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost h-9 px-4 py-0 text-sm"
              >
                Show credential <ArrowUpRight className="h-4 w-4" />
              </Link>
              {programme.credential.thumb ? (
                <Link
                  href={programme.credential.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-start gap-4"
                >
                  <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
                    <Image
                      src={programme.credential.thumb}
                      alt={programme.credential.label ?? "Certificate"}
                      fill
                      sizes="160px"
                      className="object-contain"
                    />
                  </div>
                  {programme.credential.label ? (
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{programme.credential.label}</p>
                      <p className="mt-1 text-xs text-muted">
                        {programme.org} · {programme.period}
                      </p>
                    </div>
                  ) : null}
                </Link>
              ) : null}
            </div>
          ) : null}

          {/* Photos */}
          {programme.photos && programme.photos.length > 0 ? (
            <div className="mt-6 border-t border-border pt-5">
              <div className="grid grid-cols-3 gap-3">
                {programme.photos.map((src) => (
                  <Link
                    key={src}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-surface transition-transform hover:-translate-y-0.5"
                  >
                    <Image src={src} alt="" fill sizes="(max-width: 640px) 33vw, 200px" className="object-cover" />
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function Programmes({ items }: { items: Programme[] }) {
  return (
    <div className="grid gap-6">
      {items.map((p) => (
        <Programme key={p.slug} programme={p} />
      ))}
    </div>
  );
}
