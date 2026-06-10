"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ArrowUpRight,
  Briefcase,
  Copy,
  CornerDownLeft,
  FileText,
  Github,
  Linkedin,
  Mail,
  Moon,
  Search,
  Sun,
  Trophy,
  Check,
} from "lucide-react";
import { profile } from "@/lib/data";

type Item = {
  id: string;
  label: string;
  group: string;
  keywords?: string;
  icon: React.ReactNode;
  run: () => void | Promise<void>;
  hint?: string;
};

export function CommandPalette({
  projects,
  articles,
}: {
  projects: { slug: string; title: string }[];
  articles: { slug: string; title: string }[];
}) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const go = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router],
  );

  const items = useMemo<Item[]>(() => {
    const ic = "h-4 w-4";
    const nav: Item[] = [
      { id: "home", label: "Home", group: "Go to", keywords: "start", icon: <ArrowUpRight className={ic} />, run: () => go("/") },
      { id: "work", label: "Work", group: "Go to", keywords: "projects", icon: <Briefcase className={ic} />, run: () => go("/projects") },
      { id: "hack", label: "Hackathons", group: "Go to", keywords: "wins", icon: <Trophy className={ic} />, run: () => go("/hackathons") },
      { id: "exp", label: "Experience", group: "Go to", keywords: "work timeline", icon: <Briefcase className={ic} />, run: () => go("/experience") },
      { id: "writing", label: "Writing", group: "Go to", keywords: "articles blog essays", icon: <FileText className={ic} />, run: () => go("/articles") },
    ];
    const proj: Item[] = projects.map((p) => ({
      id: `p-${p.slug}`,
      label: p.title,
      group: "Projects",
      icon: <Briefcase className={ic} />,
      run: () => go(`/projects/${p.slug}`),
    }));
    const arts: Item[] = articles.map((a) => ({
      id: `a-${a.slug}`,
      label: a.title,
      group: "Writing",
      icon: <FileText className={ic} />,
      run: () => go(`/articles/${a.slug}`),
    }));
    const actions: Item[] = [
      {
        id: "copy-email",
        label: "Copy email address",
        group: "Actions",
        keywords: profile.email,
        icon: copied ? <Check className={ic} /> : <Copy className={ic} />,
        hint: copied ? "Copied" : profile.email,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
          } catch {
            window.location.href = `mailto:${profile.email}`;
          }
        },
      },
      { id: "email", label: "Send an email", group: "Actions", keywords: "contact", icon: <Mail className={ic} />, run: () => { window.location.href = `mailto:${profile.email}`; close(); } },
      { id: "resume", label: "Download résumé", group: "Actions", keywords: "cv pdf", icon: <FileText className={ic} />, run: () => { window.open(profile.resumeUrl, "_blank"); close(); } },
      {
        id: "theme",
        label: resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        group: "Actions",
        keywords: "theme dark light appearance",
        icon: resolvedTheme === "dark" ? <Sun className={ic} /> : <Moon className={ic} />,
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
    ];
    const socials: Item[] = [
      { id: "gh", label: "GitHub", group: "Elsewhere", keywords: "code repo", icon: <Github className={ic} />, run: () => { window.open("https://github.com/basil-boh", "_blank"); close(); } },
      { id: "li", label: "LinkedIn", group: "Elsewhere", keywords: "profile", icon: <Linkedin className={ic} />, run: () => { window.open(profile.socials.find((s) => s.label === "LinkedIn")?.href ?? "#", "_blank"); close(); } },
    ];
    return [...nav, ...proj, ...arts, ...actions, ...socials];
  }, [projects, articles, resolvedTheme, copied, go, close, setTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => `${it.label} ${it.group} ${it.keywords ?? ""}`.toLowerCase().includes(q));
  }, [items, query]);

  // grouped, preserving order
  const groups = useMemo(() => {
    const map = new Map<string, Item[]>();
    for (const it of filtered) {
      if (!map.has(it.group)) map.set(it.group, []);
      map.get(it.group)!.push(it);
    }
    return [...map.entries()];
  }, [filtered]);

  const flat = filtered; // active index runs over the flat filtered list

  useEffect(() => setActive(0), [query]);

  // global hotkeys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  // keep active item in view
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  if (!open) return null;

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      flat[active]?.run();
    }
  };

  return (
    <div className="cmdk-overlay" onMouseDown={close}>
      <div
        className="cmdk-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onListKey}
      >
        <div className="cmdk-search">
          <Search className="h-4 w-4 shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, projects, writing, actions…"
            className="cmdk-input"
            aria-label="Search commands"
          />
          <kbd className="cmdk-kbd">ESC</kbd>
        </div>

        <div className="cmdk-list" ref={listRef}>
          {flat.length === 0 ? (
            <div className="cmdk-empty">No results for “{query}”.</div>
          ) : (
            groups.map(([group, gItems]) => (
              <div key={group} className="cmdk-group">
                <div className="cmdk-group-label">{group}</div>
                {gItems.map((it) => {
                  const idx = flat.indexOf(it);
                  return (
                    <button
                      key={it.id}
                      type="button"
                      data-idx={idx}
                      className={`cmdk-item ${idx === active ? "is-active" : ""}`}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => it.run()}
                    >
                      <span className="cmdk-item-icon">{it.icon}</span>
                      <span className="cmdk-item-label">{it.label}</span>
                      {it.hint ? <span className="cmdk-item-hint">{it.hint}</span> : null}
                      {idx === active ? <CornerDownLeft className="ml-auto h-3.5 w-3.5 text-muted" /> : null}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
