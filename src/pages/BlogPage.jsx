import { Helmet } from "react-helmet-async";
import Blog from "../components/Blog";

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
        <meta property="og:title" content="Durga Gairhe - Blogs & Development Insights" />
        <meta name="keywords" content="Durga Gairhe, blogs, portfolio, frontend, react developer, saas,nepal, tailwind, gaire, ai developer, javascript, web development" />
        <meta
          property="og:description"
          content="Stay updated with insightful blogs and tutorials on React, Node.js, system architecture, and scalable full-stack web development by Durga Gairhe."
        />
        <meta property="og:url" content="https://www.durgagairhe.com.np/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.durgagairhe.com.np/preview.jpg" /> {/* Update with your actual preview image URL */}
        
        {/* Optional Schema (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "url": "https://www.durgagairhe.com.np/blog",
            "name": "Durga Gairhe - Blogs",
            "description": "Explore developer blogs and tutorials by Durga Gairhe on full-stack development and modern web technologies.",
            "author": {
              "@type": "Person",
              "name": "Durga Gairhe"
            }
          })}
        </script>
      </Helmet>

      <main>
        <Blog />
      </main>
    </>
  );
};

export default BlogPage;
