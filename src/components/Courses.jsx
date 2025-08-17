import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { courses } from "../assets/courses_data"; // Replace with your course data
import {
  ClockIcon,
  TagIcon,
  ArrowRightIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const Courses = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(courses.map(c => c.category)))];

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  const featuredCourses = courses.filter((course) => course.featured);

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
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Courses & Learning</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Practical, curated courses to boost your skills
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Featured Courses */}
        {featuredCourses.length > 0 && (
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Featured Courses
            </h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredCourses.map((course) => (
                <motion.article
                  key={course.id}
                  whileHover={{ y: -5 }}
                  className="card-hover overflow-hidden group cursor-pointer rounded-xl shadow-md bg-white dark:bg-dark-800"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  <div className="h-48 w-full bg-gray-100 dark:bg-dark-700 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="p-6">
                    {/* Category & Duration */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 rounded-full text-sm font-medium">
                        <TagIcon className="w-4 h-4 mr-1" />
                        {course.category}
                      </span>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {course.duration || "Self-paced"}
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                      {course.title}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm">
                      {course.description}
                    </p>

                    {/* Instructor */}
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <UserIcon className="w-4 h-4 mr-1" />
                      {course.instructor}
                    </div>

                    {/* Read More */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-600">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/courses/${course.id}`);
                        }}
                        className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 group"
                      >
                        View Course
                        <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}
        {/* Filtered Course Grid */}
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12"
        >
          {filteredCourses.map((course) => (
            <motion.article
              key={course.id}
              whileHover={{ y: -5 }}
              className="card-hover overflow-hidden group cursor-pointer rounded-xl shadow-md bg-white dark:bg-dark-800"
              onClick={() => navigate(`/courses/${course.id}`)}
            >
                <div className="aspect-video max-h-64 w-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-t-2xl flex items-center justify-center">
                <img className=" w-full h-full cover" src={course.image}
                  alt={course.title} />
              </div>
              <div className="p-6">
                {/* Category & Duration */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                    {course.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {course.duration}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {course.title}
                </h4>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {course.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{course.instructor}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/courses/${course.id}`);
                    }}
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium group"
                  >
                    View
                    <ArrowRightIcon className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Courses;
