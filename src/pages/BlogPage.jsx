import React, { useEffect } from "react";
import Blog from "../components/Blog";

const BlogPage = () => {
  useEffect(() => {
    // Set page title
    document.title = "Durga Gairhe - Blogs";
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Explore insights, tutorials, and development tips from Durga Gairhe – a Full-Stack Developer with a passion for React, Node.js, and modern web engineering. Stay updated with real-world coding practices and tech innovations."
      );
    }
  }, []);
  return (
    <main>
      <Blog />
    </main>
  );
};

export default BlogPage;
