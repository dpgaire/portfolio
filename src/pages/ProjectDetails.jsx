import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import { fetchProjectById } from "../api";
import ProjectDetailsSkeleton from "../components/ui/ProjectDetailsSkeleton";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    const getProject = async () => {
      try {
        const data = await fetchProjectById(id);
        setProject(data);
        setAllImages([data.image, ...(data.screenshots || [])]);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    getProject();
  }, [id]);

  const openModal = (index) => { setSelectedImage(allImages[index]); setCurrentIndex(index); };
  const closeModal = () => setSelectedImage(null);
  const showNext = () => {
    const i = (currentIndex + 1) % allImages.length;
    setCurrentIndex(i); setSelectedImage(allImages[i]);
  };
  const showPrev = () => {
    const i = (currentIndex - 1 + allImages.length) % allImages.length;
    setCurrentIndex(i); setSelectedImage(allImages[i]);
  };

  if (loading) return <ProjectDetailsSkeleton />;

  if (!project)
    return (
      <div className="min-h-screen bg-white dark:bg-dark-900 flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">404</p>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-white mb-3">Project Not Found</h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mb-8">
            We couldn't find the project you're looking for.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-sm font-semibold hover:bg-gray-700 transition-colors duration-200"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );

  return (
    <div className="section-padding bg-white dark:bg-dark-900 min-h-screen">
      <div className="container-custom">
        {/* Back link */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors duration-200 group mb-12"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
          Back to Projects
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-3xl"
        >
          <div className="flex items-center gap-2 mb-4">
            {project.featured && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-secondary-400">
                Featured
              </span>
            )}
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                project.status === "Live"
                  ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                  : project.status === "Beta"
                  ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                  : "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
              }`}
            >
              {project.status}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-white mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-stone-500 dark:text-stone-400 leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        {/* Main image */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16 rounded-2xl overflow-hidden border border-stone-100 dark:border-dark-700 cursor-pointer group"
          onClick={() => openModal(0)}
        >
          <div className="relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto group-hover:scale-[1.01] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="w-10 h-10 rounded-xl bg-white/90 flex items-center justify-center">
                <EyeIcon className="w-5 h-5 text-stone-900" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Left: narrative */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2 space-y-10"
          >
            <Section title="The Problem" content={project.problem} />
            <Section title="My Process" content={project.process} />
            <Section title="The Solution" content={project.solution} />
          </motion.div>

          {/* Right: sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="sticky top-24 rounded-2xl border border-stone-100 dark:border-dark-700 bg-stone-50 dark:bg-dark-800 p-6">
              <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-5">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-white dark:bg-dark-700 border border-stone-200 dark:border-dark-600 text-gray-700 dark:text-stone-300 rounded-lg text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="space-y-2.5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-sm font-semibold hover:bg-gray-700 dark:hover:bg-stone-100 transition-colors duration-200"
                  >
                    <EyeIcon className="w-4 h-4" />
                    View Live Site
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-dark-600 text-gray-700 dark:text-stone-300 text-sm font-semibold hover:border-stone-400 dark:hover:border-dark-400 hover:bg-stone-100 dark:hover:bg-dark-700 transition-all duration-200"
                  >
                    <CodeBracketIcon className="w-4 h-4" />
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Screenshots */}
        {project.screenshots?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-20"
          >
            <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-8">
              Screenshots
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {project.screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden border border-stone-100 dark:border-dark-700 cursor-pointer group"
                  onClick={() => openModal(index + 1)}
                >
                  <div className="relative">
                    <img
                      src={screenshot}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="w-8 h-8 rounded-lg bg-white/90 flex items-center justify-center">
                        <EyeIcon className="w-4 h-4 text-stone-900" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Image modal — clean dark overlay */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-6">
          <button
            className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-200"
            onClick={closeModal}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>

          <button
            className="absolute left-5 w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-200"
            onClick={showPrev}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          <img
            src={selectedImage}
            alt="Screenshot preview"
            className="max-h-[85vh] max-w-[85vw] rounded-xl"
          />

          <button
            className="absolute right-5 w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-200"
            onClick={showNext}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs">
            {currentIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

const Section = ({ title, content }) => (
  <div>
    <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-3">
      {title}
    </p>
    <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{content}</p>
  </div>
);

export default ProjectDetails;