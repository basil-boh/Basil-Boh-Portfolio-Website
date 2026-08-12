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
      text: "A cognitive rehabilitation companion for early-stage dementia, built for Apple Vision Pro over four days at Apple's Spatial Hack AI. Not a diagnostic tool and not a game — a rehearsal space, for a mind and for the route home.",
    },
    { t: "h", text: "The problem" },
    {
      t: "p",
      text: "Dementia takes the everyday first. Long before anything dramatic, the small skills that hold a day together start to fray: the steps of a familiar morning arrive out of order, a walk taken for thirty years stops feeling familiar, and faces stay warm while the names attached to them slip. It is not a small room either — one in eleven Singaporeans over 60 lives with dementia, the projection is 152,000 people by 2030 against about 74,000 in 2023, and 74% of family caregivers say the role overwhelms them.",
    },
    { t: "h", text: "The one rule everything is checked against" },
    {
      t: "p",
      text: "Errorless learning. People with dementia retain procedural memory — the how — far longer than they retain the explicit memory of whether they got it right. Corrective feedback leans on exactly the memory that is failing first, so 'no, try again' teaches the error along with the anxiety of having made it. The alternative is to never let the mistake happen: cue before a wrong answer is possible rather than correcting after one, never show a score or a red mark, and fade the cues gradually across sessions so the ability ends up with the person rather than with the headset.",
    },
    {
      t: "p",
      text: "That rule is load-bearing rather than decorative. A pattern-matching miss just quietly turns back over. The clock-drawing canvas has an unconditional Clear. Wayfinding recall never blocks on a wrong turn. Every game computes a score and none of those numbers ever render anywhere the patient can see them.",
    },
    { t: "h", text: "What's in it" },
    {
      t: "ul",
      items: [
        "A first-run baseline of eight short games — reaction time, orientation, word memory, digit span, pattern matching, trail making, arithmetic and clock drawing — run in a fixed order that opens on the lowest-friction game as a warm-up, each silently scored.",
        "Making kopi: an activity of daily living practised hand-tracked on a real tabletop, in the order she would actually do it, with the patient choosing up front how much help she wants and every level still ending up offering the full demonstration.",
        "Mahjong on a proper four-seat table against three computer players, with Pong, Chow and Mahjong claims live on every legal discard. The rules aren't simplified; the deal is — a near-win hand and opponents that feed.",
        "An identity card one tap away from anywhere — photo, name in English and Chinese, date of birth, address, who to call — built to read as a keepsake rather than a test, plus a family tree of looping portraits that speak a recorded greeting when pinched.",
        "Remember the Way, the flagship: a real OpenStreetMap extract meshed at runtime into shophouses, road ribbons, street lamps and trees, mounted as a miniature on a holographic tabletop. Study, then trace the route back from memory, then step inside and walk it at life size.",
        "A caregiver dashboard where every session is appended rather than overwritten — the premise of a baseline collapses if only the most recent run survives.",
      ],
    },
    { t: "h", text: "Walking it without making anyone ill" },
    {
      t: "p",
      text: "The life-size walk is the part most likely to go wrong. Locomotion is seated and driven by a single held pinch: velocity eases in and out over roughly 150ms and never varies with how hard the pinch is, small heading changes snap invisibly, and sharp corners take a blink cut rather than a swung camera. There is no stick to steer and no direction to get wrong. Spoken guidance travels the whole way, the arrival is said out loud, and nothing restarts on its own — stopping is only ever letting go.",
    },
    { t: "h", text: "My slice" },
    {
      t: "p",
      text: "Five of us, each owning a distinct piece; mine was AI, analytics and integration. That meant the baseline metrics — what each game measures and how it is scored without any of it reaching the patient — the results store behind them, the caregiver dashboard that turns per-game history into Swift Charts trend lines and a clock-drawing gallery, and the recommendation engine that ranks memory, numeracy and executive function by measured weakness as priority = 1 − score. That last one is a plain weighted comparison rather than a trained model, deliberately: one patient never generates enough sessions to fit anything meaningful, and a caregiver deserves to see exactly why a suggestion came up.",
    },
    { t: "h", text: "Results" },
    {
      t: "p",
      text: "Grand Champion and Best UI/UX at Apple's Spatial Hack AI — first of 126 participants, judged at the Apple Developer Center in Singapore in August 2026. Session length, cadence and programme duration are all pulled from published dementia-intervention findings and Apple's own headset-comfort guidance rather than from what demoed well: 20–30 minutes a session, three or more times a week, over five to eight weeks.",
    },
    {
      t: "quote",
      text: "A hackathon prototype, not a medical device. It has not been clinically validated and makes no diagnostic claims. The eight games borrow structure from established concepts such as clock drawing, digit span and orientation; their specific content is still pending clinical review.",
    },
  ],

  "P-02": [
    {
      t: "p",
      text: "Every time an AI agent runs a package install, it trusts a stranger's code to execute on your machine — unattended, at full speed, at 2am. Airlock is the checkpoint that stands in the way: it takes each package somewhere disposable, runs it, reads it, and decides whether it is trying to hurt you before it ever reaches your real machine.",
    },
    { t: "h", text: "The problem" },
    {
      t: "p",
      text: "Registry poisoning is the fastest-growing corner of software security — Sonatype counted 34,319 new malicious packages in a single quarter of 2025, and in March 2026 one landed in npm right next to Claude Code itself. Agents make it worse: they install faster than any human, with nobody watching. Most tooling stops at reading a package and guessing.",
    },
    { t: "h", text: "Approach" },
    {
      t: "ul",
      items: [
        "Detonation: a fresh Daytona sandbox spins up in ~0.7s, seeded with honeytoken credentials as bait, and the package is installed while every file read, outbound connection and shell spawn is watched.",
        "Static reading: Qwen 3.5 on a rented Nosana GPU reads the entire source — including the branches a short test run never reaches, which is exactly where sleeping attacks hide.",
        "Similarity: Doubleword embeddings fingerprint the code against known malware, catching repackaged attacks that only reworded a known trick.",
        "Reputation: Oxylabs scans the live web for what is already known about the package, so brand-new attacks that no advisory database lists yet still get caught.",
        "A judge weighs all four signals — but sits on a floor made of plain code, not AI. Reading planted bait, phoning home or opening a shell during an install is an instant block on its own, and the model can only ever make the gate stricter.",
      ],
    },
    { t: "h", text: "Results" },
    {
      t: "p",
      text: "A typosquatted python-pillow is caught, blocked and explained in plain language the agent can act on, while safe packages pass through with no noise at all. Built at the Daytona HackSprint in Singapore and took the overall grand prize.",
    },
  ],

  "P-03": [
    {
      t: "p",
      text: "The client companion app for a medically-supervised health-transformation programme. Clients follow a five-phase fat-loss and cellular-cleanse protocol, and the app's whole job is to make that protocol survive contact with a real week: know which phase you're in, know what today asks of you, and capture the evidence without it feeling like data entry.",
    },
    { t: "h", text: "The problem" },
    {
      t: "p",
      text: "The programme used to live in a printed manual. A protocol that spans five back-to-back phases — a one-day feast, a 7-to-28-day cleanse the client chooses the length of, then transition, maintenance and open-ended sustainability — asks a lot of someone reading a PDF. Adherence dies in the gap between what the plan says and what you can remember at 7am on day nine.",
    },
    { t: "h", text: "Approach" },
    {
      t: "ul",
      items: [
        "Secure auth via Singpass and Google OAuth, with state, nonce and token validation end to end — a health record is not something you protect casually.",
        "A phase engine as the spine: the schedule derives from a start date and the client's chosen phase-two duration, so every screen can answer 'what does today look like' without the client tracking dates themselves.",
        "Realtime bidirectional sync across four-plus biometric sources — Apple HealthKit plus native BLE modules for Lefu, Omron, Senssun and Yolanda scales — so readings flow from whichever device the client already owns, and writes flow back.",
        "A NestJS service for what the phone can't do: Visbody body-scan ingestion, gamification and insights.",
        "AI-generated nutrition plans at onboarding and AI meal analysis (OCR + LLMs) day to day, so the plan is theirs rather than a generic template.",
        "Streaks, quests, milestones and leaderboards on top — a protocol only works if the client is still running it in week three.",
      ],
    },
    { t: "h", text: "Making it fast" },
    {
      t: "p",
      text: "The pipelines take in over 10,000 health readings a day, and the first version showed it: dashboard calls sat around three seconds, which is long enough that a client stops opening the app. Reworking the Supabase schemas around the access patterns the app actually has — user metrics, streaks, leaderboards, health tracking — and fixing the query paths feeding them brought responses down to roughly 500ms, an 83% cut.",
    },
    { t: "h", text: "Results" },
    {
      t: "p",
      text: "34 screens, 130 components and 67 services across the app, against a 35-table schema, shipping to both iOS and Android from one Expo codebase. The printed manual became something a client actually runs day by day.",
    },
  ],

  "P-04": [
    {
      t: "p",
      text: "A quant notebook that treats a 29-year return series as a distribution rather than a headline — running AMZN against the S&P 500 through the risk battery that decides whether a return was earned or just survived.",
    },
    { t: "h", text: "The problem" },
    {
      t: "p",
      text: "Cumulative return is the most quoted and least informative number in investing. It says nothing about the path taken, the volatility endured, or how much of the result was simply market beta. Two assets with identical returns can be completely different propositions once you look underneath.",
    },
    { t: "h", text: "Approach" },
    {
      t: "ul",
      items: [
        "Pull daily returns for AMZN and SPY as a common benchmark, matched on dates.",
        "Risk-adjusted returns — Sharpe, Sortino and Omega — instead of raw performance.",
        "Drawdown curves plotted underneath the equity curve, so the pain is visible next to the gain.",
        "Beta and alpha to separate market exposure from genuine excess return.",
        "A monthly-return heatmap across every year, and a 1,000-path Monte Carlo on the trailing year to frame the realised path against the distribution it could have taken.",
      ],
    },
    { t: "h", text: "Results" },
    {
      t: "p",
      text: "A 30.82% CAGR that most write-ups would stop at — sitting on a −94.4% maximum drawdown, a Sharpe of only 0.76 against the benchmark's 0.65, and a beta of 1.30. The excess return is real (alpha 0.27), but it was paid for in volatility, and the drawdown chart is the honest version of the story.",
    },
  ],

  "P-05": [
    {
      t: "p",
      text: "A linear regression predicting Singapore HDB resale prices from floor area across 287,196 transactions — built less as a modelling exercise than as a discipline exercise in not fooling yourself.",
    },
    { t: "h", text: "The problem" },
    {
      t: "p",
      text: "A regression will happily report a great score on the data it was fit to. The interesting question is never 'does it fit?' but 'does it beat a trivial baseline on data it has never seen, and is it fitting signal or leakage?' — and answering that takes more care than the model itself does.",
    },
    { t: "h", text: "Approach" },
    {
      t: "ul",
      items: [
        "Screen every column first: null counts, cardinality, and a correlation matrix to catch multicollinearity before it reaches the model.",
        "Check explicitly for leakage — features that encode the answer or information from the future.",
        "Keep imputation inside a scikit-learn pipeline (SimpleImputer → LinearRegression) so the transform is fit on training data only and can never leak across the split.",
        "Benchmark against a mean-predictor baseline, not against the model's own training score.",
        "Compare training and test MAE side by side as the overfitting check.",
      ],
    },
    { t: "h", text: "Results" },
    {
      t: "p",
      text: "Test MAE of S$58,866 against a baseline of S$103,471 — a 43% improvement on unseen data. Training MAE came in at S$58,778, a 0.15% gap from test, so the model generalises rather than memorises. The fitted relationship: resale price ≈ −129,773 + 3,742 × floor_area_sqm, with floor area correlating 0.80 with price.",
    },
  ],

  "P-06": [
    {
      t: "p",
      text: "A convolutional network for handwritten digits, written layer by layer in PyTorch rather than pulled off a shelf — two convolution blocks into a small dense head, 21,840 parameters in total, trained on a laptop CPU over the 60,000-image MNIST training set and scored against the 10,000 images it never saw.",
    },
    { t: "h", text: "The problem" },
    {
      t: "p",
      text: "MNIST is the one dataset where the accuracy number is not the point — everything clears 95%. What it is good for is building the whole loop by hand and being able to account for every number that comes out of it: what each layer does to the tensor shape, what the optimiser is actually being handed, and why the loss curve settles where it does.",
    },
    { t: "h", text: "Approach" },
    {
      t: "ul",
      items: [
        "Two convolution blocks — 1→10 and 10→20 channels on 5×5 kernels, each followed by 2×2 max pooling and ReLU, with Dropout2d on the second to stop the filters co-adapting.",
        "The 20×4×4 activation map flattened to 320 features into a 50-unit dense layer, dropout again, then 10 outputs — one per digit.",
        "Adam at lr=0.001 with cross-entropy over batches of 100, shuffled every epoch by the DataLoader.",
        "A held-out evaluation after every single epoch rather than only at the end, so the accuracy trajectory is visible instead of just its endpoint.",
      ],
    },
    { t: "h", text: "Reading the loss curve" },
    {
      t: "p",
      text: "The interesting artefact: the loss falls to about 1.49 and then stops, which looks like a model that has given up. It hasn't. The forward pass returns a softmax and PyTorch's CrossEntropyLoss applies its own log-softmax on top, so the loss is being taken over an already-normalised distribution. Feed it a perfectly confident prediction and the floor is log((e + 9) / e) ≈ 1.461, not 0 — which is exactly where the curve lands. The argmax that produces the prediction is unaffected, since softmax is monotonic; what it does cost is gradient signal, which is why the last few epochs only inch forward.",
    },
    { t: "h", text: "Results" },
    {
      t: "p",
      text: "9,199 of 10,000 correct after the first epoch, climbing to 9,746 — 97.46% — by the tenth, on CPU alone. Inference on individual test images comes back correct and legible: image 0 predicted 7, image 1 predicted 2.",
    },
  ],

  "P-07": [
    {
      t: "p",
      text: "This one is still being built — the page is here so it has somewhere to land. A scheduled ETL pipeline that pulls from source APIs, lands the raw payloads untouched, and reshapes them into warehouse tables downstream queries can rely on.",
    },
    { t: "h", text: "The problem" },
    {
      t: "p",
      text: "A pipeline is easy to write once and hard to run every day. The failure modes are all in the second category: a source that rate-limits halfway through, a schema that quietly gains a column, a rerun that double-counts the window it already loaded. Getting those right is the actual work.",
    },
    { t: "h", text: "Approach" },
    {
      t: "ul",
      items: [
        "Extract: scheduled pulls against the source APIs, with retry and backoff, writing raw payloads to a landing area before anything touches them.",
        "Transform: parse and typecast, dedupe, validate, derive the columns the warehouse actually wants, and fail loudly on a schema that has drifted.",
        "Load: idempotent upserts into the warehouse tables, so replaying a window lands the same rows once rather than twice.",
        "A run log and a freshness check, because a pipeline nobody can inspect is a pipeline nobody can trust.",
      ],
    },
    { t: "h", text: "Results" },
    {
      t: "p",
      text: "To come. Throughput, runtime and the source repo go up here once the pipeline is running on a schedule, along with captures from the real thing in place of the schematic.",
    },
  ],

  "P-08": [
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

  "P-09": [
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

  "P-10": [
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

  "P-11": [
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

  "P-12": [
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

  "P-13": [
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
