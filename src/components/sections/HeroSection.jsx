import { useEffect, useRef } from "react";
import gsap from "gsap";
import ProfileCard from "../cards/ProfileCard";
import SkillCards from "../cards/SkillCards";
import SectionTitle from "../layout/SectionTitle";
import "./HeroSection.css";

export default function HeroSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const profileWrap = el.querySelector(".hero-profile-wrap");
    const introText = el.querySelector(".hero-intro");
    const skillCards = el.querySelectorAll(".skill-card");

    // Set initial states
    if (profileWrap) gsap.set(profileWrap, { opacity: 0, y: 40, scale: 0.95 });
    if (introText) gsap.set(introText, { opacity: 0, y: 25 });
    if (skillCards.length) gsap.set(skillCards, { opacity: 0, y: 30 });

    const tl = gsap.timeline({ delay: 0.15 });

    // 1. Profile card reveal
    if (profileWrap) {
      tl.to(profileWrap, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: "power3.out",
      }, 0);
    }

    // 2. Intro text reveal
    if (introText) {
      tl.to(introText, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      }, 0.35);
    }

    // 3. Skill cards stagger reveal
    if (skillCards.length) {
      tl.to(skillCards, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.15,
      }, 0.55);
    }

    return () => tl.kill();
  }, []);

  return (
    <section id="home" ref={sectionRef} className="hero-section">
      <div className="hero-row">
        {/* Profile Card */}
        <div className="hero-profile-wrap">
          <ProfileCard
            avatarUrl="/images/me.png"
            name="Rounak Kumar"
            title="Frontend Developer"
            contactText="Download Resume"
            showUserInfo={true}
            onContactClick={() => {
              window.open("/resume/resume-rounak-frontend.pdf", "_blank");
            }}
            behindGlowEnabled={true}
            innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
          />
        </div>

        {/* Content */}
        <div className="hero-content">
          <div className="hero-heading">
            <SectionTitle white="Frontend" gray="Developer" tag="h1" immediate />
          </div>

          <p className="hero-intro">
            I craft modern, responsive interfaces that blend thoughtful design
            with smooth, intuitive interactions. Focused on React and
            JavaScript, I build clean, reusable interfaces with attention to
            detail and user experience.
          </p>

          <div className="hero-skills-wrap">
            <SkillCards />
          </div>
        </div>
      </div>
    </section>
  );
}
