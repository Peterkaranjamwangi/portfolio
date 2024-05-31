import {
  FaGithub,
  FaTwitter,
  FaUser,
  FaDesktop,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaDocker,
  FaNodeJs,
  FaPython,
} from "react-icons/fa";
import { GiStairsGoal, GiSkills } from "react-icons/gi";

import { FcAbout, FcGallery, FcServices } from "react-icons/fc";
import { GoProjectSymlink } from "react-icons/go";
import { GrContact } from "react-icons/gr";
import { AiOutlineConsoleSql } from "react-icons/ai";
import {
  SiPostgresql,
  SiNextdotjs,
  SiDjango,
  SiFlask,
  SiStyledcomponents,
  SiReact,
  SiRedux,
  SiBabel,
  SiGraphql,
  SiTypescript,
  SiWebpack,
} from "react-icons/si";
import {
  AiOutlineFileText,
  AiOutlineRead,
  AiOutlineEdit,
} from "react-icons/ai";
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

export const SIDE_TABS = [
  { name: "Overview", icon: FaUser },
  { name: "Skills", icon: GiSkills },
  { name: "Tools & Technologies", icon: FaDesktop },
  { name: "Gallery", icon: FcGallery },
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

export const stackData = [
  { label: "React", value: 100, icon: SiReact },
  { label: "Next.js", value: 95, icon: SiNextdotjs },
  { label: "TypeScript", value: 85, icon: SiTypescript },
  { label: "Styled Components", value: 90, icon: SiStyledcomponents },
  { label: "Node.js", value: 75, icon: FaNodeJs },
  { label: "Redux", value: 90, icon: SiRedux },
  // { label: "GraphQL", value: 80, icon: SiGraphql },
  // { label: "Webpack", value: 85, icon: SiWebpack },
  // { label: "Babel", value: 80, icon: SiBabel },
];

export const COMPANY_DATA = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1588515724527-074a7a56616c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    companyName: "Company Name 1",
    projectCategory: "Branding / Signage",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1588515724527-074a7a56616c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    companyName: "Company Name 2",
    projectCategory: "Web Design",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1588515724527-074a7a56616c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    companyName: "Company Name 3",
    projectCategory: "Graphic Design",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1588515724527-074a7a56616c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    companyName: "Company Name 4",
    projectCategory: "App Development",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1588515724527-074a7a56616c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    companyName: "Company Name 5",
    projectCategory: "Marketing Campaigns",
  },
];

export const projects = [
  {
    name: "Portfolio",
    shortDescription:
      "A sleek, dynamic website showcasing various projects and skills, crafted with creativity and powered by modern web technologies.",
    images: [
      "https://mvwigedkkabaddjgvjut.supabase.co/storage/v1/object/public/portfolio%20projects/portfolio/Screenshot_2024-05-31_at_10-05-44_Elijah_Karanja_-_Web_Developer_and_Data_Scientist.png",
      "https://mvwigedkkabaddjgvjut.supabase.co/storage/v1/object/public/portfolio%20projects/portfolio/Screenshot_2024-05-31_at_10-05-57_Elijah_Karanja_-_Web_Developer_and_Data_Scientist.png",
      "https://mvwigedkkabaddjgvjut.supabase.co/storage/v1/object/public/portfolio%20projects/portfolio/Screenshot_2024-05-31_at_10-06-09_Elijah_Karanja_-_Web_Developer_and_Data_Scientist.png",
    ],
    github: "https://github.com/Peterkaranjamwangi/portfolio-colab",
    link: "https://portfolio-colab.vercel.app/#hire-me",
    status: "completed",
    stack: ["TypeScript", "React", "Tailwind CSS"],
  },
  {
    name: "Wachno Engineering",
    shortDescription:
      "A comprehensive and modern website highlighting Wachno Engineering's industrial prowess, featuring project portfolios, service offerings, and user-friendly navigation",
    images: [
      "https://mvwigedkkabaddjgvjut.supabase.co/storage/v1/object/public/portfolio%20projects/wachno/wachno-eng.png?t=2024-05-31T07%3A12%3A22.372Z",
      "https://mvwigedkkabaddjgvjut.supabase.co/storage/v1/object/public/portfolio%20projects/wachno/wachno-eng1.png?t=2024-05-31T07%3A12%3A39.604Z",
      "https://mvwigedkkabaddjgvjut.supabase.co/storage/v1/object/public/portfolio%20projects/wachno/wachno-eng2.png?t=2024-05-31T07%3A12%3A57.324Z",
      "https://mvwigedkkabaddjgvjut.supabase.co/storage/v1/object/public/portfolio%20projects/wachno/wachno-eng3.png?t=2024-05-31T07%3A13%3A15.287Z",
      "https://mvwigedkkabaddjgvjut.supabase.co/storage/v1/object/public/portfolio%20projects/wachno/wachno-eng4.png?t=2024-05-31T07%3A13%3A31.997Z",
    ],
    github: "https://github.com/Peterkaranjamwangi/wachno-eng",
    link: "https://wachno-engineering.vercel.app/",
    status: "completed",
    stack: ["TypeScript", "React", "Tailwind CSS", "Shadcn/ui"],
  },
  {
    name: "skillup: e-learning site",
    shortDescription:
      "Dynamic e-learning platform offering diverse courses, interactive modules, expert-led instruction, and personalized learning paths for skill enhancement.",
    images: [
      "https://mvwigedkkabaddjgvjut.supabase.co/storage/v1/object/public/portfolio%20projects/wachno/wachno-eng.png?t=2024-05-31T07%3A12%3A22.372Z",
      "https://mvwigedkkabaddjgvjut.supabase.co/storage/v1/object/public/portfolio%20projects/skillup/Screenshot_2024-05-31_at_10-16-09_SkillUp_Online_Learning.png?t=2024-05-31T07%3A17%3A58.876Z",
      "https://mvwigedkkabaddjgvjut.supabase.co/storage/v1/object/public/portfolio%20projects/skillup/Screenshot_2024-05-31_at_10-16-41_SkillUp_Online_Learning.png?t=2024-05-31T07%3A18%3A37.032Z",
    ],
    github: "https://github.com/Peterkaranjamwangi/skillup",
    link: "https://skillup-dusky.vercel.app/",
    status: "in progress",
    stack: ["React", "Tailwind CSS"],
  },
  {
    name: "Lotus lounge hair salon UI",
    shortDescription:
      "Elegant design featuring intuitive navigation, service showcase, appointment scheduling, and stylish aesthetics.",
    images: [
      "https://mvwigedkkabaddjgvjut.supabase.co/storage/v1/object/public/portfolio%20projects/lotus-lounge/Screenshot_2024-05-31_at_10-20-29_Vite_React.png",
      "https://mvwigedkkabaddjgvjut.supabase.co/storage/v1/object/public/portfolio%20projects/lotus-lounge/Screenshot_2024-05-31_at_10-20-48_Vite_React.png?t=2024-05-31T07%3A22%3A26.978Z",
      "https://mvwigedkkabaddjgvjut.supabase.co/storage/v1/object/public/portfolio%20projects/lotus-lounge/Screenshot_2024-05-31_at_10-21-05_Vite_React.png?t=2024-05-31T07%3A22%3A39.128Z",
    ],
    github: "https://github.com/Peterkaranjamwangi/lotus-lounge",
    link: "https://lotus-lounge.vercel.app/",
    status: "completed",
    stack: ["React", "Tailwind CSS", "vite"],
  },
];
