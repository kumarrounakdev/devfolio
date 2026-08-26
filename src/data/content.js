import {
  FramerIcon,
  FigmaIcon,
  LemonSqueezyIcon,
  ChatGPTIcon,
  NotionIcon,
  NextJSIcon,
} from "../components/icons/BrandIcons";

export const projects = [
  {
    number: "01",
    title: "Component Vault",
    description:
      "A client-side code snippet manager for storing, organizing, searching, and managing reusable UI components.",
    technologies: ["React 19", "Vite", "Monaco Editor", "Vanilla CSS"],
    features: [
      "Create / edit / delete code components",
      "Monaco code editor",
      "Search",
      "Tag-based categorization",
      "Favorites",
      "Collections",
      "Copy code to clipboard",
    ],
    image: null,
    liveUrl: null,
  },
  {
    number: "02",
    title: "Roster HRDesk",
    description: null,
    technologies: [],
    features: [],
    image: null,
    liveUrl: null,
  },
  {
    number: "03",
    title: "NajmAI",
    description: "SaaS Framer Template",
    technologies: ["Framer"],
    features: [],
    image: "/project-najmai.jpg",
    liveUrl: null,
  },
  {
    number: "04",
    title: "Damas",
    description: "Free Framer Template",
    technologies: ["Framer"],
    features: [],
    image: "/project-damas.jpg",
    liveUrl: null,
  },
];

export const experiences = [
  {
    title: "PixelForge Studios",
    description:
      "Led the design team in creating user-centric mobile and web applications, improving the user experience and increasing user engagement.",
    date: "Jan 2020 - Present",
  },
  {
    title: "BlueWave Innovators",
    description:
      "Developed and implemented design strategies for new product lines, collaborated closely with engineers and product managers.",
    date: "Jun 2017 - Dec 2019",
  },
  {
    title: "TrendCraft Solutions",
    description:
      "Designed user interfaces for e-commerce platforms, focusing on enhancing usability and visual appeal.",
    date: "Mar 2015 - May 2017",
  },
];

export const tools = [
  { Icon: FramerIcon, name: "Framer", category: "Website Builder" },
  { Icon: FigmaIcon, name: "Figma", category: "Design Tool" },
  { Icon: LemonSqueezyIcon, name: "Lemon Squeezy", category: "Payments Provider" },
  { Icon: ChatGPTIcon, name: "ChatGPT", category: "AI Assistant" },
  { Icon: NotionIcon, name: "Notion", category: "Productivity Tool" },
  { Icon: NextJSIcon, name: "Nextjs", category: "React framework" },
];

export const blogPosts = [
  {
    title: "Starting and Growing a Career in Web Design",
    excerpt:
      "As the internet continues to develop and grow exponentially, jobs related to the industry do too, particularly those that relate to web design and development.",
    date: "Apr 8, 2022",
    readTime: "6min read",
  },
  {
    title: "Create a Landing Page That Performs Great",
    excerpt:
      "Whether you work in marketing, sales, or product design, you understand the importance of a quality landing page. Landing pages are standalone websites used to generate leads or sales—in other words they help you increase your revenue.",
    date: "Mar 15, 2022",
    readTime: "6min read",
  },
  {
    title: "How Can Designers Prepare for the Future?",
    excerpt:
      "Whether you work in marketing, sales, or product design, you understand the importance of a quality landing page. Landing pages are standalone websites used to generate leads or sales—in other words they help you increase your revenue.",
    date: "Feb 28, 2022",
    readTime: "6min read",
  },
];
