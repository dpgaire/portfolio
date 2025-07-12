import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Blog from "../components/Blog";
import Contact from "../components/Contact";


const Home = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Set the root `html` element class for Tailwind dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Set page title
    document.title = "Durga Gairhe - Full-Stack Developer & System Architect";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Full-Stack Developer specializing in React, Node.js, and modern web technologies. Building scalable applications with precision and creativity.');
    }
  }, [theme]);

  return (
   
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
   
  );
};

export default Home;

