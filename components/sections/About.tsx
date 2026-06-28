import SectionHeader from "@/components/ui/SectionHeader";
import SplitReveal from "@/components/anim/SplitReveal";
import Reveal from "@/components/ui/Reveal";
import Pipeline from "@/components/svg/Pipeline";
import NodeGraph from "@/components/svg/NodeGraph";
import GaltonBoard from "@/components/anim/GaltonBoard";
import { about, site } from "@/content/site";

const FACTS = [
  { k: "ROLE", v: site.role },
  { k: "BASE", v: site.location },
  { k: "FOCUS", v: "SYSTEMS · AI · STATS" },
  { k: "EDU", v: "NUS CS (HONS) · '27" },
  { k: "STATUS", v: site.status },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 scroll-mt-20 bg-[var(--color-bg)]"
    >
      <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8 md:py-28">
        <SectionHeader index="01" title="ABOUT" kicker="WHAT I OBSESS OVER" />

        <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <SplitReveal className="display d-lg max-w-3xl">
              {about.heading}
            </SplitReveal>

            <div className="mt-8 max-w-2xl space-y-5">
              {about.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className="text-base leading-relaxed text-[var(--color-muted-fg)] md:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* spec sheet */}
          <Reveal className="md:col-span-4 md:col-start-9" y={48}>
            <div className="panel">
              <div className="label line-b px-5 py-3">/ SPEC SHEET</div>
              <dl>
                {FACTS.map((f) => (
                  <div
                    key={f.k}
                    className="line-b flex items-center justify-between gap-4 px-5 py-3.5 last:border-0"
                  >
                    <dt className="label">{f.k}</dt>
                    <dd className="mono text-right text-sm">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        {/* the three axes */}
        <div className="mt-16 grid gap-px border border-[var(--color-line-bright)] bg-[var(--color-line-bright)] md:mt-24 md:grid-cols-3">
          {about.axes.map((a, i) => (
            <div key={a.tag} className="bg-[var(--color-bg)] p-6 md:p-8">
              <div className="flex items-center justify-between">
                <span className="mono text-xs text-[var(--color-muted-fg)]">
                  {a.tag}
                </span>
                <span className="label">AXIS</span>
              </div>

              <h3 className="display mt-4 text-xl leading-tight md:text-2xl">
                {a.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-fg)]">
                {a.desc}
              </p>

              {/* per-axis animated motif */}
              <div className="mt-6 h-40">
                {i === 0 && <Pipeline className="h-full" />}
                {i === 1 && <NodeGraph className="h-full" />}
                {i === 2 && <GaltonBoard className="h-full" />}
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {a.stack.map((s) => (
                  <span
                    key={s}
                    className="mono border border-[var(--color-line)] px-2 py-1 text-[11px] text-[var(--color-muted-fg)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
