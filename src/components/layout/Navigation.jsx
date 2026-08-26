import { useEffect, useState } from "react";
import { HomeIcon, FolderIcon, BriefcaseIcon, LinkIcon, EditIcon } from "../icons/NavIcons";
import Dock from "./Dock";
import { getLenis } from "../../utils/smoothScroll";
import "./Navigation.css";

const NO_ANIMATION = "(max-width: 1024px)";

function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(
    () => typeof window !== "undefined" && window.matchMedia(NO_ANIMATION).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(NO_ANIMATION);
    const onChange = (e) => setIsSmall(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isSmall;
}

const navItems = [
  { id: "home", label: "Home", icon: <HomeIcon /> },
  { id: "projects", label: "Projects", icon: <FolderIcon /> },
  { id: "experience", label: "Experience", icon: <BriefcaseIcon /> },
  { id: "tools", label: "Tools", icon: <LinkIcon /> },
  { id: "blog", label: "Blog", icon: <EditIcon /> },
];

export default function Navigation({ activeSection }) {
  const isSmall = useIsSmallScreen();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    const lenis = getLenis();
    if (lenis && el) {
      lenis.scrollTo(el, { offset: -20, duration: 1.8 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const items = navItems.map((item) => ({
    icon: item.icon,
    label: item.label,
    onClick: () => scrollToSection(item.id),
    className: activeSection === item.id ? "active" : "",
  }));

  return (
    <nav className="navigation">
      <Dock
        items={items}
        panelHeight={48}
        baseItemSize={38}
        magnification={isSmall ? 38 : 50}
        distance={isSmall ? 0 : 100}
        dockHeight={64}
      />
    </nav>
  );
}
