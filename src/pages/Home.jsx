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

const Home = () => {
 const { theme } = useTheme();
  
  useEffect(() => {
    // Add smooth scrolling styles
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      ::selection {
        background: rgba(59, 130, 246, 0.5);
        color: white;
      }
      .animate-spin-slow {
        animation: spin 8s linear infinite;
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .line-clamp-3 {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
    `;
    document.head.appendChild(style);
    
    return () => document.head.removeChild(style);
  }, []);
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Navigation  />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Blog />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
