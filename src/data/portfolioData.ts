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
  video?: string;
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
  tagline: "Full-Stack Developer building practical web apps, 3D simulations, and AI integrations.",
  githubUsername: "rubybuildsdev",
  githubUrl: "https://github.com/rubybuildsdev",
  email: "rubykln80@gmail.com",
  location: "Indonesia",

  hero: {
    badgeText: "CODE • SHIP • REFINE • REPEAT • ",
    heading1: "CODE",
    heading2: "LEARN",
    heading3: "REPEAT",
    card1: {
      tag: "Focus Stack",
      title: "React & Node.js",
      stat: "TypeScript First",
      points: "Building daily"
    },
    card2: {
      handle: "rubybuildsdev",
      title: "GitHub Activity",
      stat: "Public Repositories",
      status: "Active contributor"
    }
  },

  pillars: [
    {
      id: "frontend",
      step: "PILLAR 01",
      title: "FRONTEND ENGINEERING",
      subtitle: "Building responsive, type-safe interfaces with modern React, Three.js, and clean component architecture.",
      primaryStat: "REACT + TS",
      statLabel: "Modern UI",
      badgeText: "TAILWIND CSS",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Three.js", "Vite"]
    },
    {
      id: "backend",
      step: "PILLAR 02",
      title: "BACKEND SYSTEMS",
      subtitle: "Designing RESTful APIs, relational schemas, and server runtimes that handle real data reliably.",
      primaryStat: "NODE + EXP",
      statLabel: "API Systems",
      badgeText: "REST APIs",
      technologies: ["PHP Native", "Node.js", "Express.js", "MySQL", "PostgreSQL"]
    },
    {
      id: "tools",
      step: "PILLAR 03",
      title: "WORKFLOW & AI TOOLING",
      subtitle: "Leveraging modern CLI tooling, Git workflows, and LLM APIs to build practical automation.",
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
      description: "A web-based equipment rental system handling bookings, gear availability, payment workflows, and administrative control with transactional integrity.",
      tags: ["PHP Native", "MySQL", "Bootstrap", "Google OAuth 2.0", "SweetAlert2"],
      githubUrl: "https://github.com/rubybuildsdev/pink-outdoor",
      demoUrl: "",
      image: "/images/projects/pink-outdoor/project-1-cover.png",
      badge: "FEATURED",
      highlight: "State Machine & Booking Verification"
    },
    {
      id: "cube-solver",
      title: "CubeSolver 3D",
      category: "INTERACTIVE 3D",
      tagline: "Interactive 3D Rubik's Cube Simulator & Solver",
      description: "Interactive 3D cube simulation built with Three.js. Implements the Kociemba Two-Phase algorithm to calculate optimal solutions in under 20 moves.",
      tags: ["React", "Three.js", "Tailwind CSS", "Vite", "Vitest"],
      githubUrl: "https://github.com/rubybuildsdev/cube",
      demoUrl: "https://cubesolving.vercel.app",
      image: "/images/projects/cube-solver/poster.webp",
      video: "/images/projects/cube-solver/cube-solver.mp4",
      badge: "FEATURED",
      highlight: "Kociemba Two-Phase Algorithm in WebGL"
    },
    {
      id: "warung-ai",
      title: "WarungAI",
      category: "AI & POS APPLICATION",
      tagline: "AI-Assisted Point-of-Sale for Small Retailers",
      description: "A lightweight POS application concept for traditional Indonesian shops. Features voice-driven order entry via Gemini API, real-time inventory alerts, and automated bookkeeping.",
      tags: ["React Native", "Expo", "Node.js", "Express.js", "PostgreSQL", "Gemini API"],
      githubUrl: "https://github.com/rubybuildsdev/warungai",
      demoUrl: "",
      image: "/images/projects/warungai.webp",
      badge: "AI INTEGRATION",
      highlight: "Voice Order Processing via Gemini API"
    }
  ] as Project[],

  journey: [
    {
      period: "Foundation",
      title: "Web Fundamentals",
      description: "Learned semantic HTML, modern responsive CSS layouts, and vanilla JavaScript logic to build interfaces from the ground up."
    },
    {
      period: "Expansion",
      title: "React, TypeScript & 3D",
      description: "Adopted React component architecture, strict TypeScript typing, and WebGL with Three.js to build interactive simulations like CubeSolver."
    },
    {
      period: "Current Work",
      title: "Full-Stack Architecture",
      description: "Developing end-to-end applications with relational database persistence, auth workflows, and integrating AI models into practical tools like WarungAI."
    },
    {
      period: "Looking Ahead",
      title: "Scalable Systems",
      description: "Deepening knowledge in database query optimization, system resilience, and building reliable autonomous workflows."
    }
  ]
};
