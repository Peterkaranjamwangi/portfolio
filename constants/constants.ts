import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaNodeJs,
  FaCode,
  FaPaintBrush,
  FaBook,
  FaChartLine,
  FaLightbulb,
  FaGlobe,
  FaChess,
  FaMusic,
  FaRobot,
  FaBrain,
  FaMountain,
  FaNetworkWired,
} from "react-icons/fa";

import { FcAbout, FcServices } from "react-icons/fc";
import { GoProjectSymlink } from "react-icons/go";
import { GrContact } from "react-icons/gr";
import {
  SiBootstrap,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiStyledcomponents,
  SiRedux,
  SiGit,
  SiDocker,
  SiMongodb,
  SiPrisma,
  SiMysql,
  SiSqlite,
} from "react-icons/si";
import {
  BiPalette,
  BiMobileAlt,
  BiCartAlt,
  BiEdit,
  BiSearchAlt2,
  BiCode,
  BiWrench,
  BiShapePolygon,
  BiShieldAlt,
  BiRocket,
} from "react-icons/bi";
import { MdLibraryBooks } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";

export const CONNECT_DATA = [
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    info: "https://wa.link/1sqigc",
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    info: "https://twitter.com/WriterIBlake",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    info: "https://github.com/Peterkaranjamwangi/",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    info: "https://www.linkedin.com/in/mwangipeter/",
  },

  // {
  //   name: "Facebook",
  //   icon: FaFacebook,
  //   info: "https://www.facebook.com/karanjakinyanjui",
  // },
];

export const interestsData = [
  {
    label: "Programming",
    icon: FaCode,
  },
  {
    label: "Design",
    icon: FaPaintBrush,
  },
  {
    label: "Research",
    icon: FaBook,
  },
  {
    label: "Data Analysis",
    icon: FaChartLine,
  },
  {
    label: "Innovation",
    icon: FaLightbulb,
  },
  {
    label: "Technology Trends",
    icon: FaGlobe,
  },
  {
    label: "Strategic Games",
    icon: FaChess,
  },
  {
    label: "Music",
    icon: FaMusic,
  },
  {
    label: "Artificial Intelligence",
    icon: FaRobot,
  },
  {
    label: "Cognitive Science",
    icon: FaBrain,
  },
  {
    label: "Problem Solving",
    icon: FaMountain,
  },
  {
    label: "Network Architecture",
    icon: FaNetworkWired,
  },
];
export const TABS = [
  { name: "About", icon: FcAbout },
  { name: "Services", icon: FcServices },
  { name: "Projects", icon: GoProjectSymlink },
  { name: "Connect", icon: GrContact },
];

export const SERVICES = [
  {
    name: "Custom Website Design",
    icon: BiPalette,
    description:
      "Tailored website designs reflecting brand identity, user experience, and industry standards for optimal engagement.",
  },
  {
    name: "Responsive Development",
    icon: BiMobileAlt,
    description:
      "Developing websites with fluid layouts, ensuring seamless user experience across various devices and screen sizes.",
  },
  {
    name: "E-commerce Solutions",
    icon: BiCartAlt,
    description:
      "Building online stores with intuitive interfaces, secure payment gateways, and customizable features for efficient transactions.",
  },
  {
    name: "CMS Integration",
    icon: BiEdit,
    description:
      "Integrating content management systems for easy website management, updates, and content publishing.",
  },
  {
    name: "SEO Optimization",
    icon: BiSearchAlt2,
    description:
      "Implementing strategies to improve website visibility, attract organic traffic, and enhance search engine ranking.",
  },
  {
    name: "Custom Web Applications",
    icon: BiCode,
    description:
      "Developing bespoke web applications tailored to unique business requirements and user needs for optimal functionality.",
  },
  {
    name: "Maintenance & Support",
    icon: BiWrench,
    description:
      "Providing ongoing maintenance, timely updates, and dedicated support to ensure website performance and security.",
  },
  {
    name: "UI/UX Design",
    icon: BiShapePolygon,
    description:
      "Designing intuitive user interfaces with a focus on user experience, accessibility, and seamless navigation.",
  },
  {
    name: "Website Security",
    icon: BiShieldAlt,
    description:
      "Implementing robust security measures to safeguard websites from cyber threats, data breaches, and malicious attacks.",
  },
  {
    name: "Performance Optimization",
    icon: BiRocket,
    description:
      "Enhancing website speed, performance, and loading times for improved user experience and search engine ranking.",
  },
  {
    name: "Academic Writing",
    icon: MdLibraryBooks,
    description:
      "Professionally crafted academic content adhering to rigorous research standards, citation styles, and academic conventions for scholarly publications and presentations.",
  },
];

export const skillsData = [
  { label: "Academic Writing", value: 100 },
  { label: "UI/UX Design", value: 96 },
  { label: "Web Development", value: 96 },
  { label: "Software Development", value: 95 },
  { label: "Frontend Development ", value: 100 },
  { label: "Backend Development ", value: 90 },
  { label: "Version Control (Git)", value: 100 },
  { label: "Problem-solving", value: 90 },
  { label: "Research Skills", value: 90 },
  { label: "Critical Thinking", value: 90 },
  { label: "Project Management", value: 85 },
];

export const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const stackData = [
  {
    label: "JavaScript",
    value: 90,
    icon: SiJavascript,
    href: "/javascript.png",
  },
  {
    label: "Bootstrap",
    value: 85,
    icon: SiBootstrap,
    href: "/bootstrap.png",
  },
  {
    label: "Tailwind CSS",
    value: 80,
    icon: SiTailwindcss,
    href: "/tailwind.png",
  },
  {
    label: "React",
    value: 100,
    icon: SiReact,
    href: "/react.png",
  },
  {
    label: "Next.js",
    value: 95,
    icon: SiNextdotjs,
    href: "/nextjs.png",
  },
  {
    label: "TypeScript",
    value: 85,
    icon: SiTypescript,
    href: "/typescript.png",
  },

  {
    label: "Node.js",
    value: 75,
    icon: SiNodedotjs,
    href: "/nodejs.png",
  },
  {
    label: "Sqlite",
    value: 90,
    icon: SiSqlite,
    href: "/sqlite.png",
  },
  {
    label: "Git",
    value: 85,
    icon: SiGit,
    href: "/git.png",
  },
  {
    label: "Docker",
    value: 75,
    icon: SiDocker,
    href: "/docker.png",
  },
  {
    label: "MongoDB",
    value: 85,
    icon: SiMongodb,
    href: "/mongodb.png",
  },
  {
    label: "Prisma",
    value: 80,
    icon: SiPrisma,
    href: "/prisma.png",
  },
  {
    label: "MySQL",
    value: 70,
    icon: SiMysql,
    href: "/mysql.png",
  },
];

export const projects = [
  {
    name: "Estien Management System",
    shortDescription:
      "A comprehensive management system for a cryptocurrency investment firm in Kenya. Includes user and admin dashboards, allowing seamless management of users, investments, and returns. Built for efficiency and scalability.",
    image: "/estien.png",
    github: "https://github.com/karanjaupwork/estien",
    link: "https://estien.vercel.app/",
    status: "completed",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
  },
  {
    name: "Wi-Fi Management and Website",
    shortDescription:
      "A comprehensive platform for a Wi-Fi service provider, featuring a user-friendly website with sections for Home, Packages, About, and Help. The system includes both admin and user dashboards. Admins can manage service areas, user accounts, and monitor network performance, while users can manage subscriptions, view usage, and access support.",
    image: "/net-sub.png",
    github: "https://github.com/karanjakinyanjui/net-subscription",
    link: "https://net-subscription.vercel.app/home",
    status: "completed",
    stack: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Prisma",
      "TypeScript",
      "PostgreSQL",
    ],
  },

  {
    name: "Company Landing Page",
    shortDescription:
      "A modern, responsive landing page for a startup development company. Showcases services, team expertise, and project portfolio with smooth animations and intuitive navigation. Built for speed and engagement.",
    image: "/company.png",
    github: "https://github.com/Peterkaranjamwangi/company",
    link: "https://1company.vercel.app/",
    status: "completed",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "Portfolio",
    shortDescription:
      "A sleek, dynamic website showcasing various projects and skills, crafted with creativity and powered by modern web technologies.",
    image: "/portfolio.png",

    github: "https://github.com/Peterkaranjamwangi/portfolio-colab",
    link: "https://portfolio-colab.vercel.app/#hire-me",
    status: "completed",
    stack: ["TypeScript", "React", "Tailwind CSS"],
  },
  {
    name: "Wachno Engineering",
    shortDescription:
      "A comprehensive and modern website highlighting Wachno Engineering's industrial prowess, featuring project portfolios, service offerings, and user-friendly navigation",
    image: "/wachno.png",
    link: "https://wachno-engineering.vercel.app/",
    status: "completed",
    stack: ["TypeScript", "React", "Tailwind CSS", "Shadcn/ui"],
  },
  {
    name: "skillup: e-learning site",
    shortDescription:
      "Dynamic e-learning platform offering diverse courses, interactive modules, expert-led instruction, and personalized learning paths for skill enhancement.",
    image: "/skillup.png",

    link: "https://skillup-dusky.vercel.app/",
    status: "in progress",
    stack: ["React", "Tailwind CSS"],
  },
  {
    name: "Lotus lounge hair salon UI",
    shortDescription:
      "Elegant design featuring intuitive navigation, service showcase, appointment scheduling, and stylish aesthetics.",
    image: "/lotus.png",
    link: "https://lotus-lounge.vercel.app/",
    status: "completed",
    stack: ["React", "Tailwind CSS", "vite"],
  },
];
export const resumeData = {
  summary: {
    name: "Peter Mwangi K.",
    description:
      "Versatile UI/UX designer, front-end developer, academic writer, and freelancer with expertise in logo design, poster creation, blog writing, no-code app development, and WordPress. Self-taught professional with a passion for continuous learning and diverse project experience. Adept at delivering user-centered solutions and high-quality content across various domains.",
    address: "Nairobi, Kenya",
    phone: "0111968301",
    email: "annahirpeters@gmail.com",
  },
  skills: {
    technical: [
      "UI/UX Design",
      "React",
      "JavaScript",
      "CSS",
      "WordPress",
      "No-code Development",
    ],
    soft: [
      "Communication",
      "Problem Solving",
      "Time Management",
      "Adaptability",
      "Client Relations",
    ],
  },
  education: [
    {
      institution: "Technical University of Mombasa",
      degree: "Bachelor of Arts in Sociology",
      date: "2019 - (Incomplete)",
    },
  ],
  experience: [
    {
      title: "Freelance UI/UX Designer & Front-End Developer",
      date: "2019 - Present",
      company: "Self-employed",
      responsibilities: [
        "Design and develop user-centered interfaces for web and mobile applications",
        "Create responsive and intuitive front-end solutions using modern web technologies",
        "Collaborate with clients to understand project requirements and deliver tailored solutions",
        "Develop no-code based applications to meet diverse client needs",
        "Manage WordPress websites, including design, development, and maintenance",
      ],
    },
    {
      title: "Freelance Academic Writer",
      date: "2019 - Present",
      company: "Self-employed",
      responsibilities: [
        "Produce high-quality academic content across various subjects and disciplines",
        "Conduct thorough research and analysis to support written work",
        "Adhere to specific formatting and citation styles as required",
        "Meet tight deadlines while maintaining attention to detail and accuracy",
      ],
    },
    {
      title: "Freelance Graphic Designer",
      date: "2019 - Present",
      company: "Self-employed",
      responsibilities: [
        "Design engaging logos that effectively represent client brands",
        "Create eye-catching posters for various events and promotional campaigns",
        "Develop visually appealing graphics for social media and digital marketing",
        "Collaborate with clients to understand their vision and translate it into design concepts",
      ],
    },
    {
      title: "Freelance Content Writer",
      date: "2019 - Present",
      company: "Self-employed",
      responsibilities: [
        "Write informative and engaging blog posts on various topics",
        "Optimize content for SEO to improve online visibility",
        "Adapt writing style to match different client voices and target audiences",
        "Conduct research to ensure accuracy and relevance of content",
      ],
    },
  ],
  additionalInfo: [
    "Self-taught professional with a commitment to continuous learning and skill development",
    "Proven ability to manage multiple projects and meet deadlines in a fast-paced environment",
    "Strong portfolio demonstrating diverse range of successful projects across various domains",
  ],
};
