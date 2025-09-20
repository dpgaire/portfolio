import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { EyeIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projects } from "../utils";



const Projects = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [filter, setFilter] = useState("all");

  const categories = [
    { id: "all", label: t("projects_filter_all") },
    { id: "ai", label: t("projects_filter_ai") },
    { id: "tools", label: t("projects_filter_tools") },
    { id: "productivity", label: t("projects_filter_productivity") },
    { id: "graphics", label: t("projects_filter_graphics") },
    { id: "web", label: t("projects_filter_web") },
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
                ? t("projects_featured_title")
                : t("projects_title")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("projects_subtitle")}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-green-600 mx-auto mt-6 rounded-full"></div>
        </motion.div>
        {currentPath !== "/projects" ? (
          <motion.div variants={itemVariants} className="mb-16">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {currentPath !== "/projects"
                  ? t("projects_featured_title")
                  : t("projects_all_title")}
              </h3>
              <button
                onClick={() => navigate("/projects")}
                className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 group"
              >
                {t("projects_view_more")}
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
                    onClick={() => navigate(`/project/${project.id}`)}
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
                            {t("projects_view_live")}
                          </button>
                        )}
                        {project.githubUrl && (
                          <button className="flex items-center text-gray-600 dark:text-gray-400 text-sm font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                            <CodeBracketIcon className="w-4 h-4 mr-1" />
                            {t("projects_view_code")}
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
                    onClick={() => navigate(`/project/${project.id}`)}
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
                            {t("projects_view_live")}
                          </button>
                        )}
                        {project.githubUrl && (
                          <button className="flex items-center text-gray-600 dark:text-gray-400 text-sm font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                            <CodeBracketIcon className="w-4 h-4 mr-1" />
                            {t("projects_view_code")}
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
    </section>
  );
};

export default Projects;
