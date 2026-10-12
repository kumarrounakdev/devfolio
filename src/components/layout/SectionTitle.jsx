import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./SectionTitle.css";

function SplitText({ text, className }) {
  if (!text) return null;
  return (
    <span className={`section-title__line ${className || ""}`}>
      {text.split("").map((char, i) => (
        <span key={i} className="section-title__char-wrap">
          <span className="section-title__char">{char === " " ? "\u00A0" : char}</span>
        </span>
      ))}
    </span>
  );
}

export default function SectionTitle({ white, gray, tag = "h2", animate = true, onAnimComplete, className = "" }) {
  const Tag = tag;
  const ref = useRef(null);
  const cbRef = useRef(onAnimComplete);

  useEffect(() => {
    cbRef.current = onAnimComplete;
  }, [onAnimComplete]);

  useEffect(() => {
    if (!animate) {
      cbRef.current?.();
      return;
    }

    const el = ref.current;
    if (!el) return;

    const chars = el.querySelectorAll(".section-title__char");
    if (!chars.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cbRef.current?.();
      return;
    }

    gsap.set(chars, {
      y: "110%",
      opacity: 0,
      rotateX: -30,
    });

    /* Scroll-scrubbed character reveal */
    const tween = gsap.to(chars, {
      y: "0%",
      opacity: 1,
      rotateX: 0,
      ease: "none",
      stagger: 0.016,
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        end: "top 50%",
        scrub: true,
        onUpdate: (self) => {
          if (self.progress >= 1) cbRef.current?.();
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [animate]);

  return (
    <Tag ref={ref} className={`section-title ${className}`.trim()}>
      <SplitText text={white} className="section-title__white" />
      {gray && (
        <>
          <br />
          <SplitText text={gray} className="section-title__gray" />
        </>
      )}
    </Tag>
  );
}
