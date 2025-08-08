# AI-Powered Terminal Portfolio

A unique personal portfolio website designed to look and behave like a terminal emulator, built with modern web technologies and powered by AI.

## 🚀 Features

- **Terminal-Style Interface**: Authentic Linux terminal experience with dark theme and monospace fonts
- **AI Integration**: Powered by Google Gemini API for dynamic, intelligent responses
- **Interactive Commands**: Navigate through portfolio content using terminal commands
- **Command History**: Arrow key navigation through command history
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Typing Animations**: Realistic typing effects for AI responses
- **Easter Eggs**: Fun commands and animations for an engaging experience

## 🛠️ Tech Stack

- **Frontend**: Vite + React + TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API
- **Icons**: Lucide React
- **Deployment**: Ready for Netlify/Vercel

## 📋 Available Commands

### Portfolio Commands
- `about` - Display bio and role information
- `skills` - Show technical skills and expertise
- `projects` - List recent projects with links
- `experience` - Show work and education timeline
- `resume` - View and download resume
- `socials` - Display social media links

### AI-Powered Commands
- `ask <question>` - Ask the AI assistant anything
- `joke` - Get a programming joke
- `inspire` - Get an inspirational quote

### System Commands
- `help` - Show all available commands
- `clear` - Clear the terminal screen
- `ls` - List directory contents
- `pwd` - Show current directory
- `whoami` - Display current user
- `date` - Show current date and time

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Google Gemini API key (optional for demo)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-terminal-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Add your Gemini API key to `.env`:
```bash
VITE_GEMINI_API_KEY=your_api_key_here
```

5. Start development server:
```bash
npm run dev
```

## 🎨 Customization

### Personal Information
Edit `src/data/personalInfo.ts` to customize:
- Personal bio and details
- Skills and technologies
- Projects and experience
- Social media links
- Resume link

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for global styles
- Adjust terminal colors in component files

### Commands
Add new commands in `src/utils/commandProcessor.ts`

## 🤖 AI Integration

The portfolio integrates with Google Gemini API to provide intelligent responses. The AI is context-aware and knows about your background, skills, and projects.

### Setting up Gemini API
1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to `.env` file
3. The AI will automatically have context about your portfolio

## 📱 Responsive Design

- **Mobile**: Touch-friendly interface with optimized command input
- **Tablet**: Balanced layout with good readability
- **Desktop**: Full terminal experience with keyboard shortcuts

## 🎯 Performance

- Optimized bundle size with code splitting
- Fast initial load with critical CSS inlining
- Smooth animations with CSS transforms
- Efficient re-renders with React optimization

## 🔧 Build & Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Netlify (example)
npm run build && netlify deploy --prod --dir=dist
```

## 📝 Environment Variables

```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by Linux terminal aesthetics
- Built with modern React patterns
- Powered by Google Gemini AI
- Icons by Lucide React

---

**Made with ❤️ and lots of ☕**

Type `help` in the terminal to get started!