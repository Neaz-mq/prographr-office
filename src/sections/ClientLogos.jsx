import { useEffect, useRef, memo } from "react";
import gsap from "gsap";

// ─── Constants ────────────────────────────────────────────────────────────────

const LOGOS = [
  { src: "/Upwork.svg",      alt: "Upwork"      },
  { src: "/Dribbble.svg",    alt: "Dribbble"    },
  { src: "/Envato.svg",      alt: "Envato"      },
  { src: "/Fiverr.svg",      alt: "Fiverr"      },
  { src: "/Freelancer.svg",  alt: "Freelancer"  },
  { src: "/magnific.svg",    alt: "Freepik", scale: "0.55" },
];

const MONO_FILTER = "grayscale(1) brightness(0) contrast(100)";

// Defined once — stable object reference, never causes style reconciliation.
const MASK_STYLE = {
  maskImage:
    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
};

const TICKER_SPEED = 0.6; // px per frame

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * One copy of the logo strip.
 * `aria-hidden` on duplicates is set by the parent — only the first strip
 * is visible to assistive tech; the rest are purely visual.
 */
const LogoTrack = memo(function LogoTrack({ hidden = false }) {
  return (
    <div
      className="flex items-center shrink-0"
      aria-hidden={hidden ? "true" : undefined}
    >
      {LOGOS.map((logo) => (
        <div
          key={logo.alt}
          className="shrink-0 3xl:px-7 2xl:px-7 xl:px-7 lg:px-7 md:px-6 sm:px-4 px-2"
        >
          <img
            src={logo.src}
            alt={logo.alt}
            width={120}
            height={56}
            loading="eager"
            decoding="async"
            className="lg:h-14 h-11 md:h-12 3xl:h-20 2xl:h-14 xl:h-14 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
            style={{
              filter: MONO_FILTER,
              ...(logo.scale ? { transform: `scale(${logo.scale})` } : {}),
            }}
          />
        </div>
      ))}
    </div>
  );
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function ClientLogos() {
  const trackRef    = useRef(null);
  const tickerFnRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let xPos       = 0;
    let trackWidth = 0;

    const startTicker = () => {
      // Measure the first strip only — all strips are identical width.
      trackWidth = track.children[0].offsetWidth;

      if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current);

      tickerFnRef.current = () => {
        xPos -= TICKER_SPEED;
        if (xPos <= -trackWidth) xPos += trackWidth;
        gsap.set(track, { x: xPos });
      };

      gsap.ticker.add(tickerFnRef.current);
    };

    // Wait for all logo images to load before measuring widths —
    // avoids a 0-width measurement that breaks the seamless loop.
    const imgs = Array.from(track.querySelectorAll("img"));
    const loadPromises = imgs.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
            img.onload  = resolve;
            img.onerror = resolve; // degrade gracefully on broken images
          }),
    );

    Promise.all(loadPromises).then(() => {
      // Double rAF ensures the browser has performed layout after load.
      requestAnimationFrame(() => requestAnimationFrame(startTicker));
    });

    return () => {
      if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current);
    };
  }, []);

  return (
    <section
      aria-label="Platforms where Prographr's work is recognized"
      className="bg-white 3xl:pt-28 2xl:pt-20 xl:pt-20 lg:pt-20 md:pt-14 sm:pt-16 pt-12 pb-6 md:pb-8 3xl:pb-40"
    >
      <div className="md:px-[2.5rem] 3xl:px-[26rem] 1920:px-[18rem] 2xl:px-[10rem] xl:px-[5rem] lg:px-[4rem] mx-auto px-6">

        {/* ── Heading ── */}
        <div className="flex flex-col items-center text-center mb-6 md:mb-14">
          <p className="text-[#73AC56] uppercase tracking-[0.1em] text-[10px] md:text-[17px] font-medium mb-3">
            Where our work gets recognized
          </p>
        </div>

        {/* ── Logo ticker ── */}
        <div
          className="relative overflow-hidden"
          style={MASK_STYLE}
          aria-hidden="true"  // entire ticker is decorative — heading conveys the message
        >
          <div ref={trackRef} className="flex will-change-transform">
            {/* First strip: carries real alt text for assistive tech */}
            <LogoTrack />

            {/* Duplicate strips: purely visual, hidden from screen readers */}
            <LogoTrack hidden />
            <LogoTrack hidden />
            <LogoTrack hidden />
            <LogoTrack hidden />
            <LogoTrack hidden />
          </div>
        </div>

      </div>
    </section>
  );
}