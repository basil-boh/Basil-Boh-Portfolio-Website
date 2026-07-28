"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Demo } from "@/content/site";

/**
 * A screen-recording loop flanked by two stills, laid out as three devices on a
 * warm plate. The video is muted and looping so browsers will autoplay it, but
 * it carries `preload="none"` and only fetches once the card scrolls into view —
 * so a visitor who never reaches the section never pays for it. Under
 * prefers-reduced-motion it stays a poster frame and is never fetched at all.
 */
export default function DemoTrio({
  demo,
  sizes,
  className,
}: {
  demo: Demo;
  sizes: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [left, right] = demo.stills;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() also kicks off the load, since preload is "none"
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const tile = "h-[86%] w-auto rounded-[10px] object-cover";

  return (
    <div
      className={`group/shot relative overflow-hidden border border-[var(--color-line)] bg-[#e9e3da] ${
        className ?? ""
      }`}
    >
      <div className="flex aspect-[16/10] items-center justify-center gap-[4%] px-[5%]">
        <Image
          src={left.src}
          alt={left.alt}
          width={left.w}
          height={left.h}
          sizes={sizes}
          className={`${tile} shadow-sm opacity-80 transition-opacity duration-500 group-hover:opacity-100 group-hover/shot:opacity-100`}
        />
        <video
          ref={ref}
          src={demo.src}
          poster={demo.poster}
          aria-label={demo.alt}
          width={demo.w}
          height={demo.h}
          // preload="none" means the intrinsic size is unknown at first paint, so
          // pin the ratio explicitly or the tile lays out wider than the stills
          style={{ aspectRatio: `${demo.w} / ${demo.h}` }}
          muted
          loop
          playsInline
          preload="none"
          className={`${tile} shadow-md`}
        />
        <Image
          src={right.src}
          alt={right.alt}
          width={right.w}
          height={right.h}
          sizes={sizes}
          className={`${tile} shadow-sm opacity-80 transition-opacity duration-500 group-hover:opacity-100 group-hover/shot:opacity-100`}
        />
      </div>

      <span className="label pointer-events-none absolute bottom-0 left-0 border-r border-t border-[var(--color-line)] bg-[var(--color-bg)] px-2 py-1 text-[10px]">
        {demo.caption}
      </span>
    </div>
  );
}
