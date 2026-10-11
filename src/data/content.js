import {
  ReactBrandIcon,
  JavaScriptIcon,
  NodeJSBrandIcon,
  ExpressIcon,
  MongoDBIcon,
  ReduxIcon,
  RestApiIcon,
  GitIcon,
} from "../components/icons/BrandIcons";

export const projects = [
  {
    number: "01",
    title: "Component Vault",
    description:
      "A browser-based developer tool for saving, organizing, and managing reusable React code components with a built-in Monaco code editor.",
    category: "Developer Tool",
    technologies: ["React", "Vite", "Monaco Editor", "React Router", "localStorage", "CSS (BEM)"],
    features: [
      "Dual-tab Code Editor",
      "Component Collections",
      "Tag Management",
      "Global Search & Filtering",
    ],
    image: "/project-component-vault.webp",
    liveUrl: "https://componentvault.netlify.app/",
    layout: "horizontal",
  },
  {
    number: "02",
    title: "Inkheaven Tattoo Studio",
    description:
      "A complete tattoo studio management system with a public booking site, admin dashboard, and a single self-hosted n8n workflow as the backend — no database or API server.",
    category: "Frontend + n8n Backend",
    technologies: ["React 19", "Vite", "GSAP + Lenis", "n8n", "SMTP Email"],
    features: [
      "Public Booking",
      "Admin Panel",
      "SMTP Setup",
      "Styled Mails",
    ],
    image: null,
    liveUrl: "https://github.com/kumarrounakdev/inkheaven",
    layout: "horizontal",
  },
  {
    number: "03",
    title: "Developer Portfolio",
    description:
      "My own animated single-page portfolio — React 19 with a preloader, split-text hero, Lenis smooth scrolling, and a GSAP-pinned horizontal scroll for the projects section.",
    category: "Personal Portfolio",
    technologies: ["React 19", "Vite", "GSAP + ScrollTrigger", "Lenis", "Motion", "CSS"],
    features: [
      "Horizontal Scroll",
      "Animated Preloader ",
      "Dock Navigation",
      "Scroll-linked Section Animations",
    ],
    image: "/project-damas.webp",
    liveUrl: null,
    layout: "horizontal",
  },
];

export const tools = [
  { Icon: ReactBrandIcon, name: "React", category: "Frontend Library" },
  { Icon: JavaScriptIcon, name: "JavaScript", category: "Programming Language" },
  { Icon: NodeJSBrandIcon, name: "Node.js", category: "Runtime Environment" },
  { Icon: ExpressIcon, name: "Express.js", category: "Backend Framework" },
  { Icon: MongoDBIcon, name: "MongoDB", category: "NoSQL Database" },
  { Icon: ReduxIcon, name: "Redux Toolkit", category: "State Management" },
  { Icon: RestApiIcon, name: "REST API", category: "API Architecture" },
  { Icon: GitIcon, name: "Git", category: "Version Control" },
];
