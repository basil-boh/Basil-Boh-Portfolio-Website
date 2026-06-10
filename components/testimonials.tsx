import Image from "next/image";
import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/data";

export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((t) => (
        <figure key={`${t.name}-${t.quote.slice(0, 16)}`} className="card flex flex-col p-7">
          <Quote className="h-6 w-6 text-primary" aria-hidden />
          <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground">
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
            {t.avatar ? (
              <Image
                src={t.avatar}
                alt={t.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border border-border object-cover"
              />
            ) : (
              <span className="grid h-10 w-10 place-items-center rounded-full bg-surface-2 font-display text-sm">
                {t.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            )}
            <span className="text-sm leading-tight">
              <span className="block font-semibold">{t.name}</span>
              <span className="block text-muted">
                {t.role}
                {t.org ? ` · ${t.org}` : ""}
              </span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
