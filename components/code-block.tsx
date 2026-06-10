"use client";

import { useRef, useState, type ComponentProps } from "react";
import { Check, Copy } from "lucide-react";

/** MDX <pre> replacement with a copy-to-clipboard button. */
export function CodeBlock(props: ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = ref.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <div className="codeblock">
      <button
        type="button"
        onClick={copy}
        className="codeblock__copy"
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre
        ref={ref}
        className="overflow-x-auto rounded-[var(--radius-md)] border border-border bg-surface p-5 text-sm"
        {...props}
      />
    </div>
  );
}
