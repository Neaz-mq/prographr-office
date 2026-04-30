import { useNavigate, useLocation } from "react-router-dom";

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/prographr.page/", label: "Facebook" },
  { href: "https://id.pinterest.com/prographr/", label: "Pinterest" },
  { href: null, label: "Instagram" },
  { href: "https://www.linkedin.com/company/prographr/", label: "LinkedIn" },
 { href: null, label: "Twitter" },
];

function useSectionScroll() {
  const navigate = useNavigate();
  const location = useLocation();

  return (sectionId) => {
    const doScroll = () => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: 0, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      setTimeout(doScroll, 50);
    }
  };
}

export default function Footer() {
  const scrollToSection = useSectionScroll();

  const serviceLinks = [
    "Graphic Design",
    "Brand Design",
    "Web Development",
    "Web Design",
    "PowerPoint Design",
  ];

  const informationLinks = [
    { label: "FAQ", sectionId: "faq" },
    { label: "Support", sectionId: "contact" },
  ];

  return (
    <footer className="bg-[#2A2A2C]">
      <div className="mx-auto px-6 md:px-10 lg:px-[4rem] xl:px-[5rem] 2xl:px-[10rem] 3xl:px-[26rem] pt-12 md:pt-16 pb-0">
        {/* ── Mobile View ── */}
        <div className="md:hidden">
          <div className="flex items-center gap-2 mb-10">
            <img
              src="/logo.webp"
              alt="Prographr"
              className="h-7 w-7 object-contain"
            />
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-white font-medium text-sm mb-4">Services</h4>
              <ul className="space-y-3">
                {serviceLinks.map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => scrollToSection("services")}
                      className="text-[#888] text-xs hover:text-white transition-colors text-left bg-transparent border-none outline-none cursor-pointer"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium text-sm mb-4">
                Information
              </h4>
              <ul className="space-y-3">
                {informationLinks.map(({ label, sectionId }) => (
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
            </div>
          </div>

          <div className="mb-10">
            <h4 className="text-white font-medium text-sm mb-4">Social</h4>
            <ul className="space-y-3">
              {SOCIAL_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#888] text-xs hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Desktop View: Flex Layout ── */}
        <div className="hidden md:flex items-start justify-between">
          {/* Logo — Far Left */}
          <div className="flex-shrink-0">
            <img
              src="/logo.webp"
              alt="Prographr"
              className="h-6 w-6 lg:h-7 lg:w-7 3xl:h-9 3xl:w-9 object-contain"
            />
          </div>

          {/* Nav Columns — Grouped to the Right */}
          <div className="flex gap-16 lg:gap-20 xl:gap-24 2xl:gap-28 3xl:gap-64">
            {/* Service */}
            <div className="flex flex-col">
              <h4 className="text-[#73AC56] font-medium text-[13px] lg:text-base 2xl:text-lg 3xl:text-xl mb-10">
                Services
              </h4>
              <ul className="space-y-3">
                {serviceLinks.map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => scrollToSection("services")}
                      className="text-[#888] text-[12px] lg:text-sm 2xl:text-sm 3xl:text-lg hover:text-white transition-colors leading-snug text-left bg-transparent border-none outline-none cursor-pointer"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div className="flex flex-col">
              <h4 className="text-[#73AC56] font-medium text-[13px] lg:text-base 2xl:text-lg 3xl:text-xl mb-10">
                Information
              </h4>
              <ul className="space-y-3">
                {informationLinks.map(({ label, sectionId }) => (
                  <li key={label}>
                    <button
                      onClick={() => scrollToSection(sectionId)}
                      className="text-[#888] text-[12px] lg:text-sm 2xl:text-sm 3xl:text-lg hover:text-white transition-colors text-left bg-transparent border-none outline-none cursor-pointer"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div className="flex flex-col">
              <h4 className="text-[#73AC56] font-medium text-[13px] lg:text-base 2xl:text-lg 3xl:text-xl mb-10">
                Social
              </h4>
              <ul className="space-y-3">
                {SOCIAL_LINKS.map(({ href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#888] text-[12px] lg:text-sm 2xl:text-sm 3xl:text-lg hover:text-white transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-white/[8%] mt-10 md:mt-14 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#888] text-xs md:text-[11px] lg:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} All rights reserved Prographr.
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
