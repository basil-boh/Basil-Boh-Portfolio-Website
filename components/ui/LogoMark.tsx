import Image from "next/image";
import { type Logo } from "@/content/site";

/**
 * A bare org mark — no plate, no border, natural aspect ratio at a fixed height.
 * Marks drawn in dark ink on transparency carry `adaptDark`, which flips their
 * lightness (keeping hue) under the dark theme so they don't vanish into it.
 */
export default function LogoMark({
  logo,
  className = "",
  height = 34,
}: {
  logo: Logo;
  className?: string;
  height?: number;
}) {
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.w}
      height={logo.h}
      style={{ height, width: (logo.w / logo.h) * height }}
      className={`w-auto object-contain ${logo.adaptDark ? "logo-adapt" : ""} ${className}`}
    />
  );
}
