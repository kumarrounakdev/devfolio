import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ToolCard from "../cards/ToolCard";
import SectionTitle from "../layout/SectionTitle";
import { tools } from "../../data/content";
import "./ToolsSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function ToolsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll(".tool-card");
    if (!cards.length) return;

    gsap.set(cards, { opacity: 0, y: 35, scale: 0.94 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: {
            amount: 0.35,
            grid: "auto",
          },
          delay: 0.2,
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section id="tools" ref={sectionRef} className="section-shell">
      <SectionTitle white="Premium" gray="Tools" />

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
