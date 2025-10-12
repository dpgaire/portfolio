import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpeedInsights } from '@vercel/speed-insights/react';
import Home from "./pages/Home";
import { ThemeProvider } from "./context/ThemeContext";
import BlogDetails from "./pages/BlogDetails";
import Layout from "./layout";
import { HelmetProvider } from "react-helmet-async";
import BlogPage from "./pages/BlogPage";
import ScrollToTop from "./components/ui/ScrollToTop";
import ProjectPage from "./pages/ProjectPage";
import InstallPWAButton from "./components/InstallPWAButton";
import SplashScreen from "./components/SplashScreen";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFoundPage from "./pages/NotFoundPage"; // Import the new page
import ProjectDetails from "./pages/ProjectDetails"; // Import the new page
import { useEffect } from "react";
import PremiumChatbot from "./components/Chatbot";

function App() {
  //   useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     // Check for Ctrl + Shift + 1
  //     if (e.ctrlKey && e.shiftKey && e.key === "1") {
  //       e.preventDefault(); // Prevent any default browser behavior
  //       window.open("https://admin-dashboard-coral-nu-61.vercel.app", "_blank");
  //     }
  //   };

  //   // Add event listener when component mounts
  //   window.addEventListener("keydown", handleKeyDown);

  //   // Cleanup when component unmounts
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [])
  return (
    <HelmetProvider>
      <Router>
        <ThemeProvider>
          <Layout>
            <SpeedInsights />
             <InstallPWAButton />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/projects" element={<ProjectPage />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/chat" element={<PremiumChatbot />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFoundPage />} /> 
            </Routes>
          </Layout>
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
