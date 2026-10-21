import { lazy, Suspense, useEffect } from "react";
import { Agentation } from "agentation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "./components/layout/Navigation";
import HeroSection from "./components/sections/HeroSection";
import Preloader from "./components/layout/Preloader";
import useScrollAnimations from "./hooks/useScrollAnimations";
import { initSmoothScroll, destroySmoothScroll } from "./utils/smoothScroll";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = lazy(() => import("./components/sections/ProjectsSection"));
const ToolsSection = lazy(() => import("./components/sections/ToolsSection"));
const ContactSection = lazy(() => import("./components/sections/ContactSection"));
const Footer = lazy(() => import("./components/layout/Footer"));

export default function App() {
  const activeSection = useScrollAnimations();

  useEffect(() => {
    initSmoothScroll();

    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      destroySmoothScroll();
    };
  }, []);

  return (
    <div className="page">
      <Preloader />
      <Navigation activeSection={activeSection} />

      <HeroSection />

      <Suspense fallback={null}>
        <ProjectsSection />
      </Suspense>

      <Suspense fallback={null}>
        <ToolsSection />
      </Suspense>

      <Suspense fallback={null}>
        <ContactSection />
      </Suspense>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {import.meta.env.DEV && <Agentation endpoint="http://localhost:4747" />}
    </div>
  );
}



