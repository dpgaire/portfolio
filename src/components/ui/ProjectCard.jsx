import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Code, ExternalLink, Github, Monitor, Smartphone } from "lucide-react";
import Card from "./Card";

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Web App': return <Code size={20} />;
      case 'Mobile App': return <Smartphone size={20} />;
      case 'Desktop App': return <Monitor size={20} />;
      case 'AI Tool': return <Bot size={20} />;
      default: return <Code size={20} />;
    }
  };
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'Web App': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Mobile App': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Desktop App': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'AI Tool': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card
        className="h-full" 
        glow
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.name}
            </h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(project.type)}`}>
              {getTypeIcon(project.type)}
              <span className="ml-1">{project.type}</span>
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {project.description}
          </p>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key Highlight:</p>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{project.highlight}</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <a 
              href={project.github} 
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Github size={16} className="mr-1" />
              Code
            </a>
            {project.live && (
              <a 
                href={project.live} 
                className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                <ExternalLink size={16} className="mr-1" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;