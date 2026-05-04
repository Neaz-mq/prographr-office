import { useEffect, useRef, useState } from "react";

export default function CustomScrollbar() {
  const thumbRef = useRef(null);
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartScroll = useRef(0);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const thumb = thumbRef.current;
    const track = trackRef.current;
    if (!thumb || !track) return;

    const updateThumb = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const trackHeight = track.clientHeight;
      const thumbHeight = Math.min(
        Math.max(
          (doc.clientHeight / doc.scrollHeight) * trackHeight,
          40
        ),
        120
      );
      const thumbTop =
        scrollHeight > 0
          ? (scrollTop / scrollHeight) * (trackHeight - thumbHeight)
          : 0;
      thumb.style.height = `${thumbHeight}px`;
      thumb.style.transform = `translateY(${thumbTop}px)`;
    };

    // ── Defer initial calculation until after first paint ──
    let rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(updateThumb); // double-rAF ensures layout is complete
    });

    // ── Re-calculate whenever the page body resizes (e.g. lazy-loaded content) ──
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateThumb);
    });
    resizeObserver.observe(document.body);

    const onMouseDown = (e) => {
      isDragging.current = true;
      dragStartY.current = e.clientY;
      dragStartScroll.current = window.scrollY;
      document.body.style.userSelect = "none";
      e.preventDefault();
    };

    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      const doc = document.documentElement;
      const trackHeight = track.clientHeight;
      const thumbHeight = thumb.clientHeight;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const delta = e.clientY - dragStartY.current;
      const scrollDelta = (delta / (trackHeight - thumbHeight)) * scrollHeight;
      window.scrollTo(0, dragStartScroll.current + scrollDelta);
    };

    const onMouseUp = () => {
      isDragging.current = false;
      document.body.style.userSelect = "";
    };

    const onTrackClick = (e) => {
      if (e.target === thumb) return;
      const doc = document.documentElement;
      const rect = track.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const thumbHeight = thumb.clientHeight;
      const trackHeight = track.clientHeight;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const scrollTo =
        ((clickY - thumbHeight / 2) / (trackHeight - thumbHeight)) * scrollHeight;
      window.scrollTo({ top: scrollTo, behavior: "smooth" });
    };

    window.addEventListener("scroll", updateThumb, { passive: true });
    thumb.addEventListener("mousedown", onMouseDown);
    track.addEventListener("click", onTrackClick);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateThumb);
      thumb.removeEventListener("mousedown", onMouseDown);
      track.removeEventListener("click", onTrackClick);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      ref={trackRef}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "10px",
        height: "100vh",
        zIndex: 9999,
      }}
    >
      <div
        ref={thumbRef}
        style={{
          width: "8px",
          marginLeft: "1px",
          borderRadius: "999px",
          background: "rgba(160, 160, 160, 0.6)",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(220, 220, 220, 0.9)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(160, 160, 160, 0.6)")
        }
      />
    </div>
  );
}