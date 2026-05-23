import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

/* ---------------------------------------------------------------- Container */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 md:px-10 ${className}`}>{children}</div>;
}

/* ------------------------------------------------------------------ Section
   A full-bleed band. `tone="invert"` flips it to the opposite of the
   active theme — the Revolut magazine-spread rhythm. */

export function Section({
  children,
  tone = "base",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: "base" | "invert";
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`${tone === "invert" ? "tone-invert" : ""} bg-background text-foreground ${className}`}
    >
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ Eyebrow */

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="label inline-flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------ SectionHeader */

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-display mt-5 text-4xl sm:text-5xl md:text-6xl">{title}</h2>
        {description ? (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/* --------------------------------------------------------------------- Tag */

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border hairline px-3 py-1 text-xs font-medium text-muted">
      {children}
    </span>
  );
}

/* -------------------------------------------------------------- ButtonLink */

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "accent" | "ghost";
  withArrow?: boolean;
  external?: boolean;
};

export function ButtonLink({
  variant = "primary",
  withArrow = false,
  external = false,
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  const variantClass =
    variant === "accent" ? "btn-accent" : variant === "ghost" ? "btn-ghost" : "btn-primary";

  return (
    <Link
      className={`btn ${variantClass} group ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      {withArrow ? (
        external ? (
          <ArrowUpRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        ) : (
          <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5" />
        )
      ) : null}
    </Link>
  );
}

/* ------------------------------------------------------------- TextLink */

export function TextLink({
  children,
  className = "",
  external = false,
  ...props
}: ComponentProps<typeof Link> & { external?: boolean }) {
  return (
    <Link
      className={`group inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-opacity hover:opacity-70 ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
