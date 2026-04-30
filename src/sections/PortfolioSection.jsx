import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dzi3u164c/image/upload/v1777454996/Print_-_design_dzx7tt.webp",
    tags: ["Flyer Design", "Rack Card", "App UI Design"],
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dzi3u164c/image/upload/v1777455365/Restaurant_zd1dme.webp",
    tags: ["UI UX Design", "Web Design", "Prototyping"],
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dzi3u164c/image/upload/v1777456522/web_ox490e_v4eapp.webp",
    tags: ["React JS", "Next JS", "MERN"],
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/dzi3u164c/image/upload/v1777455150/Cover_jw7lls.webp",
    tags: ["Brand Identity", "Brand Book", "Brand Manual"],
  },
  {
    id: 5,
    image: "https://res.cloudinary.com/dzi3u164c/image/upload/q_auto/f_auto/v1776599891/Presentation-15_afhcci.jpg",
    tags: ["Product Label", "Label Design", "Bottle Label"],
  },
];

const SLIDES = [...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS];

function useDesktopSizes() {
  const getSizes = () => {
    if (typeof window === "undefined") return { imgHeight: "500px", slideWidth: "600px" };
    const w = window.innerWidth;
    if (w >= 1920) return { imgHeight: "600px", slideWidth: "800px" };
    if (w >= 1536) return { imgHeight: "400px", slideWidth: "600px" };
    if (w >= 1280) return { imgHeight: "320px", slideWidth: "500px" };
    return { imgHeight: "350px", slideWidth: "450px" };
  };

  const [sizes, setSizes] = useState(getSizes);
  useEffect(() => {
    const onResize = () => setSizes(getSizes());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return sizes;
}

function PortfolioCard({ item, imgHeight }) {
  return (
    <div className="h-full flex flex-col group select-none">
      <div className="relative overflow-hidden shrink-0" style={{ height: imgHeight }}>
        <img
          src={item.image}
          alt={item.tags[0]}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient overlay — fades out on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:opacity-0 transition-opacity duration-500" />

        {/* Tags */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 flex-wrap transition-opacity duration-500 opacity-100 group-hover:opacity-0 pointer-events-none">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="
                text-[10px] 2xl:text-[13px]
                text-white font-medium
                whitespace-nowrap
                px-3 py-1.5
                rounded-full
                border border-white/30
                bg-white/10
                backdrop-blur-md
                shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_2px_8px_rgba(0,0,0,0.18)]
              "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const headingRef = useRef(null);
  const containerRef = useRef(null);
  const { imgHeight, slideWidth } = useDesktopSizes();
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== "undefined" ? window.innerWidth >= 1024 : true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    // Set hidden state immediately — before first paint — so there's no flash
    gsap.set(el, { y: 60, opacity: 0, willChange: "transform, opacity" });

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
        },
        onComplete: () => gsap.set(el, { willChange: "auto" }),
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const swiperProps = {
    modules: [Autoplay, FreeMode],
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: true,
    speed: 8000,
    allowTouchMove: true,
    freeMode: { enabled: true, momentum: false },
    autoplay: { delay: 0, disableOnInteraction: false },
    className: "seamless-swiper",
  };

  // ── MOBILE ──────────────────────────────────────────────────────────
  if (!isDesktop) {
    return (
      <section id="portfolio" ref={containerRef} className="bg-white w-full overflow-hidden py-12">
        <style dangerouslySetInnerHTML={{ __html: `.seamless-swiper .swiper-wrapper { transition-timing-function: linear !important; }` }} />

        <div className="px-5 sm:px-8 mb-8 overflow-hidden">
          <div className="pb-2">
            <h2
              ref={headingRef}
              className="text-[clamp(28px,10vw,40px)] font-bold leading-[1.15] text-[#454348] tracking-wide"
            >
              Our Recent
              <br />
              Work
            </h2>
          </div>
        </div>

        <Swiper {...swiperProps}>
          {SLIDES.map((item, i) => (
            <SwiperSlide key={`m-${item.id}-${i}`} style={{ width: "80vw" }}>
              <PortfolioCard item={item} imgHeight="260px" />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
  }

  // ── DESKTOP ──────────────────────────────────────────────────────────
  return (
    <section id="portfolio" ref={containerRef} className="bg-white w-full overflow-hidden 3xl:py-32 2xl:py-24 py-16">
      <style dangerouslySetInnerHTML={{ __html: `.seamless-swiper .swiper-wrapper { transition-timing-function: linear !important; }` }} />

      {/* Heading */}
      <div className="w-full px-3 md:px-[2.5rem] 3xl:px-[26rem] 2xl:px-[10rem] xl:px-[5rem] lg:px-[4rem] mb-16">
        <div className="shrink-0 self-start 3xl:w-[500px] 2xl:w-[380px] xl:w-[250px] lg:w-[200px]">
          <h2 ref={headingRef} className="3xl:text-[clamp(52px,10vw,90px)] 2xl:text-[clamp(52px,10vw,80px)] xl:text-[clamp(45px,3.8vw,58px)] lg:text-[clamp(40px,3.8vw,58px)] md:text-[clamp(36px,3.8vw,58px)] font-bold text-[#454348] leading-[1.2] tracking-wide">
            Our Recent<br />Work
          </h2>
        </div>
      </div>

      <div className="w-full">
        <Swiper {...swiperProps}>
          {SLIDES.map((item, i) => (
            <SwiperSlide key={`d-${item.id}-${i}`} style={{ width: slideWidth }}>
              <PortfolioCard item={item} imgHeight={imgHeight} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}