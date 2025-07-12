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
        <title>Durga Gairhe -Full-Stack Developer & System Architect</title>
        <meta
          name="description"
          content="Full-Stack Developer specializing in React, Node.js, and modern web technologies. Building scalable applications with precision and creativity."
        />
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
