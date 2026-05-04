import { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Constants ────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: 1,
    title: "UI/UX\nDesign Solution",
    description:
      "We craft intuitive digital experiences that prioritize the user journey. By blending aesthetic elegance with seamless functionality, we transform complex ideas into engaging, high-performing interfaces.",
    tags: ["UI UX Design", "UX Research", "Wireframing", "Prototyping"],
    image:
      "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775296357/Untitled-1_vqxzaf.webp",
  },
  {
    id: 2,
    title: "Design Solution",
    description:
      "We build visual identities that resonate and endure. From logo creation to full brand guidelines, we ensure your business tells a compelling story that connects deeply with your target audience.",
    tags: ["Company Profile", "Print Design", "Visual Identity"],
    image:
      "https://res.cloudinary.com/dzi3u164c/image/upload/v1777798982/Cover_d7ceqt.webp",
  },
  {
    id: 3,
    title: "Web\nDevelopment",
    description:
      "We engineer robust, scalable websites tailored to your business goals. Utilizing the latest frameworks, we deliver fast, secure, and responsive web solutions that perform flawlessly across all devices.",
    tags: ["Frontend", "Backend", "MERN", "E-Commerce"],
    image:
      "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775296526/3_dugife.webp",
  },
  {
    id: 4,
    title: "Software\nDevelopment",
    description:
      "We develop custom software designed to solve your most critical operational challenges. Our agile approach ensures high-quality code, seamless integrations, and tools that grow alongside your enterprise.",
    tags: ["Custom CRM", "API Integration", "SaaS", "Cloud Solutions"],
    image:
      "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1775296564/4_ff0soq.webp",
  },
];

// Defined once at module level — never recreated on re-render.
const CARD_GAP = 20;

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * Card inner content — memoised so sticky-scroll position updates
 * don't re-render card contents that haven't changed.
 */
const CardInner = memo(function CardInner({ service }) {
  return (
    <div className="relative w-full h-full">
      <img
        src={service.image}
        alt={service.title.replace("\n", " ")}
        width={1280}
        height={720}
        loading="lazy"
        decoding="async"
        draggable="false"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(5,5,5,0.70) 40%, rgba(5,5,5,0.70) 48%, rgba(5,5,5,0.70) 56%, rgba(5,5,5,0.50) 85%, rgba(5,5,5,0.20) 100%)",
        }}
      />

      {/* Card content */}
      <div className="absolute inset-0 flex flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-32">
        <div className="mt-auto flex flex-col gap-3 sm:gap-5">
          <p className="text-white leading-relaxed opacity-85 text-[clamp(11px,2.8vw,13px)] sm:text-[clamp(12px,1.8vw,14px)] lg:text-[clamp(13px,1.05vw,14px)] 3xl:text-[clamp(20px,4vw,20px)]">
            {service.description}
          </p>

          <div
            aria-hidden="true"
            className="w-full"
            style={{ height: "1px", background: "rgba(255,255,255,0.22)" }}
          />

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <h3 className="text-white font-medium leading-[1.2] tracking-[0.02em] whitespace-pre-line text-[clamp(15px,4.5vw,15px)] sm:text-[clamp(17px,2.8vw,24px)] lg:text-[clamp(17px,1.9vw,27px)] 3xl:text-[clamp(28px,3vw,28px)]">
              {service.title}
            </h3>

            {/* Tags */}
            <ul
              aria-label="Service categories"
              className="flex flex-wrap gap-[10px] sm:gap-[14px] sm:justify-end mt-4 3xl:mt-0 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-0 list-none m-0 p-0"
            >
              {service.tags.map((tag) => (
                <li key={tag}>
                  <span className="text-white font-medium whitespace-nowrap px-3 py-1.5 rounded-full border border-white/30 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_2px_8px_rgba(0,0,0,0.18)] text-[clamp(7px,2vw,9px)] sm:text-[clamp(8px,1.2vw,11px)] lg:text-[clamp(9px,0.82vw,12px)] 3xl:text-[clamp(12px,2vw,14px)]">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function TechnologySection() {
  const containerRef = useRef(null);
  const headingRef   = useRef(null);

  // Heading scroll animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: "110%", skewY: 7, opacity: 0 },
        {
          y:        "0%",
          skewY:    0,
          opacity:  1,
          duration: 1.5,
          ease:     "expo.out",
          scrollTrigger: {
            trigger:       headingRef.current,
            start:         "top 95%",
            toggleActions: "play none none none",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="technology"
      ref={containerRef}
      aria-label="Technologies and services we offer"
      className="w-full bg-white relative 3xl:pb-32 2xl:pb-32 xl:pb-6"
    >
      {/* Heading */}
      <div className="md:px-10 3xl:px-[26rem] 1920:px-[18rem] 2xl:px-[10rem] xl:px-[5rem] lg:px-14 mx-auto px-6 pt-8 lg:pt-4 pb-10 lg:pb-14 overflow-hidden relative z-10 bg-white">
        <div className="overflow-hidden">
          <h2
            ref={headingRef}
            className="3xl:text-[clamp(52px,10vw,90px)] 2xl:text-[clamp(52px,10vw,80px)] xl:text-[clamp(45px,3.8vw,58px)] lg:text-[clamp(40px,3.8vw,58px)] md:text-[clamp(36px,3.8vw,58px)] text-[clamp(36px,3.8vw,58px)] font-semibold leading-[1.1] text-[#454348] tracking-wide"
          >
            Technology
            <br />
            We Use
          </h2>
        </div>
      </div>

      {/* Sticky card stack */}
      <div className="w-full">
        <div className="3xl:px-[26rem] 1920:px-[18rem] 2xl:px-[10rem] xl:px-[5rem] lg:px-[4rem] md:px-10 sm:px-6 px-4 mx-auto">
          {SERVICES.map((service, i) => (
            <article
              key={service.id}
              aria-label={service.title.replace("\n", " ")}
              style={{
                position:     "sticky",
                top:          "20px",
                zIndex:       i + 1,
                marginBottom: i < SERVICES.length - 1 ? `${CARD_GAP}px` : 0,
              }}
            >
              <div className="relative w-full overflow-hidden rounded-none h-[260px] sm:h-[320px] md:h-[380px] lg:h-[55vh] xl:h-[65vh] 2xl:h-[70vh] 3xl:h-[72vh]">
                <CardInner service={service} />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="pb-16 lg:pb-28" />
    </section>
  );
}