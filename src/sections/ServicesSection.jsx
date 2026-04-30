import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Presentation,
  Image as ImageIcon,
} from "lucide-react";
import {
  SiFigma,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiSketch,
  SiFramer,
  SiTailwindcss,
  SiCanva,
  SiBlender,
  SiGimp,
} from "react-icons/si";
import { TbBrandAdobeIllustrator, TbBrandAdobeXd } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const CARD_HEIGHT = 270;
const SHOW_AMOUNT = 105;
const EXPAND_H = 160;
const EXPAND_W = 60;

const STACKS = {
  c0: {
    label: "Creative Tools",
    desc: "Brand identities, logos & visual assets crafted with precision and creativity.",
    divider: "rgba(0,0,0,0.13)",
    meta: "rgba(0,0,0,0.5)",
    pill: "rgba(0,0,0,0.07)",
    items: [
      { Icon: TbBrandAdobeIllustrator, name: "Illustrator", color: "#FF9A00" },
      { Icon: ImageIcon, name: "Photoshop", color: "#31A8FF" },
      { Icon: SiGimp, name: "GIMP", color: "#5C5543" },
      { Icon: SiBlender, name: "Blender", color: "#E87D0D" },
      { Icon: SiFigma, name: "Figma", color: "#F24E1E" },
    ],
  },
  c1: {
    label: "Tech Stack",
    desc: "Full-stack MERN applications built for performance and scale.",
    divider: "rgba(255,255,255,0.15)",
    meta: "rgba(255,255,255,0.7)", // desktop: inside dark card
    pill: "rgba(255,255,255,0.08)",
    mobileDivider: "rgba(0,0,0,0.13)", // mobile: on white background
    mobileMeta: "rgba(0,0,0,0.5)",
    mobilePill: "rgba(0,0,0,0.07)",
    items: [
      { Icon: SiReact, name: "React", color: "#61DAFB" },
      { Icon: SiNodedotjs, name: "Node.js", color: "#6CC24A" },
      { Icon: SiMongodb, name: "MongoDB", color: "#47A248" },
      { Icon: SiJavascript, name: "JS", color: "#F7DF1E" },
    ],
  },
  c2: {
    label: "Design Tools",
    desc: "Pixel-perfect UI/UX designs that convert visitors into clients.",
    divider: "rgba(0,0,0,0.08)",
    meta: "rgba(0,0,0,0.4)",
    pill: "rgba(0,0,0,0.05)",
    items: [
      { Icon: SiFigma, name: "Figma", color: "#F24E1E" },
      { Icon: TbBrandAdobeXd, name: "Adobe XD", color: "#FF61F6" },
      { Icon: SiSketch, name: "Sketch", color: "#F7B500" },
      { Icon: SiFramer, name: "Framer", color: "#0055FF" },
      { Icon: SiTailwindcss, name: "Tailwind", color: "#38BDF8" },
    ],
  },
  c3: {
    label: "Design Tools",
    desc: "High-impact presentation decks that tell a story and convert.",
    divider: "rgba(255,255,255,0.2)",
    meta: "rgba(255,255,255,0.75)",
    pill: "rgba(255,255,255,0.12)",
    mobileDivider: "rgba(0,0,0,0.13)",
    mobileMeta: "rgba(0,0,0,0.5)",
    mobilePill: "rgba(0,0,0,0.07)",
    items: [
      { Icon: Presentation, name: "PowerPoint", color: "#D04423" },
      { Icon: SiCanva, name: "Canva", color: "#00C4CC" },
      { Icon: SiFigma, name: "Figma", color: "#F24E1E" },
    ],
  },
};

function CardShell({ className = "", style = {}, children }) {
  return (
    <div
      className={`w-full h-full rounded-xl overflow-hidden relative  ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function DotGrid({ color = "#fff", spacing = 14 }) {
  const id = `dg-${color.replace(/[^a-z0-9]/gi, "")}${spacing}`;
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width={spacing}
          height={spacing}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={spacing / 2} cy={spacing / 2} r="1.4" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

function LinePattern({ color = "rgba(255,255,255,0.15)" }) {
  const id = `lp-${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="7" x2="14" y2="7" stroke={color} strokeWidth="1.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

function StackSection({ stackId, isMobile = false }) {
  const s = STACKS[stackId];
  if (!s) return null;

  const divider = isMobile ? (s.mobileDivider ?? s.divider) : s.divider;
  const meta = isMobile ? (s.mobileMeta ?? s.meta) : s.meta;
  const pill = isMobile ? (s.mobilePill ?? s.pill) : s.pill;

  return (
    <div className="px-5 pt-2 pb-6">
      <div style={{ height: 1, background: divider, marginBottom: 8 }} />
      <p
        style={{
          fontSize: 10.5,
          lineHeight: 1.5,
          color: meta,
          marginBottom: 8,
          fontWeight: 500,
        }}
      >
        {s.desc}
      </p>
      <p
        style={{
          fontSize: 8,
          fontWeight: 800,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: meta,
          marginBottom: 10,
          opacity: 0.6,
        }}
      >
        {s.label}
      </p>
      <div className="flex flex-wrap gap-3">
        {s.items.map(({ Icon, name, color }) => (
          <div key={name} className="flex flex-col items-center gap-1.5">
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: pill,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon size={18} style={{ color }} />
            </div>
            <span style={{ fontSize: 7, fontWeight: 700, color: meta }}>
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const desktopCards = [
  {
    id: "c0",
    cx: -155,
    cy: 10,
    w: 240,
    h: CARD_HEIGHT,
    rotate: -22,
    zIndex: 2,
    from: { x: -100, y: 120, rotate: -45 },
    render: () => (
      <CardShell className="bg-[#C8FF00]">
        <DotGrid color="#b8ef00" spacing={10} />
        <div className="absolute inset-0 p-5">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-black/40 mb-2">
            Service 01
          </p>
          <p className="text-[28px] font-black leading-tight tracking-tight text-black">
            Graphic
            <br />
            Design
          </p>
        </div>
      </CardShell>
    ),
  },
  {
    id: "c1",
    cx: -55,
    cy: -15,
    w: 240,
    h: CARD_HEIGHT + 20,
    rotate: -8,
    zIndex: 4,
    from: { x: -40, y: -130, rotate: -18 },
    render: () => (
      <CardShell className="bg-[#0d0d0d]">
        <DotGrid color="#1e1e1e" spacing={13} />
        <div className="absolute inset-0 p-5 text-white">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2">
            Service 02
          </p>
          <p className="text-[28px] font-black leading-tight tracking-tight">
            Web
            <br />
            Development
          </p>
        </div>
      </CardShell>
    ),
  },
  {
    id: "c2",
    cx: 60,
    cy: -15,
    w: 240,
    h: CARD_HEIGHT + 20,
    rotate: 6,
    zIndex: 3,
    from: { x: 40, y: -130, rotate: 16 },
    render: () => (
      <CardShell className="bg-[#f8f8f8]">
        <div className="absolute inset-0 p-5 text-black">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-black/25 mb-2">
            Service 03
          </p>
          <p className="text-[28px] font-black leading-tight tracking-tight">
            Web
            <br />
            Design
          </p>
        </div>
      </CardShell>
    ),
  },
  {
    id: "c3",
    cx: 165,
    cy: 10,
    w: 240,
    h: CARD_HEIGHT,
    rotate: 20,
    zIndex: 2,
    from: { x: 100, y: 110, rotate: 44 },
    render: () => (
      <CardShell
        style={{ background: "linear-gradient(145deg,#a855f7,#ec4899)" }}
      >
        <LinePattern color="rgba(255,255,255,0.1)" />
        <div className="absolute inset-0 p-5 text-white">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/50 mb-2">
            Service 04
          </p>
          <p className="text-[28px] font-black leading-tight tracking-tight">
            PowerPoint
            <br />
            Design
          </p>
        </div>
      </CardShell>
    ),
  },
];

function DesktopFan() {
  const clusterRef = useRef(null);
  const cardRefs = useRef([]);
  const stackRefs = useRef([]);
  const wrapperRef = useRef(null);
  const hoveredRef = useRef(null);

  useEffect(() => {
    const setScale = () => {
      if (!wrapperRef.current) return;
      const scale = Math.min(1, (window.innerWidth - 16) / 520);
      wrapperRef.current.style.transform = `scale(${scale})`;
      wrapperRef.current.style.transformOrigin = "bottom center";
    };
    setScale();
    window.addEventListener("resize", setScale);
    return () => window.removeEventListener("resize", setScale);
  }, []);

  useEffect(() => {
    const els = cardRefs.current.filter(Boolean);
    els.forEach((el, i) => {
      const c = desktopCards[i];
      gsap.set(el, {
        x: c.from.x,
        y: c.from.y,
        rotation: c.from.rotate,
        opacity: 0,
      });
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: clusterRef.current,
        start: "top 95%",
        toggleActions: "play none none none",
      },
    });
    els.forEach((el, i) => {
      const c = desktopCards[i];
      tl.to(
        el,
        {
          x: 0,
          y: 0,
          rotation: c.rotate,
          opacity: 1,
          duration: 1.1,
          ease: "expo.out",
        },
        i * 0.09,
      );
    });
    return () => tl.kill();
  }, []);

  const handleMouseEnter = (i) => {
    if (hoveredRef.current === i) return;
    hoveredRef.current = i;
    const el = cardRefs.current[i];
    const sEl = stackRefs.current[i];
    const card = desktopCards[i];

    gsap.to(el, {
      height: card.h + EXPAND_H,
      width: card.w + EXPAND_W,
      duration: 0.6,
      ease: "expo.out",
      overwrite: "auto",
      onStart: () => gsap.set(el, { zIndex: 50 }),
    });

    if (sEl) {
      gsap.fromTo(
        sEl,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.2,
          ease: "power3.out",
          overwrite: "auto",
        },
      );
    }

    cardRefs.current.forEach((other, j) => {
      if (j !== i && other) {
        gsap.to(other, {
          opacity: 0.3,
          scale: 0.95,
          filter: "blur(2px)",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });
  };

  const handleMouseLeave = (i) => {
    if (hoveredRef.current !== i) return;
    hoveredRef.current = null;
    const el = cardRefs.current[i];
    const sEl = stackRefs.current[i];
    const card = desktopCards[i];

    gsap.to(el, {
      height: card.h,
      width: card.w,
      duration: 0.5,
      ease: "expo.inOut",
      overwrite: "auto",
      onComplete: () => gsap.set(el, { zIndex: card.zIndex }),
    });

    if (sEl) gsap.to(sEl, { opacity: 0, y: 10, duration: 0.2 });

    cardRefs.current.forEach((other, j) => {
      if (j !== i && other) {
        gsap.to(other, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });
  };

  return (
    <div
      ref={clusterRef}
      className="relative w-full flex items-end justify-center"
      style={{ height: CARD_HEIGHT }}
    >
      <div
        ref={wrapperRef}
        style={{
          position: "absolute",
          bottom: 0,
          width: 520,
          height: CARD_HEIGHT + 60,
        }}
      >
        {desktopCards.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => (cardRefs.current[i] = el)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              marginLeft: card.cx - card.w / 2,
              marginBottom: card.cy,
              width: card.w,
              height: card.h,
              zIndex: card.zIndex,
              willChange: "transform, width, height",
              transformOrigin: "50% 100%",
              overflow: "hidden",
              borderRadius: "1.25rem",
              cursor: "pointer",
            }}
          >
            {card.render()}
            <div
              ref={(el) => (stackRefs.current[i] = el)}
              style={{
                position: "absolute",
                top: card.h - 10,
                left: 0,
                right: 0,
                opacity: 0,
              }}
            >
              <StackSection stackId={card.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileCarousel() {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const ids = ["c0", "c1", "c2", "c3"];
  const c = desktopCards[current];

  const goNext = () => {
    setCurrent((current + 1) % 4);
    setExpanded(false);
  };
  const goPrev = () => {
    setCurrent((current - 1 + 4) % 4);
    setExpanded(false);
  };

  const isDarkCard = ids[current] === "c1";

  return (
    <div className="w-full max-w-[450px] mx-auto px-6">
      <div
        className="relative overflow-hidden transition-all duration-500 rounded-2xl"
        // Reduced height from 520 to 480 to pull the bottom slider up
        style={{ height: expanded ? 480 : 300 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <div className="h-[300px]">{c.render()}</div>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-[180px] overflow-y-auto pt-1 bg-transparent"
              >
                <StackSection stackId={ids[current]} isMobile={true} />{" "}
                {/* 👈 add isMobile */}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => setExpanded(!expanded)}
          className={`absolute top-4 right-4 z-50 px-4 py-1.5 rounded-full backdrop-blur-lg text-[10px] font-black uppercase transition-all duration-300 ${
            isDarkCard
              ? "bg-white/20 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]"
              : "bg-black/10 text-black/80"
          }`}
        >
          {expanded ? "Close" : "Details"}
        </button>
      </div>

      {/* Reduced mt-8 to mt-4 to pull the dots and arrows closer to the card */}
      <div className="flex items-center justify-between mt-4 px-4 pb-10">
        <button onClick={goPrev} className="p-3 border rounded-full">
          <ChevronLeft size={24} className="text-gray-600" />
        </button>
        <div className="flex gap-2">
          {ids.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${current === i ? "w-6 bg-black" : "w-1.5 bg-black/20"}`}
            />
          ))}
        </div>
        <button onClick={goNext} className="p-3 border rounded-full">
          <ChevronRight size={24} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="">
      {/* Mobile only */}
      <div className="lg:hidden block -mt-40">
        <MobileCarousel />
      </div>

      {/* Desktop only - Matches your original layout perfectly */}
      <div
        className="hidden lg:block relative z-10 bg-transparent"
        style={{ marginTop: -(CARD_HEIGHT - SHOW_AMOUNT) }}
      >
        <DesktopFan />
      </div>
    </section>
  );
}