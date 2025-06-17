import { blogPosts } from "../utils";
import BlogCard from "./ui/BlogCard";

const Blog = () => (
  <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-800 relative">
    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent dark:from-gray-900 dark:to-transparent -z-10"></div>
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Latest Blog Posts</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Insights, tutorials, and thoughts on modern web development
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6"></div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  </section>
);

export default Blog;