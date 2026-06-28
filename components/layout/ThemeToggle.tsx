"use client";

import { toggleTheme } from "@/lib/theme";

/**
 * Light/dark switch. Which icon shows is driven purely by the
 * `:root[data-theme]` CSS (see globals.css), so the markup is identical on
 * server and client — no hydration mismatch, no flash.
 */
export default function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={() => toggleTheme()}
      data-cursor="hover"
      aria-label="Toggle light or dark theme"
      title="Toggle theme"
      className="invert-hover panel flex h-9 w-9 items-center justify-center"
    >
      {/* shown in dark mode → click for light */}
      <svg
        className="t-sun"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      {/* shown in light mode → click for dark */}
      <svg
        className="t-moon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
