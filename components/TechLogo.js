/**
 * TechLogo + brand-glyph registry
 *
 * A single source of truth for tech-stack logos used across the portfolio.
 * Two render paths per entry:
 *   - `path` (+ optional `color`) — inline SVG, single colour, no extra request.
 *   - `image` — bitmap / vector asset served from /public (used when the
 *     authentic mark needs multiple colours and can't compress into one path).
 *
 * Image-based assets are *never* read by the model — they live in
 * /public/projects/munchly/logos/* and are loaded by the browser at runtime.
 */

export const BRAND_GLYPHS = {
  stripe: {
    label: 'Stripe',
    color: '#635BFF',
    // viewBox set to the path's exact content bbox (x 5.28→18.44,
    // y 3.03→21.00) — programmatically computed via path parsing. No
    // internal whitespace, no clipping.
    viewBox: '5.28 3 13.16 18',
    // Stripe's "S" letterform has a dense, heavy stroke weight that reads
    // visually larger than other glyphs at the same height. Step it down one
    // notch so it sits in line with the rest of the row.
    sizeClass: {
      'eyebrow-hero': 'h-[13px] sm:h-[15px]',
      'eyebrow-card': 'h-[11px]',
      list: 'h-[13px]',
    },
    path: 'M13.479 9.883c-1.626-.604-2.512-1.067-2.512-1.803 0-.622.511-.977 1.423-.977 1.667 0 3.379.642 4.558 1.22l.666-4.111c-.935-.446-2.847-1.177-5.49-1.177-1.87 0-3.425.489-4.536 1.401C6.433 5.39 5.832 6.772 5.832 8.441c0 3.022 1.846 4.313 4.847 5.403 1.932.689 2.579 1.178 2.579 1.934 0 .732-.629 1.155-1.766 1.155-1.49 0-3.937-.732-5.541-1.667l-.673 4.157C6.657 20.201 9.188 21 11.814 21c1.977 0 3.624-.467 4.735-1.355 1.243-.978 1.889-2.423 1.889-4.142 0-3.091-1.889-4.382-4.96-5.514l.001-.106z',
  },
  supabase: {
    label: 'Supabase',
    color: '#3ECF8E',
    path: 'M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.66z',
  },
  expo: {
    label: 'Expo',
    color: '#201A18',
    path: 'M0 20.084c.043.53.23 1.063.718 1.778.58.849 1.576 1.315 2.303.567.49-.505 5.794-9.776 8.35-13.29a.761.761 0 0 1 1.248 0c2.556 3.514 7.86 12.785 8.35 13.29.727.748 1.723.282 2.303-.567.57-.835.728-1.42.728-2.046 0-.426-8.26-15.798-9.092-17.07-.8-1.225-1.044-1.485-2.34-1.546h-1.106c-1.295.061-1.54.321-2.34 1.546C8.302 3.62.358 18.34 0 19.502z',
  },
  next: {
    label: 'Next.js',
    color: '#201A18',
    path: 'M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z',
  },
  vercel: {
    label: 'Vercel',
    color: '#201A18',
    path: 'M24 22.525H0l12-21.05 12 21.05z',
  },
  railway: {
    label: 'Railway',
    // Authentic Railway mark (vector SVG) — served from /public.
    image: '/projects/munchly/logos/railway.svg',
  },
  twilio: {
    label: 'Twilio',
    color: '#F22F46',
    path: 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 21C7.05 21 3 16.95 3 12S7.05 3 12 3s9 4.05 9 9-4.05 9-9 9zm5.55-11.85c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7 2.7 1.2 2.7 2.7zm0 5.7c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7 2.7 1.2 2.7 2.7zm-5.7-5.7c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7 2.7 1.2 2.7 2.7zm0 5.7c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7 2.7 1.2 2.7 2.7z',
  },
  gmaps: {
    label: 'Google Maps',
    image: '/projects/munchly/logos/google-maps.png',
  },
  sentry: {
    label: 'Sentry',
    image: '/projects/munchly/logos/sentry.svg',
  },
}

/**
 * Keyword → brand resolver. Returns the brand whose keyword appears EARLIEST
 * in the text — so "Railway — Express Stripe Connect server deploy" resolves
 * to `railway` (the lead word) rather than `stripe` (mentioned in passing).
 * Falls back to declaration order on ties.
 */
const BRAND_KEYWORDS = [
  ['Next.js', 'next'],
  ['next/font', 'next'],
  ['Stripe', 'stripe'],
  ['Supabase', 'supabase'],
  ['@supabase', 'supabase'],
  ['Vercel', 'vercel'],
  ['Railway', 'railway'],
  ['Twilio', 'twilio'],
  ['Google Maps', 'gmaps'],
  ['google-maps', 'gmaps'],
  ['Sentry', 'sentry'],
  ['EAS', 'expo'],
  ['Expo', 'expo'],
  ['expo-', 'expo'],
]

export function detectBrand(text) {
  if (!text) return null
  let bestPos = Infinity
  let bestBrand = null
  for (const [needle, brand] of BRAND_KEYWORDS) {
    const idx = text.indexOf(needle)
    if (idx !== -1 && idx < bestPos) {
      bestPos = idx
      bestBrand = brand
    }
  }
  return bestBrand
}

/**
 * Render a single brand glyph. `size` is one of:
 *   - 'eyebrow-hero' → fits the deck eyebrow row on /projects/munchly hero
 *   - 'eyebrow-card' → smaller eyebrow row in the home-grid Munchly card
 *   - 'list'         → sized to sit next to a list-item line of body text
 */
export default function TechLogo({ brand, size = 'list' }) {
  const g = BRAND_GLYPHS[brand]
  if (!g) return null

  const defaultSizeClass = {
    'eyebrow-hero': 'h-4 sm:h-[18px]',
    'eyebrow-card': 'h-3.5',
    list: 'h-4',
  }
  // Per-brand override wins so glyphs whose stroke weight reads heavier
  // (e.g. Stripe's "S") can step down a notch.
  const sizeClass = g.sizeClass?.[size] || defaultSizeClass[size] || 'h-4'

  const className = `${sizeClass} w-auto shrink-0`

  if (g.image) {
    return (
      <img
        src={g.image}
        alt={g.label}
        draggable={false}
        className={`${className} select-none`}
      />
    )
  }

  return (
    <svg
      role="img"
      aria-label={g.label}
      viewBox={g.viewBox || '0 0 24 24'}
      className={className}
      fill={g.color}
    >
      <path d={g.path} />
    </svg>
  )
}
