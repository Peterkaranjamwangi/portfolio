// prisma/seed.ts

import {
  PrismaClient,
  UserRole,
  PostStatus,
  ProjectStatus,
  SkillType,
  TechCategory,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      name: "Alice Johnson",
      email: "alice@example.com",
      password: "password123",
      role: UserRole.USER,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Bob Smith",
      email: "bob@example.com",
      password: "password123",
      role: UserRole.EDITOR,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Charlie Davis",
      email: "charlie@example.com",
      password: "password123",
      role: UserRole.ADMIN,
    },
  });

  // Create Categories
  const [nextjs, react, javascript, tailwind, express, nodejs] =
    await prisma.category
      .createMany({
        data: [
          { name: "Next.js" },
          { name: "React" },
          { name: "JavaScript" },
          { name: "Tailwind CSS" },
          { name: "Express.js" },
          { name: "Node.js" },
        ],
      })
      .then(() =>
        Promise.all([
          prisma.category.findUnique({ where: { name: "Next.js" } }),
          prisma.category.findUnique({ where: { name: "React" } }),
          prisma.category.findUnique({ where: { name: "JavaScript" } }),
          prisma.category.findUnique({ where: { name: "Tailwind CSS" } }),
          prisma.category.findUnique({ where: { name: "Express.js" } }),
          prisma.category.findUnique({ where: { name: "Node.js" } }),
        ])
      );

  // Create Tags
  const [webDev, backend, frontend, uiUx, programming] = await prisma.tag
    .createMany({
      data: [
        { name: "Web Development" },
        { name: "Backend" },
        { name: "Frontend" },
        { name: "UI/UX" },
        { name: "Programming" },
      ],
    })
    .then(() =>
      Promise.all([
        prisma.tag.findUnique({ where: { name: "Web Development" } }),
        prisma.tag.findUnique({ where: { name: "Backend" } }),
        prisma.tag.findUnique({ where: { name: "Frontend" } }),
        prisma.tag.findUnique({ where: { name: "UI/UX" } }),
        prisma.tag.findUnique({ where: { name: "Programming" } }),
      ])
    );

  // Seed Posts with realistic content
  const posts = await prisma.post.createMany({
    data: [
      {
        title: "Getting Started with Next.js",
        subtitle: "A beginner-friendly guide to Next.js",
        content: `Next.js is a powerful React framework that enables server-side rendering and static site generation. 
        It’s designed to help developers build high-performance, SEO-friendly applications with ease. 
        In this guide, we’ll explore how to set up a basic Next.js project, create pages, and add dynamic content. 
        We’ll also cover features like API routes, image optimization, and incremental static regeneration, 
        which make Next.js ideal for modern web applications. Whether you’re building a blog, e-commerce site, 
        or a complex web app, Next.js offers a robust toolkit to streamline your development process.`,
        slug: "getting-started-with-nextjs",
        status: PostStatus.PUBLISHED,
        authorId: user1.id,
        publishedAt: new Date(),
        categories: { connect: [{ id: nextjs.id }] },
        tags: { connect: [{ id: webDev.id }, { id: frontend.id }] },
      },
      {
        title: "React Hooks: A Comprehensive Guide",
        subtitle: "Understanding and using React Hooks effectively",
        content: `React Hooks have transformed the way we write React components. Hooks allow us to manage state and side 
        effects directly in functional components, simplifying our code and making it more reusable. In this comprehensive 
        guide, we’ll dive into the most commonly used hooks like useState, useEffect, and useContext. We’ll also explore 
        custom hooks and how to organize them to make our code modular and clean. This guide aims to help developers fully 
        harness the power of React Hooks to build efficient, scalable applications.`,
        slug: "react-hooks-guide",
        status: PostStatus.PUBLISHED,
        authorId: user2.id,
        publishedAt: new Date(),
        categories: { connect: [{ id: react.id }] },
        tags: { connect: [{ id: frontend.id }, { id: programming.id }] },
      },
      {
        title: "Mastering JavaScript Closures",
        subtitle: "A deep dive into closures in JavaScript",
        content: `Closures are one of JavaScript’s most powerful and misunderstood features. A closure gives you access 
        to an outer function’s scope from an inner function. By understanding closures, developers can write more 
        efficient and functional code. This article covers the mechanics of closures, why they’re useful, and common 
        use cases, such as data encapsulation and maintaining state in async operations. Mastering closures will give 
        you a stronger grasp of JavaScript’s behavior, helping you write more reliable code.`,
        slug: "mastering-javascript-closures",
        status: PostStatus.PUBLISHED,
        authorId: user3.id,
        publishedAt: new Date(),
        categories: { connect: [{ id: javascript.id }] },
        tags: { connect: [{ id: programming.id }] },
      },
      {
        title: "Responsive Design with Tailwind CSS",
        subtitle: "Crafting responsive layouts using Tailwind CSS",
        content: `Tailwind CSS is a utility-first CSS framework that enables developers to build responsive designs quickly. 
        By using pre-defined utility classes, Tailwind makes it easy to implement responsive layouts that adapt to any screen 
        size. In this guide, we’ll walk through the basics of Tailwind and demonstrate how to create a fully responsive web 
        page. We’ll also discuss Tailwind’s approach to theming, customization, and how it can speed up development while 
        keeping your CSS code maintainable.`,
        slug: "responsive-design-with-tailwind",
        status: PostStatus.PUBLISHED,
        authorId: user1.id,
        publishedAt: new Date(),
        categories: { connect: [{ id: tailwind.id }] },
        tags: { connect: [{ id: uiUx.id }, { id: frontend.id }] },
      },
      {
        title: "Express.js Middleware Explained",
        subtitle: "Understanding the middleware pattern in Express.js",
        content: `Express.js is a popular web framework for Node.js, and middleware functions are at the core of how it 
        processes HTTP requests. Middleware allows you to handle things like request logging, authentication, and response 
        processing in a modular way. This article explores what middleware is, how it works in Express.js, and practical 
        examples of custom middleware functions. By mastering middleware, you can build more scalable and maintainable 
        Express applications.`,
        slug: "expressjs-middleware-explained",
        status: PostStatus.PUBLISHED,
        authorId: user2.id,
        publishedAt: new Date(),
        categories: { connect: [{ id: express.id }] },
        tags: { connect: [{ id: backend.id }, { id: programming.id }] },
      },
      // Add additional posts for remaining topics...
      {
        title: "Getting Started with Next.js",
        subtitle: "A beginner-friendly guide to Next.js",
        content: `Next.js is a powerful React framework that enables server-side rendering and static site generation. 
        It’s designed to help developers build high-performance, SEO-friendly applications with ease. 
        In this guide, we’ll explore how to set up a basic Next.js project, create pages, and add dynamic content. 
        We’ll also cover features like API routes, image optimization, and incremental static regeneration, 
        which make Next.js ideal for modern web applications. Whether you’re building a blog, e-commerce site, 
        or a complex web app, Next.js offers a robust toolkit to streamline your development process.`,
        slug: "getting-started-with-nextjs",
        status: PostStatus.PUBLISHED,
        authorId: user1.id,
        publishedAt: new Date(),
        categories: { connect: [{ id: nextjs.id }] },
        tags: { connect: [{ id: webDev.id }, { id: frontend.id }] },
      },
      {
        title: "React Hooks: A Comprehensive Guide",
        subtitle: "Understanding and using React Hooks effectively",
        content: `React Hooks have transformed the way we write React components. Hooks allow us to manage state and side 
        effects directly in functional components, simplifying our code and making it more reusable. In this comprehensive 
        guide, we’ll dive into the most commonly used hooks like useState, useEffect, and useContext. We’ll also explore 
        custom hooks and how to organize them to make our code modular and clean. This guide aims to help developers fully 
        harness the power of React Hooks to build efficient, scalable applications.`,
        slug: "react-hooks-guide",
        status: PostStatus.PUBLISHED,
        authorId: user2.id,
        publishedAt: new Date(),
        categories: { connect: [{ id: react.id }] },
        tags: { connect: [{ id: frontend.id }, { id: programming.id }] },
      },
      {
        title: "Mastering JavaScript Closures",
        subtitle: "A deep dive into closures in JavaScript",
        content: `Closures are one of JavaScript’s most powerful and misunderstood features. A closure gives you access 
        to an outer function’s scope from an inner function. By understanding closures, developers can write more 
        efficient and functional code. This article covers the mechanics of closures, why they’re useful, and common 
        use cases, such as data encapsulation and maintaining state in async operations. Mastering closures will give 
        you a stronger grasp of JavaScript’s behavior, helping you write more reliable code.`,
        slug: "mastering-javascript-closures",
        status: PostStatus.PUBLISHED,
        authorId: user3.id,
        publishedAt: new Date(),
        categories: { connect: [{ id: javascript.id }] },
        tags: { connect: [{ id: programming.id }] },
      },
      {
        title: "Responsive Design with Tailwind CSS",
        subtitle: "Crafting responsive layouts using Tailwind CSS",
        content: `Tailwind CSS is a utility-first CSS framework that enables developers to build responsive designs quickly. 
        By using pre-defined utility classes, Tailwind makes it easy to implement responsive layouts that adapt to any screen 
        size. In this guide, we’ll walk through the basics of Tailwind and demonstrate how to create a fully responsive web 
        page. We’ll also discuss Tailwind’s approach to theming, customization, and how it can speed up development while 
        keeping your CSS code maintainable.`,
        slug: "responsive-design-with-tailwind",
        status: PostStatus.PUBLISHED,
        authorId: user1.id,
        publishedAt: new Date(),
        categories: { connect: [{ id: tailwind.id }] },
        tags: { connect: [{ id: uiUx.id }, { id: frontend.id }] },
      },
      {
        title: "Express.js Middleware Explained",
        subtitle: "Understanding the middleware pattern in Express.js",
        content: `Express.js is a popular web framework for Node.js, and middleware functions are at the core of how it 
        processes HTTP requests. Middleware allows you to handle things like request logging, authentication, and response 
        processing in a modular way. This article explores what middleware is, how it works in Express.js, and practical 
        examples of custom middleware functions. By mastering middleware, you can build more scalable and maintainable 
        Express applications.`,
        slug: "expressjs-middleware-explained",
        status: PostStatus.PUBLISHED,
        authorId: user2.id,
        publishedAt: new Date(),
        categories: { connect: [{ id: express.id }] },
        tags: { connect: [{ id: backend.id }, { id: programming.id }] },
      },
      // New 5 posts added
      {
        title: "Node.js Streams in Practice",
        subtitle: "Leveraging streams to handle data efficiently",
        content: `Node.js streams provide an efficient way to process and transfer large amounts of data. Whether you're 
        reading files, handling HTTP requests, or working with real-time data, streams are essential in Node.js. This 
        article covers the basics of Node.js streams, including readable, writable, transform, and duplex streams. We’ll 
        also dive into real-world examples and demonstrate how to use streams to create scalable and performant applications.`,
        slug: "nodejs-streams-in-practice",
        status: PostStatus.PUBLISHED,
        authorId: user3.id,
        publishedAt: new Date(),
        categories: { connect: [{ id: nodejs.id }] },
        tags: { connect: [{ id: backend.id }, { id: programming.id }] },
      },
      {
        title: "Building a Blog with Next.js and Prisma",
        subtitle: "How to create a blog with modern technologies",
        content: `This tutorial walks through the process of building a full-featured blog with Next.js and Prisma. 
        By combining Next.js for frontend and server-side capabilities and Prisma for database access, we can create 
        a modern, scalable, and high-performing blog platform. We’ll cover setup, database modeling, API routes, 
        styling, and deploying the blog on Vercel.`,
        slug: "building-blog-nextjs-prisma",
        status: PostStatus.DRAFT,
        authorId: user1.id,
        categories: { connect: [{ id: nextjs.id }] },
        tags: { connect: [{ id: webDev.id }, { id: frontend.id }] },
      },
      {
        title: "Optimizing React Performance",
        subtitle: "Techniques for faster React applications",
        content: `Performance optimization is crucial for creating smooth and responsive React applications. This article 
        covers essential techniques for optimizing React performance, such as memoization, lazy loading, code splitting, 
        and the use of useMemo and React.memo. By applying these techniques, you can minimize re-renders, reduce the load 
        time, and create a more responsive user experience.`,
        slug: "optimizing-react-performance",
        status: PostStatus.DRAFT,
        authorId: user2.id,
        categories: { connect: [{ id: react.id }] },
        tags: { connect: [{ id: frontend.id }, { id: programming.id }] },
      },
      {
        title: "JavaScript Async Patterns",
        subtitle: "Mastering asynchronous code in JavaScript",
        content: `Asynchronous programming in JavaScript is vital for handling operations like network requests, file 
        handling, and timers. This post explores async patterns, including callbacks, promises, and async/await. 
        We’ll discuss best practices for handling async code, avoid common pitfalls like callback hell, and improve 
        readability and maintainability of async operations.`,
        slug: "javascript-async-patterns",
        status: PostStatus.DRAFT,
        authorId: user3.id,
        categories: { connect: [{ id: javascript.id }] },
        tags: { connect: [{ id: programming.id }] },
      },
      {
        title: "Styling with Tailwind in a Next.js Project",
        subtitle: "Effortlessly style Next.js apps with Tailwind",
        content: `Integrating Tailwind CSS with Next.js allows for a streamlined styling approach with utility classes 
        directly in JSX. This guide covers Tailwind setup in Next.js, including configuration, customizing themes, and 
        creating reusable components. By leveraging Tailwind’s utility-first approach, you can build responsive, cleanly 
        styled interfaces quickly.`,
        slug: "styling-tailwind-nextjs",
        status: PostStatus.DRAFT,
        authorId: user1.id,
        categories: { connect: [{ id: tailwind.id }] },
        tags: { connect: [{ id: uiUx.id }, { id: frontend.id }] },
      },
    ],
  });

  console.log("✓ Blog posts seeded");

  // ============================================
  // PORTFOLIO DATA SEEDING
  // ============================================

  // Create Technologies (Tech Stack)
  const technologies = await prisma.technology.createMany({
    data: [
      // Design Tools
      {
        label: "Figma",
        value: 95,
        icon: "SiFigma",
        href: "/figma.png",
        category: TechCategory.DESIGN,
      },
      // Frontend
      {
        label: "JavaScript",
        value: 90,
        icon: "SiJavascript",
        href: "/javascript.png",
        category: TechCategory.FRONTEND,
      },
      {
        label: "TypeScript",
        value: 85,
        icon: "SiTypescript",
        href: "/typescript.png",
        category: TechCategory.FRONTEND,
      },
      {
        label: "React",
        value: 100,
        icon: "SiReact",
        href: "/react.png",
        category: TechCategory.FRONTEND,
      },
      {
        label: "Next.js",
        value: 95,
        icon: "SiNextdotjs",
        href: "/nextjs.png",
        category: TechCategory.FRONTEND,
      },
      {
        label: "HTML",
        value: 90,
        icon: "SiHtml5",
        href: "/html.png",
        category: TechCategory.FRONTEND,
      },
      {
        label: "CSS",
        value: 85,
        icon: "SiCss3",
        href: "/css.png",
        category: TechCategory.FRONTEND,
      },
      {
        label: "Bootstrap",
        value: 85,
        icon: "SiBootstrap",
        href: "/bootstrap.png",
        category: TechCategory.FRONTEND,
      },
      {
        label: "Tailwind CSS",
        value: 80,
        icon: "SiTailwindcss",
        href: "/tailwind.png",
        category: TechCategory.FRONTEND,
      },
      // Backend
      {
        label: "Node.js",
        value: 75,
        icon: "SiNodedotjs",
        href: "/nodejs.png",
        category: TechCategory.BACKEND,
      },
      // Database
      {
        label: "Prisma",
        value: 80,
        icon: "SiPrisma",
        href: "/prisma.png",
        category: TechCategory.DATABASE,
      },
      {
        label: "PostgreSQL",
        value: 80,
        icon: "SiPostgresql",
        href: "/postgresql.png",
        category: TechCategory.DATABASE,
      },
      {
        label: "MongoDB",
        value: 80,
        icon: "SiMongodb",
        href: "/mongodb.png",
        category: TechCategory.DATABASE,
      },
      {
        label: "Sqlite",
        value: 90,
        icon: "SiSqlite",
        href: "/sqlite.png",
        category: TechCategory.DATABASE,
      },
      {
        label: "MySQL",
        value: 70,
        icon: "SiMysql",
        href: "/mysql.png",
        category: TechCategory.DATABASE,
      },
      // DevOps
      {
        label: "Git",
        value: 85,
        icon: "SiGit",
        href: "/git.png",
        category: TechCategory.DEVOPS,
      },
      {
        label: "Docker",
        value: 75,
        icon: "SiDocker",
        href: "/docker.png",
        category: TechCategory.DEVOPS,
      },
      {
        label: "Vercel",
        value: 85,
        icon: "SiVercel",
        href: "/vercel.png",
        category: TechCategory.DEVOPS,
      },
    ],
  });

  console.log("✓ Technologies seeded");

  // Get technologies for project connections
  const nextjsTech = await prisma.technology.findUnique({
    where: { label: "Next.js" },
  });
  const reactTech = await prisma.technology.findUnique({
    where: { label: "React" },
  });
  const typescriptTech = await prisma.technology.findUnique({
    where: { label: "TypeScript" },
  });
  const tailwindTech = await prisma.technology.findUnique({
    where: { label: "Tailwind CSS" },
  });
  const prismaTech = await prisma.technology.findUnique({
    where: { label: "Prisma" },
  });
  const postgresqlTech = await prisma.technology.findUnique({
    where: { label: "PostgreSQL" },
  });
  const framerMotion = await prisma.technology.findUnique({
    where: { label: "Framer Motion" },
  });

  // Create additional tech for projects
  await prisma.technology.create({
    data: {
      label: "Framer Motion",
      value: 85,
      icon: "Motion",
      category: TechCategory.FRONTEND,
    },
  });

  const framerMotionTech = await prisma.technology.findUnique({
    where: { label: "Framer Motion" },
  });

  // Create Projects
  await prisma.project.create({
    data: {
      name: "Estien Management System",
      shortDescription:
        "A comprehensive management system for a cryptocurrency investment firm in Kenya. Includes user and admin dashboards, allowing seamless management of users, investments, and returns.",
      image: "/estien.png",
      github: "https://github.com/karanjaupwork/estien",
      link: "https://estien.vercel.app/",
      status: ProjectStatus.COMPLETED,
      order: 1,
      technologies: {
        connect: [
          { id: nextjsTech!.id },
          { id: typescriptTech!.id },
          { id: tailwindTech!.id },
          { id: prismaTech!.id },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      name: "Wi-Fi Management and Website",
      shortDescription:
        "A comprehensive platform for a Wi-Fi service provider, featuring a user-friendly website with sections for Home, Packages, About, and Help. The system includes both admin and user dashboards.",
      image: "/net-sub.png",
      github: "https://github.com/karanjakinyanjui/net-subscription",
      link: "https://net-subscription.vercel.app/home",
      status: ProjectStatus.COMPLETED,
      order: 2,
      technologies: {
        connect: [
          { id: reactTech!.id },
          { id: nextjsTech!.id },
          { id: tailwindTech!.id },
          { id: prismaTech!.id },
          { id: typescriptTech!.id },
          { id: postgresqlTech!.id },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      name: "Company Landing Page",
      shortDescription:
        "A modern, responsive landing page for a startup development company. Showcases services, team expertise, and project portfolio with smooth animations and intuitive navigation.",
      image: "/company.png",
      github: "https://github.com/Peterkaranjamwangi/company",
      link: "https://1company.vercel.app/",
      status: ProjectStatus.COMPLETED,
      order: 3,
      technologies: {
        connect: [
          { id: nextjsTech!.id },
          { id: tailwindTech!.id },
          { id: framerMotionTech!.id },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      name: "Portfolio",
      shortDescription:
        "A sleek, dynamic website showcasing various projects and skills, crafted with creativity and powered by modern web technologies.",
      image: "/portfolio.png",
      github: "https://github.com/Peterkaranjamwangi/portfolio-colab",
      link: "https://portfolio-colab.vercel.app/#hire-me",
      status: ProjectStatus.COMPLETED,
      order: 4,
      technologies: {
        connect: [
          { id: typescriptTech!.id },
          { id: reactTech!.id },
          { id: tailwindTech!.id },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      name: "Wachno Engineering",
      shortDescription:
        "A comprehensive and modern website highlighting Wachno Engineering's industrial prowess, featuring project portfolios, service offerings, and user-friendly navigation",
      image: "/wachno.png",
      link: "https://wachno-engineering.vercel.app/",
      status: ProjectStatus.COMPLETED,
      order: 5,
      technologies: {
        connect: [
          { id: typescriptTech!.id },
          { id: reactTech!.id },
          { id: tailwindTech!.id },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      name: "skillup: e-learning site",
      shortDescription:
        "Dynamic e-learning platform offering diverse courses, interactive modules, expert-led instruction, and personalized learning paths for skill enhancement.",
      image: "/skillup.png",
      link: "https://skillup-dusky.vercel.app/",
      status: ProjectStatus.IN_PROGRESS,
      order: 6,
      technologies: {
        connect: [{ id: reactTech!.id }, { id: tailwindTech!.id }],
      },
    },
  });

  await prisma.project.create({
    data: {
      name: "Lotus lounge hair salon UI",
      shortDescription:
        "Elegant design featuring intuitive navigation, service showcase, appointment scheduling, and stylish aesthetics.",
      image: "/lotus.png",
      link: "https://lotus-lounge.vercel.app/",
      status: ProjectStatus.COMPLETED,
      order: 7,
      technologies: {
        connect: [{ id: reactTech!.id }, { id: tailwindTech!.id }],
      },
    },
  });

  console.log("✓ Projects seeded");

  // Create Technical Skills
  await prisma.skill.createMany({
    data: [
      { label: "UI/UX Design", type: SkillType.TECHNICAL, icon: "Palette", order: 1 },
      {
        label: "Full-Stack Development",
        type: SkillType.TECHNICAL,
        icon: "Code",
        order: 2,
      },
      {
        label: "Graphic Design",
        type: SkillType.TECHNICAL,
        icon: "Smartphone",
        order: 3,
      },
      {
        label: "Responsive Web Design",
        type: SkillType.TECHNICAL,
        icon: "LayoutIcon",
        order: 4,
      },
      {
        label: "Version Control (Git)",
        type: SkillType.TECHNICAL,
        icon: "FaGit",
        order: 5,
      },
      {
        label: "E-commerce Development",
        type: SkillType.TECHNICAL,
        icon: "ShoppingCart",
        order: 6,
      },
      {
        label: "CMS Integration",
        type: SkillType.TECHNICAL,
        icon: "FileCode",
        order: 7,
      },
      {
        label: "SEO Optimization",
        type: SkillType.TECHNICAL,
        icon: "TbSeo",
        order: 8,
      },
      {
        label: "Performance Optimization",
        type: SkillType.TECHNICAL,
        icon: "Zap",
        order: 9,
      },
    ],
  });

  // Create Soft Skills
  await prisma.skill.createMany({
    data: [
      { label: "Problem-solving", type: SkillType.SOFT, icon: "BrainCircuit", order: 1 },
      {
        label: "Effective Communication",
        type: SkillType.SOFT,
        icon: "Handshake",
        order: 2,
      },
      { label: "Collaboration", type: SkillType.SOFT, icon: "Users", order: 3 },
      { label: "Time Management", type: SkillType.SOFT, icon: "FcOvertime", order: 4 },
      {
        label: "Critical Thinking",
        type: SkillType.SOFT,
        icon: "VscLightbulbSparkle",
        order: 5,
      },
      {
        label: "User-Centered Approach",
        type: SkillType.SOFT,
        icon: "PiUserFocusBold",
        order: 6,
      },
      {
        label: "Project Management",
        type: SkillType.SOFT,
        icon: "RiFolderSettingsLine",
        order: 7,
      },
      {
        label: "Attention to Detail",
        type: SkillType.SOFT,
        icon: "TbEyeSearch",
        order: 8,
      },
    ],
  });

  console.log("✓ Skills seeded");

  // Create Services
  await prisma.service.createMany({
    data: [
      {
        name: "UI/UX Design",
        description:
          "Creating intuitive and visually appealing user interfaces with a focus on user experience, accessibility, and seamless navigation. Delivering user-centered solutions that enhance engagement and satisfaction.",
        icon: "BiShapePolygon",
        order: 1,
      },
      {
        name: "Full-Stack Development",
        description:
          "Comprehensive development of web applications, covering both front-end and back-end aspects. Utilizing modern technologies to create robust, scalable, and efficient solutions tailored to unique business requirements.",
        icon: "BiCode",
        order: 2,
      },
      {
        name: "Graphic Design",
        description:
          "Crafting visually striking designs that effectively communicate brand identity across various mediums. From logos to marketing materials, creating cohesive visual experiences that resonate with target audiences.",
        icon: "BiPalette",
        order: 3,
      },
      {
        name: "Custom Website Design",
        description:
          "Tailored website designs reflecting brand identity, user experience, and industry standards for optimal engagement. Adapting quickly to diverse client needs and delivering high-quality work.",
        icon: "BiPalette",
        order: 4,
      },
      {
        name: "Responsive Development",
        description:
          "Developing modern responsive web applications with fluid layouts, ensuring seamless user experience across various devices and screen sizes.",
        icon: "BiMobileAlt",
        order: 5,
      },
      {
        name: "E-commerce Solutions",
        description:
          "Building online stores with intuitive interfaces, secure payment gateways, and customizable features for efficient transactions. Optimizing user flow to enhance conversion rates.",
        icon: "BiCartAlt",
        order: 6,
      },
      {
        name: "CMS Integration",
        description:
          "Integrating content management systems for easy website management, updates, and content publishing. Empowering clients to maintain their digital presence efficiently.",
        icon: "BiEdit",
        order: 7,
      },
      {
        name: "SEO Optimization",
        description:
          "Implementing strategies to improve website visibility, attract organic traffic, and enhance search engine ranking. Staying current with industry trends to provide innovative solutions.",
        icon: "BiSearchAlt2",
        order: 8,
      },
      {
        name: "Maintenance & Support",
        description:
          "Providing ongoing maintenance, timely updates, and dedicated support to ensure website performance and security. Offering flexible solutions to meet diverse client needs.",
        icon: "BiWrench",
        order: 9,
      },
      {
        name: "Website Security",
        description:
          "Implementing robust security measures to safeguard websites from cyber threats, data breaches, and malicious attacks. Ensuring client and user data protection.",
        icon: "BiShieldAlt",
        order: 10,
      },
      {
        name: "Performance Optimization",
        description:
          "Enhancing website speed, performance, and loading times for improved user experience and search engine ranking. Utilizing industry best practices for optimal results.",
        icon: "BiRocket",
        order: 11,
      },
    ],
  });

  console.log("✓ Services seeded");
  console.log("\n✅ All seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
