import {
  GitHubIcon,
  LinkedInIcon,
  EmailIcon,
  PhoneIcon,
  LocationIcon,
} from "../icons/SocialIcons";
import { getLenis } from "../../utils/smoothScroll";
import "./Footer.css";

const GITHUB_URL = "https://github.com/kumarrounakdev";
const LINKEDIN_URL = "https://www.linkedin.com/in/kumar-rounak-dev/";
const EMAIL = "kumarrounak.dev@gmail.com";
const PHONE = "+91 8178782184";
const LOCATION = "Delhi, India";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Tools", href: "#tools" },
  { label: "Contact", href: "#contact" },
];

const scrollTo = (e, href) => {
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { offset: 0 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <h3 className="footer-brand-name">Rounak Kumar</h3>
          <p className="footer-brand-tagline">Fullstack Developer</p>
          <div className="footer-socials">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="footer-social-link"
              aria-label="Email"
            >
              <EmailIcon />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-col">
          <h4 className="footer-col-title">Navigation</h4>
          <ul className="footer-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="footer-link"
                  onClick={(e) => scrollTo(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-col-title">Contact</h4>
          <ul className="footer-contact-list">
            <li className="footer-contact-item">
              <EmailIcon />
              <a href={`mailto:${EMAIL}`} className="footer-link">
                {EMAIL}
              </a>
            </li>
            <li className="footer-contact-item">
              <PhoneIcon />
              <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="footer-link">
                {PHONE}
              </a>
            </li>
            <li className="footer-contact-item">
              <LocationIcon />
              <span className="footer-contact-text">{LOCATION}</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
