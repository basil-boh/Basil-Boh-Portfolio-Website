/**
 * SINGLE SOURCE OF TRUTH for all site content.
 * Swap these placeholder values for your real details — nothing else needs to change.
 */

export const site = {
  name: "BASIL BOH",
  initials: "BB",
  role: "Backend / AI Engineer",
  tagline:
    "I build backend systems that stay fast under load and AI pipelines that stay honest under scrutiny.",
  location: "Singapore",
  email: "basil.boh001@gmail.com",
  phone: "+65 9224 0889",
  status: "OPEN TO WORK",
  // Short, punchy lines describing the work.
  keywords: [
    "OPTIMISATION",
    "HIGH-PERFORMANCE",
    "CACHING",
    "CONNECTION POOLING",
    "ASYNC / BATCH",
    "RAG",
    "AI PIPELINES",
    "EVALS",
    "HARNESSES",
    "p99 LATENCY",
  ],
  socials: [
    { label: "GITHUB", handle: "github.com/basil-boh", href: "https://github.com/basil-boh" },
    {
      label: "LINKEDIN",
      handle: "in/basil-boh",
      href: "https://www.linkedin.com/in/basil-boh-81933b18b/",
    },
    { label: "EMAIL", handle: "basil.boh001@gmail.com", href: "mailto:basil.boh001@gmail.com" },
    { label: "PHONE", handle: "+65 9224 0889", href: "tel:+6592240889" },
  ],
} as const;

export const about = {
  heading: "I optimise the layers most people never look at.",
  body: [
    "I'm Basil, a backend and AI engineer. I geek out on the parts of a system that decide whether it survives real load: caching, connection pooling, batch processing, async, and heavy query optimisation.",
    "The other half of my brain lives in AI infrastructure. I build RAG pipelines, evals and agent harnesses that are measurable and debuggable instead of held together by vibes.",
    "I'm a Computer Science (Honours) student at NUS, currently interning at Twiss and Biohackk. Most of what I build starts as a hackathon hack and grows from there.",
  ],
  // Each "axis" renders as a labelled brutalist block.
  axes: [
    {
      tag: "01",
      title: "HIGH-PERFORMANCE SYSTEMS",
      desc: "Heavy query optimisation, caching, connection pooling, batch processing and async I/O. Pooled, pipelined paths and the cold tail latencies nobody profiles until it's on fire.",
      stack: ["PostgreSQL", "Redis", "FastAPI", "Go", "Docker"],
    },
    {
      tag: "02",
      title: "APPLIED AI / LLM INFRA",
      desc: "RAG pipelines, agent harnesses, tool-calling orchestration and evals that retrieve the right context, not the most context.",
      stack: ["Python", "OpenAI", "Gemini 3 Pro", "pgvector", "Vertex AI"],
    },
    {
      tag: "03",
      title: "STATISTICS & MODELLING",
      desc: "Treating latency, recall and cost as distributions, not averages. Load modelling and measurement that turn noisy telemetry into decisions you can defend.",
      stack: ["NumPy", "PyTorch", "scikit-learn", "DuckDB"],
    },
  ],
} as const;

/** A screenshot shipped from the project itself. Files live in /public/work/<slug>/. */
export type Shot = {
  src: string;
  alt: string;
  /** Short mono caption rendered under (or over) the plate. */
  caption: string;
  w: number;
  h: number;
};

/**
 * A silent screen-recording loop shown on the card in place of a flat cover,
 * flanked by two stills. Muted + looping so it can autoplay; it only loads and
 * plays once scrolled into view, and never under prefers-reduced-motion.
 */
export type Demo = {
  src: string;
  poster: string;
  alt: string;
  caption: string;
  w: number;
  h: number;
  /** Portrait stills placed either side of the video. */
  stills: [Shot, Shot];
};

export type Project = {
  id: string;
  title: string;
  blurb: string;
  year: string;
  role: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  href?: string;
  /** Public source, linked from the detail page. */
  repo?: string;
  /** 16:10 crop used on the card. Hand-cropped from the best region of a shot. */
  cover?: Shot;
  /** Takes the card's cover slot when present; `cover` stays the fallback. */
  demo?: Demo;
  /** Full-size captures, shown as a gallery on the detail page. */
  shots?: Shot[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "P-01",
    title: "AIRLOCK",
    blurb:
      "A safety gate that stands in front of every package an AI agent installs. Each candidate is detonated in a throwaway Daytona sandbox seeded with honeytoken credentials, read line-by-line by a code model on a rented GPU, and reputation-checked against the live web — then a judge weighs all of it and blocks or passes, in plain language the agent understands.",
    year: "2026",
    role: "Backend / Security",
    stack: ["Python", "Daytona", "Qwen 3.5", "Nosana GPU", "Doubleword", "Oxylabs"],
    metrics: [
      { label: "SANDBOX SPIN-UP", value: "0.7s" },
      { label: "VERDICT SIGNALS", value: "4" },
      { label: "HACKSPRINT", value: "1ST PLACE" },
    ],
    repo: "https://github.com/basil-boh/airlock",
    featured: true,
    cover: {
      src: "/work/airlock/cover.webp",
      alt: "Agent terminal session where Airlock intercepts a pip install of python-pillow and returns a BLOCKED verdict.",
      caption: "BLOCKED — python-pillow",
      w: 1280,
      h: 800,
    },
    shots: [
      {
        src: "/work/airlock/verdict.webp",
        alt: "Terminal showing Airlock detonating python-pillow in a Daytona sandbox: tripwires fire on a planted ~/.aws/credentials read and an outbound connection, Nosana rates the source 10/10 malicious, and the install is blocked.",
        caption: "THE VERDICT — TRIPWIRES, SOURCE RATING, BLOCK",
        w: 1600,
        h: 780,
      },
      {
        src: "/work/airlock/checks.webp",
        alt: "Airlock's three checks: Daytona detonates the package, Nosana reads every line of source, and a judge weighs both and delivers the verdict.",
        caption: "THREE CHECKS BEFORE ANY INSTALL",
        w: 1600,
        h: 780,
      },
      {
        src: "/work/airlock/problem.webp",
        alt: "Title card: your AI agent installs a package, it just stole your keys — 34,319 malicious packages hit the registries in a single quarter of 2025.",
        caption: "THE PROBLEM — 34,319 IN ONE QUARTER",
        w: 1600,
        h: 780,
      },
    ],
  },
  {
    id: "P-02",
    title: "BIOHACKK JOURNEY APP",
    blurb:
      "A full-stack mobile health platform: Singpass and Google OAuth, realtime bidirectional sync across four-plus biometric sources — Apple HealthKit, Omron, smart scales and Visbody body scans — and a phase-aware daily protocol with food, sleep, mood and vitals journaling on top. The Supabase and GCP pipelines behind it ingest 10,000+ readings a day; reworking the schemas and query paths took API responses from 3s to 500ms.",
    year: "2026",
    role: "Mobile / Backend",
    stack: ["React Native", "Expo", "TypeScript", "Supabase", "GCP", "NestJS", "HealthKit"],
    metrics: [
      { label: "API RESPONSE", value: "-83%" },
      { label: "READINGS / DAY", value: "10,000+" },
      { label: "BIOMETRIC SOURCES", value: "4+" },
    ],
    featured: true,
    demo: {
      src: "/work/biohackk-journey-app/demo.mp4",
      poster: "/work/biohackk-journey-app/demo-poster.webp",
      alt: "Screen recording of the Biohackk app: the phase-aware home dashboard with a 3D body figure and weight, sustenance, sleep and water cards, the five-phase programme carousel, and the posture-analysis body scan.",
      caption: "LIVE — DASHBOARD, PHASES, BODY SCAN",
      w: 384,
      h: 832,
      stills: [
        {
          src: "/work/biohackk-journey-app/still-nutrition.webp",
          alt: "The nutrition detail screen: a photographed meal identified as strawberry kakigori with creme brulee topping, a health score, and a per-ingredient sodium, salt and energy breakdown.",
          caption: "AI MEAL ANALYSIS",
          w: 384,
          h: 832,
        },
        {
          src: "/work/biohackk-journey-app/still-quests.webp",
          alt: "The quests screen listing daily and weekly missions — 10K steps, mindful moment, workout streak, hydration hero — each with XP and coin rewards and a progress bar.",
          caption: "QUESTS + STREAKS",
          w: 384,
          h: 832,
        },
      ],
    },
    cover: {
      src: "/work/biohackk-journey-app/cover.webp",
      alt: "Three Biohackk app screens side by side: the home dashboard with weight, calories, sleep and water cards around a body figure; the calorie log with per-meal rings; and the weight progress view.",
      caption: "DASHBOARD · FOOD LOG · WEIGHT",
      w: 1280,
      h: 800,
    },
    shots: [
      {
        src: "/work/biohackk-journey-app/daily.webp",
        alt: "Full-length captures of the three core screens: the phase-aware home dashboard with macro rings and water, sleep and mood cards; the calorie log broken down by breakfast, lunch and dinner; and the weight view with progress chart, weight-change table, progress photos, weekly energy chart and BMI band.",
        caption: "THE DAILY LOOP, END TO END",
        w: 1600,
        h: 1180,
      },
      {
        src: "/work/biohackk-journey-app/onboarding.webp",
        alt: "Onboarding screens: the generated custom plan with calorie and weight goals, a projected weight curve against a traditional diet, and the calorie-tracking explainer.",
        caption: "ONBOARDING — GENERATED PLAN",
        w: 1600,
        h: 900,
      },
      {
        src: "/work/biohackk-journey-app/engagement.webp",
        alt: "The streak screen with a weekly calendar and streak milestones, and the mood journal with an emotion picker, activity tags and a focus-and-energy chart.",
        caption: "STREAKS + MOOD JOURNAL",
        w: 1600,
        h: 900,
      },
    ],
  },
  {
    id: "P-03",
    title: "PORTFOLIO RISK ANALYTICS",
    blurb:
      "A quant notebook that runs AMZN's 29-year return series through the full risk battery against SPY — Sharpe and Sortino, drawdown curves, beta and alpha, a monthly-return heatmap and a 1,000-path Monte Carlo on the trailing year. A 30% CAGR reads very differently once you plot the drawdown underneath it.",
    year: "2026",
    role: "Quant Research",
    stack: ["Python", "quantstats", "pandas", "NumPy", "Jupyter"],
    metrics: [
      { label: "CAGR (AMZN)", value: "30.82%" },
      { label: "SHARPE", value: "0.76" },
      { label: "MAX DRAWDOWN", value: "-94.4%" },
    ],
    repo: "https://github.com/basil-boh/simple-portfolio-analysis",
    cover: {
      src: "/work/portfolio-risk-analytics/cover.webp",
      alt: "Monte Carlo simulation of 1,000 paths over 252 trading days, with the realised return traced in red through a 95% confidence band.",
      caption: "MONTE CARLO — 1,000 PATHS",
      w: 1280,
      h: 800,
    },
    shots: [
      {
        src: "/work/portfolio-risk-analytics/snapshot.webp",
        alt: "Portfolio summary for AMZN from May 1997 to July 2026: cumulative return, underwater drawdown curve and daily returns, alongside end-of-year returns for AMZN and SPY.",
        caption: "SNAPSHOT — RETURN, DRAWDOWN, DAILY",
        w: 1162,
        h: 1754,
      },
      {
        src: "/work/portfolio-risk-analytics/heatmap.webp",
        alt: "Monthly returns heatmap for AMZN from 1997 to 2026, with the Monte Carlo simulation below it.",
        caption: "MONTHLY RETURNS, 1997—2026",
        w: 1150,
        h: 1756,
      },
      {
        src: "/work/portfolio-risk-analytics/montecarlo.webp",
        alt: "Monte Carlo simulation and the full quantstats performance metrics table: cumulative return, CAGR, Sharpe, Sortino, Omega and max drawdown.",
        caption: "SIMULATION + FULL METRICS TABLE",
        w: 1114,
        h: 1756,
      },
    ],
  },
  {
    id: "P-04",
    title: "HDB RESALE PRICE MODEL",
    blurb:
      "A linear regression over 287,196 Singapore HDB resale transactions, built as an honest end-to-end scikit-learn pipeline: correlation and multicollinearity screening, leakage checks, imputation kept inside the pipeline, and a held-out test set measured against a mean-predictor baseline rather than against itself.",
    year: "2026",
    role: "Modelling",
    stack: ["Python", "scikit-learn", "pandas", "seaborn", "Jupyter"],
    metrics: [
      { label: "TEST MAE", value: "S$58.9k" },
      { label: "VS BASELINE", value: "-43%" },
      { label: "TRAIN↔TEST GAP", value: "0.15%" },
    ],
    repo: "https://github.com/basil-boh/linear-regression-ml",
    cover: {
      src: "/work/hdb-resale-price-model/cover.webp",
      alt: "Scatter plot of resale price against floor area for Singapore HDB flats, with the fitted linear model drawn through it in red.",
      caption: "FIT — RESALE PRICE VS FLOOR AREA",
      w: 1280,
      h: 800,
    },
    shots: [
      {
        src: "/work/hdb-resale-price-model/fit.webp",
        alt: "The fitted model: 287,196 training points of resale price against floor area, with the linear model drawn through them in red, rising from roughly zero at 30 sqm to just over one million SGD at 300 sqm.",
        caption: "FIT — RESALE PRICE VS FLOOR AREA",
        w: 1600,
        h: 1000,
      },
      {
        src: "/work/hdb-resale-price-model/equation.webp",
        alt: "Notebook output printing a baseline MAE of 103,471.41 against a test MAE of 58,866.31, and the fitted equation: resale price SGD = -129,773.39 + (3,742.47 × floor_area_sqm).",
        caption: "BASELINE 103K → TEST 59K MAE",
        w: 1600,
        h: 602,
      },
      {
        src: "/work/hdb-resale-price-model/correlation.webp",
        alt: "Null-value check across all ten columns and a correlation heatmap between floor area, lease commence date and resale price.",
        caption: "CORRELATION + LEAKAGE SCREEN",
        w: 1600,
        h: 994,
      },
      {
        src: "/work/hdb-resale-price-model/pipeline.webp",
        alt: "The scikit-learn pipeline of SimpleImputer into LinearRegression, and the evaluation cell printing training MAE 58,778 against test MAE 58,866.",
        caption: "PIPELINE + HELD-OUT EVALUATION",
        w: 1600,
        h: 986,
      },
    ],
  },
  {
    id: "P-05",
    title: "SUB-MS VECTOR SEARCH ENGINE",
    blurb:
      "A from-scratch ANN engine with an HNSW index, SIMD distance kernels, and a lock-free query path. Serves nearest-neighbour lookups over 50M embeddings without breaking a millisecond at p99.",
    year: "2025",
    role: "Architect / IC",
    stack: ["Rust", "SIMD", "HNSW", "Tokio", "Arrow"],
    metrics: [
      { label: "p99 LATENCY", value: "0.82ms" },
      { label: "THROUGHPUT", value: "1.2M qps" },
      { label: "RECALL@10", value: "0.991" },
    ],
    featured: true,
  },
  {
    id: "P-06",
    title: "DISTRIBUTED RAG ORCHESTRATOR",
    blurb:
      "A DAG-based orchestration layer for retrieval-augmented agents: typed tool calls, speculative retrieval, automatic eval gating, and full request tracing across every hop.",
    year: "2025",
    role: "Lead Engineer",
    stack: ["Python", "asyncio", "pgvector", "Temporal", "OTel"],
    metrics: [
      { label: "GROUNDED ANSWERS", value: "+37%" },
      { label: "TOKEN COST", value: "-41%" },
      { label: "TRACE COVERAGE", value: "100%" },
    ],
    featured: true,
  },
  {
    id: "P-07",
    title: "CONNECTION-POOL AUTOPILOT",
    blurb:
      "An adaptive pooler that models pool saturation as a queueing system and resizes itself from live telemetry — killing tail latency spikes during traffic surges.",
    year: "2024",
    role: "IC",
    stack: ["Go", "PostgreSQL", "PgBouncer", "Prometheus"],
    metrics: [
      { label: "p99 UNDER SURGE", value: "-63%" },
      { label: "POOL WASTE", value: "-28%" },
      { label: "INCIDENTS", value: "0" },
    ],
  },
  {
    id: "P-08",
    title: "STREAMING FEATURE STORE",
    blurb:
      "Exactly-once feature pipelines feeding online inference, with point-in-time correctness and a columnar hot cache that keeps reads in single-digit microseconds.",
    year: "2024",
    role: "IC",
    stack: ["Kafka", "Flink", "DuckDB", "Redis"],
    metrics: [
      { label: "FEATURE FRESHNESS", value: "<200ms" },
      { label: "READ LATENCY", value: "8µs" },
      { label: "CORRECTNESS", value: "PIT-exact" },
    ],
  },
  {
    id: "P-09",
    title: "LLM EVAL HARNESS",
    blurb:
      "A reproducible eval framework with statistical significance gating — every model/prompt change ships with a confidence interval, not a vibe.",
    year: "2023",
    role: "IC",
    stack: ["Python", "Stan", "Ray", "SQLite"],
    metrics: [
      { label: "REGRESSIONS CAUGHT", value: "94%" },
      { label: "EVAL RUNTIME", value: "-5.4x" },
      { label: "FLAKE RATE", value: "0.3%" },
    ],
  },
  {
    id: "P-10",
    title: "QUERY PLAN VISUALISER",
    blurb:
      "An interactive tool that turns Postgres EXPLAIN ANALYZE output into a navigable cost graph, surfacing the one missing index hiding behind a sequential scan.",
    year: "2023",
    role: "IC / OSS",
    stack: ["TypeScript", "WebGL", "PostgreSQL"],
    metrics: [
      { label: "GITHUB STARS", value: "2.1k" },
      { label: "QUERIES FIXED", value: "∞" },
      { label: "AVG SPEEDUP", value: "11x" },
    ],
  },
];

export type Experience = {
  org: string;
  role: string;
  period: string;
  location: string;
  points: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    org: "TWISS",
    role: "Software Engineer Intern",
    period: "MAY 2026 — NOW",
    location: "Singapore",
    points: [
      "Building WatchTower, an AI operations layer for F&B — turning RTSP camera feeds into a queryable event stream (queue buildup, table turnover, kitchen congestion) with realtime alerts and natural-language 'ask-your-camera' queries.",
      "Designed a multimodal pipeline fusing YOLO and Vertex AI Vision detections with an OpenAI summarisation layer to emit autonomous operational recommendations.",
      "Shipped a tiered cost-optimisation layer that escalates from a cheap vision model to a stronger multimodal one only on anomalies, on FastAPI + Next.js + Supabase on Cloud Run.",
    ],
    stack: ["FastAPI", "Next.js", "Vertex AI", "OpenAI", "Supabase"],
  },
  {
    org: "BIOHACKK",
    role: "Software Engineer Intern",
    period: "JAN 2026 — NOW",
    location: "Singapore",
    points: [
      "Built secure auth with Singpass and Google OAuth using state, nonce and token validation for end-to-end security.",
      "Integrated Apple HealthKit and third-party IoT/biometric SDKs (Omron, smart scales, Visbody) for realtime bidirectional sync across 4+ biometric sources.",
      "Designed Supabase + GCP services and data pipelines ingesting 10,000+ health readings a day, cutting API response times from 3s to 500ms (83% faster) on schemas built for user metrics, streaks, leaderboards and health tracking.",
      "Shipped AI-powered nutritional analysis (OCR + LLMs), push notifications and dynamic data-visualisation dashboards.",
    ],
    stack: ["React Native", "Supabase", "GCP", "Apple HealthKit"],
  },
  {
    org: "DNDTS PTE. LTD.",
    role: "Software Engineer Intern",
    period: "MAY 2025 — JUL 2025",
    location: "Singapore",
    points: [
      "Built and maintained an internal OS with React (Vite, Mantine) and a Go backend on SQL + Docker.",
      "Shipped new features and optimised performance and integration across microservices and internal tools.",
    ],
    stack: ["React", "Go", "SQL", "Docker"],
  },
  {
    org: "NUS STUDENTS' COMPUTING CLUB",
    role: "Vice-President",
    period: "SEP 2024 — SEP 2025",
    location: "Singapore",
    points: [
      "Led 100+ members across subcommittees to organise 7 major events impacting 5,000+ computing students.",
      "Coordinated hackathons, tech talks and workshops; streamlined workflows and mentored junior leaders for continuity.",
    ],
    stack: ["Leadership", "Events", "Mentorship"],
  },
  {
    org: "NUS FINTECH SOCIETY",
    role: "Business Development Executive",
    period: "AUG 2024 — AUG 2025",
    location: "Singapore",
    points: [
      "Secured sponsorships and partnerships for large-scale fintech events.",
      "Built strategic collaborations to enhance engagement and funding.",
    ],
    stack: ["Partnerships", "Sponsorships", "Fintech"],
  },
];

export type Education = {
  org: string;
  qualification: string;
  period: string;
  detail: string;
};

export const education: Education[] = [
  {
    org: "NATIONAL UNIVERSITY OF SINGAPORE",
    qualification: "B.Comp. (Hons), Computer Science",
    period: "2023 — 2027",
    detail:
      "Bachelor of Computing (Honours), graduating May 2027. Focus on full-stack engineering, distributed systems and applied AI; active across NUS's hackathon and student-leadership communities.",
  },
  {
    org: "TEMASEK POLYTECHNIC",
    qualification: "Diploma (Merit), Biomedical Engineering",
    period: "2018 — 2021",
    detail:
      "Graduated with Merit — the engineering foundation that led into Computer Science.",
  },
];

export type Hackathon = {
  id: string;
  event: string;
  project: string;
  result: string;
  isWin?: boolean;
  date: string;
  location: string;
  desc: string;
  stack: string[];
};

export const hackathons: Hackathon[] = [
  {
    id: "H-01",
    event: "DAYTONA HACKSPRINT",
    project: "Airlock",
    result: "1ST PLACE",
    isWin: true,
    date: "JUL 2026",
    location: "Singapore",
    desc: "Overall Grand Winner. A security gate for AI agents that blocks supply-chain malware before install — detonating each package in a disposable Daytona sandbox seeded with honeypot credentials, fused with Qwen 3.5 static analysis on a Nosana GPU, Doubleword embedding matches against known malware and live Oxylabs reputation intel.",
    stack: ["Daytona", "Claude Code Hooks", "Nosana GPU", "Doubleword", "Oxylabs"],
  },
  {
    id: "H-02",
    event: "RALPHTHON @SG",
    project: "SnapRoom",
    result: "2ND PLACE",
    isWin: true,
    date: "MAY 2026",
    location: "Singapore",
    desc: "Turned a single room image into a walkable 3D world — Gaussian-splat environment generation, AI object meshes, a semantic-label layer and a mobile AR viewer.",
    stack: ["Three.js", "World Labs", "Fal AI", "Expo"],
  },
  {
    id: "H-03",
    event: "AI ENGINEER SINGAPORE",
    project: "DataForge",
    result: "FEATURED BUILD",
    date: "MAY 2026",
    location: "Singapore",
    desc: "An end-to-end AI engineering prototype — agents, retrieval and structured-output evaluation — built alongside OpenAI, Cursor, Vercel, Google DeepMind and ElevenLabs.",
    stack: ["Next.js", "Convex", "OpenAI", "Fal AI"],
  },
  {
    id: "H-04",
    event: "GRABMAPS",
    project: "Personality Map",
    result: "LIVE AI DEMO",
    date: "APR 2026",
    location: "Singapore",
    desc: "A tap-a-place experience on Grab Maps where archetype characters deliver review-flavoured monologues in ElevenLabs voices, brokered through a key-safe Vercel Serverless BFF.",
    stack: ["Grab Maps", "OpenAI", "ElevenLabs", "Vite"],
  },
  {
    id: "H-05",
    event: "NUS HACK&ROLL",
    project: "Reely",
    result: "SHIPPED TO CLOUD RUN",
    date: "JAN 2026",
    location: "Singapore",
    desc: "A GeoGuessr-style game that geolocates uploaded images and videos via Gemini Vision, with FFmpeg scene detection and a Dockerised stack on GCP Cloud Run.",
    stack: ["React", "MongoDB", "Gemini Vision", "GCP"],
  },
  {
    id: "H-06",
    event: "GOOGLE GEMINI",
    project: "Urban Incident Review",
    result: "LONG-VIDEO AI",
    date: "JAN 2026",
    location: "Singapore",
    desc: "An AI video analysis platform answering natural-language queries over footage with timestamped, confidence-scored findings using the Gemini Files API and Gemini 3 Pro.",
    stack: ["Next.js", "Gemini 3 Pro", "Express"],
  },
];
