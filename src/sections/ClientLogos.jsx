import { useEffect, useRef } from "react";
import gsap from "gsap";

const logos = [
  { src: "/Asset 1.svg", alt: "Upwork", mono: true },
  { src: "/Asset 2.svg", alt: "Dribbble", mono: true },
  { src: "/Asset 5.svg", alt: "Dribbble", mono: true },
  { src: "/Asset 6.svg", alt: "Dribbble", mono: true },
  {
    src: "/Asset 9.svg",
    alt: "Dribbble",
    filter: "grayscale(1) brightness(0.25) contrast(1)",
  },
  {
    src: "/magnific-fr.png",
    alt: "Magnific",
    filter: "grayscale(1) brightness(0.25) contrast(1)",
    imgClass: "!h-16 lg:!h-20 2xl:!h-20",
    mt: 6,
  },
];

const MONO_FILTER = "grayscale(1) brightness(0) contrast(100)";

const LogoTrack = () => (
  <div className="flex items-center shrink-0">
    {logos.map((logo, i) => (
      <div
        key={i}
        className="shrink-0 flex items-center justify-center"
        style={{ width: "clamp(120px, 14vw, 270px)" }}
      >
        <img
          src={logo.src}
          alt={logo.alt}
          className={`h-10 lg:h-12 2xl:h-14 3xl:h-7 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-200 ${logo.imgClass ?? ""}`}
          style={{
            filter: logo.filter ?? (logo.mono ? MONO_FILTER : undefined),
            ...(logo.mt ? { marginTop: `${logo.mt}px` } : {}),
          }}
        />
      </div>
    ))}
  </div>
);

export default function ClientLogos() {
  const trackRef = useRef(null);
  const tickerFnRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let xPos = 0;
    let trackWidth = 0;

    const startTicker = () => {
      trackWidth = track.children[0].offsetWidth;
      if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current);

      tickerFnRef.current = () => {
        xPos -= 0.6;
        if (xPos <= -trackWidth) xPos += trackWidth;
        gsap.set(track, { x: xPos });
      };

      gsap.ticker.add(tickerFnRef.current);
    };

    const imgs = Array.from(track.querySelectorAll("img"));
    const loadPromises = imgs.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((res) => {
            img.onload = res;
            img.onerror = res;
          }),
    );

    Promise.all(loadPromises).then(() => {
      requestAnimationFrame(() => requestAnimationFrame(startTicker));
    });

    return () => {
      if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current);
    };
  }, []);

  return (
    <section className="bg-white 3xl:pt-28 2xl:pt-20 xl:pt-20 lg:pt-20 md:pt-14 sm:pt-16 pt-12 pb-6 md:pb-8 3xl:pb-40">
      <div className="md:px-[2.5rem] 3xl:px-[26rem] 2xl:px-[10rem] xl:px-[5rem] lg:px-[4rem] mx-auto px-6">
        {/* ── Heading ── */}
        <div className="flex flex-col items-center text-center mb-6 md:mb-14">
          <p
            className="text-[#73AC56] uppercase tracking-[0.2em] text-[10px] md:text-[22px] font-medium mb-3"
            style={{ fontFamily: "'Awesome Serif VAR', serif" }}
          >
            Where our work gets recognized
          </p>
        </div>

        {/* ── Logo ticker ── */}
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          <div ref={trackRef} className="flex will-change-transform">
            <LogoTrack />
            <LogoTrack />
            <LogoTrack />
            <LogoTrack />
            <LogoTrack />
            <LogoTrack />
          </div>
        </div>
      </div>
    </section>
  );
}
