import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "./components/layout/Navigation";
import HeroSection from "./components/sections/HeroSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import ToolsSection from "./components/sections/ToolsSection";
import BlogSection from "./components/sections/BlogSection";
import ContactSection from "./components/sections/ContactSection";
import Footer from "./components/layout/Footer";
import useScrollAnimations from "./hooks/useScrollAnimations";
import { initSmoothScroll } from "./utils/smoothScroll";
import { Agentation } from "agentation";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const activeSection = useScrollAnimations();

  useEffect(() => {
    initSmoothScroll();

    /* Refresh ScrollTrigger after Lenis + all images/fonts settle */
    window.addEventListener("load", () => ScrollTrigger.refresh());
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      window.removeEventListener("load", () => ScrollTrigger.refresh());
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <div className="page">
      {process.env.NODE_ENV === "development" && (
        <Agentation endpoint="http://localhost:4747" />
      )}
      <Navigation activeSection={activeSection} />

      {/* Hero Section */}
      <HeroSection />

      {/* Recent Projects Section */}
      <ProjectsSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Premium Tools Section */}
      <ToolsSection />

      {/* Design Thoughts Section */}
      <BlogSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
