import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const counterRef = useRef(null);
  const lineRef = useRef(null);
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const logoRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial state
      gsap.set([topPanelRef.current, bottomPanelRef.current], { scaleY: 1 });
      gsap.set(logoRef.current, { y: 40, opacity: 0 });
      gsap.set(taglineRef.current, { y: 20, opacity: 0 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });

      // Logo reveal
      tl.to(logoRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
      })
        .to(
          taglineRef.current,
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        )

        // Progress line
        .to(
          lineRef.current,
          { scaleX: 1, duration: 1.6, ease: "power2.inOut" },
          "-=0.4"
        );

      // Counter
      const counter = { val: 0 };
      tl.to(
        counter,
        {
          val: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = `${Math.round(counter.val)}%`;
            }
          },
        },
        "<"
      );

      // Exit — split curtain
      tl.to(
        logoRef.current,
        { y: -30, opacity: 0, duration: 0.5, ease: "power2.in" },
        "+=0.2"
      )
        .to(
          taglineRef.current,
          { y: -20, opacity: 0, duration: 0.4, ease: "power2.in" },
          "<"
        )
        .to(
          counterRef.current,
          { opacity: 0, duration: 0.3, ease: "power2.in" },
          "<"
        )
        .to(topPanelRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        })
        .to(
          bottomPanelRef.current,
          { yPercent: 100, duration: 0.9, ease: "power4.inOut" },
          "<"
        )
        .call(() => onComplete?.(), [], "-=0.1");
    }, loaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden="true"
    >
      {/* Top panel */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#0a0a0a] origin-top"
      />

      {/* Bottom panel */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0a0a0a] origin-bottom"
      />

      {/* Content — sits above both panels */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">

        {/* Logo + name */}
        <div ref={logoRef} className="flex items-center gap-3 mb-6">
          <img src="/logo.webp" alt="Prographr" className="h-7 w-7 object-contain" />
          <span
            className="text-white text-2xl tracking-wide"
            style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
          >
            Prographr
          </span>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-[#555] text-xs uppercase tracking-[0.3em] mb-10"
        >
          Crafting Digital Experiences
        </p>

        {/* Progress bar */}
        <div className="w-48 h-px bg-[#1f1f1f] relative mb-4">
          <div
            ref={lineRef}
            className="absolute inset-0 bg-white"
          />
        </div>

        {/* Counter */}
        <span
          ref={counterRef}
          className="text-[#444] text-xs tabular-nums tracking-widest"
        >
          0%
        </span>
      </div>
    </div>
  );
}