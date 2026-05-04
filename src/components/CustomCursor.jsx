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

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
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
        width: "20px",
        height: "20px",
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