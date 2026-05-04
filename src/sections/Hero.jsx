import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────

const SERVICES = [
  "Website Design",
  "UI/UX",
  "Web Development",
  "Print",
  "App Design",
  "and many more",
];

const PILL_WIDTH  = 200;
const CIRCLE_SIZE = 50;

const BG_IMAGE_URL =
  "https://res.cloudinary.com/dzi3u164c/image/upload/v1777868408/ChatGPT_Image_May_3_2026_04_13_25_PM_wyvvc7.webp";

// ─── Animation Variants ───────────────────────────────────────────────────────
// Defined at module level — stable references, never re-created on render.

const textAnimate = {
  initial: { opacity: 0, scale: 0.8,  filter: "blur(6px)"  },
  animate: {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 28, delay: 0.18 },
  },
  exit: {
    opacity: 0, scale: 0.75, filter: "blur(8px)",
    transition: { duration: 0.14, ease: [0.55, 0, 1, 0.45] },
  },
};

const iconAnimate = {
  initial: { opacity: 0, scale: 0.3,  filter: "blur(10px)" },
  animate: {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 350, damping: 22, delay: 0.32 },
  },
  exit: {
    opacity: 0, scale: 0.3, filter: "blur(10px)",
    transition: { duration: 0.14, ease: [0.55, 0, 1, 0.45] },
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns Framer Motion fade-up props for a given delay.
 * Called at render time with spread syntax, so no need to memoize.
 */
function fadeUp(delay = 0) {
  return {
    initial:    { opacity: 0, y: 30 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
  };
}

/**
 * Returns the pill spring transition config based on expanded state.
 * Kept as a function so the config object is only built when state changes.
 */
function pillTransition(expanded) {
  return {
    width: {
      type:      "spring",
      stiffness: 400,
      damping:   40,
      mass:      1,
      delay:     expanded ? 0.1 : 0.05,
    },
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Upwork SVG icon — memoised as a pure presentational component. */
function UpworkIcon({ size = 42 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 66 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="33" cy="33" r="33" fill="#73AC56" />
      <g transform="translate(14.87, 21.76) scale(1.6)">
        <path
          d="M0,.29h2.31c0,1,0,2.01,0,3.01,0,1.31-.22,2.88.51,4.03.5.78,1.36,1.17,2.28,1.07,1.46-.16,2.07-1.47,2.15-2.8V.29s4.02,0,4.02,0c.31,1.21.63,2.43,1.22,3.54.46-1.93,1.93-3.37,3.89-3.73,3.74-.69,6.79,2.31,6.19,6.06-.61,3.83-4.95,5.51-8.12,3.39l-.67-.47-.81,4.98h-2.34c.39-2.35.82-4.69,1.23-7.04-1.05-1.52-1.82-3.25-2.29-5.04-.03,0-.02.04-.02.06-.09,2.36.44,4.79-1.14,6.78-1.14,1.43-3.01,1.94-4.77,1.54C1.45,9.84.1,7.84.02,5.64l-.02-.04V.29ZM17.32,2.07c-2.3.12-2.86,2.54-3.12,4.42.82,1.32,2.52,2.26,4.09,1.81,3.12-.9,2.62-6.41-.97-6.23Z"
          fill="white"
        />
      </g>
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Hero() {
  const [hireExpanded, setHireExpanded] = useState(false);

  // Stable object reference — avoids creating a new style object every render.
  const bgStyle = useMemo(
    () => ({
      backgroundImage:    `url('${BG_IMAGE_URL}')`,
      backgroundSize:     "cover",
      backgroundPosition: "center",
      backgroundRepeat:   "no-repeat",
    }),
    [],
  );

  return (
    <section
      id="hero"
      aria-label="Hero — Prographr creative agency"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-6 font-['Inter',sans-serif]"
      style={bgStyle}
    >
      {/*
        NOTE: Move these @import rules to your global CSS file (e.g. index.css)
        or add <link> preconnect + stylesheet tags in index.html for best
        performance. Keeping here only to preserve the existing structure.
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500&family=Inter:wght@400;500&display=swap');
      `}</style>

      {/* Dark overlay — decorative, hidden from assistive tech */}
      <div className="absolute inset-0 bg-[#1a1a1c]/75 z-0" aria-hidden="true" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full 3xl:mt-5 1920:mt-16 2xl:mt-16 xl:mt-16 lg:mt-16 mt-10">

        {/* Rating badge */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-[6px]">
            <span
              className="bg-[#73AC56] text-[#F7F7F8] text-[14px] font-medium px-[14px] py-[2px] rounded-xl"
              aria-label="Rating: 5.00 out of 5"
            >
              5.00
            </span>
            <span className="text-[#F7F7F8] text-[12px] lg:text-[14px]">
              Our 2026 Design Trends Report is out
            </span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-[#F7F7F8] text-center leading-[1.3] 3xl:text-[clamp(2rem,5vw,5.5rem)] 1920:text-[clamp(2rem,5vw,5rem)] 2xl:text-[clamp(2rem,5vw,4.2rem)] xl:text-[clamp(2rem,5vw,4.2rem)] lg:text-[clamp(2rem,5vw,4.2rem)] text-[clamp(1.7rem,5vw,3.8rem)] font-medium tracking-[0.02rem] m-0"
        >
          <span className="font-['Inter',sans-serif] not-italic">Crafting </span>
          <em className="font-['Playfair_Display',serif] italic">Digital</em>
          <br />
          <em className="font-['Playfair_Display',serif] italic">Experiences</em>
          <span className="font-['Inter',sans-serif] not-italic"> That </span>
          <span className="font-['Inter',sans-serif] not-italic">Define</span>
          <br />
          <span className="font-['Inter',sans-serif] not-italic">the </span>
          <em className="font-['Playfair_Display',serif] italic">Future</em>
        </motion.h1>

        {/* Service tags */}
        <motion.ul
          {...fadeUp(0.22)}
          role="list"
          aria-label="Services offered"
          className="flex flex-wrap justify-center gap-[10px] mt-12 list-none m-0 p-0"
        >
          {SERVICES.map((service) => (
            <li key={service}>
              <span className="text-[#F7F7F8] text-[11px] font-medium px-[18px] py-[7px] bg-[#454348] tracking-[0.04em]">
                {service}
              </span>
            </li>
          ))}
        </motion.ul>

        {/* Hire Us pill */}
        <motion.div
          {...fadeUp(0.34)}
          className="3xl:mt-32 1920:mt-28 2xl:mt-14 xl:mt-14 lg:mt-14 mt-20"
        >
          <div className="flex justify-center" style={{ width: PILL_WIDTH }}>
            <motion.div
              onMouseEnter={() => setHireExpanded(true)}
              onMouseLeave={() => setHireExpanded(false)}
              animate={{ width: hireExpanded ? CIRCLE_SIZE : PILL_WIDTH }}
              transition={pillTransition(hireExpanded)}
              role="group"
              aria-label="Hire us on Upwork"
              className="bg-[#73AC56] rounded-full overflow-hidden cursor-pointer flex items-center justify-center shrink-0"
              style={{ height: CIRCLE_SIZE }}
            >
              <AnimatePresence mode="wait">
                {!hireExpanded ? (
                  <motion.span
                    key="hire-text"
                    {...textAnimate}
                    className="text-[#F7F7F8] text-[16px] whitespace-nowrap select-none relative z-10"
                  >
                    Hire Us
                  </motion.span>
                ) : (
                  <motion.a
                    key="upwork-icon"
                    href="https://www.upwork.com/agencies/2014604446040365323/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Prographr on Upwork (opens in new tab)"
                    {...iconAnimate}
                    className="flex items-center justify-center relative z-10"
                  >
                    <UpworkIcon size={CIRCLE_SIZE} />
                  </motion.a>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}