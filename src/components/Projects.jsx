import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  EyeIcon,
  CodeBracketIcon,
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("all");

  const projects = [
    // {
    //   id: 1,
    //   title: "Moru Digital Wallet",
    //   category: "fintech",
    //   description:
    //     "Leading frontend development for a comprehensive digital wallet solution serving thousands of users daily.",
    //   longDescription:
    //     "A comprehensive digital wallet platform that enables users to manage their finances, make payments, and track transactions. Built with React, Node.js, and modern security practices.",
    //   image: "/api/placeholder/600/400",
    //   technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    //   liveUrl: "https://moru.com",
    //   githubUrl: null,
    //   featured: true,
    //   status: "Live",
    // },
    {
      id: 2,
      title: "Cosmic Content – AI-Powered Content Generator",
      category: "ai",
      description:
        "Web-based AI content generator using React, Tailwind CSS, and OpenRouter API.",
      longDescription:
        "Cosmic Content is a web application that enables users to generate high-quality AI content effortlessly. Built with React and styled using Tailwind CSS, it integrates OpenRouter's API to provide fast and customizable language model access for creating blog posts, marketing copy, and more.",
      image: "/images/cosmic-content.png",
      technologies: ["React", "Tailwind CSS", "OpenRouter API", "JavaScript"],
      liveUrl: "https://cosmic-ai-content.vercel.app/",
      githubUrl: "https://github.com/dpgaire/ai-cosmic-content", // Replace with your actual GitHub URL
      featured: true,
      status: "Published",
    },

    {
      id: 3,
      title: "Art Studio Pro – Interactive Drawing Application",
      category: "graphics",
      description:
        "Web-based drawing tool using React and Canvas API for interactive art creation.",
      longDescription:
        "Art Studio Pro is a creative web application that allows users to draw freely, create geometric shapes, and explore digital art tools. Built with React for the UI and powered by the HTML5 Canvas API through core JavaScript, it offers a responsive and intuitive drawing experience in the browser.",
      image: "/images/art-studio.png",
      technologies: ["React", "JavaScript", "HTML5 Canvas", "CSS"],
      liveUrl: "https://art-studio-eight.vercel.app/", // Replace with your actual live URL
      githubUrl: "https://github.com/dpgaire/art-studio", // Replace with your actual GitHub URL
      featured: true,
      status: "Published",
    },

    {
      id: 4,
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
      liveUrl: null, // Replace with your actual live URL
      githubUrl: "https://github.com/dpgaire/dev-os-ai", // Replace with your actual GitHub URL
      featured: true,
      status: "Published",
    },

    {
      id: 5,
      title: "Focus Mode – Pomodoro Task & Productivity Tracker",
      category: "productivity",
      description:
        "Task-based Pomodoro timer with daily progress tracking, built with React and Tailwind CSS.",
      longDescription:
        "Focus Mode is a productivity app that helps users manage tasks using the Pomodoro technique. Users can add tasks, set a 25-minute timer, and receive an audio reminder upon completion. It tracks daily progress and stores data locally in the browser using Local Storage. Built with React and styled with Tailwind CSS for a smooth, distraction-free experience.",
      image: "/images/focus-mode.png",
      technologies: ["React", "Tailwind CSS", "JavaScript", "Local Storage"],
      liveUrl: "https://focus-mode-tau.vercel.app/", // Replace with your actual live URL
      githubUrl: "https://github.com/dpgaire/focus-mode", // Replace with your actual GitHub URL
      featured: true,
      status: "Published",
    },
    // {
    //   id: 6,
    //   title: "Blockchain Voting System",
    //   category: "blockchain",
    //   description:
    //     "Secure voting platform built on blockchain technology ensuring transparency and immutability.",
    //   longDescription:
    //     "A decentralized voting system built on Ethereum blockchain, ensuring transparent, secure, and immutable voting processes with smart contract integration.",
    //   image: "/api/placeholder/600/400",
    //   technologies: ["Solidity", "Web3.js", "React", "Ethereum", "IPFS"],
    //   liveUrl: "https://vote.blockchain.com",
    //   githubUrl: "https://github.com/durga-gairhe/blockchain-voting",
    //   featured: true,
    //   status: "Beta",
    // },
  ];

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "fintech", label: "FinTech" },
    { id: "ai", label: "AI/ML" },
    { id: "tools", label: "Tools" },
    { id: "mobile", label: "Mobile" },
    { id: "web", label: "Web Apps" },
    { id: "blockchain", label: "Blockchain" },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

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
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Showcasing my latest work and creative solutions
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Filter Buttons */}
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
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    {/* <div className="text-2xl font-bold gradient-text">
                      {project.title}hhh
                    </div> */}
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

        {/* View All Projects Button */}
        {/* <motion.div variants={itemVariants} className="text-center mt-12">
          <button className="btn-secondary group flex items-center">
            View All Projects
            <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </motion.div> */}
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
