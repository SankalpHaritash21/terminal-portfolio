import { PersonalInfo } from '../types';

export const personalInfo: PersonalInfo = {
  name: "Sankalp Haritash",
  title: "MTech CSE Student & AI/ML Developer",
  bio: `Passionate about building intelligent systems and creating seamless user experiences. 
Currently pursuing MTech in Computer Science Engineering with a focus on AI/ML technologies.
I love exploring the intersection of artificial intelligence and web development.`,
  
  skills: [
    "Python", "JavaScript", "TypeScript", "React", "Node.js",
    "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning",
    "Tailwind CSS", "MongoDB", "PostgreSQL", "Docker", "AWS",
    "Git", "Linux", "Data Science", "Computer Vision", "NLP"
  ],
  
  projects: [
    {
      name: "AI Chat Application",
      description: "Real-time chat app with AI-powered responses using OpenAI API",
      tech: ["React", "Node.js", "Socket.io", "OpenAI API"],
      github: "https://github.com/username/ai-chat",
      live: "https://ai-chat-demo.vercel.app"
    },
    {
      name: "ML Model Deployment Platform",
      description: "Platform for deploying and managing machine learning models at scale",
      tech: ["Python", "FastAPI", "Docker", "AWS", "React"],
      github: "https://github.com/username/ml-platform"
    },
    {
      name: "Smart Code Analyzer",
      description: "AI tool that analyzes code quality and suggests improvements",
      tech: ["Python", "Transformers", "React", "TypeScript"],
      github: "https://github.com/username/code-analyzer",
      live: "https://code-analyzer.netlify.app"
    }
  ],
  
  experience: [
    {
      title: "AI/ML Research Intern",
      company: "Tech Innovation Labs",
      period: "Jun 2024 - Present",
      description: "Working on computer vision projects and deep learning model optimization"
    },
    {
      title: "Full Stack Developer",
      company: "Startup Inc.",
      period: "Jan 2023 - May 2024",
      description: "Built scalable web applications using React, Node.js, and cloud technologies"
    },
    {
      title: "MTech Student",
      company: "Indian Institute of Technology",
      period: "2023 - 2025",
      description: "Specializing in Artificial Intelligence and Machine Learning"
    }
  ],
  
  socials: {
    GitHub: "https://github.com/username",
    LinkedIn: "https://linkedin.com/in/username",
    Twitter: "https://twitter.com/username",
    Email: "sankalp@example.com"
  },
  
  resumeLink: "/resume.pdf"
};