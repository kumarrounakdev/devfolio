import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function initSmoothScroll() {
  if (typeof window === "undefined") return null;
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.8,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1.25,
    touchMultiplier: 2,
    infinite: false,
  });

  lenisInstance.on("scroll", ScrollTrigger.update);

  const updateFn = (time) => {
    lenisInstance?.raf(time * 1000);
  };

  gsap.ticker.add(updateFn);
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}
