 const projects = [
  {
    id: 1,
    title: "API Key Manager – Secure Local Storage CRUD Interface",
    category: "developer-tools",
    description:
      "Manage API keys locally with secure storage, search, and full CRUD functionality using a modern UI.",
    longDescription:
      "API Key Manager is a lightweight and secure React-based application for managing API keys locally in the browser. Built with SADCN UI components and leveraging localStorage, it offers a clean and responsive interface for developers to store, retrieve, edit, and delete API keys. Features include real-time search, validation, and a user-friendly CRUD system. Ideal for developers looking to quickly manage keys without backend dependencies. The project emphasizes usability, simplicity, and data persistence.",
    image: "/images/api-key-manager.png",
    technologies: ["React", "SADCN UI", "JavaScript", "Local Storage"],
    liveUrl: "https://api-key-manager-swart.vercel.app/",
    githubUrl: "https://github.com/dpgaire/api-key-manager-",
    featured: true,
    status: "Published",
    problem:
      "Developers often need to manage multiple API keys for various services, and storing them in plaintext files is insecure. There was a need for a simple, secure, and client-side tool to manage these keys.",
    process:
      "I started by designing a simple and intuitive UI. Then, I implemented the core CRUD functionality using React hooks and localStorage. I also added features like search and copy-to-clipboard to improve usability.",
    solution:
      "The result is a lightweight and secure API key manager that runs entirely in the browser. It provides a simple and effective solution for developers to manage their API keys without relying on a backend service.",
    screenshots: ["/images/api-key-manager.png", "/images/api-key-manager.png"],
  },
  {
    id: 2,
    title:
      "AI Content & Media Suite – Gemini-Powered Content Creation Platform",
    category: "ai",
    description:
      "A powerful AI-powered content and media management platform built with React and Gemini API for creators and marketers.",
    longDescription:
      "The AI Content & Media Suite is a feature-rich, user-friendly application that leverages the Google Gemini API to empower users with advanced tools for content generation, social media management, and media creation. Built with React, Vite, and Tailwind CSS, the app offers a seamless, responsive experience. Key features include blog and summary generators, multi-platform social media content management, intelligent hashtag suggestions, content scheduling, and a full media toolkit with AI image generation, thumbnail design, and Pexels integration. Ideal for marketers, content creators, and teams aiming to streamline their content workflows.",
    image: "/images/ai-tool-pro.png",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Google Gemini API",
      "Pexels API",
      "ESLint",
    ],
    liveUrl: "https://ai-tool-pro.vercel.app/",
    githubUrl: "https://github.com/dpgaire/ai-tool-pro",
    featured: true,
    status: "Published",
    problem:
      "Content creators and marketers struggle to produce high-quality content consistently across multiple platforms. They need a unified tool to generate, manage, and schedule content efficiently.",
    process:
      "I identified the core needs of content creators, such as idea generation, writing assistance, and social media scheduling. I then designed a modular system with features for blog writing, social media post generation, and media creation, all powered by the Gemini API.",
    solution:
      "The AI Content & Media Suite provides a comprehensive solution for content creation. It streamlines the workflow, from generating blog posts and social media content to designing thumbnails, all within a single, user-friendly platform.",
    screenshots: ["/images/ai-tool-pro.png", "/images/ai-tool-pro.png"],
  },
  {
    id: 3,
    title: "DevOS AI – Your AI-Powered Development Assistant",
    category: "ai",
    description:
      "AI-powered terminal and web assistant for developers, built with Python and OpenRouter API.",
    longDescription:
      "DevOS AI is a smart development assistant that integrates directly into terminal and web workflows. It leverages AI via OpenRouter API to automate development tasks, generate code, diagnose errors, manage projects, and fetch technical resources. Built with Python, it provides a natural language interface and powerful tools to streamline your development process.",
    image: "/images/dev-ai-os.png",
    technologies: [
      "Python",
      "OpenRouter API",
      "Shell",
      "CLI",
      "Web Integration",
    ],
    liveUrl: null,
    githubUrl: "https://github.com/dpgaire/dev-os-ai",
    featured: false,
    status: "Published",
    problem:
      "Developers spend a significant amount of time on repetitive tasks, such as writing boilerplate code, debugging, and managing project files. An intelligent assistant that understands natural language commands can significantly boost productivity.",
    process:
      "I built a core engine in Python that interfaces with the OpenRouter API to understand user intent. I then created a set of modules for different tasks, such as file management, code generation, and error diagnosis. The assistant can be accessed via a CLI or a web interface.",
    solution:
      "DevOS AI acts as a personal AI assistant for developers, automating tedious tasks and providing intelligent suggestions. It helps developers write code faster, debug more effectively, and manage their projects with ease.",
    screenshots: ["/images/dev-ai-os.png", "/images/dev-ai-os.png"],
  },
  {
    id: 4,
    title: "Art Studio Pro – Interactive Drawing Application",
    category: "graphics",
    description:
      "Web-based drawing tool using React and Canvas API for interactive art creation.",
    longDescription:
      "Art Studio Pro is a creative web application that allows users to draw freely, create geometric shapes, and explore digital art tools. Built with React for the UI and powered by the HTML5 Canvas API through core JavaScript, it offers a responsive and intuitive drawing experience in the browser.",
    image: "/images/art-studio.png",
    technologies: ["React", "JavaScript", "HTML5 Canvas", "CSS"],
    liveUrl: "https://art-studio-eight.vercel.app/",
    githubUrl: "https://github.com/dpgaire/art-studio",
    featured: false,
    status: "Published",
    problem:
      "There is a lack of simple, web-based drawing tools that are both powerful and easy to use. Many existing tools are either too complex for casual users or too basic for serious artists.",
    process:
      "I started by implementing the basic drawing functionalities using the HTML5 Canvas API. I then added features like shape tools, color pickers, and layer management. The UI was built with React to be responsive and intuitive.",
    solution:
      "Art Studio Pro provides a user-friendly and powerful web-based drawing tool for users of all skill levels. It offers a range of features for creative expression, from freehand drawing to creating complex geometric patterns.",
    screenshots: ["/images/art-studio.png", "/images/art-studio.png"],
  },
  {
    id: 5,
    title: "Cosmic Content – AI-Powered Content Generator",
    category: "ai",
    description:
      "Web-based AI content generator using React, Tailwind CSS, and OpenRouter API.",
    longDescription:
      "Cosmic Content is a web application that enables users to generate high-quality AI content effortlessly. Built with React and styled using Tailwind CSS, it integrates OpenRouter's API to provide fast and customizable language model access for creating blog posts, marketing copy, and more.",
    image: "/images/cosmic-content.png",
    technologies: ["React", "Tailwind CSS", "OpenRouter API", "JavaScript"],
    liveUrl: "https://cosmic-ai-content.vercel.app/",
    githubUrl: "https://github.com/dpgaire/ai-cosmic-content",
    featured: false,
    status: "Published",
    problem:
      "Generating high-quality content for blogs, websites, and social media can be time-consuming. A tool that can quickly generate creative and engaging content based on a simple prompt is highly valuable.",
    process:
      "I designed a clean and simple UI that allows users to enter a prompt and select a content type. The backend is powered by the OpenRouter API, which provides access to a variety of language models. The generated content is then displayed in a rich text editor for further refinement.",
    solution:
      "Cosmic Content is a powerful AI-powered content generation tool that helps users create high-quality content in a fraction of the time. It is a valuable tool for bloggers, marketers, and anyone who needs to create engaging content.",
    screenshots: ["/images/cosmic-content.png", "/images/cosmic-content.png"],
  },
  {
    id: 6,
    title: "Focus Mode – Pomodoro Task & Productivity Tracker",
    category: "productivity",
    description:
      "Task-based Pomodoro timer with daily progress tracking, built with React and Tailwind CSS.",
    longDescription:
      "Focus Mode is a productivity app that helps users manage tasks using the Pomodoro technique. Users can add tasks, set a 25-minute timer, and receive an audio reminder upon completion. It tracks daily progress and stores data locally in the browser using Local Storage. Built with React and styled with Tailwind CSS for a smooth, distraction-free experience.",
    image: "/images/focus-mode.png",
    technologies: ["React", "Tailwind CSS", "JavaScript", "Local Storage"],
    liveUrl: "https://focus-mode-tau.vercel.app/",
    githubUrl: "https://github.com/dpgaire/focus-mode",
    featured: false,
    status: "Published",
    problem:
      "Maintaining focus and productivity can be challenging in a world full of distractions. The Pomodoro Technique is a proven method for improving focus, but there is a need for a simple and effective tool to implement it.",
    process:
      "I designed a minimalist UI that focuses on the core Pomodoro workflow: a timer, a task list, and progress tracking. I used React for the UI and localStorage to store user data, making the app fast and private.",
    solution:
      "Focus Mode is a simple yet effective Pomodoro timer that helps users stay focused and productive. It provides a clean and distraction-free environment for working on tasks and tracking progress.",
    screenshots: ["/images/focus-mode.png", "/images/focus-mode.png"],
  },
  {
    id: 7,
    title: "AI Content Repurposer – Multi-Platform Content Generator",
    category: "ai",
    description:
      "Turn blogs or video scripts into LinkedIn posts, tweet threads, email intros, and summaries using AI.",
    longDescription:
      "AI Content Repurposer is a smart content automation tool that helps creators and marketers repurpose long-form content like blogs or video scripts into tailored formats for different platforms. With one click, users can generate LinkedIn posts, Twitter threads, email newsletters, and concise summaries. Built with React and integrated with GPT models, it enables fast, high-quality multi-channel content creation while matching brand voice. Includes features like content scheduling, style presets, and export options.",
    image: "/images/content-flow.png",
    technologies: ["React", "OpenAI", "Tailwind CSS", "JavaScript"],
    liveUrl: "https://jovial-toffee-088eb0.netlify.app/",
    githubUrl: "https://github.com/dpgaire/content-flow",
    featured: false,
    status: "Published",
    problem:
      "Repurposing content for different platforms is a time-consuming task. A tool that can automatically generate platform-specific content from a single source can save a lot of time and effort.",
    process:
      "I designed a simple workflow where users can input a blog post or video script. The app then uses AI to generate different versions of the content for various platforms, such as LinkedIn, Twitter, and email. Users can then review and edit the generated content before publishing.",
    solution:
      "The AI Content Repurposer is a powerful tool that automates the process of content repurposing. It helps content creators and marketers save time and effort while ensuring that their content is optimized for each platform.",
    screenshots: ["/images/content-flow.png", "/images/content-flow.png"],
  },
  {
    id: 8,
    title: "AI Favicon Generator – Generate Favicons from Prompts",
    category: "ai",
    description:
      "Generate creative favicon designs from a single text prompt using AI. Supports light/dark themes and batch downloads.",
    longDescription:
      "AI Favicon Generator is a simple yet powerful web application that allows users to generate multiple favicon design concepts using a single text prompt. Built with React, Vite, and Tailwind CSS, it offers a clean and modern interface. Users can enter a description (e.g., 'a smiling robot head') and receive a grid of favicon variations generated via OpenRouter API. Features include support for multiple AI models, custom API key configuration, light and dark themes, and a convenient download-all button to export favicons as a ZIP file. Ideal for developers and designers looking to quickly ideate brand icons.",
    image: "/images/fav-icon.png",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "OpenRouter API",
      "Lucide React",
    ],
    liveUrl: "https://favicon-generator-blush.vercel.app/",
    githubUrl: "https://github.com/dpgaire/favicon-generator",
    featured: false,
    status: "Published",
    problem:
      "Creating a unique and memorable favicon can be a challenging and time-consuming task. A tool that can quickly generate a variety of favicon designs from a simple text prompt can be a great time-saver.",
    process:
      "I designed a simple interface where users can enter a text prompt and generate a grid of favicon designs. The app uses the OpenRouter API to generate the images. Users can then download their favorite favicons as a ZIP file.",
    solution:
      "The AI Favicon Generator is a fun and useful tool for developers and designers who need to create a favicon for their website or application. It is a great way to quickly generate a variety of design ideas.",
    screenshots: ["/images/fav-icon.png", "/images/fav-icon.png"],
  },
  {
    id: 9,
    title: "NudgeWheel – Spin to Decide & Beat Choice Paralysis",
    category: "web",
    description:
      "Transform your daily micro-decisions into a fun, engaging experience. Let the wheel decide and eliminate choice paralysis!",
    longDescription:
      "NudgeWheel is a lightweight decision-making web app that helps users overcome choice paralysis by turning micro-decisions into a game-like experience. Built with React, Vite, and Tailwind CSS, it offers a fast and responsive UI. Users can input custom choices and spin the wheel to let chance decide. All data is stored in the browser using Local Storage, ensuring privacy and instant access. Ideal for productivity hacks, personal wellness, or just having fun with friends.",
    image: "/images/nudgeWheel.png",
    technologies: ["React", "Vite", "Tailwind CSS", "Local Storage"],
    liveUrl: "https://nudge-wheel.vercel.app/",
    githubUrl: "https://github.com/dpgaire/nudge-wheel",
    featured: false,
    status: "Published",
    problem:
      "Making decisions, even small ones, can be a source of stress and anxiety. A fun and engaging tool that helps users make decisions can be a great way to reduce stress and improve well-being.",
    process:
      "I designed a simple and fun UI that allows users to create a spinning wheel with their own custom choices. The app uses localStorage to save the user's wheels, so they can be used again later.",
    solution:
      "NudgeWheel is a fun and simple tool that helps users make decisions in a playful way. It is a great way to overcome choice paralysis and reduce stress.",
    screenshots: ["/images/nudgeWheel.png", "/images/nudgeWheel.png"],
  },
  {
    id: 10,
    title: "AutoText – Smart Message Generator (No AI)",
    category: "productivity",
    description:
      "Generate personalized messages based on relationship, emotion, and intent—without AI. Ideal for quick replies, emotional clarity, and polite communication.",
    longDescription:
      "AutoText is a lightweight and smart message generator that helps users craft emotionally intelligent and context-aware messages in seconds—no AI or backend required. Built with React, Vite, and Tailwind CSS, it uses a simple rule engine and JSON templates to provide tailored messages based on three core inputs: relationship (e.g., friend, boss), emotion (e.g., frustrated, grateful), and intent (e.g., ask a favor, say thanks). Users can copy, personalize, and save messages for later. The app supports tone adjustment, message length toggles, and offline usage, making it a handy everyday communication tool.",
    image: "/images/auto-text-email.png",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "LocalStorage",
      "Mustache.js (or custom templating)",
    ],
    liveUrl: "https://auto-text-email.vercel.app/",
    githubUrl: "https://github.com/dpgaire/auto-text-email",
    featured: false,
    status: "Published",
    problem:
      "Crafting the right message can be difficult, especially when you're short on time or dealing with a sensitive situation. A tool that can help you generate well-written and emotionally intelligent messages can be a great asset.",
    process:
      "I designed a simple interface where users can select a relationship, emotion, and intent to generate a message. The app uses a set of predefined templates and a simple rule engine to generate the messages. Users can then customize the message before sending it.",
    solution:
      "AutoText is a useful tool for anyone who wants to improve their communication skills. It helps users craft clear, concise, and emotionally intelligent messages in a variety of situations.",
    screenshots: ["/images/auto-text-email.png", "/images/auto-text-email.png"],
  },
  {
    id: 11,
    title: "Explainify – Multi-Level Text Explanation App",
    category: "web",
    description:
      "A premium web app that explains complex text at 4 levels (Kid, Beginner, Student, Pro) with a stunning glassmorphism UI, themes, and smooth animations.",
    longDescription:
      "Explainify is a modern React-based web application that simplifies complex content by breaking it down into four levels of explanations: Kid (fun and simple analogies), Beginner (easy to understand), Student (academic level), and Pro (technical detail). It supports multiple AI providers including OpenRouter, OpenAI, Claude, and Gemini. With its glassmorphism design, smooth animations, and dark/light themes, Explainify offers an elegant and responsive user experience. Settings, API keys, and preferences are securely stored in localStorage, ensuring privacy with no data sent to external servers. Ideal for students, professionals, and anyone who wants to understand difficult text in a tailored way.",
    image: "/images/explainify.png",
    technologies: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "shadcn/ui",
      "next-themes",
      "Lucide React",
    ],
    liveUrl: "https://explainify-eta.vercel.app/", // Replace with your deployed URL
    githubUrl: "https://github.com/dpgaire/explainify", // Replace with actual repo URL
    featured: false,
    status: "Published",
    problem:
      "Understanding complex text can be challenging. A tool that can explain text at different levels of complexity can be a great help for students, professionals, and anyone who wants to learn something new.",
    process:
      "I designed a simple interface where users can paste text and choose an explanation level. The app then uses an AI model to generate an explanation at the chosen level. The app also features a beautiful glassmorphism UI and smooth animations.",
    solution:
      "Explainify is a powerful tool that makes complex text easy to understand. It is a great resource for students, professionals, and anyone who wants to learn something new.",
    screenshots: ["/images/explainify.png", "/images/explainify.png"],
  },
];

export {projects}