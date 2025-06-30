import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  User,
  Bot,
  Sparkles,
  Award,
  Code,
  Zap,
  Bell,
  Star,
  Github,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  TrendingUp,
  Shield,
  Coffee,
  BookOpen,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { formatAnswerToHTML } from "../helper";

// const premiumFaqData = [
//   {
//     id: "intro",
//     question: "Who is Durga Gairhe?",
//     answer:
//       "Durga Gairhe is a visionary Senior Frontend Developer with 5+ years of expertise in crafting exceptional digital experiences. Currently leading frontend innovation at Moru Digital Wallet, he specializes in full-stack development, mobile solutions, and AI-powered applications. With 50+ successful projects delivered, Durga combines technical mastery with creative problem-solving.",
//     category: "about",
//     tags: ["profile", "introduction", "experience"],
//   },
//   {
//     id: "expertise",
//     question: "What makes Durga Gairhe exceptional?",
//     answer:
//       "🚀 **Proven Track Record**: 50+ projects delivered with 99% client satisfaction\n\n💡 **Innovation Leader**: Building DevOS AI - revolutionary CLI + Web assistant\n\n🎯 **Full-Stack Mastery**: From React frontends to Node.js backends\n\n⚡ **Performance Expert**: Optimizing applications for maximum efficiency\n\n🤝 **Team Player**: Mentoring junior developers and leading cross-functional teams",
//     category: "skills",
//     tags: ["expertise", "leadership", "innovation"],
//   },
//   {
//     id: "why-hire",
//     question: "Why should you hire Durga Gairhe?",
//     answer:
//       "🎯 **Immediate Impact**: Delivers production-ready solutions from day one\n\n💰 **ROI Focused**: Builds scalable applications that drive business growth\n\n🔧 **Problem Solver**: Transforms complex requirements into elegant solutions\n\n📈 **Future-Ready**: Stays ahead with latest technologies and best practices\n\n🤝 **Reliable Partner**: Clear communication, on-time delivery, and post-launch support\n\n✨ **Quality Assurance**: Clean, maintainable code with comprehensive testing",
//     category: "hiring",
//     tags: ["hiring", "benefits", "value"],
//   },
//   {
//     id: "current-project",
//     question: "What is DevOS AI and why is it revolutionary?",
//     answer:
//       "DevOS AI is Durga's flagship project - an intelligent terminal assistant combining CLI and Web interfaces using Claude/OpenRouter APIs. It revolutionizes developer workflows by:\n\n🤖 **AI-Powered Automation**: Automates repetitive coding tasks\n⚡ **Smart Code Generation**: Generates boilerplate and complex logic\n🔍 **Intelligent Debugging**: Identifies and suggests fixes for issues\n📚 **Documentation Assistant**: Creates comprehensive docs automatically",
//     category: "projects",
//     tags: ["devos", "ai", "automation", "current"],
//   },
//   {
//     id: "frontend-skills",
//     question: "What are Durga's frontend superpowers?",
//     answer:
//       "⚛️ **React Ecosystem**: React (95%), Next.js (90%), TypeScript (95%)\n🎨 **Styling Masters**: Tailwind CSS (95%), Framer Motion (90%), SCSS (85%)\n📱 **Mobile Development**: React Native (87%), Expo (85%)\n🔧 **Modern Tools**: Vite, Webpack, ESLint, Prettier\n🧪 **Testing**: Jest, React Testing Library, Cypress\n🎯 **Performance**: Code splitting, lazy loading, optimization techniques",
//     category: "skills",
//     tags: ["frontend", "react", "typescript", "mobile"],
//   },
//   {
//     id: "backend-skills",
//     question: "What backend technologies does Durga master?",
//     answer:
//       "🚀 **Runtime & Frameworks**: Node.js (90%), Express.js (88%), Fastify (85%)\n🗄️ **Databases**: PostgreSQL (85%), MongoDB (82%), Redis (80%)\n📡 **APIs**: GraphQL (78%), REST APIs, tRPC\n☁️ **Cloud & DevOps**: AWS (75%), Docker (80%), CI/CD (70%)\n🔐 **Security**: JWT, OAuth, bcrypt, rate limiting\n📊 **Monitoring**: Logging, error tracking, performance monitoring",
//     category: "skills",
//     tags: ["backend", "nodejs", "databases", "apis"],
//   },
//   {
//     id: "featured-projects",
//     question: "What are Durga's most impressive projects?",
//     answer:
//       "🏦 **Moru Digital Wallet** (React, TypeScript, Node.js)\n- Led frontend development for Nepal's leading digital wallet\n- Implemented secure payment flows and real-time transactions\n- Optimized for 100k+ daily active users\n\n🤖 **AI Code Assistant** (VS Code Extension)\n- Built intelligent code suggestions using OpenAI\n- Automated refactoring and code generation\n- 10k+ downloads on VS Code marketplace\n\n📝 **Rich Text Editor** (React, WebRTC)\n- Real-time collaborative editing like Google Docs\n- Custom plugins and rich formatting options\n- Used by 5+ companies for documentation",
//     category: "projects",
//     tags: ["projects", "moru", "ai", "editor"],
//   },
//   {
//     id: "achievements",
//     question: "What are Durga's key achievements?",
//     answer:
//       "🏆 **50+ Projects Delivered**: Consistently exceeding client expectations\n⭐ **99% Client Satisfaction**: Building long-term partnerships\n🚀 **Performance Optimization**: Improved app load times by 60% average\n👥 **Team Leadership**: Mentored 10+ junior developers\n📈 **Revenue Impact**: Projects generated $2M+ in client revenue\n🔧 **Open Source**: Active contributor with 500+ GitHub stars",
//     category: "achievements",
//     tags: ["achievements", "metrics", "leadership"],
//   },
//   {
//     id: "contact",
//     question: "How can you connect with Durga?",
//     answer:
//       "📧 **Email**: gairhedurga13@gmail.com\n📱 **Phone**: +977 9846724440\n🌍 **Location**: Kathmandu, Nepal\n💼 **GitHub**: https://github.com/dpgaire\n⏰ **Availability**: Open for freelance projects and full-time opportunities\n🤝 **Consultation**: Free 30-min discovery calls available",
//     category: "contact",
//     tags: ["contact", "email", "phone", "github"],
//   },
//   {
//     id: "availability",
//     question: "Is Durga available for new projects?",
//     answer:
//       "✅ **Currently Available**: Open for exciting opportunities\n🎯 **Project Types**: Full-stack web apps, mobile development, AI integration\n⏱️ **Timeline**: Can start immediately for the right project\n💼 **Engagement**: Freelance, contract, or full-time positions\n🌟 **Minimum Project**: $5k+ for custom development\n📞 **Next Steps**: Schedule a free consultation call",
//     category: "availability",
//     tags: ["availability", "hiring", "projects"],
//   },
//   {
//     id: "greeting",
//     question: "Greeting you?",
//     answer:
//       "👋 **Hello there!**\nI'm Durga — your go-to for full-stack solutions, mobile development, and AI-driven experiences.\nLet me know how I can help or ask about my availability!",
//     category: "greeting",
//     tags: ["hi", "hello", "hello hero", "durga", "greeting", "who"],
//   },
// ];

// const smartSuggestions = [
//   {
//     icon: Sparkles,
//     text: "Why hire Durga?",
//     category: "hiring",
//     popular: true,
//   },
//   { icon: Code, text: "Show me his skills", category: "skills", popular: true },
//   { icon: Award, text: "Latest projects", category: "projects" },
//   { icon: Zap, text: "What's DevOS AI?", category: "current" },
//   { icon: Github, text: "GitHub portfolio", category: "contact" },
//   { icon: Briefcase, text: "Is he available?", category: "availability" },
//   { icon: TrendingUp, text: "Key achievements", category: "achievements" },
//   { icon: Mail, text: "Contact details", category: "contact" },
// ];

// const quickStarters = [
//   "What's his latest project?",
//   "How can I contact him?",
//   "Is he available for projects?",
//   "Show me his achievements",
//   "Tell me about Durga's expertise",
//   "Why should I hire him?",
// ];

const premiumFaqData = [
  {
    id: "intro",
    question: "Who is Durga Gairhe?",
    answer:
      "Durga Gairhe is a visionary Senior Frontend Developer with 5+ years of expertise in crafting exceptional digital experiences. Currently leading frontend development at Moru Digital Wallet, where he architects scalable solutions that serve thousands of users daily. His expertise spans across modern web technologies, desktop applications, and mobile development. He is passionate about building tools that solve real problems—from rich text editors and VS Code extensions to AI-powered automation agents.",
    category: "about",
    tags: ["profile", "introduction", "experience"],
  },
  {
    id: "expertise",
    question: "What makes Durga Gairhe exceptional?",
    answer:
      "🚀 **Proven Track Record**: 50+ projects delivered with 100% client satisfaction.\n\n💡 **Innovation Leader**: Building DevOS AI - a revolutionary CLI + Web assistant.\n\n🎯 **Full-Stack Mastery**: From React frontends to Node.js backends, with expertise in modern databases like PostgreSQL and MongoDB.\n\n⚡ **Performance Expert**: Optimizing applications for maximum efficiency, improving app load times by 60% average.\n\n🤝 **Team Player**: Mentoring 10+ junior developers and leading cross-functional teams.",
    category: "skills",
    tags: ["expertise", "leadership", "innovation"],
  },
  {
    id: "why-hire",
    question: "Why should you hire Durga Gairhe?",
    answer:
      "🎯 **Immediate Impact**: Delivers production-ready solutions from day one.\n\n💰 **ROI Focused**: Builds scalable applications that drive business growth, with projects generating $2M+ in client revenue.\n\n🔧 **Problem Solver**: Transforms complex requirements into elegant solutions.\n\n📈 **Future-Ready**: Stays ahead with latest technologies and best practices, including AWS Certified Solutions Architect Associate and Google Developer Expert in Web Technologies.\n\n🤝 **Reliable Partner**: Clear communication, on-time delivery, and post-launch support.\n\n✨ **Quality Assurance**: Clean, maintainable code with comprehensive testing and 500+ contributions on GitHub.",
    category: "hiring",
    tags: ["hiring", "benefits", "value"],
  },
  {
    id: "current-project",
    question: "What is DevOS AI and why is it revolutionary?",
    answer:
      "DevOS AI is Durga's flagship project - an intelligent terminal assistant combining CLI and Web interfaces using Claude/OpenRouter APIs. It revolutionizes developer workflows by:\n\n🤖 **AI-Powered Automation**: Automates repetitive coding tasks.\n⚡ **Smart Code Generation**: Generates boilerplate and complex logic.\n🔍 **Intelligent Debugging**: Identifies and suggests fixes for issues.\n📚 **Documentation Assistant**: Creates comprehensive docs automatically.\n\nThis project is built with Python, OpenRouter API, and Shell scripting.",
    category: "projects",
    tags: ["devos", "ai", "automation", "current"],
  },
  {
    id: "frontend-skills",
    question: "What are Durga's frontend superpowers?",
    answer:
      "⚛️ **React Ecosystem**: React (95%), Next.js (90%), TypeScript (95%).\n🎨 **Styling Masters**: Tailwind CSS (92%), Framer Motion (88%), SCSS (85%).\n📱 **Mobile Development**: React Native (87%), Expo (85%), iOS Development (65%), Android Development (68%).\n🔧 **Modern Tools**: Vite, Webpack (82%), ESLint, Prettier.\n🧪 **Testing**: Jest (85%), React Testing Library, Cypress, Playwright.\n🎯 **Performance**: Code splitting, lazy loading, optimization techniques.",
    category: "skills",
    tags: ["frontend", "react", "typescript", "mobile"],
  },
  {
    id: "backend-skills",
    question: "What backend technologies does Durga master?",
    answer:
      "🚀 **Runtime & Frameworks**: Node.js (88%), Express.js (85%), Fastify (85%).\n🗄️ **Databases**: PostgreSQL (82%), MongoDB (80%), Redis (80%).\n📡 **APIs**: GraphQL (75%), REST APIs, tRPC.\n☁️ **Cloud & DevOps**: AWS (75%), Docker (78%), CI/CD (70%), Vercel, Netlify, Heroku.\n🔐 **Security**: JWT, OAuth, bcrypt, rate limiting.\n📊 **Monitoring**: Logging, error tracking, performance monitoring.",
    category: "skills",
    tags: ["backend", "nodejs", "databases", "apis"],
  },
  {
    id: "featured-projects",
    question: "What are Durga's most impressive projects?",
    answer:
      "🏦 **Moru Digital Wallet** (React, TypeScript, Node.js)\n- Led frontend development for Nepal's leading digital wallet.\n- Implemented secure payment flows and real-time transactions.\n- Optimized for 100k+ daily active users.\n\n🤖 **AI Code Assistant** (VS Code Extension)\n- Built intelligent code suggestions using OpenAI.\n- Automated refactoring and code generation.\n- 10k+ downloads on VS Code marketplace.\n\n📝 **Rich Text Editor** (React, WebRTC)\n- Real-time collaborative editing like Google Docs.\n- Custom plugins and rich formatting options.\n- Used by 5+ companies for documentation.\n\n💡 **Web-based AI Content Generator** (React, Tailwind CSS, OpenRouter API)\n- A tool for generating AI content with a user-friendly web interface.\n\n🎨 **Web-based Drawing Tool** (React, JavaScript, HTML5 Canvas)\n- An interactive application for creative art creation directly in the browser.\n\n⏰ **Task-based Pomodoro Timer** (React, Tailwind CSS, JavaScript)\n- A productivity tool with daily progress tracking.",
    category: "projects",
    tags: ["projects", "moru", "ai", "editor", "generator", "drawing", "pomodoro"],
  },
  {
    id: "achievements",
    question: "What are Durga's key achievements?",
    answer:
      "🏆 **50+ Projects Delivered**: Consistently exceeding client expectations.\n⭐ **100% Client Satisfaction**: Building long-term partnerships.\n🚀 **Performance Optimization**: Improved app load times by 60% average.\n👥 **Team Leadership**: Mentored 10+ junior developers.\n📈 **Revenue Impact**: Projects generated $2M+ in client revenue.\n🔧 **Open Source**: Active contributor with 500+ GitHub stars.\n📜 **Certifications**: AWS Certified Solutions Architect Associate, Google Developer Expert in Web Technologies.",
    category: "achievements",
    tags: ["achievements", "metrics", "leadership", "certifications"],
  },
  {
    id: "contact",
    question: "How can you connect with Durga?",
    answer:
      "📧 **Email**: gairhedurga13@gmail.com\n📱 **Phone**: +977 9846724440\n🌍 **Location**: Kathmandu, Nepal\n💼 **GitHub**: https://github.com/dpgaire\n⏰ **Availability**: Open for freelance projects and full-time opportunities.\n🤝 **Consultation**: Free 30-min discovery calls available.\n\n**Follow Me:**\n- LinkedIn: https://linkedin.com/in/durga-gairhe]",
    category: "contact",
    tags: ["contact", "email", "phone", "github", "social"],
  },
  {
    id: "availability",
    question: "Is Durga available for new projects?",
    answer:
      "✅ **Currently Available**: Open for exciting opportunities.\n🎯 **Project Types**: Full-stack web apps, mobile development, AI integration.\n⏱️ **Timeline**: Can start immediately for the right project.\n💼 **Engagement**: Freelance, contract, or full-time positions.\n🌟 **Minimum Project**: $5k+ for custom development.\n📞 **Next Steps**: Schedule a free consultation call.",
    category: "availability",
    tags: ["availability", "hiring", "projects"],
  },
  {
    id: "greeting",
    question: "Greeting you?",
    answer:
      "👋 **Hello there!**\nI'm Durga — your go-to for full-stack solutions, mobile development, and AI-driven experiences.\nLet me know how I can help or ask about my availability!",
    category: "greeting",
    tags: ["hi", "hello", "hello hero", "durga", "greeting", "who","dpg","dp"],
  },
];

const smartSuggestions = [
  {
    icon: Sparkles,
    text: "Why hire Durga?",
    category: "hiring",
    popular: true,
  },
  { icon: Code, text: "Show me his skills", category: "skills", popular: true },
  { icon: Award, text: "Latest projects", category: "projects" },
  { icon: Zap, text: "What's DevOS AI?", category: "current" },
  { icon: Github, text: "GitHub portfolio", category: "contact" },
  { icon: Briefcase, text: "Is he available?", category: "availability" },
  { icon: TrendingUp, text: "Key achievements", category: "achievements" },
  { icon: Mail, text: "Contact details", category: "contact" },
];

const quickStarters = [
  "What's his latest project?",
  "How can I contact him?",
  "Is he available for projects?",
  "Show me his achievements",
  "Tell me about Durga's expertise",
  "Why should I hire him?",
];



const PremiumChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hello! I'm Durga's AI Assistant. I can tell you everything about his expertise, projects, and why he's the perfect developer for your next project. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
      type: "welcome",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findIntelligentAnswer = (question) => {
    const lowerQuestion = question.toLowerCase();

    // Priority matching for key questions
    const priorityMatches = [
      {
        keywords: ["hire", "why", "choose", "reason", "benefit"],
        id: "why-hire",
      },
      {
        keywords: ["devos", "ai", "current", "building", "working"],
        id: "current-project",
      },
      {
        keywords: ["skill", "expertise", "technology", "tech", "ability"],
        id: "frontend-skills",
      },
      {
        keywords: ["project", "work", "portfolio", "example"],
        id: "featured-projects",
      },
      {
        keywords: ["contact", "email", "phone", "reach", "connect"],
        id: "contact",
      },
      { keywords: ["available", "free", "hire", "work"], id: "availability" },
      {
        keywords: ["achievement", "success", "accomplishment"],
        id: "achievements",
      },
      {
        keywords: ["backend", "server", "database", "api"],
        id: "backend-skills",
      },
      { keywords: ["who", "about", "introduce"], id: "intro" },
      {
        keywords: [
          "exceptional",
          "special",
          "unique",
          "different",
          "experience",
        ],
        id: "expertise",
      },
      {
        keywords: [
          "hi",
          "hello",
          "hello hero",
          "durga",
          "greeting",
          "who",
          "hero",
          "DP",
          "dp",
          "dpg",
          "gaire",
          "Gairhe",
        ],
        id: "greeting",
      },
    ];

    // Find best match
    for (const match of priorityMatches) {
      if (match.keywords.some((keyword) => lowerQuestion.includes(keyword))) {
        const faq = premiumFaqData.find((item) => item.id === match.id);
        if (faq) return formatAnswerToHTML(faq.answer);
      }
    }

    // Fallback responses
    const fallbackResponses = [
      "I'd be happy to help! You can ask me about Durga's skills, projects, experience, or why he'd be perfect for your project.",
      "That's a great question! Try asking about his expertise, latest projects, or how to get in touch with him.",
      "I have comprehensive information about Durga's professional background. What specific area interests you most?",
    ];

    return fallbackResponses[
      Math.floor(Math.random() * fallbackResponses.length)
    ];
  };

  const handleSendMessage = async (messageText = inputValue) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setShowSuggestions(false);

    // Enhanced typing simulation
    const typingDelay = Math.min(messageText.length * 50 + 800, 2500);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: findIntelligentAnswer(messageText),
        sender: "bot",
        timestamp: new Date(),
        type: "response",
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, typingDelay);
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Enhanced Floating Button
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="relative group w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <MessageCircle className="w-7 h-7 text-white z-10" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            {/* <span className="text-xs font-bold text-white">!</span> */}
             <Bell className="w-3 h-3 text-white" />
          </div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-500/20 rounded-full animate-ping"></div>
        </button>
      </div>
    );
  }

  // Enhanced Message Component
  const renderMessage = (message) => {
    const isBot = message.sender === "bot";
    const isWelcome = message.type === "welcome";

    return (
      <div
        key={message.id}
        className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4 transition-all duration-300`}
      >
        <div className={`max-w-[85%] ${isBot ? "mr-12" : "ml-12"}`}>
          <div
            className={`p-4 rounded-2xl relative overflow-hidden ${
              isBot
                ? isWelcome
                  ? "bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 shadow-md"
                  : "bg-white border border-gray-100 shadow-sm"
                : "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg"
            }`}
          >
            {/* Decorative elements for welcome message */}
            {isWelcome && (
              <>
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full -mr-4 -mt-4"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-purple-500/5 rounded-full -ml-4 -mb-4"></div>
              </>
            )}
            
            <div className="flex items-start space-x-3 relative z-10">
              {isBot && (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                  isWelcome 
                    ? "bg-gradient-to-br from-blue-500 to-purple-600"
                    : "bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200"
                }`}>
                  <Bot className={`w-4 h-4 ${isWelcome ? "text-white" : "text-purple-600"}`} />
                </div>
              )}
              <div className="flex-1">
                <p
                  dangerouslySetInnerHTML={{ __html: message.text }}
                  className={`text-sm leading-relaxed whitespace-pre-line ${
                    isBot ? "text-gray-800" : "text-white"
                  }`}
                ></p>
                <p
                  className={`text-xs mt-2 ${
                    isBot ? "text-gray-500" : "text-blue-100"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {!isBot && (
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed -bottom-8 h-auto right-0 lg:bottom-6 lg:right-4 z-50">
      <div className={`w-full lg:w-96 transition-all duration-300 ${isMinimized ? "h-24" : "h-auto lg:h-[600px]"}`}>
        {/* Chat Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white rounded-t-2xl p-4 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm opacity-30"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Durga's AI Assistant</h3>
                <div className="text-xs opacity-90 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Online & Ready to Help
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
              >
                {isMinimized ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Animated decorative elements */}
          <div className="absolute top-2 right-4 opacity-20">
            <Sparkles className="w-5 h-5 animate-spin" />
          </div>
          <div className="absolute bottom-2 left-4 opacity-20">
            <Code className="w-4 h-4 animate-bounce" />
          </div>
        </div>

        {/* Chat Body */}
        {!isMinimized && (
          <div className="bg-white border-x border-gray-100 h-[500px] flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50/50 to-white">
              {messages.map(renderMessage)}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="max-w-[85%] mr-6">
                    <div className="bg-white border border-gray-100 py-4 px-2 rounded-2xl shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center border border-gray-200">
                          <Bot className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Smart Suggestions */}
            {showSuggestions && messages.length <= 2 && (
              <div className="px-4 py-3 bg-gray-50/80 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-600 mb-3 flex items-center">
                  <Lightbulb className="w-3 h-3 mr-1 text-blue-500" />
                  Popular Questions
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {smartSuggestions.slice(0, 4).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(suggestion.text)}
                      className={`text-xs h-8 px-3 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        suggestion.popular
                          ? "bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 text-blue-700 hover:shadow-md"
                          : "bg-white border border-gray-200 text-gray-700 hover:border-blue-300"
                      }`}
                    >
                      {suggestion.icon && (
                        <suggestion.icon className="w-3 h-3 mr-1" />
                      )}
                      {suggestion.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about Durga..."
                    className="w-full h-12 px-4 pr-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 shadow-sm"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className="absolute right-2 top-2 w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick starters */}
              <div className="flex flex-wrap gap-2 mt-3">
                {quickStarters.slice(0, 3).map((starter, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(starter)}
                    className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-200"
                  >
                    {starter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Chat Footer */}
        <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-500/10 rounded-b-2xl border-t border-gray-200 p-2 text-center">
          <p className="text-xs text-gray-500">
            Powered by Durga's expertise • Always learning
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumChatbot;