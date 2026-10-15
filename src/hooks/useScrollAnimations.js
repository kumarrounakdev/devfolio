import { useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SECTION_IDS = ["home", "projects", "tools", "contact"];

export default function useScrollAnimations() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let cancelled = false;
    let checkTimer = null;
    let cleanupFns = [];

    const resolveActive = (stMap) => {
      const scroll = window.scrollY || 0;
      let activeId = null;
      let fallback = SECTION_IDS[0];
      SECTION_IDS.forEach((sid) => {
        const st = stMap[sid];
        if (!st) return;
        if (scroll >= st.start && scroll < st.end) {
          activeId = sid;
        }
        if (scroll >= st.start) {
          fallback = sid;
        }
      });
      return activeId ?? fallback;
    };

    const setup = () => {
      const stMap = {};
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 45%",
          end: "bottom 45%",
          onUpdate: () => setActiveSection(resolveActive(stMap)),
        });
        stMap[id] = st;
      });

      setActiveSection(resolveActive(stMap));

      return () => {
        Object.values(stMap).forEach((st) => st?.kill());
      };
    };

    const allSectionsReady = () =>
      SECTION_IDS.every((id) => document.getElementById(id));

    const mountSections = () => {
      if (cancelled) return;
      cleanupFns.forEach((fn) => fn());
      cleanupFns = [];
      if (allSectionsReady()) {
        cleanupFns.push(setup());
      } else {
        checkTimer = setTimeout(mountSections, 50);
      }
    };

    checkTimer = setTimeout(mountSections, 0);

    return () => {
      cancelled = true;
      if (checkTimer) clearTimeout(checkTimer);
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return activeSection;
}