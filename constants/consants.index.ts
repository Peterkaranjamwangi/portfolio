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


export const projects = [
    {
        name: 'Portfolio',
        shortDescription: 'A personal portfolio website created using TypeScript, Tailwind CSS, and React. Showcase your skills and projects in a modern and visually appealing layout.',
        images: [
            "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2Vic2l0ZSUyMHNjcmVlbnNob3R8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdlYnNpdGUlMjBzY3JlZW5zaG90fGVufDB8fDB8fHwy"
        ],
        github: 'https://github.com/project1',
        link: 'https://project1.com',
        status: 'completed',
        stack: ['TypeScript', 'React', 'Tailwind CSS', 'java']
    },
    {
        name: 'E-commerce Website',
        shortDescription: 'An online shopping platform developed using Node.js, Express, and MongoDB. Build a scalable and secure e-commerce solution to sell products and manage orders.',
        images: [
            "https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2Vic2l0ZXN8ZW58MHx8MHx8fDI%3D",
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHdlYnNpdGVzfGVufDB8fDB8fHwy"
        ],
        github: 'https://github.com/project2',
        link: 'https://project2.com',
        status: 'in progress',
        stack: ['Node.js', 'Express', 'MongoDB']
    },
    {
        name: 'Social Media Dashboard',
        shortDescription: 'A social media analytics dashboard built with Python, Django, and PostgreSQL. Monitor user engagement, track trends, and analyze social media data from various platforms.',
        images: [
            "https://images.unsplash.com/photo-1642132652798-ae887edb9e9d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdlYnBhZ2V8ZW58MHx8MHx8fDI%3D",
            "https://images.unsplash.com/photo-1532354058425-ba7ccc7e4a24?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2VicGFnZXxlbnwwfHwwfHx8Mg%3D%3D"
        ],
        github: 'https://github.com/project3',
        link: 'https://project3.com',
        status: 'completed',
        stack: ['Python', 'Django', 'PostgreSQL']
    },
    {
        name: 'Fitness Tracker App',
        shortDescription: 'A mobile application for tracking workouts and managing fitness goals. Developed using Swift and Firebase, this app provides personalized fitness plans and progress tracking.',
        images: [
            "https://images.unsplash.com/photo-1642132652860-603f4e3c19b7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHdlYnBhZ2V8ZW58MHx8MHx8fDI%3D",
            "https://images.unsplash.com/photo-1584714268709-c3dd9c92b378?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHdlYnBhZ2V8ZW58MHx8MHx8fDI%3D"
        ],
        github: 'https://github.com/project4',
        link: 'https://project4.com',
        status: 'in progress',
        stack: ['Swift', 'Firebase']
    },
    {
        name: 'Recipe Sharing Platform',
        shortDescription: 'A web application where users can share and discover recipes. Built with Ruby on Rails and MySQL, this platform allows users to create, save, and rate recipes.',
        images: [
            "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmVjaXBlcyUyMGFuZCUyMGFycm93c3xlbnwwfHwwfHw%3D",
            "https://images.unsplash.com/photo-1648134859182-98df6e93ef58?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHdlYnBhZ2V8ZW58MHx8MHx8fDI%3D"
        ],
        github: 'https://github.com/project5',
        link: 'https://project5.com',
        status: 'completed',
        stack: ['Ruby on Rails', 'MySQL']
    },
    {
        name: 'Financial Dashboard',
        shortDescription: 'A dashboard for tracking personal finances and investments. Utilizes React, Redux, and Chart.js to provide interactive visualizations and analysis of financial data.',
        images: [
            "https://images.unsplash.com/photo-1642132652859-3ef5a1048fd1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHdlYnBhZ2V8ZW58MHx8MHx8fDI%3D",
            "https://images.unsplash.com/photo-1648134859196-3aa762e9440d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHdlYnBhZ2V8ZW58MHx8MHx8fDI%3D"
        ],
        github: 'https://github.com/project6',
        link: 'https://project6.com',
        status: 'in progress',
        stack: ['React', 'Redux', 'Chart.js']
    },
];
