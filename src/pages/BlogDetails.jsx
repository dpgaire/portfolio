import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
  ShareIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  BookmarkIcon as BookmarkSolidIcon,
} from "@heroicons/react/24/solid";
import {blogPosts} from '../posts/index'; // Assuming you have a data file with blog posts


const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Sample blog posts data (in a real app, this would come from an API)


  const post = blogPosts.find((p) => p.id === parseInt(id));

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) {
    return (
      <div
        id="blog"
        className="min-h-screen bg-white dark:bg-dark-900 text-gray-900 dark:text-white"
      >
        <div id="blog" className="container-custom section-padding text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <button onClick={() => navigate("/")} className="btn-primary">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-dark-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <article className="pt-20">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-800 dark:to-dark-900 py-16">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate("/")}
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 mb-8"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Blog
            </motion.button>

            <div className="max-w-4xl mx-auto">
              {/* Category */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4"
              >
                <span className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 rounded-full text-sm font-medium">
                  <TagIcon className="w-3 h-3 mr-1" />
                  {post.category}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className=" text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                {post.title}
              </motion.h1>

              {/* Excerpt */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
              >
                {post.excerpt}
              </motion.p>

              {/* Meta Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400"
              >
                <div className="flex items-center">
                  <UserIcon className="w-5 h-5 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  <span>{post.readTime}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl sm:max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert w-full max-w-full overflow-auto"
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .replace(/\n/g, "<br>")
                      .replace(/```(.*?)```/gs, "<pre><code>$1</code></pre>")
                      .replace(/`(.*?)`/g, "<code>$1</code>")
                      .replace(/### (.*?)(<br>|$)/g, "<h3>$1</h3>")
                      .replace(/## (.*?)(<br>|$)/g, "<h2>$1</h2>")
                      .replace(/# (.*?)(<br>|$)/g, "<h1>$1</h1>"),
                  }}
                />

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-700"
                >
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-800 dark:hover:text-primary-300 transition-colors duration-200 cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Actions */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="card p-6"
                  >
                    <h3 className="font-semibold mb-4">Actions</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setLiked(!liked)}
                        className={`w-full flex items-center justify-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                          liked
                            ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                            : "bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600"
                        }`}
                      >
                        {liked ? (
                          <HeartSolidIcon className="w-5 h-5 mr-2" />
                        ) : (
                          <HeartIcon className="w-5 h-5 mr-2" />
                        )}
                        {liked ? "Liked" : "Like"} (
                        {post.likes + (liked ? 1 : 0)})
                      </button>

                      <button
                        onClick={() => setBookmarked(!bookmarked)}
                        className={`w-full flex items-center justify-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                          bookmarked
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                            : "bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600"
                        }`}
                      >
                        {bookmarked ? (
                          <BookmarkSolidIcon className="w-5 h-5 mr-2" />
                        ) : (
                          <BookmarkIcon className="w-5 h-5 mr-2" />
                        )}
                        {bookmarked ? "Saved" : "Save"}
                      </button>

                      <button
                        onClick={handleShare}
                        className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors duration-200"
                      >
                        <ShareIcon className="w-5 h-5 mr-2" />
                        Share
                      </button>
                    </div>
                  </motion.div>

                  {/* Comments */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="card p-6"
                  >
                    <h3 className="font-semibold mb-4">Discussion</h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <ChatBubbleLeftIcon className="w-5 h-5 mr-2" />
                      <span>{post.comments} comments</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Join the conversation on social media or reach out
                      directly.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogDetails;
