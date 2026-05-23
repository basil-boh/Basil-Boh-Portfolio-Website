/**
 * Site content. Edit these arrays to make the portfolio your own —
 * everything on the site reads from here (except articles, which live
 * as MDX files in /content/articles).
 */

export const profile = {
  name: "Basil Boh",
  fullName: "Boh Xiang You Basil",
  initials: "BB",
  role: "Full-Stack & AI Engineer",
  tagline:
    "Computer Science student at NUS who ships full-stack products across AI, payments and spatial computing.",
  roles: ["AI Engineer", "Full-Stack Engineer", "Penultimate CS @ NUS"],
  location: "Singapore",
  available: true,
  email: "basil.boh001@gmail.com",
  phone: "+65 9224 0889",
  resumeUrl: "/Basil-Boh-2026.pdf",
  photo: "/profile.jpeg",
  bio: `I'm Basil — a Computer Science (Honours) student at the National University of Singapore. I build full-stack products end-to-end: payment systems, AI pipelines and real-time experiences. Right now I'm interning as a software engineer at Twiss and Biohackk, and I serve as Vice-President of the NUS Students' Computing Club. Most of what I build starts as a hackathon hack and grows from there.`,
  socials: [
    { label: "GitHub", href: "https://github.com/basil-boh", handle: "github.com/basil-boh" },
    { label: "LinkedIn", href: "https://linkedin.com/in/basil-boh", handle: "in/basil-boh" },
    { label: "Email", href: "mailto:basil.boh001@gmail.com", handle: "basil.boh001@gmail.com" },
  ],
};

export const stats = [
  { value: "3", label: "SWE internships" },
  { value: "5+", label: "Hackathons" },
  { value: "100+", label: "Committee members led" },
  { value: "5K+", label: "Students impacted" },
  { value: "2027", label: "Graduating · NUS CS" },
];

/* Accent gradients are confined to "product mockup" surfaces, per the brief. */
export type Accent = "violet" | "teal" | "light-blue" | "pink" | "green" | "orange" | "yellow";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  year: string;
  role: string;
  tags: string[];
  accent: Accent;
  featured?: boolean;
  image?: string;
  /** Animated media (mp4) shown on the card in place of the static image. */
  cardVideo?: string;
  /** Award/result — rendered as a trophy badge (same style as the hackathon cards). */
  award?: string;
  links: { live?: string; repo?: string; caseStudy?: string };
  metrics?: { value: string; label: string }[];
  /* Rich content shown on the project detail page (/projects/[slug]) */
  tagline?: string;
  overview?: string[];
  features?: string[];
  highlights?: { title: string; blurb: string }[];
  techStack?: { category: string; items: string[] }[];
  gallery?: { src: string; caption?: string; device?: "mobile" | "web"; isVideo?: boolean; url?: string }[];
  notes?: string[];
  videoEmbed?: string;
};

export const projects: Project[] = [
  {
    slug: "munchly",
    title: "Munchly",
    summary:
      "A two-sided food marketplace — iOS/Android app, web + seller dashboard, and a Stripe Connect payments service.",
    tagline:
      "A two-sided marketplace for home-based food businesses — turning neighbourhood kitchens into income, and neighbourhoods into menus.",
    description:
      "A two-sided marketplace shipped across three surfaces: an Expo iOS/Android app, a Next.js web + seller dashboard, and an Express/Stripe Connect microservice. I built a server-authoritative payments pipeline (clients post only listing IDs; the server resolves prices and issues idempotent per-seller transfers), an RLS-forced multi-tenant Postgres schema, and per-order realtime chat — modelling money as integer cents end-to-end.",
    year: "2026",
    role: "Solo · Full-Stack Engineer",
    tags: ["React Native", "Expo", "Next.js", "Supabase", "Stripe Connect"],
    accent: "violet",
    featured: true,
    image: "/projects/munchly.jpg",
    links: { live: "https://munchly.sg", repo: "https://github.com/basil-boh" },
    metrics: [
      { value: "3", label: "Surfaces shipped" },
      { value: "Stripe", label: "Connect payouts" },
      { value: "RLS", label: "Multi-tenant Postgres" },
    ],
    overview: [
      "Munchly is a two-sided marketplace I built end-to-end for home-based food businesses. Home cooks open a store, list dishes (active or pre-order), accept orders, and get paid via Stripe Connect. Buyers browse nearby kitchens, save listings, chat with the cook about pickup, and leave half-star reviews. The platform takes a commission on every transaction.",
      "It ships as a real product across three surfaces — an iOS/Android app built with Expo and React Native, a Next.js web app for marketing, public browsing and a seller analytics dashboard, and a standalone Stripe Connect microservice that owns every cent of money flow. Auth, RLS, realtime chat, native maps and webhook-driven order creation are all wired the way a shipped startup would do it, not the way a hackathon would.",
    ],
    features: [
      "Marketplace browsing with category filters, distance-aware sorting and saved listings",
      "Native maps tab — Apple Maps on iOS, Google Maps on Android — with nearby-listing pins",
      "Per-order buyer ↔ seller chat over Supabase Realtime with unread-count badges",
      "Seller dashboard: store setup, active and pre-order listings, order management, reviews, analytics",
      "Multi-seller cart that splits one Checkout Session into per-seller orders",
      "Stripe-hosted checkout with a platform-charge model and per-seller transfers",
      "Apple, Google and email auth via Supabase Auth + Sign in with Apple",
      "Listing image pipeline: client-side resize/compress → Supabase Storage with per-user folder isolation",
    ],
    highlights: [
      {
        title: "Stripe Connect, server-authoritative",
        blurb:
          "The mobile app never holds a Stripe secret. The client posts only listing IDs and quantities; an Express service resolves prices from Supabase, builds a platform-charge Checkout Session, then issues per-seller Transfers after webhook verification. Order rows are written server-side only on checkout.session.completed and are idempotent on the Stripe session ID.",
      },
      {
        title: "RLS-forced multi-tenant data layer",
        blurb:
          "Row Level Security is forced on every public table, and storage buckets scope writes to the authenticated user's own folder. Service-role usage is confined to the Stripe server and a JWT-validated edge function — nothing on the client can bypass policy.",
      },
      {
        title: "Realtime chat & order status",
        blurb:
          "Per-order chat (one conversation per order, locked on completion) and live order status both run on Supabase Realtime channels, with read-timestamp-driven unread badges across the marketplace, seller and profile tabs.",
      },
      {
        title: "Money modelled as integer cents, end to end",
        blurb:
          "Every monetary column is an integer cent value. Prices, GST, platform commission and per-seller allocations are computed once on the server and replayed at the transfer step from session metadata — no float drift, no client trust.",
      },
    ],
    techStack: [
      {
        category: "Mobile",
        items: ["Expo + React Native", "expo-router (typed routes)", "expo-maps", "Sign in with Apple"],
      },
      { category: "Web", items: ["Next.js App Router", "TypeScript", "@supabase/ssr"] },
      {
        category: "Backend & data",
        items: ["Supabase (Postgres, Auth, Storage, Realtime)", "Row Level Security", "Express + Stripe Connect"],
      },
      { category: "Infra & DevOps", items: ["Vercel", "Railway", "EAS build + OTA updates"] },
    ],
    gallery: [
      { src: "/projects/munchly/mobile-01.jpg", caption: "Marketplace home — discover home cooks nearby, filter by category, save listings.", device: "mobile" },
      { src: "/projects/munchly/mobile-02.jpg", caption: "Listing detail — image gallery, pickup slots, half-star reviews, add-to-cart.", device: "mobile" },
      { src: "/projects/munchly/mobile-03.jpg", caption: "Store page — a home chef's storefront with active and pre-order listings.", device: "mobile" },
      { src: "/projects/munchly/mobile-04.jpg", caption: "Cart & checkout — multi-seller aware, splits into per-seller orders.", device: "mobile" },
      { src: "/projects/munchly/mobile-05.jpg", caption: "Location tab — nearby listings on Apple Maps (iOS) / Google Maps (Android).", device: "mobile" },
      { src: "/projects/munchly/mobile-06.jpg", caption: "Seller dashboard — active listings, orders to fulfil, revenue at a glance.", device: "mobile" },
      { src: "/projects/munchly/mobile-07.jpg", caption: "Order management — buyer → seller pipeline with realtime status updates.", device: "mobile" },
      { src: "/projects/munchly/mobile-08.jpg", caption: "Per-order chat — Supabase Realtime channels with unread-count badges.", device: "mobile" },
      { src: "/projects/munchly/mobile-09.jpg", caption: "Profile & order history — saved listings, payment methods, family meals.", device: "mobile" },
      { src: "/projects/munchly/mobile-10.jpg", caption: "Onboarding — first-launch flow setting up auth, location and preferences.", device: "mobile" },
      { src: "/projects/munchly/web-landing.jpg", caption: "Marketing landing — the public homepage at munchly.sg.", device: "web", url: "munchly.sg" },
      { src: "/projects/munchly/web-marketplace.jpg", caption: "Public marketplace — hits the same Supabase tables as the mobile app.", device: "web", url: "munchly.sg/marketplace" },
      { src: "/projects/munchly/web-login.jpg", caption: "Auth — email/password, Google OAuth and Sign in with Apple via @supabase/ssr.", device: "web", url: "munchly.sg/login" },
    ],
    notes: [
      "Built solo, end-to-end: brand, product design, mobile app, marketing site, seller dashboard, payments microservice, database schema, RLS policies and deploy pipeline. The hard parts were the boring parts — getting Stripe Connect's platform-charge model right, forcing RLS without locking myself out, and keeping the cart consistent when one basket touches multiple sellers.",
    ],
  },
  {
    slug: "snaproom",
    title: "SnapRoom",
    summary: "Turns a single room photo into a fully walkable 3D world you can explore on web and AR.",
    tagline:
      "Turns a single room image into a walkable 3D world — Gaussian-splat environments, AI-generated object meshes and ambient sound, in under five minutes.",
    description:
      "Reconstructs a floor plan, sketch or room photo into a walkable 3D world. Generates explorable environments as Gaussian splats via the World Labs API, rendered in real time over Three.js / React Three Fiber, with AI-generated object meshes and a companion Expo AR viewer. 2nd Place at Ralphthon @SG 2026.",
    year: "2026",
    role: "Hackathon Build",
    tags: ["Three.js", "React Three Fiber", "World Labs", "Fal AI", "Expo"],
    accent: "teal",
    image: "/projects/snaproom/hero.gif",
    award: "2nd Place Winner",
    links: { repo: "https://github.com/basil-boh/snaproom" },
    videoEmbed: "https://drive.google.com/file/d/16S_Z5jNPzyNLBg9NoUpSFqVyucWpPiEB/preview",
    metrics: [
      { value: "2nd", label: "Ralphthon @SG" },
      { value: "<5min", label: "Photo → 3D world" },
    ],
    overview: [
      "SnapRoom takes a single room photo, floor plan or sketch and reconstructs it as a fully meshed, walkable 3D world — environment, objects and sound — with no manual modelling. Built in a time-boxed sprint at Ralphthon @SG, where it placed 2nd.",
      "The pipeline orchestrates World Labs and Fal AI: World Labs generates the explorable Gaussian-splat environment, Fal's Hunyuan 3D produces meshes for every dynamic object, and ElevenLabs SFX layers ambient and per-object sound. A React + react-three-fiber viewer renders the result, and a QR handoff opens the same world in a companion Expo AR viewer on mobile.",
    ],
    features: [
      "Single image → walkable 3D world in under five minutes, no manual modelling",
      "Gaussian-splat static environment generated via World Labs",
      "Per-object 3D meshes (.glb / .obj) generated through Fal Hunyuan 3D",
      "Ambient loops and object-specific impact SFX via ElevenLabs",
      "react-three-fiber viewer with fly and first-person walk modes",
      "Web → mobile AR handoff — a QR deep link opens the live world in an Expo viewer",
    ],
    techStack: [
      { category: "Web viewer", items: ["React", "Three.js", "react-three-fiber", "Spark splat renderer"] },
      { category: "Generation pipeline", items: ["World Labs (environments)", "Fal AI Hunyuan 3D (meshes)", "ElevenLabs (sound)"] },
      { category: "Mobile", items: ["Expo + React Native AR viewer", "QR deep-link handoff"] },
    ],
    gallery: [
      { src: "/projects/snaproom/landing.png", caption: "Spatial reconstruction engine — live WebGL viewer with the reconstruct → furnish → atmosphere pipeline.", device: "web" },
      { src: "/projects/snaproom/processing.png", caption: "Build progress — the five-step generation pipeline from upload to ambient sound.", device: "web" },
    ],
    notes: [
      "Built in a time-boxed hackathon sprint and placed 2nd at Ralphthon @SG 2026. The orchestration was the hard part — chaining environment generation, mesh generation and sound into one disk-first pipeline that finishes in minutes.",
    ],
  },
  {
    slug: "dataforge",
    title: "DataForge",
    summary: "An end-to-end AI engineering prototype — agents, retrieval and structured-output evals.",
    tagline:
      "An intelligent dataset repair loop for ML engineers — find broken labels, fix them, and prove the quality delta before training.",
    description:
      "Built at the AI Engineer Singapore 2026 hackathon. A dataset evaluation and curation pipeline that loads a labelled dataset, scores samples across five quality axes, and walks a reviewer through targeted repairs — then re-evaluates to show the before/after delta.",
    year: "2026",
    role: "Hackathon Prototype",
    tags: ["Next.js", "Convex", "OpenAI", "Fal AI", "Zod"],
    accent: "light-blue",
    image: "/projects/dataforge.jpg",
    links: { live: "https://dataforge-eosin.vercel.app", repo: "https://github.com/basil-boh/AIE2026-DataForge" },
    videoEmbed: "https://drive.google.com/file/d/1tHUZapgFU-5HDje_1gLdfDxQi76xZbh2/preview",
    overview: [
      "DataForge is not a model-training platform. The thesis is simpler: most ML failures start with the dataset, not the architecture. So we built a tool that improves dataset readiness before training begins.",
      "It loads a labelled image dataset, evaluates quality across five axes (label completeness, consistency, duplication, balance and overall), then walks a human reviewer through targeted repairs — completing missing labels, correcting likely mislabels, removing duplicates and balancing classes. After the repair loop, it re-evaluates and shows the before/after delta.",
    ],
    features: [
      "Seeded animal-classification demo with intentional imbalance, missing labels and duplicates",
      "Quality scoring across completeness, consistency, duplication, balance and overall",
      "Human review queues for label completions, corrections and duplicate removals",
      "GPT-5.5 via the OpenAI Responses API generates the structured repair plan",
      "Fal AI vision endpoints power duplicate detection and per-sample confidence scoring",
      "Convex powers realtime pipeline state; every step is logged",
      "Deterministic fallback adapter — the demo runs without provider keys for reliable judging",
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js App Router", "React", "TypeScript", "Tailwind CSS"] },
      { category: "Backend & data", items: ["Convex (realtime state)", "OpenAI Responses API (GPT-5.5)", "Fal AI vision inference", "Zod-typed schemas"] },
      { category: "Tooling", items: ["Seeded demo dataset", "Deterministic fallbacks", "Vercel deployment"] },
    ],
    gallery: [
      { src: "/projects/dataforge/hero.jpg", caption: "Landing — drop a ZIP to start, or run the seeded animal-classification demo." },
      { src: "/projects/dataforge/loaded.jpg", caption: "Loaded state — 319 samples across Dog / Horse / Elephant with detected imbalance." },
    ],
    notes: [
      "Built end-to-end in an 8-hour build window. The hardest part wasn't the OpenAI call — it was designing the human-in-the-loop review UX so an ML engineer could actually trust and approve the suggested fixes inside a time-boxed sprint.",
    ],
  },
  {
    slug: "personality-map",
    title: "Personality Map",
    summary: "Tap a place on Grab Maps and hear archetype characters riff on it in AI voices.",
    description:
      "A tap-a-place experience on Grab Maps where archetype characters (Italian chef, mall guard, and more) deliver review-flavoured monologues in ElevenLabs voices and live-chat via an OpenAI model. A Vercel Serverless BFF brokers every external call so no API keys ever reach the browser, with abortable per-call timeouts and caching. Built at GrabMaps 2026.",
    year: "2026",
    role: "Hackathon Build",
    tags: ["React", "Grab Maps", "OpenAI", "ElevenLabs"],
    accent: "pink",
    links: { repo: "https://github.com/basil-boh" },
  },
  {
    slug: "reely",
    title: "Reely",
    summary: "A GeoGuessr-style game that geolocates your photos and videos with Gemini Vision.",
    description:
      "A GeoGuessr-style game that analyses uploaded images and videos with the Gemini Vision API to identify real-world coordinates, then drops players onto a Google Maps + Street View board to guess the location. Includes FFmpeg scene detection, MongoDB Atlas schemas, and a Dockerised stack deployed to GCP Cloud Run. Built at NUS Hack&Roll 2026.",
    year: "2026",
    role: "Hackathon Build",
    tags: ["React", "Node/Express", "MongoDB", "Gemini Vision"],
    accent: "green",
    links: { repo: "https://github.com/basil-boh" },
  },
  {
    slug: "urban-incident-review",
    title: "Urban Incident Review",
    summary: "Natural-language queries over surveillance footage that return timestamped findings.",
    description:
      "An AI video analysis platform that takes natural-language queries against uploaded footage and returns structured findings — precise timestamps, confidence scores, and visual-evidence descriptions — with zero traditional CV infrastructure. Uses the Gemini Files API and Gemini 3 Pro for native long-video understanding, supporting files up to 2GB with async processing. Built at the Google Gemini 2026 hackathon.",
    year: "2026",
    role: "Hackathon Build",
    tags: ["Next.js", "Gemini 3 Pro", "Express", "TypeScript"],
    accent: "orange",
    links: { repo: "https://github.com/basil-boh" },
  },
  {
    slug: "data-visualization-dashboard",
    title: "Data Visualization Dashboard",
    summary: "Interactive dashboard for exploring CSV datasets in the browser — filter, slice and export.",
    tagline:
      "An interactive dashboard for exploring CSV datasets in the browser — filter, slice and export without touching a notebook.",
    description:
      "A lightweight, browser-only dashboard for working with CSV datasets. Drop in a file and immediately get filtering, summaries and charts — no backend, no upload, no notebook required.",
    year: "2024",
    role: "Personal project",
    tags: ["React", "React Bootstrap", "Papa Parse"],
    accent: "light-blue",
    image: "/projects/data-viz.jpg",
    links: { live: "https://basil-data-visualization.netlify.app", repo: "https://github.com/basil-boh/Data-Dashboard" },
    overview: [
      "A lightweight, browser-only dashboard for working with CSV datasets. You drop in a file and immediately get filtering, summaries and charts — no backend, no upload, no notebook required.",
      "Built as an exercise in keeping the dependency surface small while still feeling polished — Papa Parse handles CSV streaming so even larger files don't lock up the tab.",
    ],
    features: [
      "Drag-and-drop CSV ingestion via Papa Parse",
      "Column-level filters and search",
      "Sortable, paginated data grid",
      "Export filtered subsets back to CSV",
      "All computation client-side — no data leaves the browser",
    ],
    techStack: [
      { category: "Frontend", items: ["React", "React Bootstrap", "JavaScript"] },
      { category: "Data", items: ["Papa Parse (CSV streaming)"] },
      { category: "Deploy", items: ["Netlify"] },
    ],
    gallery: [{ src: "/projects/data-viz.jpg", caption: "Dashboard view — filter, sort and export CSV data in-browser.", device: "web" }],
  },
  {
    slug: "object-motion-detection",
    title: "Object Motion Detection",
    summary: "Real-time webcam motion + object classification — only runs YOLO when motion is detected.",
    tagline:
      "Real-time webcam motion + object classification — only invokes YOLOv5 when motion is detected, keeping FPS high.",
    description:
      "A webcam-based object detection app that combines classical motion detection with YOLOv5 classification. Motion detection is cheap; YOLO inference is expensive — so the pipeline only runs YOLO on frames where motion is present.",
    year: "2023",
    role: "Personal project",
    tags: ["Python", "OpenCV", "PyTorch", "YOLO"],
    accent: "green",
    cardVideo: "/projects/object-detection.mp4",
    links: { repo: "https://github.com/basil-boh/Object-Detection" },
    overview: [
      "A webcam-based object detection app that combines classical motion detection with YOLOv5 classification. Motion detection is cheap; YOLO inference is expensive — so the pipeline only runs YOLO on frames where motion is actually present.",
      "The result is real-time performance on commodity hardware without sacrificing detection quality. An on-screen FPS counter makes the tradeoff visible.",
    ],
    features: [
      "Classical motion detection (frame differencing in OpenCV) as a cheap pre-filter",
      "YOLOv5 (PyTorch) for object classification when motion is detected",
      "On-screen FPS counter for monitoring performance",
      "Webcam capture loop with bounding-box overlays",
    ],
    techStack: [
      { category: "Computer vision", items: ["OpenCV (motion detection)", "YOLOv5 (object detection)"] },
      { category: "Runtime", items: ["Python", "PyTorch", "NumPy"] },
    ],
    gallery: [{ src: "/projects/object-detection.mp4", caption: "Live capture — motion-gated YOLOv5 inference.", isVideo: true }],
    notes: [
      "The interesting design decision is the two-stage pipeline. Naive object detection runs YOLO on every frame, which tanks framerate on a laptop. Gating YOLO behind a motion check costs almost nothing and keeps the loop responsive.",
    ],
  },
  {
    slug: "stock-price-predictor",
    title: "Stock Price Predictor",
    summary: "Time-series model combining historical price features with news-headline sentiment.",
    tagline:
      "A time-series model that combines historical price features with sentiment signals from news headlines.",
    description:
      "A time-series prediction model that pairs technical price features (moving averages, RSI, volume) with a sentiment score derived from news headlines. The goal isn't to beat the market — it's to explore whether sentiment features add measurable signal beyond price-only baselines.",
    year: "2023",
    role: "Personal project",
    tags: ["Python", "TensorFlow", "Pandas", "Scikit-learn"],
    accent: "orange",
    image: "/projects/stock-predictor.jpg",
    links: { repo: "https://github.com/basil-boh/Stock-Predictor" },
    overview: [
      "A time-series prediction model that pairs technical price features (moving averages, RSI, volume) with a sentiment score derived from news headlines. The goal isn't to beat the market — it's to explore whether sentiment features add measurable signal beyond price-only baselines.",
    ],
    features: [
      "Historical price feature engineering (moving averages, returns, volatility)",
      "Sentiment scoring of news headlines",
      "Train/test split with walk-forward validation",
      "Comparison against a price-only baseline to isolate sentiment contribution",
    ],
    techStack: [
      { category: "ML", items: ["TensorFlow / Keras", "Scikit-learn"] },
      { category: "Data", items: ["Pandas", "NumPy"] },
      { category: "Language", items: ["Python"] },
    ],
    gallery: [{ src: "/projects/stock-predictor.jpg", caption: "Predictor output — forecast vs. actuals.", device: "web" }],
  },
  {
    slug: "social-media-platform",
    title: "Social Media Platform",
    summary: "Mobile-first social app with realtime messaging, post sharing and profiles, built on Supabase.",
    tagline:
      "A mobile-first social app with realtime messaging, post sharing and profile pages — built on Supabase.",
    description:
      "A mobile social app built with React Native and Expo, backed by Supabase for auth, storage and realtime subscriptions. Users can post, message in real time and browse profile pages.",
    year: "2022",
    role: "Personal project",
    tags: ["React Native", "Expo", "Supabase"],
    accent: "pink",
    image: "/projects/social-media.jpg",
    links: { repo: "https://github.com/basil-boh" },
    overview: [
      "A mobile social app built with React Native and Expo, backed by Supabase for auth, storage and realtime subscriptions. Users can post, message in real time and browse profile pages.",
    ],
    features: [
      "Realtime messaging via Supabase channels",
      "Post creation with image upload to Supabase storage",
      "User profiles and follow/unfollow flow",
      "Mobile-first UI with Expo Router navigation",
    ],
    techStack: [
      { category: "Mobile", items: ["React Native", "Expo", "TypeScript"] },
      { category: "Backend", items: ["Supabase (auth, storage, realtime)"] },
    ],
    gallery: [{ src: "/projects/social-media.jpg", caption: "App preview.", device: "web" }],
  },
];

export type Hackathon = {
  slug: string;
  event: string;
  project: string;
  result: string;
  isWin?: boolean;
  year: string;
  location: string;
  description: string;
  tags: string[];
  accent: Accent;
  logo?: string;
  link?: string;
};

export const hackathons: Hackathon[] = [
  {
    slug: "ralphthon-2026",
    event: "Ralphthon @SG",
    project: "SnapRoom",
    result: "2nd Place Winner",
    isWin: true,
    year: "2026",
    location: "Singapore · 17 May 2026",
    description:
      "Placed 2nd building SnapRoom — turning a single room image into a walkable 3D world with Gaussian-splat environment generation, AI object meshes, a semantic-label layer and a mobile AR viewer.",
    tags: ["Three.js", "World Labs API", "Fal AI", "Expo"],
    accent: "teal",
    logo: "/hackathons/ralphthon.jpeg",
  },
  {
    slug: "ai-engineer-sg-2026",
    event: "AI Engineer Singapore",
    project: "DataForge",
    result: "Featured Build",
    year: "2026",
    location: "Singapore · 9 May 2026",
    description:
      "Shipped an end-to-end AI engineering prototype — agents, retrieval and structured-output evaluation — alongside OpenAI, Cursor, Vercel, Google DeepMind and ElevenLabs.",
    tags: ["Next.js", "Convex", "OpenAI", "Fal AI"],
    accent: "light-blue",
    logo: "/hackathons/ai-engineer.png",
  },
  {
    slug: "grabmaps-2026",
    event: "GrabMaps",
    project: "Personality Map",
    result: "Live AI Demo",
    year: "2026",
    location: "Singapore · 24 Apr 2026",
    description:
      "A tap-a-place experience on Grab Maps where archetype characters deliver review-flavoured monologues in ElevenLabs voices, brokered through a key-safe Vercel Serverless BFF.",
    tags: ["Grab Maps", "OpenAI", "ElevenLabs", "Vite"],
    accent: "pink",
    logo: "/hackathons/grab.png",
  },
  {
    slug: "hack-and-roll-2026",
    event: "NUS Hack&Roll",
    project: "Reely",
    result: "Shipped to Cloud Run",
    year: "2026",
    location: "Singapore · 17 Jan 2026",
    description:
      "A GeoGuessr-style game that geolocates uploaded images and videos via Gemini Vision, with FFmpeg scene detection and a Dockerised stack on GCP Cloud Run.",
    tags: ["React", "MongoDB", "Gemini Vision", "GCP"],
    accent: "green",
    logo: "/hackathons/hack-and-roll.png",
  },
  {
    slug: "google-gemini-2026",
    event: "Google Gemini",
    project: "Urban Incident Review",
    result: "Long-Video AI",
    year: "2026",
    location: "Singapore · 10 Jan 2026",
    description:
      "An AI video analysis platform answering natural-language queries over footage with timestamped, confidence-scored findings using the Gemini Files API and Gemini 3 Pro.",
    tags: ["Next.js", "Gemini 3 Pro", "Express"],
    accent: "orange",
    logo: "/hackathons/gemini.png",
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
  logo?: string;
  /** Background behind the logo tile. Defaults to white. Use a dark value for light/white logos. */
  logoBg?: string;
  /** How the logo fills its tile. `contain` (default) for wordmarks, `cover` for full-bleed icons. */
  logoFit?: "contain" | "cover";
};

export const experiences: Experience[] = [
  {
    company: "Twiss",
    role: "Software Engineer Intern",
    period: "May 2026 — Present",
    current: true,
    location: "Singapore",
    summary: "Building WatchTower, an AI operations layer for F&B businesses.",
    highlights: [
      "Turned RTSP camera feeds into a queryable event stream covering queue buildup, table turnover and kitchen congestion, with realtime alerts and natural-language “ask-your-camera” queries.",
      "Designed a multimodal pipeline fusing YOLO and Vertex AI Vision detections with an OpenAI summarisation layer to emit autonomous operational recommendations.",
      "Shipped a tiered cost-optimisation layer that escalates from a cheap vision model to a stronger multimodal one only on anomalies, on a FastAPI + Next.js + Supabase stack on Cloud Run.",
    ],
    stack: ["FastAPI", "Next.js", "Vertex AI", "OpenAI", "Supabase"],
    logo: "/companies/twiss.png",
    logoBg: "#0b0b0d",
  },
  {
    company: "Biohackk",
    role: "Software Engineer Intern",
    period: "Jan 2026 — Present",
    current: true,
    location: "Singapore",
    summary: "Full-stack mobile health-tech app with secure auth and IoT ingestion.",
    highlights: [
      "Built secure auth with Singpass and Google OAuth using state, nonce and token validation for end-to-end security.",
      "Integrated Apple HealthKit and third-party IoT/biometric SDKs (Omron, smart scales, Visbody) for realtime ingestion, sync and bidirectional write-back.",
      "Shipped AI-powered nutritional analysis (OCR + LLMs), push notifications and dynamic data-visualisation dashboards on a Supabase + GCP backend.",
    ],
    stack: ["React Native", "Supabase", "GCP", "Apple HealthKit"],
    logo: "/companies/biohackk.jpeg",
    logoFit: "cover",
  },
  {
    company: "DNDTS Pte. Ltd.",
    role: "Software Engineer Intern",
    period: "May 2025 — Jul 2025",
    location: "Singapore",
    summary: "Full-stack internal operating system for company operations.",
    highlights: [
      "Built and maintained an internal OS with React (Vite, Mantine) and a Go backend on SQL + Docker.",
      "Shipped new features and optimised performance and integration across microservices and internal tools.",
    ],
    stack: ["React", "Go", "SQL", "Docker"],
    logo: "/companies/dndts.png",
  },
  {
    company: "NUS Students' Computing Club",
    role: "Vice-President",
    period: "Sep 2024 — Sep 2025",
    location: "Singapore",
    summary: "Leading 100+ members to run faculty-wide events for the computing student body.",
    highlights: [
      "Led 100+ members across subcommittees to organise 7 major events impacting 5,000+ computing students.",
      "Coordinated hackathons, tech talks and workshops; streamlined workflows and mentored junior leaders for continuity.",
    ],
    stack: ["Leadership", "Events", "Mentorship"],
    logo: "/companies/comclub.png",
  },
  {
    company: "NUS Fintech Society",
    role: "Business Development Executive",
    period: "Aug 2024 — Aug 2025",
    location: "Singapore",
    summary: "Securing sponsorships and partnerships for large-scale fintech events.",
    highlights: [
      "Secured sponsorships and partnerships for large-scale fintech events.",
      "Built strategic collaborations to enhance engagement and funding.",
    ],
    stack: ["Partnerships", "Sponsorships", "Fintech"],
    logo: "/companies/fintech.webp",
  },
];

export const education: Experience[] = [
  {
    company: "National University of Singapore",
    role: "B.Comp (Honours), Computer Science",
    period: "Aug 2023 — May 2027",
    location: "Singapore",
    summary: "Bachelor of Computing (Honours) in Computer Science. Expected graduation May 2027.",
    highlights: [
      "Focus on full-stack engineering, distributed systems and applied AI.",
      "Active across NUS's hackathon and student-leadership communities.",
    ],
    stack: ["Algorithms", "Distributed Systems", "Databases"],
    logo: "/companies/nus.png",
  },
  {
    company: "Temasek Polytechnic",
    role: "Diploma (Merit), Biomedical Engineering",
    period: "Apr 2018 — Apr 2021",
    location: "Singapore",
    summary: "Diploma with Merit in Biomedical Engineering.",
    highlights: ["Graduated with Merit, building the engineering foundation that led into CS."],
    stack: ["Biomedical Engineering", "Electronics"],
    logo: "/companies/temasek-poly.jpg",
    logoFit: "cover",
  },
];

export type Programme = {
  slug: string;
  title: string;
  org: string;
  period: string;
  description: string;
  tags?: string[];
  logo?: string;
  logoBg?: string;
  logoFit?: "contain" | "cover";
  credential?: { href: string; thumb?: string; label?: string };
  photos?: string[];
};

export const programmes: Programme[] = [
  {
    slug: "orbital",
    title: "Orbital Programme · Apollo 11",
    org: "National University of Singapore",
    period: "May 2024 — Aug 2024",
    description:
      "Built CrossRoads, a full-stack, geolocation-driven social platform for real-time, proximity-based discovery — a scalable client-server architecture with event-driven messaging, live location updates and dynamic activity feeds, with efficient geospatial querying for nearby-user matching.",
    tags: ["React Native", "Node.js", "MongoDB", "GCP", "WebSockets", "Google Maps API"],
    logo: "/companies/nus.png",
    credential: {
      href: "/programmes/orbital.pdf",
      thumb: "/programmes/orbital-cert.png",
      label: "Orbital Certificate — Apollo 11 level",
    },
  },
  {
    slug: "paypal-pathways",
    title: "PayPal Pathways Programme",
    org: "PayPal",
    period: "May 2025 — Jul 2025",
    logo: "/programmes/paypal-logo.png",
    description:
      "Selected mentee for an industry mentorship programme focused on fintech systems, product development and real-world software engineering. Worked with mentors on large-scale payment infrastructure, system design and secure transaction workflows — gaining exposure to distributed systems, scalability and data-driven product decisions.",
    tags: ["Fintech", "System Design", "Payments", "Mentorship"],
    photos: ["/programmes/paypal-2.jpg", "/programmes/paypal-1.jpg", "/programmes/paypal-3.jpg"],
  },
  {
    slug: "hbs-club-singapore",
    title: "Mentee · Mentorship Programme",
    org: "Harvard Business School Club of Singapore",
    period: "Aug 2019 — May 2020",
    logo: "/programmes/hbs-logo.png",
    logoFit: "cover",
    description:
      "Selected for a competitive mentorship programme, gaining exposure to strategic thinking, leadership and real-world business decision-making. Engaged with experienced industry mentors on problem-solving frameworks, career development and cross-functional collaboration.",
    tags: ["Leadership", "Strategy", "Mentorship"],
    credential: {
      href: "/programmes/hbscs.pdf",
      thumb: "/programmes/hbscs-cert.png",
      label: "Mentorship Programme Certificate",
    },
  },
];

/* ----------------------------------------------------------------- lookups */

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export const navLinks = [
  { label: "Work", href: "/projects" },
  { label: "Hackathons", href: "/hackathons" },
  { label: "Experience", href: "/experience" },
  { label: "Writing", href: "/articles" },
];

export const accentVar: Record<Accent, string> = {
  violet: "var(--primary)",
  teal: "var(--teal)",
  "light-blue": "var(--light-blue)",
  pink: "var(--pink)",
  green: "var(--green)",
  orange: "var(--orange)",
  yellow: "var(--yellow)",
};
