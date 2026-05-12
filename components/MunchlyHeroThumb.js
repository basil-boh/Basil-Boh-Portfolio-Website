/**
 * MunchlyHeroThumb
 *
 * Cover thumbnail for the Munchly project, styled directly after the Munchly
 * BD deck (Munchly_BD_Deck.pdf): cream surface, orange-accented display type,
 * brand mark + meta pill in a top strip, upright overlapping phones, and a
 * hairline footer with the wordmark + section marker.
 *
 * Palette is verbatim from `docs/brand-guide.md`:
 *   Munchly Orange #F26B38   Ember Red #A93702
 *   Cream          #FFF7F5   Peach Mist #F8EBE7
 *   Ink            #201A18   Body       #58423A
 *
 * Type per brand-guide.md (Section 4): a warm, slightly rounded sans — we
 * use Plus Jakarta Sans for display + Inter as fallback. Loaded once in
 * styles/globals.css; applied here via inline fontFamily so the rest of the
 * portfolio (Space Grotesk) is unaffected.
 *
 * No PNG sources are read at build time — phone screens are simple <img src>
 * pointing at pre-converted JPEGs under /projects/munchly/.
 */
import TechLogo from '@/components/TechLogo'

const MUNCHLY_FONT =
  '"Plus Jakarta Sans", "Inter", "Manrope", system-ui, -apple-system, sans-serif'

export default function MunchlyHeroThumb({ variant = 'card' }) {
  const isHero = variant === 'hero'

  // Three explicit scale tracks — keeps the card readable at thumbnail size
  // and stops the headline / phones from spilling past the frame.
  const t = isHero
    ? {
        // Detail-page hero (narrower 16:9 frame, taller) — staggered 3-phone
        // stack reads better in the tall-but-narrow space.
        pad: 'px-6 sm:px-10 lg:px-12 py-5 sm:py-6',
        gap: 'gap-5 sm:gap-7',
        eyebrow: 'text-[10px] sm:text-[11px] tracking-[0.22em] mb-2.5',
        h1: 'text-3xl sm:text-4xl md:text-[44px] leading-[0.95]',
        sub: 'text-[13px] sm:text-sm md:text-base leading-snug mt-3',
        cta: 'px-3.5 py-1.5 text-[12px] sm:text-[13px]',
        footerType: 'text-[10px] sm:text-[11px]',
        wordmarkH: 'h-7 sm:h-8',
        textMax: 'max-w-[58%]',
        phones: { mode: 'stack', size: 'lg', overlap: 60, dy: 22 },
      }
    : {
        // Home-grid featured card (wider full-row span, shorter) — side-by-side
        // phone row fills the wide middle band better than an overlap stack.
        pad: 'px-5 sm:px-6 py-4',
        gap: 'gap-4',
        eyebrow: 'text-[9px] tracking-[0.20em] mb-2',
        h1: 'text-[22px] sm:text-[26px] md:text-[30px] leading-[0.95]',
        sub: 'text-[11px] sm:text-[12px] leading-snug mt-2',
        cta: 'px-3 py-1 text-[10px] sm:text-[11px]',
        footerType: 'text-[9px]',
        wordmarkH: 'h-5 sm:h-6',
        textMax: 'max-w-[32%] xl:max-w-[30%]',
        phones: { mode: 'row', count: 6, rowSize: { w: 80, h: 164 } },
      }

  return (
    <div
      className={`relative w-full h-full overflow-hidden flex flex-col ${t.pad}`}
      style={{
        fontFamily: MUNCHLY_FONT,
        background:
          'radial-gradient(120% 90% at 100% 0%, #FFE3D6 0%, #FFF1EA 38%, #FFF7F5 70%)',
      }}
    >
      {/* subtle warm haze in the bottom-left — gives slides their "breathing" feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(50% 50% at 0% 100%, rgba(242,107,56,0.10) 0%, rgba(242,107,56,0) 70%)',
        }}
      />

      {/* TOP STRIP — official Munchly wordmark SVG + meta pill */}
      <header className="relative z-10 flex items-center justify-between shrink-0">
        <img
          src="/projects/munchly/wordmark.svg"
          alt="Munchly"
          draggable={false}
          className={`${t.wordmarkH} w-auto select-none`}
        />
        <MetaPill compact={!isHero} />
      </header>

      {/* MAIN — left text block, right phones */}
      <main className={`relative z-10 flex-1 min-h-0 flex items-center ${t.gap} mt-3 sm:mt-4`}>
        <div className={`flex-1 min-w-0 ${t.textMax}`}>
          <div
            className={`flex items-center flex-wrap ${
              isHero ? 'gap-x-3 gap-y-2 mb-3 sm:mb-4' : 'gap-x-2 gap-y-1.5 mb-2.5'
            }`}
            aria-label="Tech stack: Stripe, Supabase, Expo, Next.js, Vercel, Railway, Twilio, Google Maps, Sentry"
          >
            <span
              className={`font-mono uppercase text-[#A93702] font-semibold ${
                isHero ? 'text-[10px] sm:text-[11px] tracking-[0.22em]' : 'text-[9px] tracking-[0.20em]'
              } mr-1`}
              style={{ fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace' }}
            >
              Tech&nbsp;Stack:
            </span>
            <TechLogo brand="stripe"   size={isHero ? 'eyebrow-hero' : 'eyebrow-card'} />
            <TechLogo brand="supabase" size={isHero ? 'eyebrow-hero' : 'eyebrow-card'} />
            <TechLogo brand="expo"     size={isHero ? 'eyebrow-hero' : 'eyebrow-card'} />
            <TechLogo brand="next"     size={isHero ? 'eyebrow-hero' : 'eyebrow-card'} />
            <TechLogo brand="vercel"   size={isHero ? 'eyebrow-hero' : 'eyebrow-card'} />
            <TechLogo brand="railway"  size={isHero ? 'eyebrow-hero' : 'eyebrow-card'} />
            <TechLogo brand="twilio"   size={isHero ? 'eyebrow-hero' : 'eyebrow-card'} />
            <TechLogo brand="gmaps"    size={isHero ? 'eyebrow-hero' : 'eyebrow-card'} />
            <TechLogo brand="sentry"   size={isHero ? 'eyebrow-hero' : 'eyebrow-card'} />
          </div>

          <h3
            className={`font-extrabold tracking-[-0.02em] text-[#201A18] ${t.h1}`}
            style={{ fontWeight: 800 }}
          >
            Home-cooked,
            <br />
            <span className="text-[#F26B38]">just around</span>
            <br />
            the corner.
          </h3>

          <p
            className={`font-medium text-[#58423A] max-w-[36ch] ${t.sub}`}
          >
            A two-sided marketplace that turns home kitchens into businesses,
            and neighbourhoods into menus.
          </p>

          <div className={`flex flex-wrap items-center gap-2 ${isHero ? 'mt-4' : 'mt-3'}`}>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full bg-[#F26B38] text-[#FFF7F5] font-semibold ${t.cta}`}
            >
              Order now
              <i className="ph ph-arrow-right text-[10px]" aria-hidden />
            </span>
            <span
              className={`inline-flex items-center rounded-full border border-[#201A18]/15 bg-white text-[#201A18] font-semibold ${t.cta}`}
            >
              Start selling
            </span>
          </div>
        </div>

        {/* Right column — phone composition. Wide hero gets a side-by-side
            row that fills the empty middle band; card thumbnail keeps the
            staggered three-phone stack. */}
        <div className="relative flex-1 hidden sm:flex h-full items-center justify-end min-w-0">
          {t.phones.mode === 'row' ? (
            <PhoneRow count={t.phones.count} dims={t.phones.rowSize} />
          ) : (
            <PhoneStack scale={t.phones} />
          )}
        </div>
      </main>

      {/* HAIRLINE FOOTER — wordmark + section marker, deck-style */}
      <footer className="relative z-10 shrink-0 mt-3">
        <div className="border-t border-[#201A18]/10 pt-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F26B38]" />
            <span
              className={`font-mono uppercase text-[#201A18] tracking-[0.22em] font-semibold ${t.footerType}`}
              style={{ fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace' }}
            >
              Munchly
            </span>
          </div>
          <span
            className={`font-mono uppercase text-[#58423A]/80 tracking-[0.22em] ${t.footerType}`}
            style={{ fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace' }}
          >
            Cover · 01 / 03
          </span>
        </div>
      </footer>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

// BRAND_GLYPHS + TechLogo now live in `components/TechLogo.js` so the detail
// page can render the same marks next to tech-stack list items.

function MetaPill({ compact }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm border border-[#201A18]/10 text-[#201A18] ${
        compact ? 'px-2.5 py-1' : 'px-3.5 py-1.5'
      }`}
    >
      <span className="relative flex items-center">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F26B38]" />
        <span className="absolute inline-flex h-1.5 w-1.5 rounded-full bg-[#F26B38] opacity-60 animate-ping" />
      </span>
      <span
        className={`font-semibold tracking-[0.04em] ${compact ? 'text-[10px]' : 'text-[11px]'}`}
      >
        Live · iOS · Android · Web
      </span>
    </div>
  )
}

/**
 * Three upright phones in a depth-staggered row — center phone forward, outer
 * pair sits back and slightly down. Absolute positioning gives us a precise
 * occupied width, so `justify-end` on the parent parks the whole composition
 * against the card's right edge with no trailing whitespace.
 *
 * Matches the BD deck's slide-05 three-phone composition.
 */
const PHONE_DIMS = {
  sm: { w: 88, h: 180 },
  md: { w: 116, h: 238 },
  lg: { w: 152, h: 312 },
}

function PhoneStack({ scale }) {
  const { size, overlap, dy } = scale
  const { w, h } = PHONE_DIMS[size]
  const step = w - overlap
  // Render order: back phones first (lower z), front phone last so DOM order
  // naturally stacks; we still set explicit z for safety.
  const stackWidth = step * 2 + w
  const stackHeight = h + dy

  return (
    <div
      className="relative h-full flex items-center"
      style={{ width: stackWidth }}
    >
      <div className="relative" style={{ width: stackWidth, height: stackHeight }}>
        <PhonePos
          src="/projects/munchly/mobile-06.jpg"
          size={size}
          left={0}
          top={dy}
          z={1}
          dim
        />
        <PhonePos
          src="/projects/munchly/mobile-05.jpg"
          size={size}
          left={step * 2}
          top={dy}
          z={2}
          dim
        />
        <PhonePos
          src="/projects/munchly/mobile-01.jpg"
          size={size}
          left={step}
          top={0}
          z={3}
        />
      </div>
    </div>
  )
}

function PhonePos({ src, size, left, top, z, dim }) {
  return (
    <div className="absolute" style={{ left, top, zIndex: z }}>
      <DeckPhone src={src} size={size} dim={dim} />
    </div>
  )
}

/**
 * Wide-banner phone row — N phones side by side, no overlap, identical size,
 * alternating subtle vertical offsets for rhythm. Designed to fill the middle
 * band of the long /projects/munchly hero where the staggered stack leaves
 * the centre of the banner empty.
 */
function PhoneRow({ count = 6, dims = { w: 92, h: 190 } }) {
  // Cycle through the 10 mobile shots so each banner shows a different mix.
  const srcs = [
    '/projects/munchly/mobile-01.jpg',
    '/projects/munchly/mobile-02.jpg',
    '/projects/munchly/mobile-06.jpg',
    '/projects/munchly/mobile-08.jpg',
    '/projects/munchly/mobile-05.jpg',
    '/projects/munchly/mobile-03.jpg',
    '/projects/munchly/mobile-09.jpg',
    '/projects/munchly/mobile-07.jpg',
  ].slice(0, count)

  return (
    <div
      className="relative flex items-center"
      style={{ gap: 10, height: dims.h + 24 }}
    >
      {srcs.map((src, i) => (
        <div
          key={src}
          style={{
            // Alternating ±10px vertical offset for the deck's slide-07 rhythm.
            transform: `translateY(${i % 2 === 0 ? -8 : 8}px)`,
          }}
        >
          <DeckPhone src={src} customDims={dims} dim={i % 2 !== 0} />
        </div>
      ))}
    </div>
  )
}

/**
 * Deck-style phone: thin warm-black bezel, generous rounded corners, soft
 * warm-tinted drop shadow. Positioning is the parent's job.
 */
function DeckPhone({ src, size = 'md', customDims, dim = false }) {
  const { w, h } = customDims || PHONE_DIMS[size] || PHONE_DIMS.md

  return (
    <div
      className="relative transition-transform duration-500 ease-out group-hover/media:-translate-y-1"
      style={{
        width: w,
        height: h,
        filter:
          'drop-shadow(0 22px 28px rgba(32,26,24,0.20)) drop-shadow(0 6px 12px rgba(169,55,2,0.10))',
        opacity: dim ? 0.92 : 1,
      }}
    >
      <div
        className="relative w-full h-full bg-[#1a1411] overflow-hidden"
        style={{ borderRadius: w * 0.20, padding: 4 }}
      >
        <div
          className="relative w-full h-full overflow-hidden bg-[#FFF7F5]"
          style={{ borderRadius: w * 0.17 }}
        >
          <img
            src={src}
            alt=""
            loading="lazy"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* gentle glass highlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 28%, rgba(255,255,255,0) 72%, rgba(32,26,24,0.05) 100%)',
            }}
          />
          {/* dynamic island */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bg-[#1a1411]"
            style={{
              top: 5,
              height: Math.max(7, w * 0.055),
              width: Math.max(30, w * 0.30),
              borderRadius: 9999,
            }}
          />
        </div>
      </div>
    </div>
  )
}
