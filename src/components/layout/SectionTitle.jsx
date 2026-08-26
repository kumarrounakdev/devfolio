import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./SectionTitle.css";

gsap.registerPlugin(ScrollTrigger);

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

export default function SectionTitle({ white, gray, tag = "h2", immediate = false, className = "" }) {
  const Tag = tag;
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = el.querySelectorAll(".section-title__char");
    if (!chars.length) return;

    // Set initial position
    gsap.set(chars, {
      y: "110%",
      opacity: 0,
      rotateX: -30,
    });

    if (immediate) {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(chars, {
        y: "0%",
        opacity: 1,
        rotateX: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.025,
      });
      return () => tl.kill();
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(chars, {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.025,
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [immediate]);

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
