import { useState } from "react";
import { motion } from 'framer-motion';
import Card from "./Card";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);
  const naviagte = useNavigate()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card
        className="cursor-pointer" 
        glow
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-6"  onClick={()=>naviagte(`/blog/${post.id}`)}>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
            <Calendar size={16} className="mr-2" />
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            <Clock size={16} className="ml-4 mr-2" />
            {post.readTime}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md">
                {tag}
              </span>
            ))}
          </div>
          <motion.div
            animate={{ 
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : 10
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

export default BlogCard;