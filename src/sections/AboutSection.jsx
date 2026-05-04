import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Constants ────────────────────────────────────────────────────────────────

const HEADING_LINES = [
  "We Help Businesses Stand Out",
  "With Modern, Creative, and ",
  "Impactful Design Solutions",
];

const DESKTOP_BREAKPOINT = 1024; // px

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * Unified char-reveal heading used by both desktop and mobile layouts.
 * Splitting into two separate components was causing duplicated GSAP logic.
 *
 * @param {object}  props
 * @param {string}  props.charClass      - className applied to every <span>
 * @param {string}  props.lineClass      - className applied to every <p>
 * @param {string}  props.wrapperClass   - className on the outer wrapper
 * @param {string}  props.spanSelector   - unique class used as the GSAP selector
 * @param {object}  props.scrollConfig   - ScrollTrigger config overrides
 * @param {object}  props.triggerRef     - optional external trigger element ref
 */
function CharRevealHeading({
  charClass      = "",
  lineClass      = "",
  wrapperClass   = "",
  spanSelector   = "char-span",
  scrollConfig   = {},
  triggerRef,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const trigger   = triggerRef?.current ?? container;
    if (!container || !trigger) return;

    const chars = Array.from(container.querySelectorAll(`.${spanSelector}`));
    if (!chars.length) return;

    gsap.set(chars, { color: "#c0c0c0" });

    const ctx = gsap.context(() => {
      gsap.to(chars, {
        color:   "#454348",
        stagger: { each: 0.015, from: "start" },
        ease:    "none",
        scrollTrigger: {
          trigger,
          start: "top 75%",
          end:   "bottom 30%",
          scrub: 0.6,
          ...scrollConfig,
        },
      });
    });

    return () => ctx.revert();
  }, [triggerRef, spanSelector, scrollConfig]);

  return (
    <div ref={containerRef} className={`flex flex-col gap-0 ${wrapperClass}`}>
      {HEADING_LINES.map((line, li) => (
        <p
          key={line}
          aria-label={line}
          className={lineClass}
        >
          {line.split("").map((char, ci) => (
            <span
              // Key combines line index + char index — line text is stable so this is safe.
              key={`${li}-${ci}`}
              className={`${spanSelector} inline-block ${charClass}`}
              style={{
                color:      "#c0c0c0",
                whiteSpace: char === " " ? "pre" : "normal",
              }}
            >
              {char}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

// ─── Scroll config objects — stable references, not recreated per render ──────

const DESKTOP_SCROLL_CONFIG = {
  start: "top 75%",
  end:   "bottom 30%",
  scrub: 0.6,
};

const MOBILE_SCROLL_CONFIG = {
  start: "top 82%",
  end:   "bottom 20%",
  scrub: 0.6,
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function AboutSection() {
  const headingRef = useRef(null);

  // matchMedia gives a free resize listener with no manual event wiring.
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.innerWidth >= DESKTOP_BREAKPOINT
      : true,
  );

  useEffect(() => {
    const mq      = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const handler = (e) => setIsDesktop(e.matches);

    // Modern browsers support addEventListener on MediaQueryList.
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ── Mobile layout ──
  if (!isDesktop) {
    return (
      <section id="about" aria-label="About Prographr" className="bg-white w-full">
        <div
          ref={headingRef}
          className="max-w-7xl mx-auto px-5 sm:px-8 w-full pt-4 pb-8"
        >
          <div className="flex flex-row items-start justify-between gap-4 md:pt-8 pt-5">
            <div className="shrink-0">
              <h2 className="text-[clamp(28px,10vw,40px)] font-bold text-[#454348] leading-[1.05] tracking-[-1px]">
                About
                <br />
                Us
              </h2>
            </div>
            <div className="flex-1 pb-1 flex justify-end items-end">
              <CharRevealHeading
                spanSelector="char-span-m"
                charClass="text-[clamp(13px,3.5vw,20px)] font-normal"
                lineClass="leading-[1.5] tracking-[0.01em]"
                scrollConfig={MOBILE_SCROLL_CONFIG}
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full py-8 flex flex-col gap-8">

          {/* Stats */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[clamp(24px,5.5vw,36px)] text-[#454348] leading-[1.25]">
              What makes our agency different
            </h3>
            <div className="flex items-stretch gap-3 sm:gap-5 mt-2">
              <div className="flex flex-col justify-center gap-1 flex-1">
                <div className="text-[clamp(32px,8vw,44px)] font-semibold leading-none tracking-[-1px] text-[#73AC56]">
                  30+
                </div>
                <div className="text-[11px] leading-[1.5] text-[#555]">
                  Company with Work Experiences
                </div>
              </div>
              <div className="flex-[2] bg-[#2A2A2C] px-4 sm:px-8 py-6 flex gap-5 sm:gap-24 items-center justify-center">
                <div>
                  <div className="text-[clamp(26px,7vw,40px)] font-semibold leading-none mb-1 tracking-[-1px] text-[#73AC56]">
                    1K+
                  </div>
                  <div className="text-[11px] leading-[1.5] text-white">
                    Job Completed
                  </div>
                </div>
                <div>
                  <div className="text-[clamp(26px,7vw,40px)] font-semibold leading-none mb-1 tracking-[-1px] text-[#73AC56]">
                    100%
                  </div>
                  <div className="text-[11px] leading-[1.5] text-white">
                    Satisfied Client
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            className="w-full overflow-hidden relative"
            style={{ height: "clamp(240px, 55vw, 320px)" }}
          >
            <img
              src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774931324/Asset_3_raki8b.webp"
              alt="Abstract lightning visual"
              width={800}
              height={320}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-right"
            />
            <div className="relative z-10 flex flex-col justify-between h-full p-7 sm:p-10">
              <h3 className="text-[clamp(22px,5.5vw,34px)] font-extrabold text-white leading-[1.15] tracking-[-0.5px] max-w-[65%]">
                Scroll and enjoy a new experience
              </h3>
              <button
                type="button"
                className="self-start inline-flex items-center gap-2 px-5 py-[9px] bg-transparent border border-white/30 rounded-full text-white/70 text-[11px] cursor-pointer transition-all hover:bg-white/10 hover:text-white"
              >
                Again let's go →
              </button>
            </div>
          </div>

        </div>
      </section>
    );
  }

  // ── Desktop layout ──
  return (
    <section id="about" aria-label="About Prographr" className="bg-white w-full overflow-x-hidden">

      {/* Heading row */}
      <div
        ref={headingRef}
        className="w-full shrink-0 px-3 md:px-[2.5rem] 3xl:px-[26rem] 1920:px-[18rem] 2xl:px-[10rem] xl:px-[5rem] lg:px-[4rem] 3xl:pt-6 2xl:pt-16 xl:pt-16 lg:pt-16 3xl:pb-32 2xl:pb-20 xl:pb-16 lg:pb-16 pb-5"
      >
        <div className="flex items-end 3xl:gap-12 2xl:gap-10 xl:gap-8 lg:gap-6">
          <div className="shrink-0 self-start 3xl:w-[500px] 2xl:w-[380px] xl:w-[250px] lg:w-[230px]">
            <h2 className="3xl:text-[clamp(52px,10vw,90px)] 2xl:text-[clamp(52px,10vw,80px)] xl:text-[clamp(45px,3.8vw,58px)] lg:text-[clamp(40px,3.8vw,58px)] md:text-[clamp(36px,3.8vw,58px)] font-bold text-[#454348] leading-[1.0] tracking-wide">
              About Us
            </h2>
          </div>
          <div className="flex-1 pb-1 flex justify-end">
            <CharRevealHeading
              triggerRef={headingRef}
              spanSelector="char-span"
              charClass="
                3xl:text-[clamp(28px,10vw,38px)]
                2xl:text-[clamp(22px,1.9vw,34px)]
                xl:text-[clamp(18px,1.6vw,26px)]
                lg:text-[clamp(16px,1.5vw,22px)]
                whitespace-nowrap font-light tracking-[-0.5px]
              "
              lineClass="3xl:leading-[1.2] 2xl:leading-[1.2] xl:leading-[1.3] lg:leading-[1.3] leading-[1] tracking-[0.01em]"
              scrollConfig={DESKTOP_SCROLL_CONFIG}
            />
          </div>
        </div>
      </div>

      {/* Cards row */}
      <div className="w-full max-w-full px-3 md:px-[2.5rem] 3xl:px-[26rem] 1920:px-[18rem] 2xl:px-[10rem] xl:px-[5rem] lg:px-[4rem] pb-16 flex gap-6 items-stretch overflow-hidden">

        {/* Card 1 — Stats */}
        <div className="flex-1 min-w-0 flex flex-col justify-between min-h-0 3xl:h-[465px] 2xl:h-[400px] xl:h-[340px] lg:h-[320px]">
          <h3 className="3xl:text-[48px] 2xl:text-[38px] xl:text-[30px] lg:text-[26px] font-light text-[#454348] 3xl:leading-[1.3] 2xl:leading-[1.35] xl:leading-[1.35] lg:leading-[1.35] 3xl:mt-12 2xl:mt-8 xl:mt-8 lg:mt-8 md:mt-4">
            What makes
            <br />
            <span className="whitespace-nowrap">our agency different</span>
          </h3>

          <div className="flex items-stretch gap-4 w-full">
            {/* Solo stat */}
            <div className="flex flex-col justify-center gap-1 shrink-0 3xl:min-w-[140px] 2xl:min-w-[110px] xl:min-w-[90px] lg:min-w-[80px] 3xl:mt-5 2xl:mt-5 xl:mt-5 lg:mt-4">
              <div className="3xl:text-[60px] 2xl:text-[52px] xl:text-[42px] lg:text-[36px] font-semibold leading-none tracking-[-2px] text-[#73AC56]">
                30+
              </div>
              <div className="3xl:text-[15px] 2xl:text-[11px] xl:text-[11px] lg:text-[10px] leading-[1.5] text-[#555] font-normal">
                Company with
                <br />
                Work Experiences
              </div>
            </div>

            {/* Dark box */}
            <div className="flex-1 bg-[#2A2A2C] 3xl:px-10 3xl:py-16 2xl:px-8 2xl:py-12 xl:px-6 xl:py-12 lg:px-5 lg:py-12 flex items-center justify-around gap-4">
              <div>
                <div className="3xl:text-[54px] 2xl:text-[46px] xl:text-[38px] lg:text-[32px] font-semibold leading-none tracking-[-2px] text-[#73AC56] mb-2">
                  1K+
                </div>
                <div className="3xl:text-[16px] 2xl:text-[13px] xl:text-[11px] lg:text-[10px] leading-[1.5] text-white whitespace-nowrap">
                  Job Completed
                </div>
              </div>
              <div>
                <div className="3xl:text-[54px] 2xl:text-[46px] xl:text-[38px] lg:text-[32px] font-semibold leading-none tracking-[-2px] text-[#73AC56] mb-2">
                  100%
                </div>
                <div className="3xl:text-[16px] 2xl:text-[13px] xl:text-[11px] lg:text-[10px] leading-[1.5] text-white whitespace-nowrap">
                  Satisfied Client
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 — CTA image */}
        <div className="flex-1 min-w-0 overflow-hidden relative 3xl:h-[465px] 2xl:h-[400px] xl:h-[340px] lg:h-[320px]">
          <img
            src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774931324/Asset_3_raki8b.webp"
            alt="Abstract lightning visual"
            width={800}
            height={465}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 z-[1]" aria-hidden="true" />

          <div className="absolute inset-0 z-[2] flex flex-col justify-between 3xl:p-14 2xl:p-12 xl:p-8 lg:p-8">
            <h3 className="3xl:text-[45px] 2xl:text-[42px] xl:text-[34px] lg:text-[30px] font-extrabold text-white leading-[1.1] tracking-[-0.5px]">
              Scroll and <br />
              enjoy a <br />
              new <br />
              experience
            </h3>
            <button
              type="button"
              className="self-start inline-flex items-center gap-2 px-5 py-[9px] bg-transparent text-white 3xl:text-[18px] 2xl:text-[15px] xl:text-[13px] lg:text-[13px] transition-all -ml-4"
            >
              Again let's go
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}