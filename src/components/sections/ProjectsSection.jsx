import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../layout/SectionTitle";
import { projects } from "../../data/content";
import "./ProjectsSection.css";

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const pinnedRef = useRef(null);
  const trackRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    const pinnedEl = pinnedRef.current;
    const trackEl = trackRef.current;
    const panels = panelsRef.current.filter(Boolean);

    if (!pinnedEl || !trackEl || !panels.length) return;

    /* Helper: Calculate horizontal distance dynamically.
       Distance = total width of track content minus the viewport width. */
    const getScrollDistance = () => {
      return trackEl.scrollWidth - window.innerWidth;
    };

    /* Set up GSAP Context for scope & auto-cleanup */
    const ctx = gsap.context(() => {
      /* Main timeline: translation + pinning */
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinnedEl,
          pin: true,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* Dynamic horizontal translation from right to left */
      mainTl.to(trackEl, {
        x: () => -getScrollDistance(),
        ease: "none",
      });
    }, containerRef);

    /* Refresh ScrollTrigger on window resize for exact responsive recalculation */
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
    };
    window.addEventListener("resize", handleResize);

    /* Clean up all animations and ScrollTriggers on unmount */
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="ps-horizontal-wrapper" id="projects">
      {/* Header Shell */}
      <div className="ps-header-shell">
        <SectionTitle white="Recent" gray="Projects" />
      </div>

      {/* Pinned Fullscreen Horizontal Container */}
      <div ref={pinnedRef} className="ps-pinned-container">
        <div ref={trackRef} className="ps-track">
          {projects.map((project, index) => (
            <div
              key={project.number || project.title}
              ref={(el) => (panelsRef.current[index] = el)}
              className="ps-panel ps-panel--compact"
            >
              <div className="ps-compact">
                {/* LEFT - 40% */}
                <div className="ps-compact__left">
                  <div className="ps-compact__meta">
                    <span className="ps-compact__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="ps-compact__label">
                      {project.category || "Project"}
                    </span>
                  </div>

                  <h3 className="ps-compact__title">{project.title}</h3>

                  {project.description && (
                    <p className="ps-compact__desc">{project.description}</p>
                  )}
                </div>

                {/* RIGHT - 60% */}
                <div className="ps-compact__right">
                  <span className="ps-compact__section-label">
                    Features
                  </span>

                      {project.features && project.features.length > 0 && (
                        <ul className="ps-compact__chips">
                          {project.features.slice(0, 4).map((feature) => (
                            <li key={feature} className="ps-compact__chip">
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}

                  <div className="ps-compact__stack">
                    <span className="ps-compact__section-label">Stack</span>
                    <span className="ps-compact__stack-text">
                      {project.technologies.join(" · ")}
                    </span>
                  </div>

                  <div className="ps-compact__footer">
                    <a
                      href={project.liveUrl || undefined}
                      target={project.liveUrl ? "_blank" : undefined}
                      rel={project.liveUrl ? "noopener noreferrer" : undefined}
                      aria-disabled={!project.liveUrl}
                      className={`ps-compact__cta ${project.liveUrl ? "" : "disabled"}`}
                    >
                      <span className="ps-compact__cta-text">
                        {project.liveUrl ? "View Project" : "Coming Soon"}
                      </span>
                      <span className="ps-compact__cta-arrow">
                        <ArrowIcon />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
