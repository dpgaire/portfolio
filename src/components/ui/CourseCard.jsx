import { useState } from "react";
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from "lucide-react";
import Card from "./Card"; 
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card
        className="cursor-pointer h-full"
        glow
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-6" onClick={() => navigate(`/courses/${course.id}`)}>
          {/* Image */}
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />

          {/* Course Info */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
            <Clock size={16} className="mr-2" />
            {course.duration || "Self-paced"}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {course.description}
          </p>

  
         

          {/* Hover arrow */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : 10,
            }}
            transition={{ duration: 0.3 }}
            className="text-right mt-4 text-blue-600 dark:text-blue-400"
          >
            <ArrowRight size={20} className="inline" />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CourseCard;
