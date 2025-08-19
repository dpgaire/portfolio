import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  EyeIcon,
  CodeBracketIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("all");

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
    "Lucide React"
  ],
  liveUrl: "https://explainify-eta.vercel.app/", // Replace with your deployed URL
  githubUrl: "https://github.com/dpgaire/explainify", // Replace with actual repo URL
  featured: false,
  status: "Published"
}

  ];

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "ai", label: "AI/ML" },
    { id: "tools", label: "Developer Tools" },
    { id: "productivity", label: "Productivity" },
    { id: "graphics", label: "Graphics & Media" },
    { id: "web", label: "Web Apps" },
  ];

  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  const featuredProjects = projects.filter((post) => post.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-dark-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors duration-200"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-t-2xl flex items-center justify-center">
                <img src={project.image} alt={project.title} />
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === "Live"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                      : project.status === "Beta"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {project.longDescription}
              </p>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center justify-center"
                  >
                    <EyeIcon className="w-5 h-5 mr-2" />
                    View Live
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center justify-center"
                  >
                    <CodeBracketIcon className="w-5 h-5 mr-2" />
                    View Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <section className="section-padding bg-white dark:bg-dark-900">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container-custom"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">
              {" "}
              {currentPath !== "/projects"
                ? "Featured Projects"
                : "Project Showcase"}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Showcasing my latest work and creative solutions
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>
        {currentPath !== "/projects" ? (
          <motion.div variants={itemVariants} className="mb-16">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {currentPath !== "/projects"
                  ? "Featured Projects"
                  : "All projects"}
              </h3>
              <button
                onClick={() => navigate("/projects")}
                className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 group"
              >
                View more
                <ArrowRightIcon className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
            <motion.div
              layout
              className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
            >
              <AnimatePresence>
                {featuredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    whileHover={{ y: -10 }}
                    className="card-hover group cursor-pointer overflow-hidden"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Project Image */}
                    <div className="relative aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img src={project.image} alt={project.title} />
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          <div className="p-2 bg-white/90 rounded-full">
                            <EyeIcon className="w-5 h-5 text-gray-900" />
                          </div>
                        </div>
                      </div>

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-4 px-2 py-1 bg-accent-500 text-white text-xs font-medium rounded-full">
                          Featured
                        </div>
                      )}

                      {/* Status Badge */}
                      <div
                        className={`absolute top-4 right-4 px-2 py-1 text-xs font-medium rounded-full ${
                          project.status === "Live"
                            ? "bg-green-500 text-white"
                            : project.status === "Beta"
                            ? "bg-yellow-500 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {project.status}
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Action Links */}
                      <div className="flex gap-2">
                        {project.liveUrl && (
                          <button className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200">
                            <EyeIcon className="w-4 h-4 mr-1" />
                            View Live
                          </button>
                        )}
                        {project.githubUrl && (
                          <button className="flex items-center text-gray-600 dark:text-gray-400 text-sm font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                            <CodeBracketIcon className="w-4 h-4 mr-1" />
                            Code
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ) : (
          <div>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-2 mb-12"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    filter === category.id
                      ? "bg-primary-500 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </motion.div>

            {/* Projects Grid */}
            <motion.div
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    whileHover={{ y: -10 }}
                    className="card-hover group cursor-pointer overflow-hidden"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Project Image */}
                    <div className="relative aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img src={project.image} alt={project.title} />
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          <div className="p-2 bg-white/90 rounded-full">
                            <EyeIcon className="w-5 h-5 text-gray-900" />
                          </div>
                        </div>
                      </div>

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-4 px-2 py-1 bg-accent-500 text-white text-xs font-medium rounded-full">
                          Featured
                        </div>
                      )}

                      {/* Status Badge */}
                      <div
                        className={`absolute top-4 right-4 px-2 py-1 text-xs font-medium rounded-full ${
                          project.status === "Live"
                            ? "bg-green-500 text-white"
                            : project.status === "Beta"
                            ? "bg-yellow-500 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {project.status}
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Action Links */}
                      <div className="flex gap-2">
                        {project.liveUrl && (
                          <button className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200">
                            <EyeIcon className="w-4 h-4 mr-1" />
                            View Live
                          </button>
                        )}
                        {project.githubUrl && (
                          <button className="flex items-center text-gray-600 dark:text-gray-400 text-sm font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                            <CodeBracketIcon className="w-4 h-4 mr-1" />
                            Code
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
