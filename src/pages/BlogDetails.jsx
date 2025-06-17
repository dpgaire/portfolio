import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { blogPosts } from "../utils";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Button from "../components/ui/Button";
import Navigation from "../components/Navigation";

const BlogDetails = () => {
  const { id } = useParams();
  const post = blogPosts.find(post => post.id === parseInt(id));
  const navigate = useNavigate()

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={()=>navigate('/')} 
            icon={<ArrowLeft size={18} />}
            variant="outline"
          >
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-8">
          <Button 
            onClick={()=>navigate('/')} 
            icon={<ArrowLeft size={18} />}
            variant="outline"
            className="group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              All Articles
            </span>
          </Button>
        </div>

        {/* Article header */}
        <header className="mb-12">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Calendar size={16} className="mr-2" />
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            <Clock size={16} className="ml-4 mr-2" />
            {post.readTime} read
          </div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            {post.title}
          </motion.h1>
          
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm rounded-full"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </header>

        {/* Article content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose dark:prose-invert prose-lg max-w-none"
        >
          {/* This would be your actual blog content */}
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {post.excerpt}
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
            Introduction
          </h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            This is where your detailed blog content would go. You can structure it with headings,
            paragraphs, code blocks, images, and other rich content elements.
          </p>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl my-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Key Takeaways
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Important point from the article</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Another key insight or learning</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Practical application of the concept</span>
              </li>
            </ul>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
            Deep Dive
          </h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            More detailed content sections would follow here. You can include code snippets,
            diagrams, or any other relevant content to support your article.
          </p>
        </motion.div>

        {/* Author section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center">
            <div className="mr-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Durga Gairhe</h4>
              <p className="text-gray-600 dark:text-gray-400">Full Stack Developer</p>
            </div>
          </div>
        </motion.div>

        {/* Back to blog button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <Button 
            onClick={()=>navigate('/#blog')}  
            icon={<ArrowLeft size={18} />}
            variant="outline"
            className="group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              Back to Blog
            </span>
          </Button>
        </motion.div>
      </div>
    </motion.article>
    </>
  );
};

export default BlogDetails;