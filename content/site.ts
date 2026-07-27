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

export type Project = {
  id: string;
  title: string;
  blurb: string;
  year: string;
  role: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  href?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "P-01",
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
    id: "P-02",
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
    id: "P-03",
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
    id: "P-04",
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
    id: "P-05",
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
    id: "P-06",
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
      "Integrated Apple HealthKit and third-party IoT/biometric SDKs (Omron, smart scales, Visbody) for realtime ingestion, sync and bidirectional write-back.",
      "Shipped AI-powered nutritional analysis (OCR + LLMs), push notifications and dynamic data-visualisation dashboards on a Supabase + GCP backend.",
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
