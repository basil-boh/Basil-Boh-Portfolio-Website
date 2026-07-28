import Image from "next/image";
import type { Shot as ShotData } from "@/content/site";

type Props = {
  shot: ShotData;
  /** Matches the rendered width so Next picks a sane srcset. */
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * A screenshot rendered as a brutalist "plate": hairline frame, mono caption
 * tab pinned to the bottom-left corner. Captures are dimmed a touch at rest so
 * a bright notebook screenshot doesn't blow out the dark theme, and come up to
 * full strength on hover of the enclosing card/figure.
 */
export default function Shot({ shot, sizes, priority, className }: Props) {
  return (
    <div
      className={`group/shot relative overflow-hidden border border-[var(--color-line)] bg-[var(--color-muted)] ${
        className ?? ""
      }`}
    >
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.w}
        height={shot.h}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full opacity-[0.88] transition duration-500 ease-out group-hover:scale-[1.015] group-hover:opacity-100 group-hover/shot:scale-[1.015] group-hover/shot:opacity-100"
      />
      <span className="label pointer-events-none absolute bottom-0 left-0 border-r border-t border-[var(--color-line)] bg-[var(--color-bg)] px-2 py-1 text-[10px]">
        {shot.caption}
      </span>
    </div>
  );
}
