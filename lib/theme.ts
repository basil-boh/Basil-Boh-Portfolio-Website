"use client";

export type Theme = "light" | "dark";

export type ThemeTokens = {
  bg: string;
  fg: string;
  accent: string;
  accentInk: string;
  line: string;
  lineBright: string;
  grid: string;
  gridSoft: string;
  dot: string;
  fillAccent: string;
  vecI: string;
  vecJ: string;
  mutedFg: string;
};

const read = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/** Snapshot the current theme's canvas-relevant colors from CSS variables. */
export function readThemeTokens(): ThemeTokens {
  return {
    bg: read("--color-bg"),
    fg: read("--color-fg"),
    accent: read("--color-accent"),
    accentInk: read("--color-accent-ink"),
    line: read("--color-line"),
    lineBright: read("--color-line-bright"),
    grid: read("--color-grid"),
    gridSoft: read("--color-grid-soft"),
    dot: read("--color-dot"),
    fillAccent: read("--color-fill-accent"),
    vecI: read("--color-vec-i"),
    vecJ: read("--color-vec-j"),
    mutedFg: read("--color-muted-fg"),
  };
}

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function setTheme(t: Theme) {
  document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem("theme", t);
  } catch {
    /* ignore */
  }
  // Notify canvases (which cache colors) to re-read their palette.
  document.dispatchEvent(new CustomEvent("themechange", { detail: t }));
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}
