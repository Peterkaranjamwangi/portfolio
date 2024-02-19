import { FaGithub, FaTwitter, FaUser, FaCode, FaDesktop, FaDatabase, FaLinkedin, FaFacebook, FaInstagram, FaAws, FaDocker, FaJenkins, FaNodeJs, FaPython   } from 'react-icons/fa';
import { GiStairsGoal, GiSkills } from "react-icons/gi";

import {HiArchive } from "react-icons/hi";
import { FcAbout } from "react-icons/fc";
import { GoProjectSymlink } from "react-icons/go";
import { GrContact, GrGraphQl } from "react-icons/gr";
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { DiMongodb, DiRuby } from 'react-icons/di';
import { SiTensorflow, SiKubernetes, SiWebpack, SiAngular, SiLaravel, SiPostgresql, SiDjango, SiFlask } from 'react-icons/si';


export const CONNECT_DATA = [
    {
        name: "GitHub",
        icon: FaGithub,
        info: "https://github.com/karanjakinyanjui"
    },
    {
        name: "LinkedIn",
        icon: FaLinkedin,
        info: "https://www.linkedin.com/in/karanjakinyanjui/"
    },
    {
        name: "Twitter",
        icon: FaTwitter,
        info: "https://twitter.com/karanjakinyanj1"
    },
    {
        name: "Instagram",
        icon: FaInstagram,
        info: "https://www.instagram.com/karanja_kinyanjui/"
    },
    {
        name: "Facebook",
        icon: FaFacebook,
        info: "https://www.facebook.com/karanjakinyanjui"
    }
];



export const TABS = [
    { name: "About", icon: FcAbout },
    { name: "Projects", icon: GoProjectSymlink },
    { name: "Archive", icon: HiArchive },
    { name: "Connect", icon: GrContact },
];

export const SIDE_TABS = [
    { name: "Overview", icon: FaUser },
    { name: "Skills", icon: GiSkills },
    { name: "Experience", icon: GiStairsGoal },
    { name: "Tools & Technologies", icon: FaDesktop },
];

export const skillsData = [
  { label: 'HTML', value: 100 },
  { label: 'CSS', value: 100 },
  { label: 'JavaScript', value: 100 },
  { label: 'PHP', value: 80 },
  { label: 'WordPress/CMS', value: 90 },
  { label: 'React', value: 95 },
  { label: 'TypeScript', value: 90 },
  { label: 'Sass', value: 85 },
  { label: 'Vue.js', value: 90 },
  { label: 'Angular', value: 90 },
  { label: 'Git', value: 100 },
  { label: 'Data Analysis', value: 90},
  { label: 'Machine Learning', value: 93},
  { label: 'Responsive Design', value: 95 },
];

export const stackData = [
  { label: 'Node.js', value: 98, icon: FaNodeJs },
  { label: 'MongoDB', value: 100, icon: DiMongodb },
  { label: 'GraphQL', value: 90, icon: GrGraphQl },
  { label: 'Python', value: 100, icon: FaPython },
  { label: 'SQL', value: 95, icon: AiOutlineConsoleSql },
  { label: 'TensorFlow', value: 80, icon: SiTensorflow },
  { label: 'Docker', value: 100, icon: FaDocker },
  { label: 'Kubernetes', value: 90, icon: SiKubernetes },
  { label: 'AWS', value: 90, icon: FaAws },
  { label: 'Jenkins', value: 84, icon: FaJenkins },
  { label: 'Webpack', value: 89, icon: SiWebpack },
  { label: 'Angular', value: 88, icon: SiAngular  },
  { label: 'Laravel', value: 90, icon: SiLaravel  },
  { label: 'Ruby', value: 89, icon: DiRuby  },
  { label: 'PostgreSQL', value: 88, icon: SiPostgresql  },
  { label: 'Django', value: 97, icon: SiDjango  },
  { label: 'Flask', value: 92, icon: SiFlask  },
];

export const COMPANY_DATA = [
    {
        imageUrl: "https://images.unsplash.com/photo-1588515724527-074a7a56616c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        companyName: "Company Name 1",
        projectCategory: "Branding / Signage"
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1588515724527-074a7a56616c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        companyName: "Company Name 2",
        projectCategory: "Web Design"
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1588515724527-074a7a56616c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        companyName: "Company Name 3",
        projectCategory: "Graphic Design"
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1588515724527-074a7a56616c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        companyName: "Company Name 4",
        projectCategory: "App Development"
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1588515724527-074a7a56616c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        companyName: "Company Name 5",
        projectCategory: "Marketing Campaigns"
    }
];


