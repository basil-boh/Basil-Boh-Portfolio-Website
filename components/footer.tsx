import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="tone-invert bg-background text-foreground">
      <Container className="py-16 md:py-24">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src={profile.photo}
                alt={profile.name}
                width={40}
                height={40}
                className="h-9 w-9 rounded-full object-cover object-[center_25%] ring-1 ring-border"
              />
              <span className="font-display text-lg tracking-tight">{profile.name}</span>
            </Link>
            <p className="mt-5 text-base leading-relaxed text-muted">{profile.tagline}</p>
            <Link
              href={`mailto:${profile.email}`}
              className="btn btn-accent mt-7"
            >
              Let&apos;s build something
              <ArrowUpRight className="h-[18px] w-[18px]" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <p className="label">Sitemap</p>
              <ul className="mt-4 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label">Elsewhere</p>
              <ul className="mt-4 space-y-3">
                {profile.socials.map((s) => (
                  <li key={s.label}>
                    <Link
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {s.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with Next.js.
          </p>
          <p>{profile.location}</p>
        </div>
      </Container>
    </footer>
  );
}
