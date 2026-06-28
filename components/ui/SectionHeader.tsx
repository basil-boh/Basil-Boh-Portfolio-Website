import ScrambleHeading from "@/components/anim/ScrambleHeading";

type Props = {
  index: string;
  title: string;
  kicker?: string;
};

/** Brutalist section header: oversized index, scramble-decode title, ruled baseline. */
export default function SectionHeader({ index, title, kicker }: Props) {
  return (
    <div className="line-b flex flex-wrap items-end justify-between gap-x-6 gap-y-3 pb-5">
      <div className="flex items-end gap-4 md:gap-6">
        <span className="mono mb-1 text-sm text-[var(--color-muted-fg)] md:text-base">
          {index}
        </span>
        <ScrambleHeading text={title} as="h2" className="display d-xl" />
      </div>
      {kicker && (
        <span className="label mb-2 max-w-xs text-right">{kicker}</span>
      )}
    </div>
  );
}
