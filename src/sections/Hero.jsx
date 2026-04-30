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

const PILL_WIDTH = 110;
const CIRCLE_SIZE = 42;

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

function FloatingIcon({ children, entryDelay = 0, floatY = 10, floatX = 4, duration = 5, className = "" }) {
  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { duration: 0.8, delay: entryDelay, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <motion.div
        animate={{
          y: [0, -floatY, 0, floatY * 0.5, 0],
          x: [0, floatX, 0, -floatX * 0.6, 0],
          rotate: [0, 5, -3, 4, 0],
        }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", delay: entryDelay * 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function BezierIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="9" height="9" rx="1.5" stroke="#73AC56" strokeWidth="1.8" fill="none" />
      <rect x="36" y="1" width="9" height="9" rx="1.5" stroke="#73AC56" strokeWidth="1.8" fill="none" />
      <rect x="18.5" y="36" width="9" height="9" rx="1.5" stroke="#73AC56" strokeWidth="1.8" fill="none" />
      <path d="M10 5.5 Q23 5.5 36 5.5" stroke="#73AC56" strokeWidth="1.4" fill="none" strokeDasharray="3 2.5" />
      <path d="M5.5 10 Q5.5 28 23 36" stroke="#73AC56" strokeWidth="1.4" fill="none" strokeDasharray="3 2.5" />
      <path d="M40.5 10 Q40.5 28 28 36" stroke="#73AC56" strokeWidth="1.4" fill="none" strokeDasharray="3 2.5" />
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 17 L8 29 L15 29 L15 17 Z" stroke="#73AC56" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      <path d="M15 15 L36 8 L36 38 L15 31 Z" stroke="#73AC56" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      <path d="M11 29 L9 37" stroke="#73AC56" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M39 18 Q42 23 39 28" stroke="#73AC56" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M41 14 Q46 23 41 32" stroke="#73AC56" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeOpacity="0.5" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="56" height="30" viewBox="0 0 56 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 4 L3 15 L15 26" stroke="#73AC56" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M41 4 L53 15 L41 26" stroke="#73AC56" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M32 2 L24 28" stroke="#73AC56" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function SparkleShape({ size = 10 }) {
  const r = size / 2;
  const outerR = r;
  const innerR = r * 0.35;
  const points = [];
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? outerR : innerR;
    const x = r + radius * Math.cos(angle);
    const y = r + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points={points.join(" ")} fill="#73AC56" />
    </svg>
  );
}

function Sparkle({ delay, offsetX, offsetY, flyX, flyY, size = 10 }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: "50%", top: "50%", marginLeft: offsetX, marginTop: offsetY }}
      initial={{ opacity: 0, x: 0, y: 0, scale: 0.6, rotate: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [0, flyX * 0.4, flyX],
        y: [0, flyY * 0.4, flyY],
        scale: [0.6, 1.2, 0.4],
        rotate: [0, 30, 60],
      }}
      transition={{
        duration: 1.1,
        delay,
        repeat: Infinity,
        repeatDelay: 1.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <SparkleShape size={size} />
    </motion.div>
  );
}

function CursorClickAnimation({ className = "" }) {
  return (
    <div className={`absolute pointer-events-none select-none ${className}`}>
      <motion.div
        style={{ position: "relative", width: 60, height: 60 }}
        initial={{ x: 160, y: 160, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 90,
          damping: 18,
          mass: 1.1,
          delay: 0.5,
          opacity: { duration: 0.3, delay: 0.5 },
        }}
      >
        <svg
  width="52"
  height="52"
  viewBox="0 0 52 52"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  style={{ display: "block" }}
>
  <path
    d="M6 6 L44 22 L28 28 L22 44 Z"
    fill="#73AC56"
    stroke="#2A2A2C"
    strokeWidth="1.5"
    strokeLinejoin="round"
  />
</svg>
        <Sparkle delay={1.1} offsetX={-14} offsetY={-36} flyX={-14} flyY={-16} size={8} />
        <Sparkle delay={1.25} offsetX={-4} offsetY={-44} flyX={0} flyY={-20} size={13} />
        <Sparkle delay={1.4} offsetX={10} offsetY={-34} flyX={16} flyY={-12} size={8} />
      </motion.div>
    </div>
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

      {/* Top-left: Bezier */}
      <FloatingIcon entryDelay={0.65} floatY={12} floatX={5} duration={5.5} className="left-[10%] top-[20%]">
        <BezierIcon />
      </FloatingIcon>

      {/* Top-right: Megaphone */}
      <FloatingIcon entryDelay={0.8} floatY={10} floatX={-5} duration={6} className="right-[10%] top-[18%]">
        <MegaphoneIcon />
      </FloatingIcon>

      {/* Bottom-left: </> code */}
      <FloatingIcon entryDelay={1.0} floatY={8} floatX={6} duration={6.5} className="left-[8%] bottom-[24%]">
        <CodeIcon />
      </FloatingIcon>

      {/* Bottom-right: Cursor + sparkles */}
      <CursorClickAnimation className="right-[9%] bottom-[22%]" />

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
          <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>Define</em>
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
                    style={{ color: "#F7F7F8", fontSize: 15, whiteSpace: "nowrap", userSelect: "none", position: "relative", zIndex: 1 }}
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