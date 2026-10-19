import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../layout/SectionTitle";
import "./ContactSection.css";

// Ensure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);

  // Scroll-scrubbed reveal — intro, cards and form all move together
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const intro = el.querySelector(".contact-intro");
    const cards = el.querySelectorAll(".contact-card");
    const formChildren = el.querySelectorAll(".contact-form > *");
    const targets = [...(intro ? [intro] : []), ...cards, ...formChildren];
    if (!targets.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(targets, { opacity: 0, y: 30 });

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 50%",
        end: "top 15%",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="section-shell">
      <SectionTitle white="Let's Work" gray="Together" />

      <div className="contact-container">
        {/* Left Side: Prominent Links & Info */}
        <div className="contact-info">
          <p className="contact-intro">
            Have a project in mind or want to discuss opportunities? Feel free
            to reach out through any of the platforms below or send a message.
          </p>

          <div className="contact-cards-list">
            {/* Email Direct Link */}
            <a
              href="mailto:kumarrounak.dev@gmail.com"
              className="contact-card"
            >
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="contact-card-content">
                <span className="contact-card-label">Email</span>
                <span className="contact-card-value">kumarrounak.dev@gmail.com</span>
              </div>
              <span className="contact-card-arrow">↗</span>
            </a>

            {/* LinkedIn Link */}
            <a
              href="https://www.linkedin.com/in/kumar-rounak-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </div>
              <div className="contact-card-content">
                <span className="contact-card-label">LinkedIn</span>
                <span className="contact-card-value">linkedin.com/in/kumar-rounak-dev</span>
              </div>
              <span className="contact-card-arrow">↗</span>
            </a>

            {/* GitHub Link */}
            <a
              href="https://github.com/kumarrounakdev"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <div className="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </div>
              <div className="contact-card-content">
                <span className="contact-card-label">GitHub</span>
                <span className="contact-card-value">github.com/kumarrounakdev</span>
              </div>
              <span className="contact-card-arrow">↗</span>
            </a>
          </div>
        </div>

        {/* Right Side: Direct Contact Form */}
        <div className="contact-form-wrap">
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-grid">
              <div>
                <label className="form-label">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label">Subject</label>
              <input
                type="text"
                placeholder="Subject"
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">Message</label>
              <textarea
                placeholder="Your message here..."
                rows={4}
                className="form-textarea"
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}