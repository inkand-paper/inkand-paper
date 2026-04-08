export const portfolioData = {
  about: {
    name: "Abir",
    title: "Full Stack Developer & AI Engineer",
    bio: "I build interactive systems at the intersection of AI and frontend engineering. Focused on creating experiences that feel alive.",
    location: "Bangladesh",
    email: "abir@example.com",
    avatar: "/avatar.png",
  },
  skills: [
    { id: 1, name: "JavaScript", level: "Advanced", category: "language" },
    { id: 2, name: "TypeScript", level: "Advanced", category: "language" },
    { id: 3, name: "React", level: "Advanced", category: "framework" },
    { id: 4, name: "Next.js", level: "Advanced", category: "framework" },
    { id: 5, name: "Node.js", level: "Intermediate", category: "runtime" },
    { id: 6, name: "Python", level: "Intermediate", category: "language" },
    { id: 7, name: "GSAP", level: "Intermediate", category: "animation" },
    { id: 8, name: "Framer Motion", level: "Advanced", category: "animation" },
    { id: 9, name: "Tailwind CSS", level: "Advanced", category: "styling" },
    { id: 10, name: "AI Integration", level: "Advanced", category: "ai" },
  ],
  projects: [
    {
      id: 1,
      title: "Aurora AI",
      description: "A multi-modal AI system with real-time voice and vision capabilities.",
      tech: ["Next.js", "Python", "OpenAI", "WebRTC"],
      link: "https://github.com",
      hidden: false,
    },
    {
      id: 2,
      title: "MotionKit",
      description: "An open-source animation library built on top of GSAP and Framer Motion.",
      tech: ["TypeScript", "GSAP", "Framer Motion"],
      link: "https://github.com",
      hidden: false,
    },
    {
      id: 3,
      title: "NeuralChat",
      description: "Real-time AI chat with memory, context switching, and personality modes.",
      tech: ["Next.js", "Groq", "Supabase", "Zustand"],
      link: "https://github.com",
      hidden: false,
    },
    {
      id: 4,
      title: "Project Phantom",
      description: "A classified project. You weren't supposed to find this.",
      tech: ["???"],
      link: "#",
      hidden: true,
    },
  ],
  experience: [
    {
      id: 1,
      role: "Full Stack Developer",
      company: "Freelance",
      period: "2022 – Present",
      description: "Building web apps, AI integrations, and interactive experiences for clients worldwide.",
    },
    {
      id: 2,
      role: "Frontend Engineer",
      company: "Tech Startup",
      period: "2021 – 2022",
      description: "Led frontend architecture for a SaaS platform serving 10k+ users.",
    },
  ],
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
};

export type PortfolioData = typeof portfolioData;
export type Skill = typeof portfolioData.skills[0];
export type Project = typeof portfolioData.projects[0];
export type Experience = typeof portfolioData.experience[0];