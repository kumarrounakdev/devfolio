import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS = ["home", "projects", "experience", "tools", "blog", "contact"];

export default function useScrollAnimations() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // 1. Setup ScrollTrigger for active section detection
    const triggers = SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      return ScrollTrigger.create({
        trigger: el,
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(id);
          }
        },
      });
    }).filter(Boolean);

    // 2. Initial setup for elements with `.reveal` class
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 35 });
    });

    // 3. Batch reveal for `.reveal` elements with smooth stagger
    const batchTriggers = ScrollTrigger.batch(".reveal", {
      start: "top 88%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
          overwrite: "auto",
        });
      },
    });

    // Refresh after DOM layout is ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      triggers.forEach((st) => st?.kill());
      batchTriggers.forEach((st) => st?.kill());
    };
  }, []);

  return activeSection;
}
