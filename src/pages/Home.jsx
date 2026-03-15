import { Suspense, lazy, useState } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import { Helmet } from "react-helmet-async";
import ChatbotSkeleton from "../components/ui/ChatbotSkeleton";
import { MessageCircle } from "lucide-react";
import { useAbout } from "../context/AboutContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import FallbackError from "../components/ui/FallbackError";

const PremiumChatbot = lazy(() => import("../components/Chatbot"));

const Home = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { aboutData, loading, error } = useAbout();
  if (loading) return <LoadingSpinner />;
  if (error) return <FallbackError />;
  if (!aboutData) return null;

  const {
    title,
    description,
    tagline,
    philosophy,
    contactDetails,
    tags,
    areasOfExpertise,
    stats,
  } = aboutData;

  return (
    <>
      <Helmet>
        <title>Durga Gairhe - Full-Stack Developer & System Architect</title>
        <meta
          name="description"
          content="Full-Stack Developer specializing in React, Node.js, and modern web technologies. Building scalable applications with precision and creativity."
        />
        <meta property="og:title" content="Durga Gairhe - Full-Stack Developer" />
        <meta property="og:description" content="React & Node.js expert building scalable applications." />
        <meta property="og:image" content="https://www.durgagairhe.com.np/images/durga.png" />
        <meta property="og:url" content="https://www.durgagairhe.com.np" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Durga Gairhe - Full-Stack Developer" />
        <meta name="twitter:description" content="System architect & React expert based in Nepal." />
        <meta name="twitter:image" content="https://www.durgagairhe.com.np/images/durga.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Durga Gairhe",
            url: "https://www.durgagairhe.com.np",
            image: "https://www.durgagairhe.com.np/images/durga.png",
            jobTitle: "Full-Stack Developer & System Architect",
            sameAs: ["https://github.com/dpgaire", "https://www.linkedin.com/in/durgagairhe/"],
          })}
        </script>
      </Helmet>

      <main>
        <section id="home"><Hero tags={tags} tagline={tagline} cv={contactDetails?.cv} /></section>
        <section id="about">
          <About
            title={title}
            description={description}
            areasOfExpertise={areasOfExpertise}
            stats={stats}
            philosophy={philosophy}
            profileImage={contactDetails?.profileImage}
          />
        </section>
        <section id="skills"><Skills /></section>
        <section id="projects"><Projects /></section>
        <section id="blog"><Blog /></section>
        <section id="contact"><Contact contactDetails={contactDetails} /></section>
      </main>

      {/* Chat FAB — single, calm, intentional */}
      {/* <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-dark-900" />

          <button
            onClick={() => setIsChatbotOpen(true)}
            className="group w-12 h-12 rounded-xl bg-stone-900 dark:bg-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center"
            aria-label="Open chat"
          >
            <MessageCircle className="w-5 h-5 text-white dark:text-stone-900 group-hover:rotate-6 transition-transform duration-200" />
          </button>
        </div>
      </div> */}

      {/* {isChatbotOpen && (
        <Suspense fallback={<ChatbotSkeleton />}>
          <PremiumChatbot setIsOpen={setIsChatbotOpen} />
        </Suspense>
      )} */}
    </>
  );
};

export default Home;