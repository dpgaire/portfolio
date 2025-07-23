import React from 'react';
import { Helmet } from 'react-helmet-async';
import Projects from '../components/Projects';

const ProjectPage = () => {
  return (
    <>
      <Helmet>
        {/* Basic SEO */}
        <title>Durga Gairhe - Projects & Developer Tools</title>
        <meta
          name="description"
          content="Explore featured projects by Durga Gairhe – full-stack developer. Discover developer tools, AI platforms, productivity apps, and creative web solutions built using React, Tailwind, Node.js, and modern APIs."
        />
        <link rel="canonical" href="https://www.durgagairhe.com.np/projects" />

        {/* Open Graph for Social Media */}
        <meta property="og:title" content="Portfolio Projects & Developer Tools" />
        <meta name="keywords" content="Durga Gairhe, projects, frontend developer, react, javascript, tools, ai, nepal, portfolio, tailwind, vite, openrouter, apis, productivity apps, developer projects" />
        <meta
          property="og:description"
          content="Browse through innovative projects by Durga Gairhe, including AI content platforms, productivity tools, and web utilities powered by React, Tailwind, Vite, and APIs."
        />
        <meta property="og:url" content="https://www.durgagairhe.com.np/projects" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.durgagairhe.com.np/preview-projects.jpg" /> {/* Optional preview image */}

        {/* Optional Schema (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Durga Gairhe - Projects",
            "url": "https://www.durgagairhe.com.np/projects",
            "description": "Portfolio collection of full-stack development projects by Durga Gairhe, built using modern web technologies.",
            "author": {
              "@type": "Person",
              "name": "Durga Gairhe"
            }
          })}
        </script>
      </Helmet>

      <main>
        <Projects />
      </main>
    </>
  );
};

export default ProjectPage;
