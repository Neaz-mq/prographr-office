import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
});

const services = [
  "Website Design",
  "UI/UX",
  "Web Development",
  "Print",
  "App Design",
  "and many more",
];

const PILL_WIDTH = 170;
const CIRCLE_SIZE = 46;

const pillTransition = (expanded) => ({
  width: {
    type: "spring",
    stiffness: 400,
    damping: 40,
    mass: 1,
    delay: expanded ? 0.1 : 0.05,
  },
});

const textAnimate = {
  initial: { opacity: 0, scale: 0.8, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 28, delay: 0.18 },
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    filter: "blur(8px)",
    transition: { duration: 0.14, ease: [0.55, 0, 1, 0.45] },
  },
};

const iconAnimate = {
  initial: { opacity: 0, scale: 0.3, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 350, damping: 22, delay: 0.32 },
  },
  exit: {
    opacity: 0,
    scale: 0.3,
    filter: "blur(10px)",
    transition: { duration: 0.14, ease: [0.55, 0, 1, 0.45] },
  },
};

function UpworkIcon({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default function Hero() {
  const [hireExpanded, setHireExpanded] = useState(false);

  return (
    <div
      id="hero"
      style={{ background: "#2A2A2C", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}
      className="relative w-full flex items-center justify-center overflow-hidden px-6"
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500&family=Inter:wght@400;500&display=swap');
      `}</style>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center w-full" style={{ zIndex: 1 }}>
        {/* Badge */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px" }}>
            <span style={{
              background: "#73AC56", color: "#F7F7F8", fontSize: 13,
              padding: "2px 14px", borderRadius: 12, fontWeight: 500
            }}>5.00</span>
            <span style={{ color: "#F7F7F8", fontSize: 13 }}>Our 2026 Design Trends Report is out</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.1)}
          style={{
            color: "#F7F7F8",
            textAlign: "center",
            lineHeight: 1.3,
            fontSize: "clamp(2rem, 5vw, 4.2rem)",
            fontWeight: 500,
            letterSpacing: "0.02rem",
            margin: 0,
          }}
        >
          <span style={{ fontFamily: "Inter, sans-serif", fontStyle: "normal" }}>Crafting </span>
          <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>Digital</em>
          <br />
          <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>Experiences</em>
          <span style={{ fontFamily: "Inter, sans-serif", fontStyle: "normal" }}> That </span>
          <em style={{ fontFamily: "Inter, sans-serif", fontStyle: "normal" }}>Define</em>
          <br />
          <span style={{ fontFamily: "Inter, sans-serif", fontStyle: "normal" }}>the </span>
          <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>Future</em>
        </motion.h1>

        {/* Service tags */}
        <motion.div
          {...fadeUp(0.22)}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 48 }}
        >
          {services.map((s, i) => (
            <span key={i} style={{
              color: "#F7F7F8", fontSize: 11, fontWeight: 500,
              padding: "7px 18px", background: "#454348", letterSpacing: "0.04em"
            }}>{s}</span>
          ))}
        </motion.div>

        {/* Hire Us pill */}
        <motion.div {...fadeUp(0.34)} style={{ marginTop: 80 }}>
          <div style={{ width: PILL_WIDTH, display: "flex", justifyContent: "center" }}>
            <motion.div
              onMouseEnter={() => setHireExpanded(true)}
              onMouseLeave={() => setHireExpanded(false)}
              animate={{ width: hireExpanded ? CIRCLE_SIZE : PILL_WIDTH }}
              transition={pillTransition(hireExpanded)}
              style={{
                height: CIRCLE_SIZE,
                background: "#73AC56",
                borderRadius: 999,
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <AnimatePresence mode="wait">
                {!hireExpanded ? (
                  <motion.span
                    key="hire-text"
                    {...textAnimate}
                    style={{ color: "#F7F7F8", fontSize: 16, whiteSpace: "nowrap", userSelect: "none", position: "relative", zIndex: 1 }}
                  >
                    Hire Us
                  </motion.span>
                ) : (
                  <motion.a
                    key="upwork-icon"
                    href="https://www.upwork.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...iconAnimate}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}
                  >
                    <UpworkIcon size={CIRCLE_SIZE} />
                  </motion.a>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}