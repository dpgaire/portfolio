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
  BookmarkIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  BookmarkIcon as BookmarkSolidIcon,
} from "@heroicons/react/24/solid";
import { fetchBlogById } from "../api";
import { CheckIcon } from "lucide-react";
import BlogDetailsSkeleton from "../components/ui/BlogDetailsSkeleton";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await fetchBlogById(id);
        setPost(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress((scrollTop / docHeight) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (post?.content) setMarkdownContent(post.content);
  }, [post]);

  const generateCanonicalUrl = () => `https://www.durgagairhe.com.np/blog/${id}`;

  const generateMetaDescription = () => {
    if (!post) return "Blog post not found";
    return post.excerpt.length > 160 ? post.excerpt.substring(0, 157) + "..." : post.excerpt;
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
      <div className="relative group/code">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-xs font-medium opacity-0 group-hover/code:opacity-100 transition-all duration-200"
        >
          {copied ? (
            <><CheckIcon className="h-3 w-3" /><span>Copied</span></>
          ) : (
            <><DocumentDuplicateIcon className="h-3 w-3" /><span>Copy</span></>
          )}
        </button>
        <SyntaxHighlighter
          language={match ? match[1] : "javascript"}
          style={vscDarkPlus}
          showLineNumbers
          wrapLines
          customStyle={{ borderRadius: "0.75rem", fontSize: "0.8125rem" }}
          {...props}
        >
          {codeText}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className="bg-stone-100 dark:bg-dark-700 px-1.5 py-0.5 rounded-md text-xs font-mono" {...props}>
        {children}
      </code>
    );
  };

  if (loading) return <BlogDetailsSkeleton />;

  if (!post) {
    return (
      <>
        <Helmet>
          <title>Post Not Found - Durga Gairhe</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="min-h-screen bg-white dark:bg-dark-900 flex items-center justify-center">
          <div className="text-center px-6">
            <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-3">404</p>
            <h1 className="text-3xl font-bold text-stone-900 dark:text-white mb-3">Post Not Found</h1>
            <p className="text-stone-500 dark:text-stone-400 mb-8 text-sm">
              The blog post you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-sm font-semibold hover:bg-gray-700 dark:hover:bg-stone-100 transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </>
    );
  }

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.excerpt, url: window.location.href });
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.title} - Durga Gairhe</title>
        <meta name="description" content={generateMetaDescription()} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <meta name="author" content={post.author} />
        <link rel="canonical" href={generateCanonicalUrl()} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={generateMetaDescription()} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={generateCanonicalUrl()} />
        <meta property="og:image" content={post.image || "https://www.durgagairhe.com.np/default-blog-image.jpg"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={generateMetaDescription()} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            author: { "@type": "Person", name: post.author },
            datePublished: post.date,
            url: generateCanonicalUrl(),
          })}
        </script>
      </Helmet>

      {/* Reading progress — thin, subtle */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-transparent z-50">
        <div
          className="h-full bg-secondary-500 transition-all duration-100"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <article className="pt-16 bg-white dark:bg-dark-900 min-h-screen">
        {/* Hero */}
        <div className="border-b border-stone-100 dark:border-dark-700 py-14">
          <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-4xl">
            <button
              onClick={() => navigate("/blog")}
              className="inline-flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors duration-200 mb-10 group"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
              Back to Blog
            </button>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category + date */}
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 dark:bg-dark-700 text-stone-600 dark:text-stone-400">
                  <TagIcon className="w-3 h-3" />
                  {post.category}
                </span>
                <span className="text-xs text-stone-400 dark:text-stone-500">
                  {formatDate(post.date)}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-white mb-5 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-lg text-stone-500 dark:text-stone-400 leading-relaxed mb-8">
                {post.excerpt}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-5 text-sm text-stone-400 dark:text-stone-500">
                <span className="flex items-center gap-1.5">
                  <UserIcon className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <ClockIcon className="w-4 h-4" />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Body */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
              {/* Main content */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="lg:col-span-3"
              >
                <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-secondary-600 dark:prose-a:text-secondary-400 prose-blockquote:border-l-secondary-500 prose-code:text-sm prose-pre:p-0">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code: CodeBlock,
                      blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-2 border-secondary-500 pl-5 not-italic text-stone-600 dark:text-stone-400" {...props} />
                      ),
                      img: ({ node, alt, src, ...props }) => (
                        <img
                          alt={alt || "Blog image"}
                          src={src}
                          loading="lazy"
                          className="rounded-xl"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {markdownContent}
                  </ReactMarkdown>
                </div>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-stone-100 dark:border-dark-700">
                  <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-4">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-stone-100 dark:bg-dark-700 text-stone-600 dark:text-stone-400 rounded-full text-xs font-medium hover:bg-stone-200 dark:hover:bg-dark-600 transition-colors duration-200 cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.aside
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-24 space-y-4">
                  {/* Actions */}
                  <div className="rounded-2xl border border-stone-100 dark:border-dark-700 bg-stone-50 dark:bg-dark-800 p-5">
                    <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-4">
                      Actions
                    </p>
                    <div className="space-y-2">
                      <ActionButton
                        active={liked}
                        onClick={() => setLiked(!liked)}
                        icon={liked ? <HeartSolidIcon className="w-4 h-4 text-red-500" /> : <HeartIcon className="w-4 h-4" />}
                        label={`${liked ? "Liked" : "Like"} (${post.likes + (liked ? 1 : 0)})`}
                      />
                      <ActionButton
                        active={bookmarked}
                        onClick={() => setBookmarked(!bookmarked)}
                        icon={bookmarked ? <BookmarkSolidIcon className="w-4 h-4 text-secondary-500" /> : <BookmarkIcon className="w-4 h-4" />}
                        label={bookmarked ? "Saved" : "Save"}
                      />
                      <ActionButton
                        onClick={handleShare}
                        icon={<ShareIcon className="w-4 h-4" />}
                        label="Share"
                      />
                    </div>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

const ActionButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 ${
      active
        ? "bg-white dark:bg-dark-700 border border-stone-200 dark:border-dark-600 text-stone-900 dark:text-white"
        : "text-stone-500 dark:text-stone-400 hover:bg-white dark:hover:bg-dark-700 hover:text-stone-900 dark:hover:text-white"
    }`}
  >
    {icon}
    {label}
  </button>
);

export default BlogDetails;