// prisma/seed.ts

import { PrismaClient, UserRole, PostStatus } from "@prisma/client";

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

  console.log("Seeding completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
