import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const headingLines = [
  "We Help Businesses Stand Out",
  "With Modern, Creative, and ",
  "Impactful Design Solutions"
];

function CharRevealHeading({ triggerRef, className = "", charClassName = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const trigger = triggerRef?.current ?? container;
    if (!container || !trigger) return;

    const chars = Array.from(container.querySelectorAll(".char-span"));
    if (!chars.length) return;

    gsap.set(chars, { color: "#c0c0c0" });

    const ctx = gsap.context(() => {
      gsap.to(chars, {
        color: "#454348",
        stagger: { each: 0.015, from: "start" },
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top 75%",
          end: "bottom 30%",
          scrub: 0.6,
        },
      });
    });

    return () => ctx.revert();
  }, [triggerRef]);

  return (
    <div ref={containerRef} className={`flex flex-col gap-0 ${className}`}>
      {headingLines.map((line, li) => (
        <p
          key={li}
          className="3xl:leading-[1.2] 2xl:leading-[1.2] xl:leading-[1.3] lg:leading-[1.3] leading-[1.3] tracking-[0.01em]"
          aria-label={line}
        >
          {line.split("").map((char, ci) => (
            <span
              key={`${li}-${ci}`}
              className={`char-span inline-block ${charClassName}`}
              style={{
                color: "#c0c0c0",
                whiteSpace: char === " " ? "pre" : "normal",
              }}
            >
              {char}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

function CharRevealHeadingMobile({ className = "", charClassName = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = Array.from(container.querySelectorAll(".char-span-m"));
    if (!chars.length) return;

    gsap.set(chars, { color: "#c0c0c0" });

    const ctx = gsap.context(() => {
      gsap.to(chars, {
        color: "#454348",
        stagger: { each: 0.018, from: "start" },
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 82%",
          end: "bottom 20%",
          scrub: 0.6,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`flex flex-col gap-0 ${className}`}>
      {headingLines.map((line, li) => (
        <p
          key={li}
          className="leading-[1.5] tracking-[0.01em]"
          aria-label={line}
        >
          {line.split("").map((char, ci) => (
            <span
              key={`${li}-${ci}`}
              className={`char-span-m inline-block ${charClassName}`}
              style={{
                color: "#c0c0c0",
                whiteSpace: char === " " ? "pre" : "normal",
              }}
            >
              {char}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

export default function AboutSection() {
  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const cardsWrapRef = useRef(null);
  const spacerRef = useRef(null);
  const headingRef = useRef(null);

  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
  );

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    const cardsWrap = cardsWrapRef.current;
    const spacer = spacerRef.current;
    if (!wrapper || !section || !cardsWrap || !spacer) return;

    const getScrollAmount = () =>
      -(cardsWrap.scrollWidth - cardsWrap.parentElement.clientWidth);

    const updateSpacer = () => {
      spacer.style.height = `${Math.abs(getScrollAmount())}px`;
    };

   const ctx = gsap.context(() => {
  gsap.to(cardsWrap, {
    x: () => getScrollAmount(),
    ease: "none",
    scrollTrigger: {
      trigger: wrapper,
      pin: section,
      pinSpacing: false,
      start: "top top",
      end: () => `+=${Math.abs(getScrollAmount())}`,
      scrub: 1.2,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      onRefresh: (self) => {
        gsap.set(cardsWrap, { x: 0 });
        updateSpacer();
        self.update();
      },
    },
  });
}, wrapper);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh(true);
      updateSpacer();
    }, 300);

    const handleResize = () => {
      gsap.set(cardsWrap, { x: 0 });
      ScrollTrigger.refresh(true);
      updateSpacer();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      // Release pin cleanly so Portfolio section composites without flash
      ScrollTrigger.refresh();
    };
  }, [isDesktop]);

  if (!isDesktop) {
    return (
      <section id="about" className="bg-white w-full">
        <div
          ref={headingRef}
          className="max-w-7xl mx-auto px-5 sm:px-8 w-full pt-4 pb-8"
        >
          <div className="flex flex-row items-start justify-between gap-4 md:pt-8 pt-5">
            <div className="shrink-0">
              <h2 className="text-[clamp(28px,10vw,40px)] font-bold text-[#454348] leading-[1.05] tracking-[-1px]">
                About
                <br />
                Us
              </h2>
            </div>
            <div className="flex-1 pb-1 flex justify-end items-end">
              <CharRevealHeadingMobile charClassName="text-[clamp(13px,3.5vw,20px)] font-normal" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full py-8 flex flex-col gap-8">
          <div
            className="w-full overflow-hidden relative"
            style={{ height: "clamp(260px, 42vw, 480px)" }}
          >
            <img
              src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774865116/Asset_1_qgly6y.webp"
              alt="About Prographr"
              className="w-full h-full object-cover object-center"
            />
            <div
              className="absolute bottom-6 left-4 w-[92%] px-5 z-10 flex items-center"
              style={{
                backgroundColor: "rgba(100, 138, 90, 0.88)",
                height: "clamp(60px, 14vw, 90px)",
              }}
            >
              <p className="text-white md:text-[clamp(11px,2.8vw,12px)] text-[clamp(9px,2.8vw,9px)] md:leading-[1.6] leading-[1.3]">
                Our agency specializes in a wide range of design services that
                help brands stand out in a competitive market. From flyer design
                to full brand identity, we create meaningful visuals that drive
                results.
              </p>
            </div>
          </div>

          <div className="w-full overflow-hidden px-0">
            <div
              className="relative"
              style={{ height: "clamp(220px, 52vw, 340px)" }}
            >
              <div className="w-full h-full overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774967188/photo-1556761175-b413da4baf72_iqjccn.avif"
                  alt="We have an expert team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute bottom-6 left-4 w-[55%] px-5 z-10 flex items-center"
                style={{
                  backgroundColor: "rgba(114, 163, 100, 0.9)",
                  height: "clamp(52px, 12vw, 72px)",
                }}
              >
                <p className="text-white md:text-[clamp(13px,2.8vw,13px)] text-[clamp(10px,2.8vw,10px)] font-normal tracking-wide">
                  We have an expert team
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="text-[clamp(24px,5.5vw,36px)] font-medium text-[#0a0a0a] leading-[1.25]">
              What makes our agency different
            </h3>
            <div className="flex items-stretch gap-3 sm:gap-5 mt-2">
              <div className="flex flex-col justify-center gap-1 flex-1">
                <div className="text-[clamp(32px,8vw,44px)] font-semibold leading-none tracking-[-1px] text-[#73AC56]">
                  30+
                </div>
                <div className="text-[11px] leading-[1.5] text-[#555]">
                  Company with Work Experiences
                </div>
              </div>
              <div className="flex-[2] bg-[#182F33] px-4 sm:px-8 py-6 flex gap-5 sm:gap-24 items-center justify-center">
                <div>
                  <div className="text-[clamp(26px,7vw,40px)] font-semibold leading-none mb-1 tracking-[-1px] text-[#73AC56]">
                    1K+
                  </div>
                  <div className="text-[11px] leading-[1.5] text-white">
                    Job Completed
                  </div>
                </div>
                <div>
                  <div className="text-[clamp(26px,7vw,40px)] font-semibold leading-none mb-1 tracking-[-1px] text-[#73AC56]">
                    100%
                  </div>
                  <div className="text-[11px] leading-[1.5] text-white">
                    Satisfied Client
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="w-full overflow-hidden relative border border-[#efefef]"
            style={{ height: "clamp(240px, 55vw, 320px)" }}
          >
            <img
              src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774931324/Asset_3_raki8b.webp"
              alt="lightning"
              className="absolute inset-0 w-full h-full object-cover object-right"
            />
            <div className="relative z-10 flex flex-col justify-between h-full p-7 sm:p-10">
              <h3 className="text-[clamp(22px,5.5vw,34px)] font-extrabold text-white leading-[1.15] tracking-[-0.5px] max-w-[65%]">
                Scroll and enjoy a new experience
              </h3>
              <button className="self-start inline-flex items-center gap-2 px-5 py-[9px] bg-transparent border border-white/30 rounded-full text-white/70 text-[11px] cursor-pointer transition-all hover:bg-white/10 hover:text-white">
                Again let's go →
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div id="about" ref={wrapperRef}>
      <section
        ref={sectionRef}
        className="bg-white w-full overflow-hidden flex flex-col"
        // Isolate compositing layer so unpin doesn't flash the next section
        style={{ transform: "translateZ(0)", willChange: "transform" }}
      >
        <div
          ref={headingRef}
          className="w-full shrink-0 px-3 md:px-[2.5rem] 3xl:px-[26rem] 2xl:px-[10rem] xl:px-[5rem] lg:px-[4rem] 3xl:pt-6 2xl:pt-16 xl:pt-16 lg:pt-16 3xl:pb-32 2xl:pb-20 xl:pb-16 lg:pb-16 pb-5"
        >
          <div className="flex items-end 3xl:gap-12 2xl:gap-10 xl:gap-8 lg:gap-6">
            <div className="shrink-0 self-start 3xl:w-[500px] 2xl:w-[380px] xl:w-[150px] lg:w-[130px]">
              <h2 className="3xl:text-[clamp(52px,10vw,90px)] 2xl:text-[clamp(52px,10vw,80px)] xl:text-[clamp(45px,3.8vw,58px)] lg:text-[clamp(40px,3.8vw,58px)] md:text-[clamp(36px,3.8vw,58px)] font-bold text-[#454348] leading-[1.0] tracking-wide">
                About Us
              </h2>
            </div>
            <div className="flex-1 pb-1 flex justify-end">
              <CharRevealHeading
                triggerRef={headingRef}
                charClassName="
                  3xl:text-[clamp(28px,10vw,38px)]
                  2xl:text-[clamp(22px,1.9vw,34px)]
                  xl:text-[clamp(18px,1.6vw,26px)]
                  lg:text-[clamp(16px,1.5vw,22px)]
                  whitespace-nowrap font-light tracking-[-0.5px]
                "
              />
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden relative 3xl:h-[750px] 2xl:h-[500px] xl:h-[320px] lg:h-[360px]">
          <div
            ref={cardsWrapRef}
            className="flex items-stretch h-full will-change-transform"
            style={{ width: "max-content" }}
          >
            {/* Card 0 */}
            <div className="shrink-0 flex items-start pl-3 md:pl-10 3xl:pl-[26rem] 2xl:pl-40 xl:pl-20 lg:pl-16 pt-2 pb-2">
              <div className="3xl:w-[35vw] 2xl:w-[48vw] xl:w-[45vw] lg:w-[48vw] md:w-[60vw] pr-8">
                <div className="overflow-hidden relative 3xl:h-[550px] 2xl:h-[350px] xl:h-[300px] lg:h-[350px]">
                  <img
                    src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774865116/Asset_1_qgly6y.webp"
                    alt="About Prographr"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] px-5 z-10 flex items-center"
                    style={{
                      backgroundColor: "rgba(100, 138, 90, 0.88)",
                      height: "clamp(80px, 8vw, 120px)",
                    }}
                  >
                    <p className="3xl:text-[16px] 2xl:text-[13px] xl:text-[12px] lg:text-[12px] leading-[1.6] text-[#F7F7F8] font-light">
                      Our agency specializes in a wide range of design services
                      that help brands stand out in a competitive market. From
                      flyer design to full brand identity, we create meaningful
                      visuals that drive results.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 1 */}
            <div className="shrink-0 flex items-start pt-2 pb-2">
              <div className="3xl:w-[35vw] 2xl:w-[48vw] xl:w-[45vw] lg:w-[48vw] md:w-[60vw] pr-8">
                <div className="overflow-hidden relative 3xl:h-[550px] 2xl:h-[350px] xl:h-[300px] lg:h-[350px]">
                  <img
                    src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774967188/photo-1556761175-b413da4baf72_iqjccn.avif"
                    alt="We have an expert team"
                    className="w-full h-full object-cover grayscale"
                  />
                  <div
                    className="absolute bottom-6 left-6 w-[50%] px-6 z-10 flex items-center"
                    style={{
                      backgroundColor: "rgba(114, 163, 100, 0.9)",
                      height: "clamp(80px, 8vw, 120px)",
                    }}
                  >
                    <p className="text-[#F7F7F8] 3xl:text-[18px] 2xl:text-[14px] xl:text-[12px] lg:text-[14px] font-light tracking-wide whitespace-nowrap">
                      We have an expert team
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 — Stats */}
            <div className="shrink-0 self-stretch flex flex-col justify-start px-10 pt-2 3xl:w-[45vw] 2xl:w-[48vw] xl:w-[45vw] lg:w-[48vw] md:w-[60vw] pb-2">
              <h3 className="3xl:text-[53px] 2xl:text-[50px] xl:text-[40px] lg:text-[38px] font-light text-[#454348] 2xl:leading-[1.4] xl:leading-[1.33] lg:leading-[1.4] mb-8 3xl:mt-10 2xl:mt-4 xl:mt-4 lg:mt-4">
                What makes
                <br />
                <span className="2xl:whitespace-nowrap">our agency different</span>
              </h3>
              <div className="flex items-start gap-4 3xl:pt-16 2xl:pt-10 xl:pt-2 lg:pt-20">
                <div className="flex-1">
                  <div className="3xl:text-[75px] 2xl:text-[40px] xl:text-[35px] lg:text-[32px] font-semibold leading-none mb-2 tracking-[-1px] 3xl:pt-20 2xl:pt-8 xl:pt-10 lg:pt-10 text-[#73AC56]">
                    30+
                  </div>
                  <div className="3xl:text-[18px] 2xl:text-[11px] xl:text-[12px] lg:text-[9px] leading-[1.5] text-[#000000] font-normal">
                    Company with Work Experiences
                  </div>
                </div>
                <div className="flex-[2] bg-[#2A2A2C] 3xl:px-8 3xl:py-20 2xl:px-7 2xl:py-7 xl:px-4 xl:py-9 lg:px-2 lg:py-9 flex 3xl:gap-52 2xl:gap-40 xl:gap-14 lg:gap-6 items-center justify-center">
                  <div className="2xl:px-0 xl:px-0 lg:px-2">
                    <div className="3xl:text-[72px] 2xl:text-[40px] xl:text-[40px] lg:text-[30px] font-semibold leading-none mb-2 tracking-[-1px] text-[#73AC56]">
                      1K+
                    </div>
                    <div className="3xl:text-[20px] 2xl:text-[14px] xl:text-[10px] lg:text-[10px] leading-[1.5] text-white whitespace-nowrap">
                      Job Completed
                    </div>
                  </div>
                  <div>
                    <div className="3xl:text-[72px] 2xl:text-[40px] xl:text-[40px] lg:text-[30px] font-semibold leading-none mb-2 tracking-[-1px] text-[#73AC56]">
                      100%
                    </div>
                    <div className="3xl:text-[20px] 2xl:text-[14px] xl:text-[10px] lg:text-[10px] leading-[1.5] text-white whitespace-nowrap">
                      Satisfied Client
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 — Dark CTA */}
            <div className="shrink-0 mx-6 3xl:w-[40vw] 2xl:w-[48vw] xl:w-[45vw] lg:w-[48vw] md:w-[60vw] pb-2">
              <div className="relative 3xl:h-[560px] 2xl:h-[360px] xl:h-[303px] lg:h-[358px] overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dzi3u164c/image/upload/v1774931324/Asset_3_raki8b.webp"
                  alt="CTA"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r z-[1]" />
                <div className="absolute inset-0 z-[2] flex flex-col justify-between 3xl:p-16 2xl:p-16 xl:p-8 lg:p-8">
                  <h3 className="3xl:text-[58px] 2xl:text-[40px] xl:text-[36px] lg:text-[36px] font-extrabold text-white leading-[1.1] tracking-[-0.5px] 3xl:max-w-[360px] 2xl:max-w-[360px] xl:max-w-[360px] lg:max-w-[360px]">
                    Scroll and <br />
                    enjoy a <br />
                    new <br />
                    experience
                  </h3>
                  <button className="self-start inline-flex items-center gap-2 px-5 py-[9px] bg-transparent rounded-full text-white text-[18px] transition-all hover:bg-white/10 hover:text-white 3xl:mt-0 2xl:mt-12 xl:mt-12 -ml-4">
                    Again let's go
                  </button>
                </div>
              </div>
            </div>

            <div className="shrink-0 w-12" />
          </div>
        </div>
      </section>

      <div ref={spacerRef} aria-hidden="true" />
    </div>
  );
}