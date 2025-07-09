import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Helmet } from "react-helmet-async";
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
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  BookmarkIcon as BookmarkSolidIcon,
} from "@heroicons/react/24/solid";
import { blogPosts } from "../posts/index";
import { CheckIcon } from "lucide-react";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [markdownContent, setMarkdownContent] = useState("");

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

  useEffect(() => {
    if (post && post.content) {
      setMarkdownContent(post.content);
    }
  }, [post]);

  // SEO Helper Functions
  const generateCanonicalUrl = () => {
    return `https://www.durgagairhe.com.np/blog/${id}`;
  };

  const generateMetaDescription = () => {
    if (!post) return "Blog post not found";
    return post.excerpt.length > 160 
      ? post.excerpt.substring(0, 157) + "..." 
      : post.excerpt;
  };

  const generateKeywords = () => {
    if (!post) return "";
    return post.tags.join(", ");
  };

  const generateStructuredData = () => {
    if (!post) return {};
    
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.image || "https://www.durgagairhe.com.np/default-blog-image.jpg",
      "author": {
        "@type": "Person",
        "name": post.author,
        "url": "https://www.durgagairhe.com.np/about"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Durga Gairhe",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.durgagairhe.com.np/logo.png"
        }
      },
      "datePublished": post.date,
      "dateModified": post.lastModified || post.date,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": generateCanonicalUrl()
      },
      "keywords": post.tags,
      "articleSection": post.category,
      "wordCount": markdownContent.split(' ').length,
      "timeRequired": post.readTime,
      "url": generateCanonicalUrl(),
      "isPartOf": {
        "@type": "Blog",
        "@id": "https://www.durgagairhe.com.np/blog"
      }
    };
  };

  const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const [copied, setCopied] = useState(false);
    const match = /language-(\w+)/.exec(className || "");
    const codeText = String(children).replace(/\n$/, "");

    const handleCopy = () => {
      navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return !inline ? (
      <div className="relative">
        <div className="absolute right-2 top-2 z-10">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded bg-gray-700/50 px-2 py-1 text-xs text-white hover:bg-gray-600/50 transition-colors"
            title="Copy code"
          >
            {copied ? (
              <>
                <CheckIcon className="h-3 w-3" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <DocumentDuplicateIcon className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <SyntaxHighlighter
          language={match ? match[1] : "javascript"}
          style={vscDarkPlus}
          showLineNumbers={true}
          wrapLines={true}
          {...props}
        >
          {codeText}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code
        className="bg-gray-100 dark:bg-dark-700 px-2 py-1 rounded text-sm"
        {...props}
      >
        {children}
      </code>
    );
  };

  if (!post) {
    return (
      <>
        <Helmet>
          <title>Post Not Found - Durga Gairhe</title>
          <meta name="description" content="The blog post you're looking for doesn't exist." />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="min-h-screen bg-white dark:bg-dark-900 text-gray-900 dark:text-white">
          <div className="container-custom section-padding text-center">
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
      </>
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
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{post.title} - Durga Gairhe</title>
        <meta name="description" content={generateMetaDescription()} />
        <meta name="keywords" content={generateKeywords()} />
        <meta name="author" content={post.author} />
        <link rel="canonical" href={generateCanonicalUrl()} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={generateMetaDescription()} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={generateCanonicalUrl()} />
        <meta property="og:image" content={post.image || "https://www.durgagairhe.com.np/default-blog-image.jpg"} />
        <meta property="og:site_name" content="Durga Gairhe" />
        <meta property="article:author" content={post.author} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.lastModified || post.date} />
        <meta property="article:section" content={post.category} />
        {post.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={generateMetaDescription()} />
        <meta name="twitter:image" content={post.image || "https://www.durgagairhe.com.np/default-blog-image.jpg"} />
        <meta name="twitter:creator" content="@durgagairhe" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData())}
        </script>
      </Helmet>

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
                className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
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
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
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
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1
                          className="text-3xl font-bold mb-4 mt-8"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          className="text-2xl font-bold mb-3 mt-6"
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          className="text-xl font-bold mb-2 mt-4"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="mb-4 leading-relaxed" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc pl-5 mb-4" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal pl-5 mb-4" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="mb-2" {...props} />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote
                          className="border-l-4 border-primary-500 pl-4 italic my-4"
                          {...props}
                        />
                      ),
                      code: CodeBlock,
                      a: ({ node, ...props }) => (
                        <a
                          className="text-primary-600 dark:text-primary-400 hover:underline"
                          {...props}
                        />
                      ),
                      img: ({ node, alt, src, ...props }) => (
                        <img
                          alt={alt || "Blog post image"}
                          src={src}
                          loading="lazy"
                          className="rounded-lg shadow-md"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {markdownContent}
                  </ReactMarkdown>
                </motion.div>

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

