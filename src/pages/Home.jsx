import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import Hero from "../components/Hero";
import Navigation from "../components/Navigation";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

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
    <div className="min-h-screen bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Navigation />
        <Chatbot />
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
     
      <Footer />
    </div>
  );
};

export default Home;

