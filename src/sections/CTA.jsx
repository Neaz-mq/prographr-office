import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const formRef = useRef(null);
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" ref={containerRef} className="bg-white">
      <div className="md:px-10 3xl:px-[26rem] 1920:px-[18rem] 2xl:px-[10rem] xl:px-[5rem] lg:px-[4rem] mx-auto px-6 py-20 3xl:py-48 2xl:py-36 xl:py-24">
        {/* Heading */}
        <div className="overflow-hidden">
          <h2
            ref={headingRef}
            className="text-[#454348] font-semibold mb-2 text-[clamp(36px,6vw,58px)] 3xl:text-[clamp(52px,10vw,90px)] 2xl:text-[clamp(52px,10vw,80px)] xl:text-[clamp(45px,3.8vw,58px)] lg:text-[clamp(40px,3.8vw,58px)] md:text-[clamp(36px,3.8vw,58px)] tracking-wide"
          >
            Let's talk
          </h2>
        </div>
        <p className="text-[#aaa] 3xl:text-xl 2xl:text-xl xl:text-xl lg:text-sm md:text-sm text-sm mb-12">
          Ask us anything or just say hi.,
        </p>

        {/* Success Banner */}
        {status === "success" && (
          <div className="mb-8 px-5 py-4 bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] text-sm rounded">
            ✓ Message sent! We'll get back to you within 24 hours.
          </div>
        )}

        {status === "error" && (
          <div className="mb-8 px-5 py-4 bg-[#fef2f2] border border-[#fecaca] text-[#991b1b] text-sm rounded">
            ✗ Something went wrong. Please email us directly at
            contact.prographr@gmail.com
          </div>
        )}

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-12"
        >
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-3">
              <label className="text-[#454348] 3xl:text-2xl 2xl:text-xl">
                Name
              </label>
              <input
                type="text"
                required
                placeholder="Alex Rivera"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                disabled={status === "sending"}
                className="bg-transparent border-0 border-b border-[#ccc] pb-2 3xl:text-lg 2xl:text-base xl:text-sm lg:text-sm md:text-sm text-sm text-[#0a0a0a] placeholder:text-[#ccc] outline-none focus:border-[#0a0a0a] transition-colors duration-200 disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[#454348] 3xl:text-2xl 2xl:text-xl">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="alex.rivera@fintechstep.io"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={status === "sending"}
                className="bg-transparent border-0 border-b border-[#ccc] pb-2 3xl:text-lg 2xl:text-base xl:text-sm lg:text-sm md:text-sm text-[#454348] text-sm placeholder:text-[#ccc] outline-none focus:border-[#0a0a0a] transition-colors duration-200 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-3">
            <label className="text-[#454348] 3xl:text-2xl 2xl:text-xl">
              Message
            </label>
            <textarea
              required
              rows={1}
              placeholder="Hi there! We're looking to redesign..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              disabled={status === "sending"}
              className="bg-transparent border-0 border-b border-[#ccc] pb-2 3xl:text-lg 2xl:text-base xl:text-sm lg:text-sm md:text-sm text-sm text-[#0a0a0a] placeholder:text-[#ccc] outline-none focus:border-[#0a0a0a] transition-colors duration-200 resize-none disabled:opacity-50"
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-[#454348] text-[#F7F7F8] text-[14px] 3xl:text-xl 2xl:text-base xl:text-base lg:text-base md:text-base font-medium 3xl:px-6 3xl:py-3 2xl:px-5 2xl:py-2 xl:px-4 xl:py-2 lg:px-3 lg:py-1.5 md:px-2.5 md:py-1 px-2.5 py-1.5 hover:bg-[#222] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed tracking-[0.02em]"
            >
              {status === "sending" ? "Sending..." : "Send Now"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
