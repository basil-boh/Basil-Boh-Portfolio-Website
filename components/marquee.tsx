import Image from "next/image";
import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiExpo,
  SiFastapi,
  SiTailwindcss,
  SiThreedotjs,
  SiPostgresql,
  SiMongodb,
  SiSupabase,
  SiFirebase,
  SiStripe,
  SiDocker,
  SiVercel,
  SiRailway,
  SiGooglecloud,
  SiOpenai,
  SiGooglegemini,
  SiAnthropic,
} from "react-icons/si";

/* Tech-stack + tools logos. Brand-coloured vector icons where available;
   `img` is used for brands not in the icon set (rendered from /public/logos).
   Black/white brands have no `color` and inherit the theme foreground. */
type Logo = { name: string; Icon?: IconType; img?: string; color?: string };

const LOGOS: Logo[] = [
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "React / React Native", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express", Icon: SiExpress },
  { name: "Expo", Icon: SiExpo },
  { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Three.js", Icon: SiThreedotjs },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Supabase", Icon: SiSupabase, color: "#3FCF8E" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
  { name: "Stripe", Icon: SiStripe, color: "#635BFF" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Vercel", Icon: SiVercel },
  { name: "Railway", Icon: SiRailway },
  { name: "Google Cloud", Icon: SiGooglecloud, color: "#4285F4" },
  { name: "OpenAI", Icon: SiOpenai },
  { name: "Gemini", Icon: SiGooglegemini, color: "#8E75B2" },
  { name: "Anthropic", Icon: SiAnthropic, color: "#D97757" },
  { name: "DeepSeek", img: "/logos/deepseek.png" },
  { name: "Daytona", img: "/logos/daytona.png" },
  { name: "Hyperspell", img: "/logos/hyperspell.png" },
];

export function Marquee() {
  const row = [...LOGOS, ...LOGOS];
  return (
    <div className="relative flex overflow-hidden border-y border-border py-7 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div className="marquee-track flex shrink-0 items-center gap-12 pr-12 text-foreground">
        {row.map(({ name, Icon, img, color }, i) => (
          <span
            key={i}
            title={name}
            role="img"
            aria-label={name}
            aria-hidden={i >= LOGOS.length}
            style={color ? { color } : undefined}
            className="shrink-0 transition-transform duration-300 hover:scale-110"
          >
            {img ? (
              <Image
                src={img}
                alt={name}
                width={32}
                height={32}
                className="h-7 w-7 rounded-[6px] object-contain sm:h-8 sm:w-8"
              />
            ) : Icon ? (
              <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
            ) : null}
          </span>
        ))}
      </div>
    </div>
  );
}
