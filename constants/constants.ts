import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaBook,
  FaLightbulb,
  FaGlobe,
  FaChess,
  FaRobot,
  FaBrain,
  FaNetworkWired,
  FaLayerGroup,
  FaMobileAlt,
  FaPuzzlePiece,
  FaSitemap,
  FaGit,
} from "react-icons/fa";
import { VscLightbulbSparkle } from "react-icons/vsc";
import {
  Code,
  Palette,
  Smartphone,
  ShoppingCart,
  FileCode,
  Zap,
  Users,
  LayoutIcon,
  BrainCircuit,
  Handshake,
} from "lucide-react";

import { RiFolderSettingsLine } from "react-icons/ri";
import { TbEyeSearch, TbSeo } from "react-icons/tb";

import { FcAbout, FcServices, FcOvertime } from "react-icons/fc";
import { GoProjectSymlink } from "react-icons/go";
import { GrContact } from "react-icons/gr";
import { PiUserFocusBold } from "react-icons/pi";

import {
  SiBootstrap,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiGit,
  SiDocker,
  SiMongodb,
  SiPrisma,
  SiMysql,
  SiSqlite,
  SiFigma,
  SiPostgresql,
  SiVercel,
  SiCss3,
  SiGraphql,
  SiHtml5,
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
    label: "Full-Stack Development",
    icon: FaLayerGroup,
  },
  {
    label: "Research",
    icon: FaBook,
  },
  {
    label: "Strategic Games",
    icon: FaChess,
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
    label: "Network Architecture",
    icon: FaNetworkWired,
  },
  {
    label: "Technology Trends",
    icon: FaGlobe,
  },
  {
    label: "Innovation",
    icon: FaLightbulb,
  },
  {
    label: "Problem Solving",
    icon: FaPuzzlePiece,
  },
  {
    label: "Responsive Design",
    icon: FaMobileAlt,
  },
  {
    label: "Design Systems",
    icon: FaSitemap,
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
    name: "UI/UX Design",
    icon: BiShapePolygon,
    description:
      "Creating intuitive and visually appealing user interfaces with a focus on user experience, accessibility, and seamless navigation. Delivering user-centered solutions that enhance engagement and satisfaction.",
  },
  {
    name: "Full-Stack Development",
    icon: BiCode,
    description:
      "Comprehensive development of web applications, covering both front-end and back-end aspects. Utilizing modern technologies to create robust, scalable, and efficient solutions tailored to unique business requirements.",
  },
  {
    name: "Graphic Design",
    icon: BiPalette,
    description:
      "Crafting visually striking designs that effectively communicate brand identity across various mediums. From logos to marketing materials, creating cohesive visual experiences that resonate with target audiences.",
  },
  {
    name: "Custom Website Design",
    icon: BiPalette,
    description:
      "Tailored website designs reflecting brand identity, user experience, and industry standards for optimal engagement. Adapting quickly to diverse client needs and delivering high-quality work.",
  },
  {
    name: "Responsive Development",
    icon: BiMobileAlt,
    description:
      "Developing modern responsive web applications with fluid layouts, ensuring seamless user experience across various devices and screen sizes.",
  },
  {
    name: "E-commerce Solutions",
    icon: BiCartAlt,
    description:
      "Building online stores with intuitive interfaces, secure payment gateways, and customizable features for efficient transactions. Optimizing user flow to enhance conversion rates.",
  },
  {
    name: "CMS Integration",
    icon: BiEdit,
    description:
      "Integrating content management systems for easy website management, updates, and content publishing. Empowering clients to maintain their digital presence efficiently.",
  },
  {
    name: "SEO Optimization",
    icon: BiSearchAlt2,
    description:
      "Implementing strategies to improve website visibility, attract organic traffic, and enhance search engine ranking. Staying current with industry trends to provide innovative solutions.",
  },
  {
    name: "Maintenance & Support",
    icon: BiWrench,
    description:
      "Providing ongoing maintenance, timely updates, and dedicated support to ensure website performance and security. Offering flexible solutions to meet diverse client needs.",
  },
  {
    name: "Website Security",
    icon: BiShieldAlt,
    description:
      "Implementing robust security measures to safeguard websites from cyber threats, data breaches, and malicious attacks. Ensuring client and user data protection.",
  },
  {
    name: "Performance Optimization",
    icon: BiRocket,
    description:
      "Enhancing website speed, performance, and loading times for improved user experience and search engine ranking. Utilizing industry best practices for optimal results.",
  },
];

export const TechnicalskillsData = [
  { label: "UI/UX Design", icon: Palette },
  { label: "Full-Stack Development", icon: Code },
  { label: "Graphic Design", icon: Smartphone },
  { label: "Responsive Web Design", icon: LayoutIcon },
  { label: "Version Control (Git)", icon: FaGit },
  { label: "E-commerce Development", icon: ShoppingCart },
  { label: "CMS Integration", icon: FileCode },
  { label: "SEO Optimization", icon: TbSeo },
  { label: "Performance Optimization", icon: Zap },
];
export const SoftskillsData = [
  { label: "Problem-solving", icon: BrainCircuit },
  { label: "Effective Communication", icon: Handshake },
  { label: "Collaboration", icon: Users },
  { label: "Time Management", icon: FcOvertime },
  { label: "Critical Thinking", icon: VscLightbulbSparkle },
  { label: "User-Centered Approach", icon: PiUserFocusBold },
  { label: "Project Management", icon: RiFolderSettingsLine },
  { label: "Attention to Detail", icon: TbEyeSearch },
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
  // **Design Tools**
  {
    label: "Figma",
    value: 95,
    icon: SiFigma,
    href: "/figma.png",
  },

  // **Core Development Technologies**
  {
    label: "JavaScript",
    value: 90,
    icon: SiJavascript,
    href: "/javascript.png",
  },
  {
    label: "TypeScript",
    value: 85,
    icon: SiTypescript,
    href: "/typescript.png",
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

  // **HTML and CSS**
  {
    label: "HTML",
    value: 90,
    icon: SiHtml5,
    href: "/html.png",
  },
  {
    label: "CSS",
    value: 85,
    icon: SiCss3,
    href: "/css.png",
  },

  // **Styling and Design Libraries**
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

  // **APIs**
  {
    label: "GraphQL",
    value: 80,
    icon: SiGraphql,
    href: "/graphql.png",
  },
  // {
  //   label: "REST APIs",
  //   value: 85,
  //   icon: ,
  //   href: "/restapi.png",
  // },

  // **Backend and Database Technologies**
  {
    label: "Node.js",
    value: 75,
    icon: SiNodedotjs,
    href: "/nodejs.png",
  },
  {
    label: "Prisma",
    value: 80,
    icon: SiPrisma,
    href: "/prisma.png",
  },
  {
    label: "PostgreSQL",
    value: 80,
    icon: SiPostgresql,
    href: "/postgresql.png",
  },
  {
    label: "MongoDB",
    value: 80,
    icon: SiMongodb,
    href: "/mongodb.png",
  },
  {
    label: "Sqlite",
    value: 90,
    icon: SiSqlite,
    href: "/sqlite.png",
  },
  {
    label: "MySQL",
    value: 70,
    icon: SiMysql,
    href: "/mysql.png",
  },

  // **Version Control and Collaboration**
  {
    label: "Git",
    value: 85,
    icon: SiGit,
    href: "/git.png",
  },

  // **Containerization and Deployment**
  {
    label: "Docker",
    value: 75,
    icon: SiDocker,
    href: "/docker.png",
  },
  {
    label: "Vercel",
    value: 85,
    icon: SiVercel,
    href: "/vercel.png",
  },
];

export const projects = [
  {
    name: "Estien Management System",
    shortDescription:
      "A comprehensive management system for a cryptocurrency investment firm in Kenya. Includes user and admin dashboards, allowing seamless management of users, investments, and returns.",
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
      "A comprehensive and modern website highlighting Wachno Engineering&apos;s industrial prowess, featuring project portfolios, service offerings, and user-friendly navigation",
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
    name: "Peter Mwangi",
    description:
      "Versatile professional offering UI/UX design, front-end and full-stack development. Innovative problem-solver delivering user-centered solutions. Strength lies in adapting quickly and delivering high-quality work across various domains. Years of freelance experience in creating user-centered designs and developing modern responsive web applications. Self-taught background with a passion for continuous learning, staying current with industry trends and providing innovative solutions to diverse client needs.",
    address: "Nairobi, Kenya",
    phone: "0111968301",
    email: "annahirpeters@gmail.com",
  },
  experience: [
    {
      title: "UI/UX Designer",
      date: "2019 - Present",
      company: "Self-employed",
      responsibilities: [
        "Design user-centered interfaces for web and mobile applications",
        "Create intuitive and engaging user experiences",
        "Conduct user research and usability testing",
        "Develop wireframes, prototypes, and high-fidelity mockups",
        "Collaborate with clients to understand project requirements and deliver tailored solutions",
      ],
    },
    {
      title: "Full-Stack Developer",
      date: "2020 - Present",
      company: "Self-employed",
      responsibilities: [
        "Develop and maintain web applications from concept to deployment",
        "Create responsive and intuitive full-stack solutions using modern web technologies",
        "Implement server-side logic and integrate with databases",
        "Optimize applications for maximum speed and scalability",
        "Collaborate with cross-functional teams to define and develop new features",
      ],
    },
    {
      title: "Graphic Designer",
      date: "2019 - Present",
      company: "Self-employed",
      responsibilities: [
        "Design engaging logos that effectively represent client brands",
        "Create eye-catching graphics for various digital and print media",
        "Develop visually appealing designs for web and mobile applications",
        "Collaborate with clients to understand their vision and translate it into design concepts",
        "Ensure consistent branding across various platforms and mediums",
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
    "Proven ability to adapt quickly and deliver high-quality work across various domains",
    "Strong portfolio demonstrating diverse range of successful projects in UI/UX design, full-stack development, and graphic design",
    "Passion for staying current with industry trends and providing innovative solutions",
  ],
};
