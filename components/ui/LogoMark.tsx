import Image from "next/image";
import { type Logo } from "@/content/site";

/**
 * An org mark on a hairline chip. The plate is deliberately fixed to the light
 * paper tone in both themes — these are third-party marks drawn in their own
 * dark inks, and a theme-following plate would swallow them in dark mode.
 */
export default function LogoMark({
  logo,
  className = "",
  size = 56,
}: {
  logo: Logo;
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden border border-[var(--color-line-bright)] bg-[#fbfbf7] p-2 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.w}
        height={logo.h}
        className="h-full w-full object-contain"
      />
    </span>
  );
}
