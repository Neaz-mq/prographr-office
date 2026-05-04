import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ─── Constants ────────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/prographr.page/", label: "Facebook" },
  { href: "https://id.pinterest.com/prographr/",      label: "Pinterest" },
  { href: "https://www.instagram.com/prographr",      label: "Instagram" },
  { href: "https://www.linkedin.com/company/prographr/", label: "LinkedIn" },
  { href: "https://x.com/prographr",                  label: "Twitter"   },
];

const SERVICE_LINKS = [
  { label: "Graphic Design",    sectionId: "portfolio"   },
  { label: "Brand Design",      sectionId: "portfolio"   },
  { label: "Web Development",   sectionId: "technology"  },
  { label: "Web Design",        sectionId: "portfolio"   },
  { label: "PowerPoint Design", sectionId: "portfolio"   },
];

const INFORMATION_LINKS = [
  { label: "FAQ",     sectionId: "faq"     },
  { label: "Support", sectionId: "contact" },
];

const CURRENT_YEAR = new Date().getFullYear();

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

// ─── Reusable sub-components ──────────────────────────────────────────────────

/** Renders a single column of section-scroll buttons. */
function NavColumn({ heading, links, onNavigate, linkClassName }) {
  return (
    <div className="flex flex-col">
      <h2 className={`font-medium mb-10 ${heading.className}`}>{heading.label}</h2>
      <ul className="space-y-3" role="list">
        {links.map(({ label, sectionId }) => (
          <li key={label}>
            <button
              onClick={() => onNavigate(sectionId)}
              className={`text-left bg-transparent border-none outline-none cursor-pointer transition-colors ${linkClassName}`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Renders a single column of external social links. */
function SocialColumn({ heading, linkClassName }) {
  return (
    <div className="flex flex-col">
      <h2 className={`font-medium mb-10 ${heading.className}`}>{heading.label}</h2>
      <ul className="space-y-3" role="list">
        {SOCIAL_LINKS.map(({ href, label }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Prographr on ${label} (opens in new tab)`}
              className={`transition-colors ${linkClassName}`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // Stable reference — only re-created when route changes.
  const scrollToSection = useCallback(
    (sectionId) => {
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: sectionId } });
      } else {
        // Small delay ensures any in-progress transitions complete first.
        setTimeout(() => lenisScrollTo(sectionId), 50);
      }
    },
    [location.pathname, navigate],
  );

  return (
    <footer className="bg-[#2A2A2C]" aria-label="Site footer">
      <div className="mx-auto px-6 md:px-10 lg:px-[4rem] xl:px-[5rem] 2xl:px-[10rem] 3xl:px-[26rem] 1920:px-[18rem] pt-12 md:pt-16 pb-0">

        {/* ── Mobile View ── */}
        <div className="md:hidden" aria-label="Footer navigation">
          <div className="flex items-center gap-2 mb-10">
            <img
              src="/logo.webp"
              alt="Prographr logo"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
              decoding="async"
            />
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <nav aria-label="Services navigation">
              <h2 className="text-white font-medium text-sm mb-4">Services</h2>
              <ul className="space-y-3" role="list">
                {SERVICE_LINKS.map(({ label, sectionId }) => (
                  <li key={label}>
                    <button
                      onClick={() => scrollToSection(sectionId)}
                      className="text-[#888] text-xs hover:text-white transition-colors text-left bg-transparent border-none outline-none cursor-pointer"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Information navigation">
              <h2 className="text-white font-medium text-sm mb-4">Information</h2>
              <ul className="space-y-3" role="list">
                {INFORMATION_LINKS.map(({ label, sectionId }) => (
                  <li key={label}>
                    <button
                      onClick={() => scrollToSection(sectionId)}
                      className="text-[#888] text-xs hover:text-white transition-colors text-left bg-transparent border-none outline-none cursor-pointer"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <nav aria-label="Social media links" className="mb-10">
            <h2 className="text-white font-medium text-sm mb-4">Social</h2>
            <ul className="space-y-3" role="list">
              {SOCIAL_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Prographr on ${label} (opens in new tab)`}
                    className="text-[#888] text-xs hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ── Desktop View ── */}
        <div className="hidden md:flex items-start justify-between pb-5" aria-label="Footer navigation">
          <div className="flex-shrink-0">
            <img
              src="/green.svg"
              alt="Prographr logo"
              width={28}
              height={28}
              className="h-6 w-6 lg:h-7 lg:w-7 3xl:h-9 3xl:w-9 object-contain"
              decoding="async"
            />
          </div>

          <div className="flex gap-16 lg:gap-20 xl:gap-24 2xl:gap-28 3xl:gap-64">
            <nav aria-label="Services navigation">
              <NavColumn
                heading={{ label: "Services", className: "text-[#73AC56] text-[13px] lg:text-base 2xl:text-lg 3xl:text-xl" }}
                links={SERVICE_LINKS}
                onNavigate={scrollToSection}
                linkClassName="text-[#888] text-[12px] lg:text-sm 2xl:text-sm 3xl:text-md hover:text-white leading-snug"
              />
            </nav>

            <nav aria-label="Information navigation">
              <NavColumn
                heading={{ label: "Information", className: "text-[#73AC56] text-[13px] lg:text-base 2xl:text-lg 3xl:text-xl" }}
                links={INFORMATION_LINKS}
                onNavigate={scrollToSection}
                linkClassName="text-[#888] text-[12px] lg:text-sm 2xl:text-sm 3xl:text-md hover:text-white"
              />
            </nav>

            <nav aria-label="Social media links">
              <SocialColumn
                heading={{ label: "Social", className: "text-[#73AC56] text-[13px] lg:text-base 2xl:text-lg 3xl:text-xl" }}
                linkClassName="text-[#888] text-[12px] lg:text-sm 2xl:text-sm 3xl:text-md hover:text-white"
              />
            </nav>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-white/[8%] mt-10 md:mt-14 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#888] text-xs md:text-[11px] lg:text-sm text-center sm:text-left">
            <small>© {CURRENT_YEAR} All rights reserved Prographr.</small>
          </p>
          <p className="text-[#888] text-xs md:text-[11px] lg:text-sm">
            Developed by{" "}
            <span className="text-white hover:text-[#FF7431] transition-colors cursor-default">
              Prographr
            </span>
          </p>
        </div>

      </div>
    </footer>
  );
}