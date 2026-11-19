export interface Project {
  id: string;
  title: string;
  category: string;
  tagline?: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  image?: string;
  badge?: string;
  highlight?: string;
}

export interface Pillar {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  primaryStat: string;
  statLabel: string;
  badgeText: string;
  badgeColor?: string;
  technologies: string[];
}

export const portfolioConfig = {
  name: "RUBY",
  tagline: "Aspiring Full-Stack & AI Automation Developer",
  githubUsername: "rubybuildsdev",
  githubUrl: "https://github.com/rubybuildsdev",
  email: "rubykln80@gmail.com",
  location: "Indonesia",

  hero: {
    badgeText: "OPEN TO LEARN • EXPLORE MY WORK • ",
    heading1: "CODE",
    heading2: "LEARN",
    heading3: "REPEAT",
    card1: {
      tag: "Currently Learning",
      title: "React & Node.js",
      stat: "Full-Stack Roadmap",
      points: "Daily Coding Streak"
    },
    card2: {
      handle: "rubybuildsdev",
      title: "GitHub Activity",
      stat: "Active Repositories",
      status: "Building everyday"
    }
  },

  pillars: [
    {
      id: "frontend",
      step: "PILLAR 01",
      title: "FRONTEND BASICS",
      subtitle: "Building responsive, modern, & interactive web UIs",
      primaryStat: "REACT + TS",
      statLabel: "Modern UI",
      badgeText: "TAILWIND CSS",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Three.js", "Vite"]
    },
    {
      id: "backend",
      step: "PILLAR 02",
      title: "BACKEND EXPLORATION",
      subtitle: "Understanding servers, REST APIs, & database persistence",
      primaryStat: "NODE + EXP",
      statLabel: "API Systems",
      badgeText: "REST APIs",
      technologies: ["PHP Native", "Node.js", "Express.js", "MySQL", "PostgreSQL"]
    },
    {
      id: "tools",
      step: "PILLAR 03",
      title: "TOOLS & AI INTEGRATION",
      subtitle: "Version control, AI assistance, & deployment pipelines",
      primaryStat: "GIT & MCP",
      statLabel: "Modern Flow",
      badgeText: "GEMINI API",
      technologies: ["Git", "GitHub", "Gemini API", "Linux / CLI", "Vercel"]
    }
  ],

  projects: [
    {
      id: "pink-outdoor",
      title: "Pink Outdoor",
      category: "FULLSTACK SYSTEM",
      tagline: "Outdoor Equipment Rental Management System",
      description: "A web-based outdoor equipment rental system designed to simplify equipment management, customer bookings, payment processing, and administrative operations.",
      tags: ["PHP Native", "MySQL", "Bootstrap", "Google OAuth 2.0", "SweetAlert2"],
      githubUrl: "https://github.com/rubybuildsdev/pink-outdoor",
      demoUrl: "",
      image: "/images/projects/pink-outdoor/project-1-cover.png",
      badge: "FEATURED",
      highlight: "Booking & Payment Workflow"
    },
    {
      id: "cube-solver",
      title: "CubeSolver 3D",
      category: "INTERACTIVE 3D",
      tagline: "Interactive 3D Rubik's Cube Simulator & Solver",
      description: "An interactive 3D Rubik's Cube application featuring cube simulation, Kociemba Two-Phase solving algorithm, and beginner-friendly learning tools.",
      tags: ["React", "Three.js", "Tailwind CSS", "Vite", "Vitest"],
      githubUrl: "https://github.com/rubybuildsdev/cube.git",
      demoUrl: "https://cubesolving.vercel.app",
      image: "/images/projects/cube-solver/gif-cube-solver.gif",
      badge: "FEATURED",
      highlight: "3D Simulation & Kociemba Solver"
    },
    {
      id: "warung-ai",
      title: "WarungAI",
      category: "AI & POS APPLICATION",
      tagline: "AI-Powered POS & Business Management for Small Shops",
      description: "An in-development smart point-of-sale application concept for Indonesian traditional shops with voice-to-transaction, inventory alerts, and AI business insights.",
      tags: ["React Native", "Expo", "Node.js", "Express.js", "PostgreSQL", "Gemini API"],
      githubUrl: "https://github.com/rubybuildsdev/warungai.git",
      demoUrl: "",
      image: "/images/projects/warungai.webp",
      badge: "AI INTEGRATION",
      highlight: "Voice-to-Transaction & Gemini API"
    }
  ] as Project[],

  journey: [
    {
      period: "The Spark",
      title: "Discovered Web Development",
      description: "Started with the fundamentals: HTML semantics, modern CSS layouts (Flexbox & Grid), and basic JavaScript logic."
    },
    {
      period: "Leveling Up",
      title: "Embracing React & Modern Tooling",
      description: "Moved to React, TypeScript, and Tailwind CSS. Built interactive 3D simulations (CubeSolver) and learned component architecture."
    },
    {
      period: "Current Focus",
      title: "Full-Stack & AI Integration",
      description: "Developing rental systems (Pink Outdoor) and experimenting with Gemini API & Node.js backends for real-world automation (WarungAI)."
    },
    {
      period: "Next Milestones",
      title: "Databases, Multi-Agent & Deployment",
      description: "Deepening knowledge in PostgreSQL, multi-agent workflows, mobile cross-platform apps, and scalable system design."
    }
  ]
};
