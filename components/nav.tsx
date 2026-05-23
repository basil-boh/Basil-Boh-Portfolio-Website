"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 md:h-20 md:px-10">
          {/* Wordmark — one of the two sanctioned uses of cobalt */}
          <Link href="/" className="group flex items-center gap-2.5">
            <Image
              src={profile.photo}
              alt={profile.name}
              width={40}
              height={40}
              className="h-9 w-9 rounded-full object-cover object-[center_25%] ring-1 ring-border transition-transform group-hover:scale-105"
            />
            <span className="font-display text-lg tracking-tight">{profile.name}</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-surface text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href={`mailto:${profile.email}`}
              className="btn btn-primary hidden h-10 px-5 py-0 text-sm md:inline-flex"
            >
              Get in touch
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border hairline text-foreground md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div className="border-b border-border bg-background md:hidden">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                  isActive(link.href) ? "bg-surface text-foreground" : "text-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`mailto:${profile.email}`}
              className="btn btn-primary mt-2 w-full"
            >
              Get in touch
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
