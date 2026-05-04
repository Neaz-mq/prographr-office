import { useEffect, useRef, useState, memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

// ─── Constants ────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: 1,
    icon: <img src="/Asset 10.svg" alt="UI/UX design icon" width={44} height={44} />,
    title: ["Creative &", "Brand Design"],
    desc: "From compelling graphics to memorable logos, we shape visual identities that communicate who you are — consistently across every platform and format.",
  },
  {
    id: 2,
    icon: <img src="/Asset 11.svg" alt="Web development icon" width={44} height={44} />,
    title: ["Web Design &", "Development"],
    desc: "We design and build fast, responsive websites that look sharp and perform even sharper — from landing pages to full web applications.",
  },
  {
    id: 3,
    icon: <img src="/Asset 12.svg" alt="Presentation design icon" width={44} height={44} />,
    title: ["Presentation", "Design"],
    desc: "We turn your ideas into polished, on-brand decks that command attention — whether it's a client pitch, investor deck, or internal report.",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    thumbnail: "https://res.cloudinary.com/dzi3u164c/image/upload/v1777105532/Chantel_Gorton_in3lxh.png",
    name: "Chantel Gorton",
    role: "WorkRightNW",
    review:
      "We have been working with Prographr for over 5 years now and has been instrumental in our branding, packaging and all creative design projects. They created our logos, marketing and branding assets, retail product packaging and product photo editing for retail and online sales. They are easy to work with and always available, has very strong work ethic and integrity which is critical when it comes to consulting and freelance services. Their output are of great quality and exceeds our expectations.",
  },
  {
    id: 2,
    thumbnail: "https://res.cloudinary.com/dzi3u164c/image/upload/v1777105580/Suresh_nvvz9n.png",
    name: "Suresh Kanthaswamy",
    role: "Envelor Inc",
    review:
      "We have been using Prographr for over 5 years now and has been instrumental in our branding, packaging and all creative design projects. They are always available, has very strong work ethic and integrity. Great quality and exceeds our expectations.",
  },
  {
    id: 3,
    thumbnail: "https://res.cloudinary.com/dzi3u164c/image/upload/v1777105468/blue-rents_1_ygjwjr.png",
    name: "Charles A. Cameron",
    role: "Real Estate Developer",
    review:
      "Doing real estate business without business card was difficult for me. I found a excellent business card template here and modified by the design owner. The designer did a fantastic job for me. Thanks...",
  },
  {
    id: 4,
    thumbnail: "https://res.cloudinary.com/dzi3u164c/image/upload/v1777105560/Dr._Rado-Kotorov-CEO_zpfry2.webp",
    name: "Rado Kotorov",
    role: "Storied Data Inc.",
    review: "We work for a long time together. And it is most of the time outstanding.",
  },
];

// Pre-computed once at module load — never recreated on re-render.
const SLIDES = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

// Stable object — defined outside component so Swiper never gets a new prop reference.
const SWIPER_BASE_PROPS = {
  modules:         [Autoplay, FreeMode],
  slidesPerView:   "auto",
  spaceBetween:    36,
  loop:            true,
  allowTouchMove:  true,
  freeMode:        { enabled: true, momentum: false },
  autoplay:        { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true },
  style:           { margin: 0 },
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Single rAF-throttled resize listener — replaces the two separate
 * listeners that were firing simultaneously on every resize event.
 */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
  );
  const rafRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setIsDesktop(window.innerWidth >= 1024);
        rafRef.current = null;
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return isDesktop;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * Testimonial card — memoised so Swiper loop re-renders don't force
 * all visible cards to re-render on unrelated state changes.
 */
const TestimonialCard = memo(function TestimonialCard({ item }) {
  return (
    <figure className="relative overflow-hidden w-full h-[300px] sm:h-[320px] md:h-[320px] lg:h-[400px] xl:h-[440px] 2xl:h-[500px] 3xl:h-[720px] m-0">
      <img
        src={item.thumbnail}
        alt={`${item.name} — ${item.role}`}
        width={600}
        height={720}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.04) 20%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.88) 100%)",
        }}
      />

      <figcaption className="absolute bottom-0 left-0 right-0 px-10 pb-10 flex flex-col justify-end">
        <p className="text-[#F7F7F8] font-semibold 3xl:text-[30px] 2xl:text-[20px] xl:text-[22px] lg:text-[18px] md:text-[15px] text-[14px] leading-tight tracking-[-0.3px]">
          {item.name}
        </p>
        <p className="3xl:text-[18px] 2xl:text-[13px] xl:text-[16px] lg:text-[12px] md:text-[11px] text-[10px] font-medium mt-[3px] mb-3 text-white/[80%]">
          {item.role}
        </p>
        <blockquote
          className="3xl:text-[15px] 2xl:text-[13px] xl:text-[14px] lg:text-[11px] md:text-[10px] text-[9px] leading-[1.65] line-clamp-3 text-white/60 m-0 p-0"
          style={{ minHeight: "calc(3 * 1.65em)" }}
        >
          {item.review}
        </blockquote>
      </figcaption>
    </figure>
  );
});

/**
 * Service card — memoised to avoid re-renders when only the Swiper state changes.
 */
const ServiceCard = memo(function ServiceCard({ icon, title, desc }) {
  return (
    <article className="flex flex-col h-full bg-[#454348] px-8 py-10 lg:px-10 lg:py-12 xl:px-12 xl:py-14 2xl:px-14 2xl:py-16 3xl:px-10 3xl:py-10 gap-7 3xl:gap-12 3xl:min-h-[460px]">
      <div
        aria-hidden="true"
        className="w-12 h-12 flex items-center justify-center shrink-0"
      >
        {icon}
      </div>

      <h3
        className="text-white font-medium leading-[1.40] tracking-[0.01em] shrink-0
          3xl:text-[clamp(28px,6vw,28px)]
          2xl:text-[clamp(20px,1.6vw,28px)]
          xl:text-[clamp(18px,1.4vw,24px)]
          lg:text-[20px]
          text-[18px]"
      >
        {title[0]}
        <br />
        {title[1]}
      </h3>

      <p
        className="leading-[1.7] text-[#B2B2B2]
          3xl:text-[19px]
          2xl:text-[14px]
          xl:text-[13px]
          lg:text-[12px]
          text-[12px]"
      >
        {desc}
      </p>
    </article>
  );
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function Testimonials() {
  const containerRef      = useRef(null);
  const builtHeadingRef   = useRef(null);
  const successHeadingRef = useRef(null);

  const isDesktop = useIsDesktop();

  // Heading scroll animations
  useEffect(() => {
    const targets = [builtHeadingRef.current, successHeadingRef.current].filter(Boolean);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      targets.forEach((el) => {
        gsap.fromTo(
          el,
          { y: "110%", skewY: 7, opacity: 0 },
          {
            y:       "0%",
            skewY:   0,
            opacity: 1,
            duration: 1.5,
            ease:    "expo.out",
            scrollTrigger: {
              trigger:       el,
              start:         "top 95%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isDesktop]);

  // ── Mobile ──────────────────────────────────────────────────────────
  if (!isDesktop) {
    return (
      <section
        id="testimonials"
        ref={containerRef}
        aria-label="Our services and client testimonials"
        className="w-full bg-white overflow-hidden md:pt-20 pt-0"
      >
        <div className="bg-[#2A2A2C] pb-[300px]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-10">

            {/* Services heading */}
            <div className="flex items-end justify-between gap-4">
              <div className="overflow-hidden">
                <h2
                  ref={builtHeadingRef}
                  className="font-extrabold leading-[1.12] text-white tracking-[-0.8px]"
                  style={{ fontSize: "clamp(28px,10vw,40px)" }}
                >
                  Built to Scale:
                  <br />
                  Solutions for
                  <br />
                  Your Evolution
                </h2>
              </div>
              <p
                aria-hidden="true"
                className="text-right leading-relaxed shrink-0 text-[12px] pb-1 text-white/[38%]"
              >
                Tailored Services
                <br />
                for Every Stage
                <br />
                of Your Growth
              </p>
            </div>

            {/* Service cards */}
            <ul className="flex flex-col gap-3 mt-8 list-none m-0 p-0">
              {SERVICES.map(({ id, icon, title, desc }) => (
                <li key={id}>
                  <article className="flex flex-col px-5 py-8 gap-6 bg-[#454348]">
                    <div aria-hidden="true">{icon}</div>
                    <h3 className="text-[#F7F7F8] font-bold text-[14px] leading-[1.35]">
                      {title[0]}
                      <br />
                      {title[1]}
                    </h3>
                    <p className="text-[11px] leading-relaxed text-white/[50%]">{desc}</p>
                  </article>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonials heading */}
          <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-6">
            <div className="flex items-end justify-between gap-4">
              <div className="overflow-hidden">
                <h2
                  ref={successHeadingRef}
                  className="font-extrabold leading-[1.12] text-[#F7F7F8] tracking-[-0.8px]"
                  style={{ fontSize: "clamp(28px,10vw,40px)" }}
                >
                  Success Stories
                  <br />
                  That Inspire Us
                </h2>
              </div>
              <button
                type="button"
                className="shrink-0 text-white font-semibold uppercase transition-colors duration-200 bg-[#73AC56] hover:text-black text-[8px] tracking-[1.8px] px-3 py-[7px] self-end mb-1"
              >
                Client Stories
              </button>
            </div>
          </div>
        </div>

        {/* Testimonial slider */}
        <div className="-mt-[250px]">
          <Swiper {...SWIPER_BASE_PROPS} speed={3500}>
            {SLIDES.map((item, i) => (
              <SwiperSlide
                key={`m-${item.id}-${i}`}
                style={{ width: "clamp(200px, 62vw, 260px)" }}
              >
                <TestimonialCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="pb-14" />
      </section>
    );
  }

  // ── Desktop ──────────────────────────────────────────────────────────
  return (
    <section
      id="testimonials"
      ref={containerRef}
      aria-label="Our services and client testimonials"
      className="w-full bg-white overflow-hidden"
    >
      <div className="bg-[#2A2A2C] pb-[400px]">
        <div className="3xl:pt-64 2xl:pt-48 xl:pt-36 lg:pt-28 pt-20 pb-14 px-3 md:px-10 3xl:px-[26rem] 1920:px-[18rem] 2xl:px-[10rem] xl:px-[5rem] lg:px-[4rem]">

          {/* Services heading */}
          <div className="relative">
            <div className="overflow-hidden">
              <h2
                ref={builtHeadingRef}
                className="font-medium leading-[1.2] text-[#F7F7F8] 3xl:max-w-[1260px] max-w-[760px] 3xl:text-[clamp(52px,10vw,90px)] 2xl:text-[clamp(52px,10vw,80px)] xl:text-[clamp(45px,3.8vw,58px)] lg:text-[clamp(40px,3.8vw,58px)] md:text-[clamp(36px,3.8vw,58px)] tracking-wide"
              >
                Built to Scale: Solutions
                <br />
                for Your Evolution
              </h2>
            </div>
            <p
              aria-hidden="true"
              className="absolute bottom-0 3xl:top-80 2xl:top-60 xl:top-40 lg:top-40 right-0 text-md 3xl:text-xl text-right leading-relaxed text-[#B2B2B2]"
            >
              Tailored Services
              <br />
              for Every Stage of Your Growth
            </p>
          </div>

          {/* Service cards */}
          <ul className="grid grid-cols-3 3xl:mt-72 2xl:mt-48 xl:mt-48 lg:mt-48 gap-6 3xl:gap-10 list-none m-0 p-0 items-stretch">
            {SERVICES.map(({ id, icon, title, desc }) => (
              <li key={id} className="h-full">
                <ServiceCard icon={icon} title={title} desc={desc} />
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonials heading */}
        <div className="px-3 md:px-10 3xl:px-[26rem] 1920:px-[18rem] 2xl:px-[10rem] xl:px-20 lg:px-14">
          <div className="flex items-end justify-between pt-32 py-12">
            <div className="overflow-hidden">
              <h2
                ref={successHeadingRef}
                className="font-medium leading-[1.2] text-white 3xl:max-w-[1260px] max-w-[760px] 3xl:text-[clamp(52px,10vw,90px)] 2xl:text-[clamp(52px,10vw,80px)] xl:text-[clamp(45px,3.8vw,58px)] lg:text-[clamp(40px,3.8vw,58px)] md:text-[clamp(36px,3.8vw,58px)] tracking-wide"
              >
                Success Stories That
                <br />
                Inspire Us
              </h2>
            </div>
            <button
              type="button"
              className="text-white font-semibold uppercase transition-colors duration-200 self-end mb-1 3xl:text-[15px] 2xl:text-[13px] xl:text-[11px] lg:text-[11px] tracking-[2px] text-[9px] px-6 py-[10px] bg-[#73AC56]"
            >
              Client Stories
            </button>
          </div>
        </div>
      </div>

      {/* Testimonial slider */}
      <div className="-mt-[320px]">
        <Swiper {...SWIPER_BASE_PROPS} speed={4500}>
          {SLIDES.map((item, i) => (
            <SwiperSlide
              key={`d-${item.id}-${i}`}
              className="!w-[330px] sm:!w-[320px] md:!w-[320px] lg:!w-[380px] xl:!w-[370px] 2xl:!w-[420px] 3xl:!w-[600px]"
            >
              <TestimonialCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="2xl:mb-20 xl:mb-14 lg:mb-12" />
    </section>
  );
}