import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExperienceCard from "../cards/ExperienceCard";
import SectionTitle from "../layout/SectionTitle";
import { experiences } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = el.querySelectorAll(".experience-card");
    if (!cards.length) return;

    gsap.set(cards, { opacity: 0, y: 40 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.16,
          delay: 0.2,
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-shell">
      <SectionTitle white="12 Years of" gray="Experience" />

      <div className="experience-list">
        {experiences.map((exp) => (
          <ExperienceCard
            key={exp.title}
            title={exp.title}
            description={exp.description}
            date={exp.date}
          />
        ))}
      </div>
    </section>
  );
}
