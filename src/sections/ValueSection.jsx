import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    id: 1,
    label: "Results-driven design",
    image:
      "https://res.cloudinary.com/dzi3u164c/image/upload/v1777194965/photo-1581291518857-4e27b48ff24e_vuw4gu.avif",
  },
  {
    id: 2,
    label: "Brands worth remembering",
    image:
      "https://res.cloudinary.com/dzi3u164c/image/upload/v1777195001/photo-1561070791-2526d30994b5_fl3da0.avif",
  },

  {
    id: 3,
    label: "Websites that scale",
    image:
      "https://res.cloudinary.com/dzi3u164c/image/upload/v1777195037/photo-1547658719-da2b51169166_jdz38n.avif",
  },
  {
    id: 4,
    label: "Delivered on time",
    image:
      "https://res.cloudinary.com/dzi3u164c/image/upload/v1777195081/photo-1506784983877-45594efa4cbe_soabyp.avif",
  },
  {
    id: 5,
    label: "Your growth, our mission",
    image:
      "https://res.cloudinary.com/dzi3u164c/image/upload/v1777195110/photo-1543286386-713bdd548da4_wwtocz.avif",
  },
];

const ArrowIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <path
      d="M7 17L17 7M17 7H7M17 7V17"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IMG_W = 520;
const IMG_H = 220;

function ValueItem({
  item,
  setImgRef,
  setMobileImgRef,
  setArrowRef,
  onEnter,
  onLeave,
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative flex items-center justify-between gap-8 py-3 lg:py-16 cursor-pointer border-b border-black/10 last:border-b-0"
    >
      <span className="text-[#2A2A2C] transition-colors duration-300 group-hover:text-black/50 select-none shrink-0 flex-1 min-w-0 3xl:text-[clamp(30px,2.4vw,24px)] 2xl:text-[clamp(16px,2.4vw,22px)] xl:text-[clamp(16px,2.4vw,22px)] lg:text-[clamp(16px,2.4vw,20px)]">
        {item.label}
      </span>

      {/* Desktop hover image */}
      <div
        ref={setImgRef}
        className="absolute pointer-events-none overflow-hidden z-10 hidden lg:block"
        style={{
          width: `${IMG_W}px`,
          height: `${IMG_H}px`,
          right: "clamp(60px, 10vw, 160px)",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <img
          src={item.image}
          alt={item.label}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>

      {/* Mobile thumbnail */}
      <div
        ref={setMobileImgRef}
        className="mobile-thumb shrink-0 overflow-hidden lg:hidden"
        style={{
          width: "120px",
          height: "80px",
          opacity: 0,
          transform: "translateY(6px)",
        }}
      >
        <img
          src={item.image}
          alt={item.label}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>

      <span
        ref={setArrowRef}
        className="text-black/30 group-hover:text-black transition-colors duration-300 shrink-0"
      >
        <ArrowIcon />
      </span>
    </div>
  );
}

export default function ValueSection() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const listRef = useRef(null);
  const imgNodes = useRef([]);
  const mobileImgNodes = useRef([]);
  const arrowNodes = useRef([]);
  const activeIdx = useRef(0);
  const tls = useRef([]);

  const showImage = useCallback((idx) => {
    if (tls.current[idx]) tls.current[idx].kill();
    tls.current[idx] = gsap.to(imgNodes.current[idx], {
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      opacity: 1,
      duration: 0.55,
      ease: "power3.out",
    });
  }, []);

  const hideImage = useCallback((idx) => {
    if (tls.current[idx]) tls.current[idx].kill();
    tls.current[idx] = gsap.to(imgNodes.current[idx], {
      clipPath: "inset(100% 0% 0% 0%)",
      scale: 1.08,
      opacity: 0,
      duration: 0.4,
      ease: "power3.in",
    });
  }, []);

  const nudgeArrow = useCallback((idx, enter) => {
    gsap.to(arrowNodes.current[idx], {
      x: enter ? 4 : 0,
      y: enter ? -4 : 0,
      duration: enter ? 0.25 : 0.2,
      ease: enter ? "power2.out" : "power2.in",
    });
  }, []);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: "110%", skewY: 7, opacity: 0 },
        {
          y: "0%",
          skewY: 0,
          opacity: 1,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.from(listRef.current.children, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      if (!isDesktop) {
        gsap.to(mobileImgNodes.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }
    }, containerRef);

    ITEMS.forEach((_, i) => {
      if (isDesktop) {
        gsap.set(imgNodes.current[i], {
          clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
          scale: i === 0 ? 1 : 1.08,
          opacity: i === 0 ? 1 : 0,
        });
      }
      gsap.set(arrowNodes.current[i], { x: 0, y: 0 });
    });

    return () => ctx.revert();
  }, []);

  const handleEnter = useCallback(
    (idx) => {
      if (window.innerWidth < 1024) return;
      const prev = activeIdx.current;
      if (prev === idx) return;
      hideImage(prev);
      nudgeArrow(prev, false);
      showImage(idx);
      nudgeArrow(idx, true);
      activeIdx.current = idx;
    },
    [hideImage, showImage, nudgeArrow],
  );

  const handleLeave = useCallback(
    (idx) => {
      if (window.innerWidth < 1024) return;
      nudgeArrow(idx, false);
    },
    [nudgeArrow],
  );

  const handleListLeave = useCallback(() => {
    if (window.innerWidth < 1024) return;
    const prev = activeIdx.current;
    if (prev !== 0) {
      hideImage(prev);
      nudgeArrow(prev, false);
      showImage(0);
      activeIdx.current = 0;
    }
  }, [hideImage, showImage, nudgeArrow]);

  return (
    <section
      ref={containerRef}
      className="w-full bg-white"
      style={{ position: "relative" }}
    >
      <div className="md:py-12 py-7 3xl:py-44 2xl:py-16 xl:py-16 lg:py-16 px-6 md:px-10 3xl:px-[26rem] 1920:px-[18rem] 2xl:px-[10rem] xl:px-[5rem] lg:px-[4rem]">
        <div className="overflow-hidden pb-20">
          <h2
            ref={headingRef}
            className="3xl:text-[clamp(52px,10vw,90px)] 2xl:text-[clamp(52px,10vw,80px)] xl:text-[clamp(45px,3.8vw,58px)] lg:text-[clamp(40px,3.8vw,58px)] md:text-[clamp(36px,3.8vw,58px)] text-[clamp(28px,10vw,40px)] font-semibold leading-[1.1] text-[#454348] tracking-wide"
          >
            What value
            <br />
            are you
            <br />
            getting from
            <br />
            us?
          </h2>
        </div>

        <div
          ref={listRef}
          className="lg:border-t border-black/10"
          onMouseLeave={handleListLeave}
        >
          {ITEMS.map((item, i) => (
            <ValueItem
              key={item.id}
              item={item}
              index={i}
              setImgRef={(el) => {
                imgNodes.current[i] = el;
              }}
              setMobileImgRef={(el) => {
                mobileImgNodes.current[i] = el;
              }}
              setArrowRef={(el) => {
                arrowNodes.current[i] = el;
              }}
              onEnter={() => handleEnter(i)}
              onLeave={() => handleLeave(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
