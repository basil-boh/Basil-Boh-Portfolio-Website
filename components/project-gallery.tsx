import Image from "next/image";

type Shot = {
  src: string;
  caption?: string;
  device?: "mobile" | "web";
  isVideo?: boolean;
  url?: string;
};

function Caption({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="mt-3 text-sm leading-relaxed text-muted">{children}</p>;
}

export function ProjectGallery({ shots }: { shots: Shot[] }) {
  const phones = shots.filter((s) => s.device === "mobile" && !s.isVideo);
  const wide = shots.filter((s) => s.device !== "mobile");

  return (
    <div className="space-y-12">
      {/* Phone screenshots */}
      {phones.length > 0 ? (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {phones.map((s) => (
            <figure key={s.src}>
              <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[20px] border border-border bg-surface">
                <Image src={s.src} alt={s.caption ?? ""} fill sizes="(max-width: 640px) 50vw, 20vw" className="object-cover" />
              </div>
              <Caption>{s.caption}</Caption>
            </figure>
          ))}
        </div>
      ) : null}

      {/* Wide / web shots and videos */}
      {wide.length > 0 ? (
        <div className="space-y-10">
          {wide.map((s) => (
            <figure key={s.src}>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] border border-border bg-surface">
                {s.url ? (
                  <div className="absolute inset-x-0 top-0 z-10 flex h-9 items-center gap-2 border-b border-border bg-background/70 px-4 backdrop-blur">
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span className="ml-3 truncate text-xs text-muted">{s.url}</span>
                  </div>
                ) : null}
                {s.isVideo ? (
                  <video
                    src={s.src}
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                  />
                ) : (
                  <Image
                    src={s.src}
                    alt={s.caption ?? ""}
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    unoptimized={s.src.endsWith(".gif")}
                    className={s.url ? "object-cover object-top pt-9" : "object-cover"}
                  />
                )}
              </div>
              <Caption>{s.caption}</Caption>
            </figure>
          ))}
        </div>
      ) : null}
    </div>
  );
}
