import type { Block } from "@/content/details";

/** Renders long-form content blocks as semantic HTML inside a `.prose` wrapper. */
export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h":
            return <h2 key={i}>{b.text}</h2>;
          case "p":
            return <p key={i}>{b.text}</p>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre key={i}>
                <code>{b.code}</code>
              </pre>
            );
          case "quote":
            return <blockquote key={i}>{b.text}</blockquote>;
          default:
            return null;
        }
      })}
    </>
  );
}
