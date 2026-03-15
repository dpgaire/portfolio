import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { EyeIcon, CodeBracketIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchProjectsData } from "../api";
import ProjectsSkeleton from "./ui/ProjectsSkeleton";

/* ─── Shared header ─── */
const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-16">
    <p className="text-xs font-semibold tracking-widest text-secondary-600 dark:text-secondary-400 uppercase mb-3">
      {subtitle}
    </p>
    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
      {title}
    </h2>
  </div>
);

/* ─── Status pill ─── */
const StatusPill = ({ status }) => {
  const styles = {
    Live:  "bg-secondary-50 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-400",
    Beta:  "bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400",
    Dev:   "bg-stone-100 dark:bg-dark-700 text-stone-600 dark:text-stone-400",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles.Dev}`}>
      {status}
    </span>
  );
};

/* ─── Tech chip ─── */
const TechChip = ({ label }) => (
  <span className="px-2 py-0.5 bg-stone-100 dark:bg-dark-700 text-stone-600 dark:text-stone-400 rounded-lg text-xs font-medium">
    {label}
  </span>
);

/* ─── Project card ─── */
const ProjectCard = ({ project, onClick, liveLabel, codeLabel }) => (
  <motion.div
    layout
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
    className="group card-hover cursor-pointer overflow-hidden"
    onClick={onClick}
  >
    {/* Image */}
    <div className="relative aspect-video bg-stone-100 dark:bg-dark-700 overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/15 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="w-9 h-9 rounded-xl bg-white/90 flex items-center justify-center">
          <EyeIcon className="w-4 h-4 text-stone-900" />
        </div>
      </div>

      {/* Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        {project.featured && (
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent-500 text-white">
            Featured
          </span>
        )}
        <span className="ml-auto">
          <StatusPill status={project.status} />
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-5">
      <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-1.5 group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors duration-200">
        {project.title}
      </h3>

      <p className="text-xs text-stone-500 dark:text-stone-400 mb-4 line-clamp-2 leading-relaxed">
        {project.description}
      </p>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.technologies.slice(0, 3).map((tech) => (
          <TechChip key={tech} label={tech} />
        ))}
        {project.technologies.length > 3 && (
          <TechChip label={`+${project.technologies.length - 3}`} />
        )}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 pt-4 border-t border-stone-100 dark:border-dark-700">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs font-medium text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 transition-colors duration-200"
          >
            <EyeIcon className="w-3.5 h-3.5" />
            {liveLabel}
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors duration-200"
          >
            <CodeBracketIcon className="w-3.5 h-3.5" />
            {codeLabel}
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

/* ─── Main component ─── */
const Projects = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjectsData();
        setProjects(data);
      } catch {
        setError("Error loading projects.");
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  const categories = [
    { id: "all",          label: t("projects_filter_all") },
    { id: "ai",           label: t("projects_filter_ai") },
    { id: "tools",        label: t("projects_filter_tools") },
    { id: "productivity", label: t("projects_filter_productivity") },
    { id: "graphics",     label: t("projects_filter_graphics") },
    { id: "web",          label: t("projects_filter_web") },
  ];

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter((p) => p.category === filter);

  const featuredProjects = projects.filter((p) => p.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
  };

  const isProjectsPage = currentPath === "/projects";

  return (
    <section className="section-padding bg-stone-50 dark:bg-dark-900">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container-custom"
      >
        <SectionHeader
          title={isProjectsPage ? t("projects_title") : t("projects_featured_title")}
          subtitle="Work"
        />

        {loading ? (
          <ProjectsSkeleton />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-sm text-red-500">
              {error}{" "}
              <a href="tel:+9779846724440" className="underline hover:text-red-400">
                +9779846724440
              </a>
            </p>
          </div>
        ) : !isProjectsPage ? (
          /* ─── Home preview: featured ─── */
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-10">
              <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
                {t("projects_featured_title")}
              </p>
              <button
                onClick={() => navigate("/projects")}
                className="inline-flex items-center gap-1 text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-200 group"
              >
                {t("projects_view_more")}
                <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <AnimatePresence>
                {featuredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => navigate(`/project/${project.id}`)}
                    liveLabel={t("projects_view_live")}
                    codeLabel={t("projects_view_code")}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          /* ─── /projects page: filter + all ─── */
          <div>
            {/* Category filters */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-10">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    filter === category.id
                      ? "bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900"
                      : "bg-stone-100 dark:bg-dark-700 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-dark-600"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </motion.div>

            {/* Grid */}
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => navigate(`/project/${project.id}`)}
                    liveLabel={t("projects_view_live")}
                    codeLabel={t("projects_view_code")}
                  />
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