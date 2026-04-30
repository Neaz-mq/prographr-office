import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const onMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onEnter = () => cursorRef.current?.classList.add("cursor-hover");
    const onLeave = () => cursorRef.current?.classList.remove("cursor-hover");

    const addHoverListeners = () => {
      document
        .querySelectorAll("a, button, [role='button'], input, textarea, select, label, [tabindex]")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    addHoverListeners();

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      id="custom-cursor"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "28px",
        height: "28px",
        pointerEvents: "none",
        zIndex: 99999,
        willChange: "transform",
      }}
    >
      <img
        src="/cursor.svg"
        alt=""
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}