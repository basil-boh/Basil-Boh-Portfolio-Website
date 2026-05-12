// Single source of truth for project metadata.
// `Projects.js` reads the card-level fields; `pages/projects/[slug].js` reads everything.

const projects = [
  {
    slug: 'munchly',
    id: 0,
    title: 'Munchly',
    tagline:
      'A two-sided marketplace for home-based food businesses — turning neighborhood kitchens into income, and neighborhoods into menus.',
    description:
      'Production marketplace connecting home cooks with nearby buyers. React Native + Next.js front-of-house, Supabase backend, Stripe Connect for split payouts.',
    mediaType: 'custom',
    customMedia: 'munchly-hero',
    image: '/projects/munchly/mobile-05.jpg', // OG fallback
    category: 'mobile',
    role: 'Founder · full-stack engineer',
    featured: true,
    technologies: [
      'React Native',
      'Expo SDK 55',
      'Next.js 16',
      'TypeScript',
      'Supabase',
      'Stripe Connect',
    ],
    github: null,
    demo: 'https://www.munchly.sg',
    brand: {
      primary: '#F26B38',
      ember: '#A93702',
      cream: '#FFF7F5',
      ink: '#201A18',
    },
    overview: [
      'Munchly is a two-sided marketplace I built end-to-end for home-based food businesses (HBBs). Home cooks open a store, list dishes (active or pre-order), accept orders, and get paid via Stripe Connect. Buyers browse nearby kitchens, save listings, chat with the cook about pickup, and leave half-star reviews. The platform takes a commission on every transaction.',
      'It ships as a real product across three surfaces — an iOS / Android app built with Expo and React Native, a Next.js web app for marketing, public browsing, and a seller analytics dashboard, and a standalone Stripe Connect microservice that owns every cent of money flow. Auth, RLS, realtime chat, native maps, and webhook-driven order creation are all wired up the way a shipped startup would do it, not the way a hackathon would.',
    ],
    features: [
      'Marketplace browsing with category filters, distance-aware sorting, and saved listings',
      'Native maps tab — Apple Maps on iOS, Google Maps on Android — via expo-maps with nearby-listing pins',
      'Per-order buyer ↔ seller chat with Supabase Realtime channels and unread-count badges',
      'Seller dashboard: store setup, active and pre-order listings, order management, half-star reviews, analytics',
      'Cart flow that respects multi-seller carts — one Checkout Session splits into per-seller orders',
      'Stripe-hosted checkout with platform-charge model and per-seller transfers',
      'Apple, Google, and email auth — Supabase Auth + Sign in with Apple + Google OAuth',
      'Listing image pipeline: expo-image-manipulator resize/compress → Supabase Storage with per-user folder isolation',
    ],
    techStack: [
      {
        category: 'Mobile',
        items: [
          'Expo SDK 55 + React Native 0.83 + React 19',
          'expo-router (file-based, typed routes)',
          'Gluestack UI v1 + react-native-reanimated 4',
          'expo-maps (Apple Maps / Google Maps)',
          'expo-apple-authentication, expo-notifications',
        ],
      },
      {
        category: 'Web',
        items: [
          'Next.js 16 (App Router) + React 19',
          'Tailwind CSS v4 + Radix UI primitives',
          '@supabase/ssr for cookie-based server auth',
          'recharts for seller analytics',
          '@vis.gl/react-google-maps for public marketplace map',
        ],
      },
      {
        category: 'Backend & data',
        items: [
          'Supabase — Postgres, Auth, Storage, Realtime, Edge Functions',
          'Row Level Security forced on every public table',
          'Stripe Connect (V2 Accounts + V1 Checkout/Transfers)',
          'Express microservice — sole holder of Stripe secrets',
          'Realtime channels for chat + live order status',
        ],
      },
      {
        category: 'Infra & DevOps',
        items: [
          'Vercel — Next.js web app deploys',
          'Railway — Express Stripe Connect server deploy',
          'EAS — managed iOS/Android builds + OTA updates',
          'Supabase migrations under version control',
          'Sentry wired through @sentry/react-native/expo',
        ],
      },
    ],
    engineeringHighlights: [
      {
        icon: 'ph-credit-card',
        title: 'Stripe Connect, server-authoritative',
        blurb:
          'The mobile app never holds a Stripe secret. The client posts only listing IDs and quantities — an Express service resolves prices from Supabase, builds a platform-charge Checkout Session, then issues per-seller Transfers after webhook verification. Order rows are written server-side only on checkout.session.completed and are idempotent on stripe_session_id.',
      },
      {
        icon: 'ph-shield-check',
        title: 'RLS-forced multi-tenant data layer',
        blurb:
          'Row Level Security is forced on every public table, plus storage buckets scope writes to (storage.foldername(name))[1] = auth.uid()::text. Service-role usage is confined to the Stripe server and a JWT-validated edge function for account deletion — nothing on the client can bypass policy.',
      },
      {
        icon: 'ph-broadcast',
        title: 'Realtime chat & order status',
        blurb:
          'Per-order chat (one conversation per order, locked on completion) and live order status both run on Supabase Realtime channels, with read_at timestamps powering unread-count badges across the marketplace, seller, and profile tabs.',
      },
      {
        icon: 'ph-cloud-arrow-up',
        title: 'Multi-surface deploy pipeline',
        blurb:
          'Web on Vercel, Stripe Connect server on Railway with stripe listen --forward-thin-to wired for local webhook dev, native builds and OTA updates via EAS. iOS and Android share one Expo codebase; release builds go out without touching a Mac.',
      },
      {
        icon: 'ph-map-pin',
        title: 'Native maps, the right way per-platform',
        blurb:
          'expo-maps renders Apple Maps on iOS and Google Maps on Android — no React Native MapView fork. Listings cluster by distance, with directions handled through Google\'s Directions API and route polylines drawn in-canvas.',
      },
      {
        icon: 'ph-coins',
        title: 'Money modeled as integer cents, end to end',
        blurb:
          'Every monetary column is *_cents (integer). Prices, GST, platform commission, and per-seller allocations are computed once on the server and replayed at the transfer step from session metadata — no float drift, no client trust.',
      },
    ],
    screenshots: [
      {
        src: '/projects/munchly/mobile-01.jpg',
        caption: 'Marketplace home — discover home cooks nearby, filter by category, save listings.',
        device: 'mobile',
      },
      {
        src: '/projects/munchly/mobile-02.jpg',
        caption: 'Listing detail — image gallery, pickup slots, half-star reviews, add-to-cart.',
        device: 'mobile',
      },
      {
        src: '/projects/munchly/mobile-03.jpg',
        caption: 'Store page — a home chef\'s storefront with active and pre-order listings.',
        device: 'mobile',
      },
      {
        src: '/projects/munchly/mobile-04.jpg',
        caption: 'Cart & checkout — multi-seller cart aware, splits into per-seller orders.',
        device: 'mobile',
      },
      {
        src: '/projects/munchly/mobile-05.jpg',
        caption: 'Location tab — nearby listings on Apple Maps (iOS) / Google Maps (Android).',
        device: 'mobile',
      },
      {
        src: '/projects/munchly/mobile-06.jpg',
        caption: 'Seller dashboard — active listings, orders to fulfil, revenue at a glance.',
        device: 'mobile',
      },
      {
        src: '/projects/munchly/mobile-07.jpg',
        caption: 'Order management — buyer → seller pipeline with realtime status updates.',
        device: 'mobile',
      },
      {
        src: '/projects/munchly/mobile-08.jpg',
        caption: 'Per-order chat — Supabase Realtime channels with unread-count badges.',
        device: 'mobile',
      },
      {
        src: '/projects/munchly/mobile-09.jpg',
        caption: 'Profile & order history — saved listings, payment methods, family meals.',
        device: 'mobile',
      },
      {
        src: '/projects/munchly/mobile-10.jpg',
        caption: 'Onboarding — first-launch flow setting up auth, location, and preferences.',
        device: 'mobile',
      },
      {
        src: '/projects/munchly/web-landing.jpg',
        caption: 'Marketing landing — public homepage at munchly.sg with the home-cooked hero, social proof, and conversion strip.',
        device: 'web',
        url: 'munchly.sg',
      },
      {
        src: '/projects/munchly/web-marketplace.jpg',
        caption: 'Public marketplace — Stores / Listings filter, ratings, and per-store distance. Hits the same Supabase tables as the mobile app.',
        device: 'web',
        url: 'munchly.sg/marketplace',
      },
      {
        src: '/projects/munchly/web-login.jpg',
        caption: 'Auth — email/password, Google OAuth, and Sign in with Apple, backed by @supabase/ssr cookies on the Next.js server.',
        device: 'web',
        url: 'munchly.sg/login',
      },
    ],
    notes: [
      'Built solo, end-to-end: brand, product design, mobile app, marketing site, seller dashboard, payments microservice, database schema, RLS policies, and deployment pipeline. The hard parts were the boring parts — getting Stripe Connect\'s platform-charge model right, forcing RLS without locking myself out, and keeping the cart consistent when a single basket touches multiple sellers.',
    ],
    isPlaceholder: false,
  },
  {
    slug: 'dataforge',
    id: 1,
    title: 'DataForge',
    tagline:
      'An intelligent dataset repair loop for ML engineers — find broken labels, fix them, prove the quality delta before training.',
    description:
      'Dataset evaluation and curation pipeline built for the AI Engineer Singapore 2026 hackathon. Loads a dataset, scores samples, and surfaces issues for ML model preparation.',
    mediaType: 'image',
    image: '/projects/DataForge.jpg',
    category: 'data',
    role: 'Hackathon prototype · AI Engineer Singapore 2026',
    technologies: ['Next.js', 'TypeScript', 'Convex', 'OpenAI', 'Tailwind'],
    github: 'https://github.com/basil-boh/AIE2026-DataForge',
    demo: 'https://dataforge-eosin.vercel.app',
    videoEmbed: 'https://drive.google.com/file/d/1tHUZapgFU-5HDje_1gLdfDxQi76xZbh2/preview',
    screenshots: [
      {
        src: '/projects/dataforge/hero.jpg',
        caption: 'Landing — drop a ZIP to start, or run the seeded animal-classification demo.',
      },
      {
        src: '/projects/DataForge.jpg',
        caption: 'Loaded state — 319 samples across Dog / Horse / Elephant with detected imbalance.',
      },
    ],
    overview: [
      'DataForge is not a model training platform. The thesis is simpler: most ML model failures start with the dataset, not the architecture. So we built a tool that improves dataset readiness before training begins.',
      'It loads a labeled image dataset, evaluates quality across five axes (label completeness, consistency, duplication, balance, and overall), then walks a human reviewer through targeted repairs — completing missing labels, correcting likely mislabels, removing duplicates, and balancing classes. After the repair loop, it re-evaluates and shows the before/after delta.',
    ],
    features: [
      'Seeded animal-classification demo with intentional imbalance, missing labels, mislabels, and duplicates',
      'Quality scoring across label completeness, consistency, duplication, balance, and overall',
      'Human review queues for label completions, label corrections, and duplicate removals',
      'Balancing plan with class weights, sampling recommendations, and export metadata',
      'GPT-5.5 via the OpenAI Responses API generates the structured repair plan',
      'Convex powers realtime pipeline state — every step from baseline evaluation to cleaned export is logged',
      'Deterministic fallback adapter — the demo runs without provider keys for reliable judging',
    ],
    techStack: [
      { category: 'Frontend', items: ['Next.js App Router', 'React', 'TypeScript', 'Tailwind CSS'] },
      { category: 'Backend & data', items: ['Convex (realtime state)', 'OpenAI Responses API (GPT-5.5)', 'Structured-output schemas'] },
      { category: 'Tooling', items: ['Seeded demo dataset', 'Deterministic fallback adapters', 'Vercel deployment'] },
    ],
    notes: [
      'Built end-to-end in roughly two weeks for the AIE Singapore 2026 hackathon. The hardest part wasn\'t the OpenAI call — it was designing the human-in-the-loop review UX so an ML engineer could actually trust and approve the suggested fixes.',
    ],
    isPlaceholder: false,
  },
  {
    slug: 'data-visualization-dashboard',
    id: 2,
    title: 'Data Visualization Dashboard',
    tagline:
      'Interactive dashboard for exploring CSV datasets in the browser — filter, slice, and export without touching a notebook.',
    description:
      'Interactive dashboard for visualizing complex datasets with filtering and export capabilities.',
    mediaType: 'image',
    image: '/projects/Data.jpg',
    category: 'data',
    role: 'Personal project',
    technologies: ['React', 'React Bootstrap', 'Javascript', 'Papa Parse'],
    github: 'https://github.com/basil-boh/Data-Dashboard',
    demo: 'https://basil-data-visualization.netlify.app',
    screenshots: [
      { src: '/projects/Data.jpg', caption: 'Dashboard view.' },
    ],
    overview: [
      'A lightweight, browser-only dashboard for working with CSV datasets. You drop in a file and immediately get filtering, summaries, and charts — no backend, no upload, no notebook required.',
      'Built as an exercise in keeping the dependency surface small while still feeling polished — Papa Parse handles the CSV streaming so even larger files don\'t lock up the tab.',
    ],
    features: [
      'Drag-and-drop CSV ingestion via Papa Parse',
      'Column-level filters and search',
      'Sortable, paginated data grid',
      'Export filtered subsets back to CSV',
      'All computation client-side — no data leaves the browser',
    ],
    techStack: [
      { category: 'Frontend', items: ['React', 'React Bootstrap', 'JavaScript'] },
      { category: 'Data', items: ['Papa Parse (CSV streaming)'] },
      { category: 'Deploy', items: ['Netlify'] },
    ],
    isPlaceholder: true,
  },
  {
    slug: 'object-motion-detection',
    id: 3,
    title: 'Object Motion Detection',
    tagline:
      'Real-time webcam motion + object classification — only invokes YOLOv5 when motion is detected, keeping FPS high.',
    description:
      'An application for detecting and tracking moving objects, providing real-time monitoring and improved security.',
    mediaType: 'video',
    image: '/projects/recording.mp4',
    category: 'data',
    role: 'Personal project',
    technologies: ['Python', 'OpenCV', 'PyTorch', 'NumPy', 'YOLO'],
    github: 'https://github.com/basil-boh/Object-Detection',
    demo: 'https://project3-demo.netlify.app',
    screenshots: [
      { src: '/projects/recording.mp4', caption: 'Live capture — motion-gated YOLOv5 inference.', isVideo: true },
    ],
    overview: [
      'A webcam-based object detection app that combines classical motion detection with YOLOv5 classification. Motion detection is cheap; YOLO inference is expensive — so the pipeline only runs YOLO on frames where motion is actually present.',
      'The result is real-time performance on commodity hardware without sacrificing detection quality. An on-screen FPS counter makes the tradeoff visible.',
    ],
    features: [
      'Classical motion detection (frame differencing in OpenCV) as a cheap pre-filter',
      'YOLOv5 (PyTorch) for object classification when motion is detected',
      'On-screen FPS counter for monitoring performance',
      'Webcam capture loop with bounding-box overlays',
    ],
    techStack: [
      { category: 'Computer vision', items: ['OpenCV (motion detection)', 'YOLOv5 (object detection)'] },
      { category: 'Runtime', items: ['Python', 'PyTorch', 'NumPy'] },
    ],
    notes: [
      'The interesting design decision here is the two-stage pipeline. Naive object detection runs YOLO on every frame, which tanks framerate on a laptop. Gating YOLO behind a motion check costs almost nothing and keeps the loop responsive.',
    ],
    isPlaceholder: false,
  },
  {
    slug: 'stock-price-predictor',
    id: 4,
    title: 'Stock Price Prediction Model',
    tagline:
      'Time-series model that combines historical price features with sentiment signals from news headlines.',
    description:
      'A machine learning model for predicting stock prices using historical data and sentiment analysis.',
    mediaType: 'image',
    image: '/projects/Stock_Predictor.jpg',
    category: 'data',
    role: 'Personal project',
    technologies: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn'],
    github: 'https://github.com/basil-boh/Stock-Predictor',
    demo: 'https://project4-demo.netlify.app',
    screenshots: [
      { src: '/projects/Stock_Predictor.jpg', caption: 'Predictor output.' },
    ],
    overview: [
      'A time-series prediction model that pairs technical price features (moving averages, RSI, volume) with a sentiment score derived from news headlines. The goal isn\'t to beat the market — it\'s to explore whether sentiment features add measurable signal beyond price-only baselines.',
    ],
    features: [
      'Historical price feature engineering (moving averages, returns, volatility)',
      'Sentiment scoring of news headlines',
      'Train/test split with walk-forward validation',
      'Comparison against a price-only baseline to isolate sentiment contribution',
    ],
    techStack: [
      { category: 'ML', items: ['TensorFlow / Keras', 'Scikit-learn'] },
      { category: 'Data', items: ['Pandas', 'NumPy'] },
      { category: 'Language', items: ['Python'] },
    ],
    isPlaceholder: true,
  },
  {
    slug: 'social-media-platform',
    id: 5,
    title: 'Social Media Platform',
    tagline:
      'Mobile-first social app with realtime messaging, post sharing, and profile pages — built on Supabase.',
    description:
      'A social media platform with real-time messaging, post sharing, and user profiles.',
    mediaType: 'image',
    image: '/projects/DoWhat2.jpg',
    category: 'mobile',
    role: 'Personal project',
    technologies: ['React Native', 'Supabase', 'Expo', 'TypeScript'],
    github: 'https://github.com/yourusername/project5',
    demo: 'https://project5-demo.netlify.app',
    screenshots: [
      { src: '/projects/DoWhat2.jpg', caption: 'App preview.' },
    ],
    overview: [
      'A mobile social app built with React Native and Expo, backed by Supabase for auth, storage, and realtime subscriptions. Users can post, message in real time, and browse profile pages.',
    ],
    features: [
      'Realtime messaging via Supabase channels',
      'Post creation with image upload to Supabase storage',
      'User profiles and follow/unfollow flow',
      'Mobile-first UI with Expo Router navigation',
    ],
    techStack: [
      { category: 'Mobile', items: ['React Native', 'Expo', 'TypeScript'] },
      { category: 'Backend', items: ['Supabase (auth, storage, realtime)'] },
    ],
    isPlaceholder: true,
  },
  {
    slug: 'resume-analyzer',
    id: 6,
    title: 'Resume Analyzer',
    tagline:
      'AI-powered resume optimizer — paste a job description, get tailored rewrites and a fit score.',
    description:
      'An AI-powered web application designed to optimize resumes by tailoring them to specific job roles.',
    mediaType: 'image',
    image: '/projects/Resume.jpg',
    category: 'web',
    role: 'Personal project',
    technologies: ['Python', 'FastAPI', 'Uvicorn', 'CORS Middleware'],
    github: 'https://github.com/yourusername/project6',
    demo: 'https://project6-demo.netlify.app',
    screenshots: [
      { src: '/projects/Resume.jpg', caption: 'Analyzer UI.' },
    ],
    overview: [
      'A web app that takes a resume and a job description, then suggests tailored rewrites — pulling out missing keywords, weak phrasing, and structural gaps. The FastAPI backend handles the LLM call; a simple frontend collects input and renders the structured response.',
    ],
    features: [
      'Paste-in resume + job description form',
      'Per-section rewrite suggestions',
      'Keyword gap analysis against the job description',
      'FastAPI backend with CORS for cross-origin frontend calls',
    ],
    techStack: [
      { category: 'Backend', items: ['Python', 'FastAPI', 'Uvicorn', 'CORS middleware'] },
      { category: 'Frontend', items: ['Static HTML/JS (placeholder — fill in later)'] },
    ],
    isPlaceholder: true,
  },
]

export function getAllProjects() {
  return projects
}

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null
}

export function getAllProjectSlugs() {
  return projects.map((p) => p.slug)
}
