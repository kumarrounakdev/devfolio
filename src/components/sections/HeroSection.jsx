import ProfileCard from "../cards/ProfileCard";
import SkillCards from "../cards/SkillCards";
import SectionTitle from "../layout/SectionTitle";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-row">
        {/* Profile Card */}
        <div className="hero-profile-wrap">
          <ProfileCard
            avatarUrl="/images/me.webp"
            name="Rounak Kumar"
            title="Fullstack Developer"
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
            <SectionTitle white="Fullstack" gray="Developer" tag="h1" animate={false} />
          </div>

          <p className="hero-intro">
            I build modern, end-to-end web applications using the MERN stack.
            From responsive React interfaces to robust APIs with Node.js,
            Express, and MongoDB — plus n8n automations — I craft clean,
            scalable solutions with attention to detail and user experience.
          </p>

          <div className="hero-skills-wrap">
            <SkillCards />
          </div>
        </div>
      </div>
    </section>
  );
}
