/**
 * Long-form bodies for the note + project detail pages, keyed by item id.
 * Swap this prose for your real writing — the layout adapts to any block order.
 */

export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "code"; code: string }
  | { t: "quote"; text: string };

export const projectBodies: Record<string, Block[]> = {
  "P-01": [
    {
      t: "p",
      text: "A nearest-neighbour search engine built from the ground up in Rust, designed around a single goal: never let a similarity lookup cross a millisecond at the 99th percentile, even over tens of millions of vectors.",
    },
    { t: "h", text: "The problem" },
    {
      t: "p",
      text: "Off-the-shelf vector databases were comfortable at the mean but unpredictable at the tail. Under concurrent load, GC pauses and lock contention pushed p99 into the tens of milliseconds — unacceptable for an online ranking path sitting in the request critical section.",
    },
    { t: "h", text: "Approach" },
    {
      t: "ul",
      items: [
        "An HNSW graph index with a memory layout tuned for cache locality on the search path.",
        "SIMD distance kernels (AVX2/AVX-512) for batched cosine + dot-product.",
        "A lock-free read path so queries never block behind a writer.",
        "Tokio for async I/O, with query work pinned off the accept threads.",
      ],
    },
    { t: "h", text: "Results" },
    {
      t: "p",
      text: "0.82ms p99 over 50M embeddings at 1.2M queries/sec on a single node, holding 0.991 recall@10. Tail latency stayed flat as concurrency climbed — the whole point.",
    },
  ],

  "P-02": [
    {
      t: "p",
      text: "An orchestration layer that treats a retrieval-augmented agent as a typed dataflow graph rather than a pile of prompt strings — so every hop is observable, testable, and individually optimisable.",
    },
    { t: "h", text: "The problem" },
    {
      t: "p",
      text: "Agent pipelines were opaque. When an answer went wrong, there was no way to tell which hop caused it, and no way to change one step without risking the rest. Cost and latency were both invisible until the bill arrived.",
    },
    { t: "h", text: "Approach" },
    {
      t: "ul",
      items: [
        "A DAG of typed tool calls, each with explicit inputs/outputs and its own eval gate.",
        "Speculative retrieval that prefetches likely context while earlier hops run.",
        "Automatic eval gating: a step can't ship if it regresses its offline metric.",
        "OpenTelemetry tracing across every hop, so latency and token cost are attributable.",
      ],
    },
    { t: "h", text: "Results" },
    {
      t: "p",
      text: "Grounded-answer rate up 37%, token cost down 41%, and 100% trace coverage — debugging went from guesswork to reading a span.",
    },
  ],

  "P-03": [
    {
      t: "p",
      text: "An adaptive connection pooler that models saturation as a queueing system and resizes itself from live telemetry, killing the tail-latency spikes that traffic surges used to cause.",
    },
    { t: "h", text: "The problem" },
    {
      t: "p",
      text: "Statically-sized pools are wrong twice: too small and they queue under surge, too big and they waste connections and overwhelm the database. Hand-tuning them is a full-time job that's stale the moment traffic shifts.",
    },
    { t: "h", text: "Approach" },
    {
      t: "ul",
      items: [
        "Treat the pool as an M/M/c queue and track wait time, not just utilisation.",
        "Resize on observed queue wait, with hysteresis to avoid thrashing.",
        "Feed decisions from Prometheus metrics already being collected — zero new agents.",
      ],
    },
    { t: "h", text: "Results" },
    {
      t: "p",
      text: "p99 under surge dropped 63%, pool waste fell 28%, and surge-induced timeout incidents went to zero across the fleet.",
    },
  ],

  "P-04": [
    {
      t: "p",
      text: "Exactly-once feature pipelines feeding online inference, with point-in-time correctness and a columnar hot cache that keeps reads in single-digit microseconds.",
    },
    { t: "h", text: "The problem" },
    {
      t: "p",
      text: "Training/serving skew is a silent model killer: features computed one way offline and another way online quietly degrade accuracy. And online reads have to be fast enough to sit in the inference path without becoming the bottleneck.",
    },
    { t: "h", text: "Approach" },
    {
      t: "ul",
      items: [
        "One transformation definition, executed by Flink for both backfill and streaming.",
        "Point-in-time joins so training never sees a feature value from the future.",
        "A columnar hot cache (DuckDB + Redis) for microsecond online reads.",
      ],
    },
    { t: "h", text: "Results" },
    {
      t: "p",
      text: "Sub-200ms feature freshness, 8µs online reads, and point-in-time-exact correctness — training and serving finally agreed.",
    },
  ],

  "P-05": [
    {
      t: "p",
      text: "A reproducible evaluation harness that ships every model or prompt change with a confidence interval instead of a hunch — so 'it feels better' becomes 'it's better, p < 0.05'.",
    },
    { t: "h", text: "The problem" },
    {
      t: "p",
      text: "LLM evals are noisy. Run the same suite twice and the numbers move. Without statistical rigour, teams chase phantom regressions and ship real ones, because nobody can tell signal from variance.",
    },
    { t: "h", text: "Approach" },
    {
      t: "ul",
      items: [
        "Significance gating: a change must beat the baseline by more than the noise band to ship.",
        "Bayesian estimation (Stan) of the metric, reporting intervals not point scores.",
        "Ray for parallel eval runs, so rigour doesn't cost you wall-clock time.",
      ],
    },
    { t: "h", text: "Results" },
    {
      t: "p",
      text: "94% of real regressions caught before release, eval runtime cut 5.4×, and a flake rate held to 0.3%.",
    },
  ],

  "P-06": [
    {
      t: "p",
      text: "An interactive tool that turns Postgres EXPLAIN ANALYZE output into a navigable cost graph, making the one missing index hiding behind a sequential scan impossible to miss.",
    },
    { t: "h", text: "The problem" },
    {
      t: "p",
      text: "Query plans are dense, nested text. The expensive node is in there somewhere, but finding it means parsing a wall of output by eye — exactly the kind of thing humans are bad at and tools are good at.",
    },
    { t: "h", text: "Approach" },
    {
      t: "ul",
      items: [
        "Parse the plan into a tree and render it as a WebGL cost graph, sized by actual time.",
        "Highlight the dominant node and the rows-removed-by-filter smell automatically.",
        "Shareable URLs so a plan can be dropped into a code review.",
      ],
    },
    { t: "h", text: "Results" },
    {
      t: "p",
      text: "2.1k GitHub stars, a long tail of fixed queries, and an average 11× speedup on the plans people brought to it.",
    },
  ],
};
