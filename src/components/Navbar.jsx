import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────
// Defined outside the component so they are never re-created on render.

const NAV_LINKS = [
  { label: "Services",  sectionId: "hero"      },
  { label: "Portfolio", sectionId: "portfolio"  },
  { label: "About Us",  sectionId: "about"      },
  { label: "FAQ",       sectionId: "faq"        },
];

const MOBILE_OVERLAY_ID = "mobile-nav-overlay";

// ─── Animation Variants ───────────────────────────────────────────────────────
// Declared once at module level — stable references across renders.

const overlayVariants = {
  closed: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
  open: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
};

const linkVariants = {
  closed: { y: 60, opacity: 0 },
  open: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.15 + i * 0.07,
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
};

const footerVariants = {
  closed: { opacity: 0, y: 20 },
  open: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.5, duration: 0.5, ease: "easeOut" },
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Scroll to a section by id using Lenis smooth scroll when available,
 * falling back to native scrollIntoView.
 */
function lenisScrollTo(sectionId) {
  const el = document.getElementById(sectionId);
  if (!el) return;

  if (window.lenis) {
    window.lenis.scrollTo(el, { offset: 0, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // ── Body-scroll lock ──────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);



  // ── IntersectionObserver — active section tracking ────────────────────────
  useEffect(() => {
    if (location.pathname !== "/") return;

    const observers = NAV_LINKS.map(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(sectionId);
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );

      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [location.pathname]);

  // ── Cross-route scroll ────────────────────────────────────────────────────
  useEffect(() => {
    if (!location.state?.scrollTo) return;

    const id    = location.state.scrollTo;
    const timer = setTimeout(() => {
      lenisScrollTo(id);
      navigate("/", { replace: true, state: {} });
    }, 400);

    return () => clearTimeout(timer);
  }, [location.state, navigate]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const closeMobileMenu = () => setMobileOpen(false);

  const scrollToSection = useCallback(
    (sectionId) => {
      setMobileOpen(false);

      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: sectionId } });
      } else {
        // Small delay lets the mobile overlay finish closing first.
        setTimeout(() => lenisScrollTo(sectionId), 50);
      }
    },
    [location.pathname, navigate],
  );

  // ── Derived state ─────────────────────────────────────────────────────────

  const isHome = location.pathname === "/";

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Top bar ── */}
      <header
        className="absolute top-0 left-0 right-0 z-50 px-3 md:px-[1rem] lg:px-[4rem] xl:px-[5rem] 2xl:px-[9rem] 1920:px-[18rem] 3xl:px-[25rem] pt-[10px]"
        role="banner"
      >
        <div className="mx-auto transition-all duration-500">
          <div className="flex items-center justify-between px-6 md:px-8 h-[65px] 3xl:h-[85px] 2xl:h-[70px] xl:h-[60px] lg:h-[55px] md:h-[55px]">

            {/* Logo */}
            <Link to="/" aria-label="Prographr — go to homepage" className="flex items-center z-[60] relative">
              <img
                src="/green.svg"
                alt="Prographr logo"
                width={24}
                height={24}
                className="h-6 w-6 3xl:h-9 3xl:w-9 2xl:h-7 2xl:w-7 xl:h-6 xl:w-6 lg:h-7 lg:w-7 md:h-6 md:w-6 object-contain"
                fetchpriority="high"
                decoding="async"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-7 lg:gap-10 ml-auto">
              <nav aria-label="Primary navigation">
                <ul className="flex items-center gap-7 lg:gap-10" role="list">
                  {NAV_LINKS.map(({ label, sectionId }) => (
                    <li key={sectionId}>
                      <button
                        onClick={() => scrollToSection(sectionId)}
                        aria-current={isHome && activeSection === sectionId ? "true" : undefined}
                        className={`text-[14px] 3xl:text-[16px] 1920:text-[16px] 2xl:text-[13px] xl:text-[13px] lg:text-[14px] md:text-[13px] font-light transition-colors duration-200 cursor-pointer bg-transparent border-none mr-2 outline-none ${
                          isHome && activeSection === sectionId
                            ? "text-[#C8C8C8] underline underline-offset-[5px] decoration-white/60"
                            : "text-[#C8C8C8] hover:text-white"
                        }`}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Desktop CTA */}
              <button
                onClick={() => scrollToSection("contact")}
                className="text-[14px] 3xl:text-[16px] font-light text-[#F7F7F8] border border-[#73AC56] px-5 py-[7px] rounded-full hover:bg-[#73AC56] transition-colors duration-200 cursor-pointer bg-transparent outline-none whitespace-nowrap ml-2"
              >
                Let's Talk
              </button>
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls={MOBILE_OVERLAY_ID}
              className="md:hidden z-[60] relative flex flex-col justify-center items-center w-6 h-6 gap-[6px] bg-transparent border-none outline-none cursor-pointer"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="block w-6 h-[1.5px] bg-white origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-6 h-[1.5px] bg-white"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="block w-6 h-[1.5px] bg-white origin-center"
              />
            </button>

          </div>
        </div>
      </header>

      {/* ── Mobile Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id={MOBILE_OVERLAY_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[55] bg-[#182F33] flex flex-col px-8 pt-28 pb-10 md:hidden"
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.3 } }}
              exit={{ opacity: 0, scale: 0.7 }}
              onClick={closeMobileMenu}
              aria-label="Close navigation menu"
              className="absolute top-5 right-6 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm cursor-pointer"
            >
              <span aria-hidden="true" className="absolute block w-4 h-[1.5px] bg-white rotate-45" />
              <span aria-hidden="true" className="absolute block w-4 h-[1.5px] bg-white -rotate-45" />
            </motion.button>

            {/* Mobile Nav Links */}
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col gap-1 flex-1" role="list">
                {NAV_LINKS.map(({ label, sectionId }, i) => (
                  <li key={sectionId} className="overflow-hidden border-b border-white/[8%] py-4">
                    <motion.button
                      custom={i}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      onClick={() => scrollToSection(sectionId)}
                      aria-current={isHome && activeSection === sectionId ? "true" : undefined}
                      className="w-full text-left bg-transparent border-none outline-none cursor-pointer flex items-center justify-between group mt-6"
                    >
                      <span
                        className={`text-[clamp(36px,10vw,36px)] font-semibold tracking-[-1px] leading-none transition-colors duration-200 ${
                          isHome && activeSection === sectionId
                            ? "text-[#73AC56]"
                            : "text-white group-hover:text-[#73AC56]"
                        }`}
                      >
                        {label}
                      </span>
                      <span aria-hidden="true" className="text-white/30 text-2xl group-hover:text-[#73AC56] transition-colors duration-200">
                        ↗
                      </span>
                    </motion.button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Footer */}
            <motion.div
              variants={footerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex items-center justify-between pt-8"
            >
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-white/40 text-[10px] uppercase tracking-[0.15em]">
                  Ready to start?
                </span>
              </div>

              {/* Mobile CTA */}
              <button
                onClick={() => scrollToSection("contact")}
                className="text-[14px] font-light text-[#F7F7F8] border border-[#73AC56] px-5 py-[7px] rounded-full hover:bg-[#73AC56] transition-colors duration-200 cursor-pointer bg-transparent outline-none whitespace-nowrap"
              >
                Let's Talk
              </button>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}