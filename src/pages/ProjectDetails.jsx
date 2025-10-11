import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { fetchProjectById } from "../api";
import ProjectDetailsSkeleton from "../components/ui/ProjectDetailsSkeleton";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProject = async () => {
      try {
        const data = await fetchProjectById(id);
        setProject(data);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    getProject();
  }, [id]);

  if (loading) {
    return <ProjectDetailsSkeleton />;
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary-500">
            Project Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            Sorry, we couldn't find the project you're looking for.
          </p>
          <Link
            to="/projects"
            className="btn-primary mt-8 inline-flex items-center"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding bg-white dark:bg-dark-900">
      <div className="container-custom">
        <Link
          to="/projects"
          className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 group mb-8"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Projects
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 gradient-text">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {project.description}
          </p>
        </div>

        <div className="mb-12">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4">The Problem</h2>
              <p>{project.problem}</p>

              <h2 className="text-2xl font-bold mt-8 mb-4">My Process</h2>
              <p>{project.process}</p>

              <h2 className="text-2xl font-bold mt-8 mb-4">The Solution</h2>
              <p>{project.solution}</p>
            </div>
          </div>
          <div>
            <div className="card p-6 sticky top-24 w-full max-w-sm lg:max-w-md xl:max-w-lg mx-auto lg:mx-0">
              <h3 className="text-xl font-bold mb-4 text-center lg:text-left">
                Technologies Used
              </h3>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row lg:flex-col gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full sm:w-auto lg:w-full text-center"
                  >
                    View Live Site
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full sm:w-auto lg:w-full text-center"
                  >
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            More Screenshots
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {project.screenshots.map((screenshot, index) => (
              <img
                key={index}
                src={screenshot}
                alt={`${project.title} screenshot ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
