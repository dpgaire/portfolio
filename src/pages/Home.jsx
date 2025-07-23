import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
  <title>Durga Gairhe - Full-Stack Developer & System Architect</title>
  <meta
    name="description"
    content="Full-Stack Developer specializing in React, Node.js, and modern web technologies. Building scalable applications with precision and creativity."
  />

  {/* Open Graph for social media previews */}
  <meta property="og:title" content="Durga Gairhe - Full-Stack Developer" />
  <meta property="og:description" content="React & Node.js expert building scalable applications." />
  <meta property="og:image" content="https://www.durgagairhe.com.np/images/durga.png" />
  <meta property="og:url" content="https://www.durgagairhe.com.np" />
  <meta property="og:type" content="website" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Durga Gairhe - Full-Stack Developer" />
  <meta name="twitter:description" content="System architect & React expert based in Nepal." />
  <meta name="twitter:image" content="https://www.durgagairhe.com.np/images/durga.png" />

  {/* JSON-LD Schema.org Markup */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Durga Gairhe",
      "url": "https://www.durgagairhe.com.np",
      "image": "https://www.durgagairhe.com.np/images/durga.png",
      "jobTitle": "Full-Stack Developer & System Architect",
      "sameAs": [
        "https://github.com/dpgaire",
        "https://www.linkedin.com/in/durgagairhe/"
      ]
    })}
  </script>
</Helmet>

      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="blog">
          <Blog />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </>
  );
};

export default Home;
