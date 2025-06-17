import { Cpu, Layers, Monitor, Palette, Server, Shield, Smartphone, Terminal, Type } from "lucide-react";

// Data
const projects = [
  {
    id: 1,
    name: "Spin Wheel Game",
    description: "The 'Spin Wheel Game' is an interactive web application that breathes new life into the classic spinning wheel concept. Built with React and leveraging the power of HTML5 Canvas, this game delivers incredibly smooth animations and realistic physics. Its most impressive feature, and a significant highlight, is a custom physics engine engineered to produce genuinely realistic spinning mechanics. Beyond just visual appeal, the game provides a dynamic and engaging user experience, demonstrating the potential of frontend technologies for rich interactive content.",
    tech: ["React", "Canvas API", "CSS3", "JavaScript"],
    type: "Web App",
    github: "https://github.com/yourusername/spin-wheel",
    live: "https://spin-wheel-demo.netlify.app",
    highlight: "Custom physics engine with realistic spinning mechanics"
  },
  {
    id: 2,
    name: "AI OS Agent",
    description: "Stepping into the realm of artificial intelligence, the 'AI OS Agent' is an intelligent command-line tool designed to streamline system tasks and development workflows. This powerful agent utilizes the Claude API (and OpenRouter for broader model access) alongside Python and Flask to process natural language commands. Its standout capability is its ability to translate human language instructions into executable system operations, offering a glimpse into a future where interacting with operating systems is as intuitive as a conversation. While it doesn't have a public live demo, its utility lies in its direct interaction with a user's local machine.",
    tech: ["Python", "Flask", "Claude API", "Bash", "OpenRouter"],
    type: "AI Tool",
    github: "https://github.com/yourusername/ai-os-agent",
    live: null,
    highlight: "Processes natural language commands into executable system operations"
  },
  {
    id: 3,
    name: "VS Code Vulnerability Scanner",
    description: "For developers concerned with code quality and security, the 'VS Code Vulnerability Scanner' is an indispensable VS Code extension. Developed with TypeScript and the VS Code API, this tool seamlessly integrates into the development environment, providing real-time feedback and suggestions as code is written. Its core strength lies in its integrated security scanning, capable of detecting over 40 distinct vulnerability patterns. This project significantly enhances the developer's ability to identify and mitigate potential security risks early in the development lifecycle.",
    tech: ["TypeScript", "VS Code API", "Node.js", "ESLint"],
    type: "Desktop App",
    github: "https://github.com/yourusername/vscode-vuln-scanner",
    live: "https://marketplace.visualstudio.com/items?itemName=yourname.vuln-scanner",
    highlight: "Integrated security scanning with 40+ vulnerability patterns"
  },
  {
    id: 4,
    name: "Voice Recorder App",
    description: "The 'Voice Recorder App' offers a modern solution for high-quality audio capture across multiple platforms. Built with React Native and Expo, this mobile application boasts features like cloud synchronization for easy access to recordings and automatic transcription. A key highlight is its real-time audio visualization, providing immediate feedback on recording levels, coupled with the convenience of automated text conversion. This app is a testament to the power of cross-platform development for creating robust and user-friendly mobile utilities.",
    tech: ["React Native", "Expo", "AsyncStorage", "Audio API"],
    type: "Mobile App",
    github: "https://github.com/yourusername/voice-recorder",
    live: "https://expo.dev/@yourname/voice-recorder",
    highlight: "Real-time audio visualization and automatic transcription"
  },
  {
    id: 5,
    name: "Rich Text Editor",
    description: "The 'Rich Text Editor' is a sophisticated web application designed for comprehensive text formatting and collaboration. Leveraging React and Draft.js, it features an extensible plugin architecture that supports custom blocks and, most notably, real-time collaborative editing through WebSockets and Node.js. Its highlight is its plugin system, offering over 15 built-in extensions, making it a highly adaptable and powerful tool for content creation where multiple users can work simultaneously on a single document.",
    tech: ["React", "Draft.js", "WebSocket", "Node.js"],
    type: "Web App",
    github: "https://github.com/yourusername/rich-text-editor",
    live: "https://rich-editor-demo.vercel.app",
    highlight: "Plugin system with 15+ built-in extensions and collaborative editing"
  },
  {
    id: 6,
    name: "Desktop Task Manager",
    description: "Moving back to desktop utilities, the 'Desktop Task Manager' is a native application offering advanced task management capabilities. Developed using Electron (for cross-platform desktop development), React (for the UI), SQLite (for local data storage), and Node.js, this tool provides seamless system tray integration and shortcuts. Its distinguishing features include system-wide hotkeys for quick access and efficient task manipulation, along with native OS notifications to keep users informed. This project exemplifies how modern web technologies can be harnessed to build powerful, performant desktop applications.",
    tech: ["Electron", "React", "SQLite", "Node.js"],
    type: "Desktop App",
    github: "https://github.com/yourusername/task-manager",
    live: "https://github.com/yourusername/task-manager/releases",
    highlight: "System-wide hotkeys and native OS notifications"
  }
];

const blogPosts = [
  {
    id: 1,
    title: "Building a React App without Create React App",
    excerpt: "Learn how to set up a modern React development environment from scratch using Vite, Webpack, and custom configurations.",
    date: "2024-03-15",
    readTime: "8 min",
    tags: ["React", "Webpack", "Vite", "Build Tools"],
    published: true
  },
  {
    id: 2,
    title: "How I Built an AI Agent Using Claude + Bash",
    excerpt: "Deep dive into creating an intelligent command-line agent that processes natural language and executes system commands safely.",
    date: "2024-02-28",
    readTime: "12 min",
    tags: ["AI", "Python", "Claude API", "Automation"],
    published: true
  },
  {
    id: 3,
    title: "From CLI to SaaS: Productizing Terminal Tools",
    excerpt: "Transform your command-line utilities into scalable web applications with modern deployment strategies and user interfaces.",
    date: "2024-01-20",
    readTime: "10 min",
    tags: ["SaaS", "CLI", "Product Development", "Deployment"],
    published: true
  }
];

export {projects,blogPosts}