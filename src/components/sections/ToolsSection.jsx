import { useEffect, useRef } from "react";
import gsap from "gsap";
import ToolCard from "../cards/ToolCard";
import SectionTitle from "../layout/SectionTitle";
import { tools } from "../../data/content";
import "./ToolsSection.css";

export default function ToolsSection() {
  const sectionRef = useRef(null);

  // Scroll-scrubbed card reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll(".tool-card");
    if (!cards.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(cards, { opacity: 0, y: 35, scale: 0.94 });

    const tween = gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      ease: "none",
      stagger: { amount: 0.25, grid: "auto" },
      scrollTrigger: {
        trigger: el,
        start: "top 50%",
        end: "top 15%",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="tools" ref={sectionRef} className="section-shell">
      <SectionTitle white="Tech" gray="& Tools" />

      <div className="tools-grid">
        {tools.map(({ Icon, ...tool }) => (
          <ToolCard
            key={tool.name}
            icon={<Icon />}
            name={tool.name}
            category={tool.category}
          />
        ))}
      </div>
    </section>
  );
}
