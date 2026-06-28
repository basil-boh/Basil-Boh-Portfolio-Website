import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="line-t relative z-10 bg-[var(--color-bg)]">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="grid gap-8 py-12 md:grid-cols-12 md:py-16">
          <div className="md:col-span-5">
            <div className="label mb-4">/ COLOPHON</div>
            <p className="mono max-w-sm text-sm leading-relaxed text-[var(--color-muted-fg)]">
              Designed + built from scratch. Next.js, GSAP (ScrollTrigger,
              SplitText, ScrambleText), Lenis, and a canvas that does live 2×2
              linear algebra. No template, no page builder.
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <div className="label mb-4">/ INDEX</div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    data-cursor="hover"
                    target="_blank"
                    rel="noreferrer"
                    className="invert-hover flex items-center justify-between border border-transparent px-1 py-1"
                  >
                    <span className="mono text-sm">{s.label}</span>
                    <span className="label">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="line-t flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between">
          <span className="label">
            © {new Date().getFullYear()} {site.name} — ALL SYSTEMS NOMINAL
          </span>
          <span className="label">
            {site.location} · {site.role.toUpperCase()}
          </span>
        </div>
      </div>
    </footer>
  );
}
