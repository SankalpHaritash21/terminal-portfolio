import { geminiService } from "../services/geminiService";
import { personalInfo } from "../data/personalInfo";

interface CommandResult {
  content: string | JSX.Element;
  type: "output" | "error" | "ai";
}

class CommandProcessor {
  async processCommand(input: string): Promise<CommandResult> {
    const parts = input.trim().split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case "help":
        return this.showHelp();

      case "about":
        return this.showAbout();

      case "skills":
        return this.showSkills();

      case "projects":
        return this.showProjects();

      case "experience":
        return this.showExperience();

      case "resume":
        return this.showResume();

      case "socials":
        return this.showSocials();

      case "ask":
        return this.askAI(args.join(" "));

      case "joke":
        return this.getJoke();

      case "inspire":
        return this.getInspiration();

      case "clear":
      case "cls":
        return { content: "CLEAR_COMMAND", type: "output" };

      case "sudo":
        if (args.join(" ") === "rm -rf /*") {
          return this.sudoRmRf();
        }
        return {
          content: `sudo: ${args.join(" ")}: command not found`,
          type: "error",
        };

      case "ls":
        return this.listDirectory();

      case "pwd":
        return { content: "/home/JupiterCodes/portfolio", type: "output" };

      case "whoami":
        return { content: "JupiterCodes", type: "output" };

      case "date":
        return { content: new Date().toString(), type: "output" };

      case "uname":
        return {
          content: "Portfolio-OS 2.1.0 Terminal x86_64",
          type: "output",
        };

      default:
        return {
          content: `Command not found: ${command}. Type 'help' for available commands.`,
          type: "error",
        };
    }
  }

  private showHelp(): CommandResult {
    const helpText = `
Available Commands:
═══════════════════

Portfolio Commands:
  about          - Display bio and role information
  skills         - Show technical skills and expertise
  projects       - List recent projects with links
  experience     - Show work and education timeline
  resume         - View and download resume
  socials        - Display social media links

AI-Powered Commands:
  ask <question> - Ask the AI assistant anything
  joke           - Get a programming joke
  inspire        - Get an inspirational quote

System Commands:
  help           - Show this help message
  clear          - Clear the terminal screen
  ls             - List directory contents
  pwd            - Show current directory
  whoami         - Display current user
  date           - Show current date and time
  uname          - Show system information

 Don't Commands:
  sudo rm -rf /* - Don't try this at home!

Navigation:
  ↑/↓ arrows     - Navigate command history
  Tab            - Auto-complete commands
  
Try typing 'about' to learn more about me!
`;
    return { content: helpText, type: "output" };
  }

  private showAbout(): CommandResult {
    const aboutText = `
╔══════════════════════════════════════════════════════════════╗
║                        ABOUT ME                              ║
╚══════════════════════════════════════════════════════════════╝

Name:     ${personalInfo.name}
Role:     ${personalInfo.title}

${personalInfo.bio}

Location: India 🇮🇳
Status:   Open to opportunities
Focus:    Building intelligent systems that solve real problems

Fun fact: I love combining traditional terminal aesthetics 
         with modern AI capabilities - just like this portfolio!

Type 'skills' to see my technical expertise or 'projects' to view my work.
`;
    return { content: aboutText, type: "output" };
  }

  private showSkills(): CommandResult {
    const skillsText = `
╔══════════════════════════════════════════════════════════════╗
║                     TECHNICAL SKILLS                         ║
╚══════════════════════════════════════════════════════════════╝

Programming Languages:
▪ Python 
▪ JavaScript 
▪ TypeScript

AI/ML & Data Science:
▪ TensorFlow      ▪ PyTorch         ▪ Scikit-learn
▪ Computer Vision ▪ NLP             ▪ Deep Learning
▪ Data Analysis   ▪ MLOps

Web Development:
▪ React
▪ Node.js
▪ Tailwind CSS
▪ Next.js

Databases & Cloud:
▪ MongoDB    ▪ PostgreSQL   ▪ AWS        ▪ Docker
▪ Redis      ▪ Firebase     ▪ MySQL      ▪ Kubernetes

Tools & Others:
▪ Git/GitHub ▪ Linux       ▪ Docker      ▪ API Design
▪ Testing    ▪ CI/CD       ▪ System Design

${personalInfo.skills.length} skills mastered and counting...
`;
    return { content: skillsText, type: "output" };
  }

  private showProjects(): CommandResult {
    let projectsText = `
╔══════════════════════════════════════════════════════════════╗
║                      MY PROJECTS                             ║
╚══════════════════════════════════════════════════════════════╝

`;

    personalInfo.projects.forEach((project, index) => {
      projectsText += `
[${index + 1}] ${project.name}
${"-".repeat(project.name.length + 4)}
Description: ${project.description}
Tech Stack:  ${project.tech.join(" • ")}`;

      if (project.github) {
        projectsText += `\nGitHub:      ${project.github}`;
      }

      if (project.live) {
        projectsText += `\nLive Demo:   ${project.live}`;
      }

      projectsText += "\n";
    });

    projectsText += `
Total Projects: ${personalInfo.projects.length}
All projects are available on my GitHub profile.

Want to know more about any project? Ask my AI: 'ask tell me about [project name]'
`;

    return { content: projectsText, type: "output" };
  }

  private showExperience(): CommandResult {
    let expText = `
╔══════════════════════════════════════════════════════════════╗
║                    EXPERIENCE & EDUCATION                    ║
╚══════════════════════════════════════════════════════════════╝

`;

    personalInfo.experience.forEach((exp, index) => {
      expText += `
${index + 1}. ${exp.title}
   ${exp.company} | ${exp.period}
   ${exp.description}
`;
    });

    expText += `
Career Timeline: ${personalInfo.experience.length} key positions
Current Focus: AI/ML Research & Development

Looking for new opportunities in AI/ML and full-stack development!
`;

    return { content: expText, type: "output" };
  }

  private showResume(): CommandResult {
    const resumeText = `
╔══════════════════════════════════════════════════════════════╗
║                         RESUME                               ║
╚══════════════════════════════════════════════════════════════╝

📄 My complete resume is available for download:

🔗 Download Link: ${personalInfo.resumeLink}

The resume includes:
• Detailed work experience and projects
• Complete list of technical skills
• Education and certifications
• Contact information
• References and recommendations

Format: PDF | Last Updated: ${new Date().toLocaleDateString()}

You can also view my experience here by typing 'experience'
or check out my projects with 'projects'.
`;
    return { content: resumeText, type: "output" };
  }

  private showSocials(): CommandResult {
    let socialsText = `
╔══════════════════════════════════════════════════════════════╗
║                   SOCIAL MEDIA & CONTACT                     ║
╚══════════════════════════════════════════════════════════════╝

Connect with me on:

`;

    Object.entries(personalInfo.socials).forEach(([platform, url]) => {
      const icon = this.getSocialIcon(platform);
      socialsText += `${icon} ${platform.padEnd(12)} ${url}\n`;
    });

    socialsText += `
📫 Feel free to reach out for:
   • Collaboration opportunities
   • Technical discussions
   • Project partnerships
   • Career opportunities

🤝 Always open to connecting with fellow developers and AI enthusiasts!
`;

    return { content: socialsText, type: "output" };
  }

  private getSocialIcon(platform: string): string {
    const icons: Record<string, string> = {
      GitHub: "🐙",
      LinkedIn: "💼",
      Twitter: "🐦",
      Email: "📧",
      Portfolio: "🌐",
      Instagram: "📷",
    };
    return icons[platform] || "🔗";
  }

  private async askAI(question: string): Promise<CommandResult> {
    if (!question.trim()) {
      return {
        content: "Please provide a question. Usage: ask <your question>",
        type: "error",
      };
    }

    try {
      const response = await geminiService.askQuestion(question);
      return { content: `🤖 AI Assistant: ${response}`, type: "ai" };
    } catch (error) {
      return {
        content: `AI service error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        type: "error",
      };
    }
  }

  private async getJoke(): Promise<CommandResult> {
    try {
      const joke = await geminiService.getJoke();
      return { content: `😄 ${joke}`, type: "ai" };
    } catch {
      return { content: "Error getting joke. Try again later!", type: "error" };
    }
  }

  private async getInspiration(): Promise<CommandResult> {
    try {
      const quote = await geminiService.getInspiration();
      return { content: `✨ ${quote}`, type: "ai" };
    } catch {
      return {
        content: "Error getting inspiration. Try again later!",
        type: "error",
      };
    }
  }

  private listDirectory(): CommandResult {
    const dirText = `
total 7
drwxr-xr-x  2 sankalp sankalp  4096 ${new Date().toLocaleDateString()} ./
drwxr-xr-x  3 root    root     4096 ${new Date().toLocaleDateString()} ../
-rw-r--r--  1 sankalp sankalp   420 ${new Date().toLocaleDateString()} about.txt
-rw-r--r--  1 sankalp sankalp  1337 ${new Date().toLocaleDateString()} skills.txt
-rw-r--r--  1 sankalp sankalp  2048 ${new Date().toLocaleDateString()} projects.txt
-rw-r--r--  1 sankalp sankalp   654 ${new Date().toLocaleDateString()} experience.txt
-rw-r--r--  1 sankalp sankalp   321 ${new Date().toLocaleDateString()} resume.pdf
-rw-r--r--  1 sankalp sankalp   128 ${new Date().toLocaleDateString()} socials.txt
-rwxr-xr-x  1 sankalp sankalp  4096 ${new Date().toLocaleDateString()} ai_assistant*

Use commands like 'about', 'skills', 'projects' etc. to read these files.
`;
    return { content: dirText, type: "output" };
  }

  private sudoRmRf(): CommandResult {
    const stages = [
      "Removing /usr... ",
      "Removing /var... ",
      "Removing /etc... ",
      "Removing /home... ",
      "System destroyed successfully! 💥",
      "",
      "Just kidding! 😄",
      "This is a portfolio website, not an actual Linux system.",
      "No files were harmed in the making of this joke.",
      "",
      'Pro tip: Never run "sudo rm -rf /*" on a real system!',
      "It would delete everything irreversibly.",
      "",
      "Stay safe and keep coding! 👨‍💻",
    ];

    return { content: stages.join("\n"), type: "ai" };
  }
}

export const commandProcessor = new CommandProcessor();
