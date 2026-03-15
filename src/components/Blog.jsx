import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  ClockIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { fetchBlogsData } from "../api";
import BlogSkeleton from "./ui/BlogSkeleton";

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-16">
    <p className="text-xs font-semibold tracking-widest text-secondary-600 dark:text-secondary-400 uppercase mb-3">
      {subtitle}
    </p>
    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-white">
      {title}
    </h2>
  </div>
);

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const CategoryPill = ({ category }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 dark:bg-dark-700 text-stone-600 dark:text-stone-400">
    {category}
  </span>
);

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const getBlogPosts = async () => {
      try {
        const data = await fetchBlogsData();
        setBlogPosts(data);
      } catch (err) {
        setError("Error loading blog posts.");
      } finally {
        setLoading(false);
      }
    };
    getBlogPosts();
  }, []);

  const categories = [
    t("blog_filter_all"),
    t("blog_filter_web_dev"),
    t("blog_filter_ai"),
    t("blog_filter_career"),
    t("blog_filter_open_source"),
    t("blog_filter_mindset"),
  ];

  const [selectedCategory, setSelectedCategory] = useState(t("blog_filter_all"));
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const categoryMatch =
      selectedCategory === t("blog_filter_all") || post.category === selectedCategory;
    const searchMatch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return categoryMatch && searchMatch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
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
        <SectionHeader title={t("blog_title")} subtitle="Writing" />

        {loading ? (
          <BlogSkeleton />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-sm text-red-500">
              {error}{" "}
              <a href="tel:+9779846724440" className="underline hover:text-red-600">
                +9779846724440
              </a>
            </p>
          </div>
        ) : currentPath !== "/blog" ? (
          /* ─── Home preview: featured posts ─── */
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-sm font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
                {t("blog_featured_title")}
              </h3>
              <button
                onClick={() => navigate("/blog")}
                className="inline-flex items-center gap-1 text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors duration-200 group"
              >
                {t("blog_view_more")}
                <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <FeaturedCard
                  key={post.id}
                  post={post}
                  onClick={() => navigate(`/blog/${post.id}`)}
                  readMoreLabel={t("blog_read_more")}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          /* ─── /blog page: search + all posts ─── */
          <>
            <motion.div variants={itemVariants} className="mb-10">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                {/* Search */}
                <div className="relative">
                  <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder={t("blog_search_placeholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-60 pl-9 pr-4 py-2 text-sm bg-stone-50 dark:bg-dark-800 border border-stone-200 dark:border-dark-600 rounded-xl text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-secondary-500/40 focus:border-secondary-500 transition-all duration-200"
                  />
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        selectedCategory === category
                          ? "bg-stone-900 dark:bg-white text-white dark:text-stone-900"
                          : "bg-stone-100 dark:bg-dark-700 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-dark-600"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {filteredPosts.length > 0 ? (
              <motion.div
                variants={itemVariants}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12"
              >
                {filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onClick={() => navigate(`/blog/${post.id}`)}
                    readMoreLabel={t("blog_read_more")}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="text-center py-20 px-4"
              >
                <ExclamationTriangleIcon className="w-10 h-10 mx-auto text-gray-300 dark:text-stone-600 mb-4" />
                <h3 className="text-base font-semibold text-stone-900 dark:text-white mb-1">
                  {t("blog_no_results_title")}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  {t("blog_no_results_subtitle")}
                </p>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </section>
  );
};

/* ─── Featured card (home page, 2-col) ─── */
const FeaturedCard = ({ post, onClick, readMoreLabel }) => (
  <motion.article
    whileHover={{ y: -3 }}
    transition={{ duration: 0.2 }}
    className="group cursor-pointer rounded-2xl border border-stone-100 dark:border-dark-700 bg-stone-50 dark:bg-dark-800 overflow-hidden hover:border-stone-200 dark:hover:border-dark-600 transition-colors duration-200"
    onClick={onClick}
  >
    {/* Thumbnail — category text placeholder */}
    <div className="aspect-video bg-gradient-to-br from-stone-100 to-stone-200 dark:from-dark-700 dark:to-dark-600 flex items-center justify-center">
      <span className="text-sm font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
        {post.category}
      </span>
    </div>

    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <CategoryPill category={post.category} />
        <span className="text-xs text-stone-400 dark:text-stone-500">
          {formatDate(post.date)}
        </span>
      </div>

      <h4 className="text-base font-semibold text-stone-900 dark:text-white mb-2 group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors duration-200 leading-snug">
        {post.title}
      </h4>

      <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2 mb-4 leading-relaxed">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-dark-700">
        <div className="flex items-center gap-3 text-xs text-stone-400 dark:text-stone-500">
          <span className="flex items-center gap-1">
            <ClockIcon className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
          <span>{post.author}</span>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary-600 dark:text-secondary-400 group-hover:gap-1.5 transition-all duration-200">
          {readMoreLabel}
          <ArrowRightIcon className="w-3 h-3" />
        </span>
      </div>
    </div>
  </motion.article>
);

/* ─── Standard card (blog page, 3-col) ─── */
const PostCard = ({ post, onClick, readMoreLabel }) => (
  <motion.article
    whileHover={{ y: -3 }}
    transition={{ duration: 0.2 }}
    className="group cursor-pointer rounded-2xl border border-stone-100 dark:border-dark-700 bg-stone-50 dark:bg-dark-800 overflow-hidden hover:border-stone-200 dark:hover:border-dark-600 transition-colors duration-200"
    onClick={onClick}
  >
    <div className="aspect-video bg-gradient-to-br from-stone-100 to-stone-200 dark:from-dark-700 dark:to-dark-600 flex items-center justify-center">
      <span className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
        {post.category}
      </span>
    </div>

    <div className="p-5">
      <div className="flex items-center justify-between mb-2.5">
        <CategoryPill category={post.category} />
        <span className="text-xs text-stone-400 dark:text-stone-500">
          {formatDate(post.date)}
        </span>
      </div>

      <h4 className="text-sm font-semibold text-stone-900 dark:text-white mb-2 line-clamp-2 group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors duration-200 leading-snug">
        {post.title}
      </h4>

      <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mb-4 leading-relaxed">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-stone-400 dark:text-stone-500 flex items-center gap-1">
          <ClockIcon className="w-3 h-3" />
          {post.readTime}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary-600 dark:text-secondary-400">
          {readMoreLabel}
          <ArrowRightIcon className="w-3 h-3" />
        </span>
      </div>
    </div>
  </motion.article>
);

export default Blog;