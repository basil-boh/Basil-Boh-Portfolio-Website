import Link from "next/link";
import type { ComponentProps } from "react";
import { CodeBlock } from "./code-block";

/* Components injected into MDX. Keeps article styling on-brand and links safe. */
export const mdxComponents = {
  a: ({ href = "", ...props }: ComponentProps<"a">) => {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      />
    );
  },
  pre: (props: ComponentProps<"pre">) => <CodeBlock {...props} />,
  code: (props: ComponentProps<"code">) => (
    <code className="rounded-md bg-surface px-1.5 py-0.5 text-[0.9em]" {...props} />
  ),
};
