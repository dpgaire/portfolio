import React, { Suspense, lazy, useState } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import { Helmet } from "react-helmet-async";
import ChatbotSkeleton from "../components/ui/ChatbotSkeleton";
import { MessageCircle, Bell } from "lucide-react";

const PremiumChatbot = lazy(() => import("../components/Chatbot"));

const Home = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

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
        <section id="skills">
          <Skills />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="blog">
          <Blog />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>

      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="relative group w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600 shadow-lg md:shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center backdrop-blur-sm"
        >
          <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white z-10" />
          <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <Bell className="w-2 h-2 md:w-3 md:h-3 text-white" />
          </div>
          <div className="absolute -bottom-1 -left-1 w-6 h-6 md:w-8 md:h-8 bg-emerald-500/20 rounded-full animate-ping"></div>
        </button>
      </div>

      {isChatbotOpen && (
        <Suspense fallback={<ChatbotSkeleton />}>
          <PremiumChatbot setIsOpen={setIsChatbotOpen} />
        </Suspense>
      )}
    </>
  );
};

export default Home;
