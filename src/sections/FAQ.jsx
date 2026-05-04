import { useState, useRef, useEffect, useCallback, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Constants ────────────────────────────────────────────────────────────────

const JOBS = [
  { title: "Senior Ui Ux Designer", meta: "Onsite / Full Time / Senior Level" },
  { title: "Marketing Manager",     meta: "Onsite / Full Time / Senior Level" },
  { title: "Senior Ui Ux Designer", meta: "Onsite / Full Time / Senior Level" },
];

const FAQS = [
  {
    q: "What does your graphic design process look like?",
    a: "We start with a discovery session to understand your brand, audience, and goals. From there we move into concept development, present multiple directions, and refine based on your feedback. Every visual we create is intentional — built to communicate clearly and leave a lasting impression.",
  },
  {
    q: "How do you approach brand logo and identity design?",
    a: "We treat your logo as the foundation of everything. We research your industry, competitors, and target audience before putting pen to paper. The result is a mark that feels distinct, scalable across all formats, and true to who you are as a business.",
  },
  {
    q: "What goes into a web design project?",
    a: "Every web design project begins with wireframes and user flow mapping before any visuals are created. We design for both aesthetics and usability — ensuring your site looks great and converts visitors into clients. All designs are responsive and optimized for every screen size.",
  },
  {
    q: "Can you design pitch decks and presentation templates?",
    a: "Yes. We design presentations that are clean, on-brand, and built to impress — whether it's a client pitch, investor deck, or internal report. We also create reusable templates so your team can stay consistent without starting from scratch every time.",
  },
  {
    q: "Do you handle development after the design is approved?",
    a: "Absolutely. We offer full web development — from landing pages to complex web applications. Our developers work directly from our own design files, which means no miscommunication, pixel-perfect output, and faster delivery.",
  },
  {
    q: "What tools and technologies do you work with?",
    a: "For design, we work in Figma, Adobe Illustrator, Photoshop, and InDesign. Presentations are crafted in PowerPoint, Keynote, and Google Slides. On the development side we build with React, Next.js, Tailwind CSS, and Node.js — deployed on Vercel or custom hosting depending on your needs. We use the right tool for the job, not just the popular one.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * Single FAQ accordion row — memoised so toggling one item doesn't
 * re-render every other row in the list.
 */
const FaqItem = memo(function FaqItem({ faq, index, isOpen, onToggle }) {
  return (
    <div className={index !== 0 ? "border-t border-white/[8%]" : ""}>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group"
      >
        <span
          className={`text-base md:text-base lg:text-md xl:text-lg 2xl:text-lg 3xl:text-2xl tracking-[0.02em] font-normal transition-colors duration-300 ${
            isOpen ? "text-[#73AC56]" : "text-[#C1C1C1]"
          }`}
        >
          {faq.q}
        </span>
        <span
          aria-hidden="true"
          className="shrink-0 text-[#F7F7F8] text-lg leading-none w-5 text-center select-none"
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        role="region"
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-60 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-white/70 3xl:text-base 2xl:text-base xl:text-sm lg:text-[12px] md:text-[12px] text-[11px] leading-relaxed">
          {faq.a}
        </p>
      </div>
    </div>
  );
});

/**
 * Single job listing row — memoised to prevent re-renders when
 * FAQ accordion state changes.
 */
const JobItem = memo(function JobItem({ job, index }) {
  return (
    <div
      className={`flex items-center justify-between py-5 gap-6 ${
        index !== 0 ? "border-t border-white/[8%]" : ""
      }`}
    >
      <div>
        <p className="text-[#F7F7F8] font-semibold text-sm 3xl:text-[28px] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[18px] text-[17px] leading-tight mb-1 tracking-[0.02em]">
          {job.title}
        </p>
        <p className="text-[#C1C1C1] text-xs md:text-md pt-2">{job.meta}</p>
      </div>
      <button
        type="button"
        className="shrink-0 border border-white text-white 3xl:text-lg 2xl:text-base xl:text-[11px] lg:text-[11px] md:text-[11px] text-[10px] 3xl:px-5 3xl:py-1.5 2xl:px-5 2xl:py-1.5 xl:px-3 xl:py-1.5 lg:px-2.5 lg:py-1.5 md:px-2.5 md:py-1 px-2 py-1 hover:bg-white hover:text-[#0a0a0a] transition-colors duration-200 whitespace-nowrap"
      >
        Apply Now
      </button>
    </div>
  );
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const containerRef      = useRef(null);
  const careersHeadingRef = useRef(null);
  const faqHeadingRef     = useRef(null);

  // Toggle handler — stable reference, no inline arrow in JSX
  const handleToggle = useCallback((i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  // Heading scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      [careersHeadingRef, faqHeadingRef].forEach((ref) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { y: "110%", skewY: 7, opacity: 0 },
          {
            y:        "0%",
            skewY:    0,
            opacity:  1,
            duration: 1.5,
            ease:     "expo.out",
            scrollTrigger: {
              trigger:       ref.current,
              start:         "top 95%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={containerRef}
      aria-label="Careers and frequently asked questions"
      className="bg-[#2A2A2C]"
    >
      {/* ── Careers (hidden) ───────────────────────────────────────── */}
      <div className="md:px-10 3xl:px-[26rem] 1920:px-[18rem] 2xl:px-[10rem] xl:px-[5rem] lg:px-[4rem] mx-auto px-6 3xl:pt-64 2xl:pt-52 xl:pt-36 lg:pt-36 md:pt-36 pb-16 pt-28 border-b border-white/[8%] hidden">
        <div className="overflow-hidden">
          <h2
            ref={careersHeadingRef}
            className="font-medium leading-[1.2] text-white 3xl:max-w-[1260px] 2xl:max-w-[1100px] max-w-[860px] 3xl:text-[clamp(52px,10vw,90px)] 2xl:text-[clamp(52px,10vw,72px)] xl:text-[clamp(36px,3.8vw,58px)] lg:text-[clamp(36px,3.8vw,58px)] md:text-[clamp(36px,3.8vw,58px)] text-[clamp(28px,3.8vw,40px)]"
          >
            Become a member of a
            <br />
            talented team
          </h2>
        </div>

        <ul className="flex flex-col pt-24 list-none m-0 p-0">
          {JOBS.map((job, i) => (
            <li key={`${job.title}-${i}`}>
              <JobItem job={job} index={i} />
            </li>
          ))}
        </ul>
      </div>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <div className="md:px-10 3xl:px-[26rem] 1920:px-[18rem] 2xl:px-[10rem] xl:px-20 lg:px-14 mx-auto px-6 3xl:pt-32 3xl:pb-32 2xl:pt-32 2xl:pb-32 xl:pt-32 xl:pb-32 lg:pt-32 lg:pb-32 md:pt-32 md:pb-32 sm:pt-24 sm:pb-24 pt-20 pb-20">
        <div className="overflow-hidden">
          <h2
            ref={faqHeadingRef}
            className="font-medium leading-[1.2] text-[#F7F7F8] 3xl:max-w-[1360px] 2xl:max-w-[1100px] max-w-[760px] 3xl:text-[clamp(52px,10vw,90px)] 2xl:text-[clamp(52px,10vw,80px)] xl:text-[clamp(45px,3.8vw,58px)] lg:text-[clamp(40px,3.8vw,58px)] md:text-[clamp(36px,3.8vw,58px)] text-[clamp(36px,3.8vw,58px)] tracking-wide"
          >
            Got
            <br />
            Questions?
          </h2>
        </div>

        {/* Accordion */}
        <dl className="flex flex-col 3xl:mt-20 2xl:mt-20 xl:mt-20 lg:mt-20 md:mt-20 sm:mt-12 mt-10">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={faq.q}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </dl>
      </div>
    </section>
  );
}