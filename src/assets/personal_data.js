const personData = [
  {
    "id": "intro",
    "question": "Who is Durga Gairhe?",
    "answer": "Durga Gairhe is a visionary Senior Frontend Developer with 5+ years of expertise in crafting exceptional digital experiences. Currently leading frontend development at Moru Digital Wallet, where he architects scalable solutions that serve thousands of users daily. His expertise spans across modern web technologies, desktop applications, and mobile development. He is passionate about building tools that solve real problems—from rich text editors and VS Code extensions to AI-powered automation agents.",
    "category": "about",
    "tags": ["profile", "introduction", "experience", "about", "bio", "summary"]
  },
  {
    "id": "expertise",
    "question": "What makes Durga Gairhe exceptional?",
    "answer": "🚀 **Proven Track Record**: 50+ projects delivered with 100% client satisfaction.\n\n💡 **Innovation Leader**: Building DevOS AI - a revolutionary CLI + Web assistant.\n\n🎯 **Full-Stack Mastery**: From React frontends to Node.js backends, with expertise in modern databases like PostgreSQL and MongoDB.\n\n⚡ **Performance Expert**: Optimizing applications for maximum efficiency, improving app load times by 60% average.\n\n🤝 **Team Player**: Mentoring 10+ junior developers and leading cross-functional teams.",
    "category": "skills",
    "tags": ["expertise", "leadership", "innovation", "strengths", "qualities"]
  },
  {
    "id": "why-hire",
    "question": "Why should you hire Durga Gairhe?",
    "answer": "🎯 **Immediate Impact**: Delivers production-ready solutions from day one.\n\n💰 **ROI Focused**: Builds scalable applications that drive business growth, with projects generating $2M+ in client revenue.\n\n🔧 **Problem Solver**: Transforms complex requirements into elegant solutions.\n\n📈 **Future-Ready**: Stays ahead with latest technologies and best practices, including AWS Certified Solutions Architect Associate and Google Developer Expert in Web Technologies.\n\n🤝 **Reliable Partner**: Clear communication, on-time delivery, and post-launch support.\n\n✨ **Quality Assurance**: Clean, maintainable code with comprehensive testing and 500+ contributions on GitHub.",
    "category": "hiring",
    "tags": ["hiring", "benefits", "value", "reasons", "choose"]
  },
  {
    "id": "current-project",
    "question": "What is DevOS AI and why is it revolutionary?",
    "answer": "DevOS AI is Durga's flagship project - an intelligent terminal assistant combining CLI and Web interfaces using Claude/OpenRouter APIs. It revolutionizes developer workflows by:\n\n🤖 **AI-Powered Automation**: Automates repetitive coding tasks.\n⚡ **Smart Code Generation**: Generates boilerplate and complex logic.\n🔍 **Intelligent Debugging**: Identifies and suggests fixes for issues.\n📚 **Documentation Assistant**: Creates comprehensive docs automatically.\n\nThis project is built with Python, OpenRouter API, and Shell scripting.",
    "category": "projects",
    "tags": ["devos", "ai", "automation", "current", "flagship", "assistant"]
  },
  {
    "id": "frontend-skills",
    "question": "What are Durga's frontend superpowers?",
    "answer": "⚛️ **React Ecosystem**: React (95%), Next.js (90%), TypeScript (95%).\n🎨 **Styling Masters**: Tailwind CSS (92%), Framer Motion (88%), SCSS (85%).\n📱 **Mobile Development**: React Native (87%), Expo (85%), iOS Development (65%), Android Development (68%).\n🔧 **Modern Tools**: Vite, Webpack (82%), ESLint, Prettier.\n🧪 **Testing**: Jest (85%), React Testing Library, Cypress, Playwright.\n🎯 **Performance**: Code splitting, lazy loading, optimization techniques.",
    "category": "skills",
    "tags": ["frontend", "react", "typescript", "mobile", "design", "ui", "ux"]
  },
  {
    "id": "backend-skills",
    "question": "What backend technologies does Durga master?",
    "answer": "🚀 **Runtime & Frameworks**: Node.js (88%), Express.js (85%), Fastify (85%).\n🗄️ **Databases**: PostgreSQL (82%), MongoDB (80%), Redis (80%).\n📡 **APIs**: GraphQL (75%), REST APIs, tRPC.\n☁️ **Cloud & DevOps**: AWS (75%), Docker (78%), CI/CD (70%), Vercel, Netlify, Heroku.\n🔐 **Security**: JWT, OAuth, bcrypt, rate limiting.\n📊 **Monitoring**: Logging, error tracking, performance monitoring.",
    "category": "skills",
    "tags": ["backend", "nodejs", "databases", "apis", "server", "cloud"]
  },
  {
    "id": "featured-projects",
    "question": "What are Durga's most impressive projects?",
    "answer": "🏦 **Moru Digital Wallet** (React, TypeScript, Node.js)\n- Led frontend development for Nepal's leading digital wallet.\n- Implemented secure payment flows and real-time transactions.\n- Optimized for 100k+ daily active users.\n\n🤖 **AI Code Assistant** (VS Code Extension)\n- Built intelligent code suggestions using OpenAI.\n- Automated refactoring and code generation.\n- 10k+ downloads on VS Code marketplace.\n\n📝 **Rich Text Editor** (React, WebRTC)\n- Real-time collaborative editing like Google Docs.\n- Custom plugins and rich formatting options.\n- Used by 5+ companies for documentation.\n\n💡 **Web-based AI Content Generator** (React, Tailwind CSS, OpenRouter API)\n- A tool for generating AI content with a user-friendly web interface.\n\n🎨 **Web-based Drawing Tool** (React, JavaScript, HTML5 Canvas)\n- An interactive application for creative art creation directly in the browser.\n\n⏰ **Task-based Pomodoro Timer** (React, Tailwind CSS, JavaScript)\n- A productivity tool with daily progress tracking.",
    "category": "projects",
    "tags": ["projects", "moru", "ai", "editor", "generator", "drawing", "pomodoro"]
  },
  {
    "id": "achievements",
    "question": "What are Durga's key achievements?",
    "answer": "🏆 **50+ Projects Delivered**: Consistently exceeding client expectations.\n⭐ **100% Client Satisfaction**: Building long-term partnerships.\n🚀 **Performance Optimization**: Improved app load times by 60% average.\n👥 **Team Leadership**: Mentored 10+ junior developers.\n📈 **Revenue Impact**: Projects generated $2M+ in client revenue.\n🔧 **Open Source**: Active contributor with 500+ GitHub stars.\n📜 **Certifications**: AWS Certified Solutions Architect Associate, Google Developer Expert in Web Technologies.",
    "category": "achievements",
    "tags": ["achievements", "metrics", "leadership", "certifications", "success"]
  },
  {
    "id": "vision",
    "question": "What is Durga's long-term vision?",
    "answer": "🌍 To empower developers worldwide with AI-driven productivity tools.\n💡 To build platforms that democratize access to technology.\n📈 To scale ideas into products that reach millions.\n🤝 To mentor the next generation of tech leaders.",
    "category": "vision",
    "tags": ["vision", "future", "goals", "mission", "values"]
  },
  {
    "id": "education",
    "question": "What is Durga's educational background?",
    "answer": "🎓 Bachelor's Degree in Computer Science & Information Technology.\n📚 Continuous self-learner through online platforms (Coursera, Udemy, YouTube).\n🏆 Certified AWS Solutions Architect Associate.\n⭐ Recognized as Google Developer Expert in Web Technologies.",
    "category": "education",
    "tags": ["education", "degree", "certification", "learning", "background"]
  },
  {
    "id": "philosophy",
    "question": "What is Durga's development philosophy?",
    "answer": "🧩 **Simplicity First**: Clean, maintainable, and readable code.\n⚡ **Performance Oriented**: Every millisecond matters in user experience.\n🤝 **Collaboration Wins**: Building together achieves more than solo coding.\n🚀 **Future-Ready**: Code with scalability and longevity in mind.",
    "category": "philosophy",
    "tags": ["philosophy", "principles", "mindset", "approach", "values"]
  },
  {
    "id": "contact",
    "question": "How can you connect with Durga?",
    "answer": "📧 **Email**: gairhedurga13@gmail.com\n📱 **Phone**: +977 9846724440\n🌍 **Location**: Kathmandu, Nepal\n💼 **GitHub**: https://github.com/dpgaire\n⏰ **Availability**: Open for freelance projects and full-time opportunities.\n🤝 **Consultation**: Free 30-min discovery calls available.\n\n**Follow Me:**\n- LinkedIn: https://linkedin.com/in/durga-gairhe",
    "category": "contact",
    "tags": ["contact", "email", "phone", "github", "social", "connect"]
  },
  {
    "id": "availability",
    "question": "Is Durga available for new projects?",
    "answer": "✅ **Currently Available**: Open for exciting opportunities.\n🎯 **Project Types**: Full-stack web apps, mobile development, AI integration.\n⏱️ **Timeline**: Can start immediately for the right project.\n💼 **Engagement**: Freelance, contract, or full-time positions.\n🌟 **Minimum Project**: $5k+ for custom development.\n📞 **Next Steps**: Schedule a free consultation call.",
    "category": "availability",
    "tags": ["availability", "hiring", "projects", "work", "freelance"]
  },
  {
    "id": "greeting",
    "question": "Greeting you?",
    "answer": "👋 **Hello there!**\nI'm Durga — your go-to for full-stack solutions, mobile development, and AI-driven experiences.\nLet me know how I can help or ask about my availability!",
    "category": "greeting",
    "tags": ["hi", "hello", "greeting", "who", "hero", "durga", "dp", "dpg", "gaire"]
  },
  {
    "id": "ai-expertise",
    "question": "What is Durga's expertise in AI and automation?",
    "answer": "🤖 **AI Development**: Expert in building AI assistants with Python and Gemini API.\n⚡ **Automation Mastery**: Specializes in Python automation for file operations, web scraping, and email automation.\n🔧 **API Integration**: Experienced in integrating various APIs and services for enhanced functionality.\n📊 **Data Processing**: Skilled in data extraction, cleaning, and analysis using Python libraries.\n🚀 **Career Guidance**: Provides insights on starting careers in AI and staying updated with latest trends.",
    "category": "skills",
    "tags": ["ai", "automation", "python", "gemini", "apis", "data", "ml"]
  },
  {
    "id": "blog-insights",
    "question": "What insights does Durga share through his blog?",
    "answer": "📝 **Technical Tutorials**: Step-by-step guides on building AI assistants, automation scripts, and modern web applications.\n💡 **Career Advice**: Comprehensive guides on starting careers in AI and becoming effective programmers.\n🔧 **Development Best Practices**: Insights on frontend trends, desktop app development with Electron, and productivity habits.\n🎯 **Practical Examples**: Real-world code examples and project implementations.\n📚 **Continuous Learning**: Regular updates on latest technologies and industry trends.",
    "category": "knowledge",
    "tags": ["blog", "tutorials", "career", "best-practices", "learning", "articles"]
  },
  {
    "id": "python-automation",
    "question": "How does Durga use Python for automation?",
    "answer": "🔄 **File Operations**: Automated file management, renaming, organizing, and backup systems.\n🌐 **Web Scraping**: Data extraction from websites using BeautifulSoup and requests libraries.\n📧 **Email Automation**: Automated email communications and personalized messaging at scale.\n📊 **Data Processing**: Cleaning, transforming, and analyzing data with pandas and other libraries.\n⚙️ **Error Handling**: Robust automation with proper error handling and logging mechanisms.",
    "category": "skills",
    "tags": ["python", "automation", "file-operations", "web-scraping", "email", "data-processing"]
  }
];

const priorityMatches = [
  { keywords: ["hire", "why", "choose", "reason", "benefit"], id: "why-hire" },
  { keywords: ["skill", "expertise", "technology", "tech", "ability"], id: "frontend-skills" },
  { keywords: ["backend", "server", "database", "api"], id: "backend-skills" },
  { keywords: ["project", "work", "portfolio", "example", "build"], id: "featured-projects" },
  { keywords: ["achievement", "success", "accomplishment", "award"], id: "achievements" },
  { keywords: ["contact", "email", "phone", "reach", "connect"], id: "contact" },
  { keywords: ["available", "free", "hire", "work", "open"], id: "availability" },
  { keywords: ["who", "about", "introduce", "profile", "bio"], id: "intro" },
  { keywords: ["exceptional", "special", "unique", "different", "experience"], id: "expertise" },
  { keywords: ["hi", "hello", "greeting", "durga", "hero", "dp", "dpg", "gaire"], id: "greeting" },
  { keywords: ["vision", "goal", "future", "mission", "values"], id: "vision" },
  { keywords: ["education", "degree", "certification", "background", "study"], id: "education" },
  { keywords: ["philosophy", "principle", "approach", "mindset"], id: "philosophy" },
  { keywords: ["ai", "automation", "python", "gemini", "ml"], id: "ai-expertise" },
  { keywords: ["blog", "tutorial", "article", "learning", "guide"], id: "blog-insights" },
  { keywords: ["python", "automation", "scraping", "email", "data"], id: "python-automation" },
  { keywords: ["devos", "ai", "assistant", "current", "cli"], id: "current-project" }
];

export { personData, priorityMatches };
