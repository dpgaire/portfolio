import { Helmet } from "react-helmet-async";
import Blog from "../components/Blog";
import { blogPosts } from "../posts";

const BlogPage = () => {
  return (
    <>
      <Helmet>
        {/* Basic SEO */}
        <title>Durga Gairhe - Blogs & Development Insights</title>
        <meta
          name="description"
          content="Explore developer blogs, coding tutorials, and tech insights from Durga Gairhe – a Full-Stack Developer with expertise in React, Node.js, and modern web architecture."
        />
        <link rel="canonical" href="https://www.durgagairhe.com.np/blog" />
        {/* Open Graph for Social Media */}
        <meta
          property="og:title"
          content="Durga Gairhe - Blogs & Development Insights"
        />
        <meta
          name="keywords"
          content="Durga Gairhe, blogs, portfolio, frontend, react developer, saas,nepal, tailwind, gaire, ai developer, javascript, web development"
        />
        <meta
          property="og:description"
          content="Stay updated with insightful blogs and tutorials on React, Node.js, system architecture, and scalable full-stack web development by Durga Gairhe."
        />
        <meta property="og:url" content="https://www.durgagairhe.com.np/blog" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.durgagairhe.com.np/preview.jpg"
        />{" "}
        {/* Update with your actual preview image URL */}
        {/* Optional Schema (JSON-LD) */}
        {blogPosts.map((post) => (
          <script key={post.slug} type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://www.durgagairhe.com.np/blog/${post.slug}`,
              },
              headline: post.title,
              description: post.excerpt,
              image: post.image,
              author: {
                "@type": "Person",
                name: post.author,
              },
              publisher: {
                "@type": "Organization",
                name: "Durga Gairhe",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.durgagairhe.com.np/logo.png",
                },
              },
              datePublished: post.date,
              dateModified: post.date,
            })}
          </script>
        ))}
      </Helmet>

      <main>
        <Blog />
      </main>
    </>
  );
};

export default BlogPage;
