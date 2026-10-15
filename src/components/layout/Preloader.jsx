import { useEffect, useState, useRef, useCallback } from "react";
import gsap from "gsap";
import "./Preloader.css";

export default function Preloader({ onComplete }) {
  const [counter, setCounter] = useState(0);
  const [phase, setPhase] = useState("loading");
  const wrapRef = useRef(null);
  const textRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);
  const barTlRef = useRef(null);
  const phaseRef = useRef("loading");

  const dismiss = useCallback(() => {
    if (phaseRef.current !== "loading") return;

    const barTl = barTlRef.current;
    if (barTl && barTl.progress() < 1) {
      barTl.progress(1);
      setCounter(100);
    }

    phaseRef.current = "exit";
    setPhase("exit");

    const wrap = wrapRef.current;
    if (!wrap) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setPhase("done");
        onComplete?.();
      },
    });

    tl.to(wrap, {
      yPercent: -100,
      duration: 0.45,
      ease: "power4.inOut",
    });
  }, [onComplete]);

  useEffect(() => {
    const handleLoad = () => {
      if (phaseRef.current === "loading") {
        const barTl = barTlRef.current;
        if (barTl) {
          const remaining = (1 - barTl.progress()) * 850;
          setTimeout(dismiss, Math.max(remaining + 200, 200));
        } else {
          setTimeout(dismiss, 350);
        }
      }
    };

    // load may have already fired (cached visits, mobile back-nav)
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Never let the preloader hang if load never fires
    const safety = setTimeout(() => dismiss(), 5000);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(safety);
    };
  }, [dismiss]);

  // Lock scrolling behind the overlay while it is up (mobile rubber-band)
  useEffect(() => {
    if (phase !== "loading") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "loading") return;

    const el = textRef.current;
    const counterEl = counterRef.current;
    const bar = barRef.current;
    if (!el || !counterEl || !bar) return;

    gsap.set(el, { opacity: 0, y: 20 });
    gsap.set(counterEl, { opacity: 0, scale: 0.8 });
    gsap.set(bar, { scaleX: 0 });

    const tl = gsap.timeline();

    tl.to(counterEl, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "back.out(1.4)",
    });

    const barTl = gsap.timeline({
      onUpdate: function () {
        setCounter(Math.round(this.progress() * 100));
      },
    });
    barTl.to(bar, {
      scaleX: 1,
      duration: 0.85,
      ease: "power2.inOut",
    });
    barTlRef.current = barTl;

    tl.add(barTl, 0);

    tl.to(
      el,
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      0.2
    );

    return () => {
      tl.kill();
      barTlRef.current = null;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div ref={wrapRef} className="preloader" aria-hidden={phase !== "loading"}>
      <div className="preloader__inner">
        <span ref={textRef} className="preloader__name">
          Rounak Kumar
        </span>
        <div className="preloader__progress-wrap">
          <div ref={barRef} className="preloader__bar" />
        </div>
        <span ref={counterRef} className="preloader__counter">
          {counter}
        </span>
      </div>
    </div>
  );
}
