import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Maximize2 } from "lucide-react";
import type { Programme } from "@/lib/data";
import { Tag } from "./ui";

function ProgrammeLogo({ programme }: { programme: Programme }) {
  if (programme.logo) {
    return (
      <div
        className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-border shadow-sm"
        style={{ background: programme.logoBg ?? "#ffffff" }}
      >
        <Image
          src={programme.logo}
          alt={`${programme.org} logo`}
          fill
          sizes="64px"
          className={programme.logoFit === "cover" ? "object-cover" : "object-contain p-1.5"}
        />
      </div>
    );
  }
  return (
    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-border bg-surface font-display text-2xl text-muted shadow-sm">
      {programme.org.replace(/^(The|NUS)\s+/i, "").charAt(0)}
    </span>
  );
}

function Programme({ programme }: { programme: Programme }) {
  return (
    <article className="card group/card relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.35)] md:p-8">
      {/* header */}
      <div className="flex items-start gap-5">
        <ProgrammeLogo programme={programme} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="font-display text-xl leading-tight md:text-2xl">{programme.title}</h3>
              <p className="mt-1 text-sm font-semibold text-primary">{programme.org}</p>
            </div>
            <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted">
              {programme.period}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-muted">{programme.description}</p>

      {programme.tags ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {programme.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      ) : null}

      {/* credential — a clickable, verifiable chip */}
      {programme.credential ? (
        <Link
          href={programme.credential.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/cred mt-6 flex items-center gap-4 rounded-2xl border border-border bg-background p-3 transition-colors hover:border-foreground"
        >
          {programme.credential.thumb ? (
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
              <Image
                src={programme.credential.thumb}
                alt={programme.credential.label ?? "Certificate"}
                fill
                sizes="96px"
                className="object-contain p-1"
              />
            </div>
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
              <BadgeCheck className="h-3.5 w-3.5 text-primary" />
              Credential
            </p>
            <p className="mt-1 truncate text-sm font-semibold">{programme.credential.label}</p>
            <p className="mt-0.5 truncate text-xs text-muted">{programme.org}</p>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover/cred:translate-x-0.5 group-hover/cred:-translate-y-0.5" />
        </Link>
      ) : null}

      {/* photos */}
      {programme.photos && programme.photos.length > 0 ? (
        <div className="mt-6 grid grid-cols-3 gap-3">
          {programme.photos.map((src) => (
            <Link
              key={src}
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="group/ph relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-surface"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 640px) 33vw, 200px"
                className="object-cover transition-transform duration-500 group-hover/ph:scale-105"
              />
              <span className="absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition-all duration-300 group-hover/ph:bg-black/35 group-hover/ph:opacity-100">
                <Maximize2 className="h-4 w-4 text-white" />
              </span>
            </Link>
          ))}
        </div>
      ) : null}
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
