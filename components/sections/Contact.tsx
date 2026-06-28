import ScrambleHeading from "@/components/anim/ScrambleHeading";
import MagneticButton from "@/components/anim/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/content/site";

export default function Contact() {
  return (
    <section
      id="contact"
      className="reg relative z-10 scroll-mt-20 overflow-hidden bg-[var(--color-bg)]"
    >
      <div className="mx-auto max-w-[1600px] px-4 py-24 md:px-8 md:py-36">
        <div className="label mb-8">07 / CONTACT</div>

        <ScrambleHeading
          text="LET'S BUILD SOMETHING FAST."
          as="h2"
          className="display d-hero max-w-[16ch]"
        />

        <Reveal className="mt-12" y={30}>
          <MagneticButton
            href={`mailto:${site.email}`}
            strength={0.3}
            className="invert-hover panel inline-flex items-center gap-4 px-6 py-5 md:px-10 md:py-7"
            ariaLabel={`Email ${site.email}`}
          >
            <span className="display text-xl md:text-4xl">{site.email}</span>
            <span aria-hidden className="text-2xl md:text-4xl">
              ↗
            </span>
          </MagneticButton>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <div className="label mb-3">/ AVAILABILITY</div>
            <p className="flex items-center gap-3 text-base text-[var(--color-muted-fg)] md:text-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent-ink)] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-accent-ink)]" />
              </span>
              {site.status} · {site.location}
            </p>
          </Reveal>

          <Reveal className="md:col-span-6 md:col-start-7">
            <div className="label mb-3">/ ELSEWHERE</div>
            <ul className="grid grid-cols-2 gap-px border border-[var(--color-line-bright)] bg-[var(--color-line-bright)]">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    data-cursor="hover"
                    target="_blank"
                    rel="noreferrer"
                    className="invert-hover flex items-center justify-between bg-[var(--color-bg)] px-4 py-4"
                  >
                    <span className="mono text-sm">{s.label}</span>
                    <span className="label">{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
