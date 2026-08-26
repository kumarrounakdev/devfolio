import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../../data/content";
import "./ProjectsSection.css";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_BP = 769;
const isMobileInitial =
  typeof window !== "undefined" && window.innerWidth < MOBILE_BP;

/* ── Arrow SVG ────────────────────────────── */
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

/* ── Single project card content ──────────── */
function ProjectCardContent({ project }) {
  const hasImage = !!project.image;

  return (
    <>
      <div className="ps-image-col">
        <div className="ps-browser-frame">
          <div className="ps-browser-bar">
            <div className="ps-browser-dots">
              <span className="ps-browser-dot" />
              <span className="ps-browser-dot" />
              <span className="ps-browser-dot" />
            </div>
            <span className="ps-browser-label">{project.title}</span>
          </div>
          <div className="ps-image-area">
            {hasImage ? (
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="ps-image-placeholder" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>

      <div className="ps-content-col">
        <span className="ps-project-number">{project.number}</span>
        <h3 className="ps-project-title">{project.title}</h3>
        {project.description && (
          <p className="ps-project-desc">{project.description}</p>
        )}
        {project.technologies?.length > 0 && (
          <div className="ps-project-tags" role="list" aria-label="Technologies used">
            {project.technologies.map((t) => (
              <span key={t} className="ps-project-tag" role="listitem">
                {t}
              </span>
            ))}
          </div>
        )}
        {project.liveUrl ? (
          <a
            className="ps-project-cta"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project <ArrowIcon />
          </a>
        ) : (
          <span className="ps-project-cta" aria-label="View project (link coming soon)">
            View Project <ArrowIcon />
          </span>
        )}
      </div>
    </>
  );
}

/* ── Progress indicator ───────────────────── */
function ProgressIndicator({ activeIndex, total }) {
  const pct = ((activeIndex + 1) / total) * 100;

  return (
    <div className="ps-bottom" aria-hidden="true">
      <p className="ps-counter">
        <span className="ps-counter-current">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>{" "}
        / {String(total).padStart(2, "0")}
      </p>
      <div
        className="ps-progress-bar"
        role="progressbar"
        aria-valuenow={activeIndex + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label="Project progress"
      >
        <div
          className="ps-progress-fill"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const carouselRef = useRef(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile] = useState(isMobileInitial);

  /* ── Desktop GSAP horizontal scroll ─────── */
  useEffect(() => {
    if (isMobile) return;

    const trackEl = trackRef.current;
    const sectionEl = sectionRef.current;
    if (!trackEl || !sectionEl) return;

    const cards = gsap.utils.toArray(".ps-card", trackEl);
    if (!cards.length) return;

    const total = projects.length;
    const seg = 1 / total;
    let ctx = null;

    /* Defer setup by one rAF so Lenis + ticker are ready */
    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        /* Set initial hidden state for all cards */
        cards.forEach((card) => {
          gsap.set(card, { opacity: 0, scale: 0.95 });
        });

        /* Main horizontal scroll timeline */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            pin: true,
            pinType: "transform",
            start: "top top",
            end: () => "+=" + (trackEl.scrollWidth - window.innerWidth),
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate(self) {
              const idx = Math.min(total - 1, Math.floor(self.progress / seg));
              if (idx !== activeIndexRef.current) {
                activeIndexRef.current = idx;
                setActiveIndex(idx);
              }
            },
          },
        });

      /* Track horizontal sweep */
      tl.to(
        trackEl,
        {
          x: () => -(trackEl.scrollWidth - window.innerWidth),
          ease: "none",
        },
        0,
      );

      /* Per-project animations */
      for (let i = 0; i < total; i++) {
        const label = "p" + i;
        const start = i * seg;

        tl.add(label, start);

        /* Card entrance */
        tl.fromTo(
          cards[i],
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, ease: "power2.out" },
          label,
        );

        /* Card exit (except last) */
        if (i < total - 1) {
          tl.to(
            cards[i],
            { opacity: 0, scale: 0.95, ease: "power2.in" },
            label + "+=" + seg * 0.72,
          );
        }

        /* Staggered text reveals */
        const textEls = gsap.utils.toArray(
          ".ps-project-number, .ps-project-title, .ps-project-desc, .ps-project-tags, .ps-project-cta",
          cards[i],
        );

        if (textEls.length) {
          tl.fromTo(
            textEls,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: seg * 0.35,
              stagger: seg * 0.055,
              ease: "power2.out",
            },
            label + "+=" + seg * 0.18,
          );
        }
      }
      }, sectionEl);
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, [isMobile]);

  /* ── Mobile intersection observer ───────── */
  useEffect(() => {
    if (!isMobile) return;

    const el = carouselRef.current;
    if (!el) return;

    const slides = el.querySelectorAll(".ps-mobile-slide");
    if (!slides.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            if (!Number.isNaN(idx)) {
              activeIndexRef.current = idx;
              setActiveIndex(idx);
            }
          }
        });
      },
      { root: el, threshold: 0.6 },
    );

    slides.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [isMobile]);

  /* ── Render ─────────────────────────────── */
  return (
    <>
      {/* ── SECTION HEADER ──────────────────── */}
      <header className="ps-header section-shell" id="projects">
        <h2 className="ps-title">Projects</h2>
        <p className="ps-subtitle">Selected work / things I&apos;ve built</p>
      </header>

      {/* ── DESKTOP: Pinned horizontal scroll ─ */}
      {!isMobile && (
        <>
          <section ref={sectionRef} className="ps-pinned">
            <div ref={trackRef} className="ps-track">
              {projects.map((project) => (
                <div className="ps-slide" key={project.number}>
                  <div className="ps-card" aria-label={`Project ${project.number}: ${project.title}`}>
                    <ProjectCardContent project={project} />
                  </div>
                </div>
              ))}
            </div>
          </section>
          <ProgressIndicator
            activeIndex={activeIndex}
            total={projects.length}
          />
        </>
      )}

      {/* ── MOBILE: Swipe carousel ─────────── */}
      {isMobile && (
        <div className="ps-mobile">
          <div
            ref={carouselRef}
            className="ps-mobile-carousel"
            role="region"
            aria-label="Projects carousel"
          >
            {projects.map((project, i) => (
              <article
                className="ps-mobile-slide"
                key={project.number}
                data-index={i}
                aria-label={`Project ${project.number} of ${projects.length}: ${project.title}`}
              >
                <div className="ps-mobile-card">
                  <div className="ps-image-col ps-mobile-image-col">
                    <div className="ps-browser-frame ps-mobile-browser">
                      <div className="ps-browser-bar">
                        <div className="ps-browser-dots">
                          <span className="ps-browser-dot" />
                          <span className="ps-browser-dot" />
                          <span className="ps-browser-dot" />
                        </div>
                        <span className="ps-browser-label">{project.title}</span>
                      </div>
                      <div className="ps-image-area">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="ps-image-placeholder" aria-hidden="true" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="ps-mobile-content">
                    <span className="ps-project-number">{project.number}</span>
                    <h3 className="ps-project-title">{project.title}</h3>
                    {project.description && (
                      <p className="ps-project-desc">{project.description}</p>
                    )}
                    {project.technologies?.length > 0 && (
                      <div className="ps-project-tags" role="list" aria-label="Technologies used">
                        {project.technologies.map((t) => (
                          <span key={t} className="ps-project-tag" role="listitem">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.liveUrl ? (
                      <a
                        className="ps-project-cta"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project <ArrowIcon />
                      </a>
                    ) : (
                      <span className="ps-project-cta" aria-label="View project (link coming soon)">
                        View Project <ArrowIcon />
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="ps-mobile-progress">
            <ProgressIndicator
              activeIndex={activeIndex}
              total={projects.length}
            />
          </div>
        </div>
      )}
    </>
  );
}
