export interface Command {
  command: string;
  args: string[];
  timestamp: Date;
}

export interface OutputLine {
  id: string;
  content: string | JSX.Element;
  type: 'command' | 'output' | 'error' | 'ai';
  timestamp: Date;
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  projects: Project[];
  experience: Experience[];
  socials: Record<string, string>;
  resumeLink: string;
}