import { GoogleGenAI } from "@google/genai";
import { personalInfo } from "../data/personalInfo";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "demo-key";

class GeminiService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    if (API_KEY !== "demo-key") {
      this.ai = new GoogleGenAI({ apiKey: API_KEY });
    }
  }

  private getContextPrompt(): string {
    return `You are an AI assistant integrated into ${
      personalInfo.name
    }'s terminal portfolio website.
${personalInfo.name} is ${personalInfo.title}.

Bio: ${personalInfo.bio}

Skills: ${personalInfo.skills.join(", ")}

Projects:
${personalInfo.projects
  .map((p) => `- ${p.name}: ${p.description} (${p.tech.join(", ")})`)
  .join("\n")}

Experience:
${personalInfo.experience
  .map((e) => `- ${e.title} at ${e.company} (${e.period}): ${e.description}`)
  .join("\n")}

When visitors ask about ${
      personalInfo.name
    }, answer as if you're their personal AI assistant with deep knowledge of their background. Keep responses concise and terminal-friendly (avoid excessive formatting). If asked about technical topics, you can provide general programming help as well.`;
  }

  async askQuestion(query: string): Promise<string> {
    if (!this.ai) {
      return `AI service not configured. Please set VITE_GEMINI_API_KEY environment variable.
      
For demo purposes, here's what I would tell you about "${query}":
This portfolio belongs to ${personalInfo.name}, ${personalInfo.title}. 
They specialize in ${personalInfo.skills
        .slice(0, 5)
        .join(", ")} and have worked on projects like ${
        personalInfo.projects[0]?.name
      }.`;
    }

    try {
      const prompt = `${this.getContextPrompt()}\n\nUser Query: ${query}`;

      const result = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      });

      const text =
        result.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from AI.";
      return text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return `Sorry, I encountered an error processing your request. Please try again later.`;
    }
  }

  async getJoke(): Promise<string> {
    const jokes = [
      "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
      "Why don't programmers like nature? It has too many bugs! 🌿",
      "What's a programmer's favorite hangout place? Foo Bar! 🍺",
      "Why did the programmer quit their job? They didn't get arrays! 📊",
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  async getInspiration(): Promise<string> {
    const quotes = [
      `"The best way to predict the future is to invent it." - Alan Kay`,
      `"Code is like humor. When you have to explain it, it's bad." - Cory House`,
      `"First, solve the problem. Then, write the code." - John Johnson`,
      `"Experience is the name everyone gives to their mistakes." - Oscar Wilde`,
      `"The only way to learn a new programming language is by writing programs in it." - Dennis Ritchie`,
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
}

export const geminiService = new GeminiService();
