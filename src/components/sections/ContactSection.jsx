import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "../layout/SectionTitle";
import "./ContactSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const formChildren = el.querySelectorAll(".contact-form > *");
    if (!formChildren.length) return;

    gsap.set(formChildren, { opacity: 0, y: 30 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(formChildren, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.2,
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="section-shell">
      <SectionTitle white="Let's Work" gray="Together" />

      <div className="contact-form-wrap">
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-grid">
            <div>
              <label className="form-label">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="Your@email.com"
                className="form-input"
              />
            </div>
          </div>

          <div>
            <label className="form-label">Budget</label>
            <select className="form-select">
              <option>Select...</option>
              <option>$1,000 - $5,000</option>
              <option>$5,000 - $10,000</option>
              <option>$10,000+</option>
            </select>
          </div>

          <div>
            <label className="form-label">Message</label>
            <textarea
              placeholder="Message"
              rows={4}
              className="form-textarea"
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
