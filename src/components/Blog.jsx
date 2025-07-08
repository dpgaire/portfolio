import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import {blogPosts} from '../posts/index'; // Assuming you have a data file with blog posts
import { 
  CalendarIcon,
  ClockIcon,
  ArrowRightIcon,
  TagIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const Blog = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const categories = ["All", "Web Development", "AI & Automation","Career", "Open Source", "Mindset & Productivity",];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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
            <span className="gradient-text">Blog & Insights</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Sharing knowledge and insights from my development journey
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Featured Posts */}
        <motion.div variants={itemVariants} className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Featured Articles
          </h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.slice(0, 2).map((post) => (
              <motion.article
                key={post.id}
                whileHover={{ y: -5 }}
                className="card-hover overflow-hidden group cursor-pointer"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                {/* Post Image */}
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-2xl font-bold gradient-text">{post.category}</div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 rounded-full text-sm font-medium">
                      <TagIcon className="w-3 h-3 mr-1" />
                      {post.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      {formatDate(post.date)}
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {post.title}
                  </h4>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <UserIcon className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  {/* Read More */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-600">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/blog/${post.id}`);
                      }}
                      className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 group"
                    >
                      Read More
                      <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* All Posts Grid */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.slice(0, 8).map((post) => (
            <motion.article
              key={post.id}
              whileHover={{ y: -5 }}
              className="card-hover overflow-hidden group cursor-pointer"
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              {/* Post Image */}
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-700 dark:to-dark-600 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-lg font-bold text-gray-600 dark:text-gray-400">{post.category}</div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                {/* Category & Date */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(post.date)}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h4>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{post.readTime}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/blog/${post.id}`);
                    }}
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 group"
                  >
                    Read
                    <ArrowRightIcon className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/10 dark:to-secondary-900/10 rounded-2xl border border-primary-200/50 dark:border-primary-800/50">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Subscribe to my newsletter for the latest insights on web development, 
              AI, and technology trends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Blog;

