import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import LogoMark from "@/components/ui/LogoMark";
import { education } from "@/content/site";

export default function Education() {
  return (
    <section
      id="education"
      className="relative z-10 scroll-mt-20 bg-[var(--color-bg)]"
    >
      <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8 md:py-28">
        <SectionHeader
          index="05"
          title="EDUCATION"
          kicker="FOUNDATIONS + CONTINUOUS"
        />

        <div className="mt-12 grid gap-px border border-[var(--color-line-bright)] bg-[var(--color-line-bright)] md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.org} delay={i * 0.05} className="h-full">
              <article className="group flex h-full flex-col bg-[var(--color-bg)] p-6 transition-colors duration-150 hover:bg-[var(--color-bg-raised)] md:p-10">
                <div className="flex items-center justify-between">
                  <span className="mono text-sm text-[var(--color-accent-ink)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="label">{e.period}</span>
                </div>
                {e.logo && <LogoMark logo={e.logo} className="mt-8" size={64} />}
                <h3 className="display mt-5 text-2xl md:text-4xl">{e.org}</h3>
                <div className="mono mt-3 text-sm text-[var(--color-fg)] md:text-base">
                  {e.qualification}
                </div>
                <p className="mt-5 max-w-prose text-sm leading-relaxed text-[var(--color-muted-fg)]">
                  {e.detail}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
