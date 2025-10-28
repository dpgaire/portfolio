import React, { Suspense, lazy } from "react";
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
import { useOnlineStatus } from "./utils/useOnlineStatus";
import OfflineToast from "./components/ui/OfflineToast";

function App() {
  const isOnline = useOnlineStatus();

  return (
    <HelmetProvider>
      <Router>
        <ThemeProvider>
          <Layout>
            <SpeedInsights />
            <InstallPWAButton />
            <ScrollToTop />
            {!isOnline && (
              <OfflineToast
                isVisible={!isOnline}
                message="You are currently offline. Some features may not be available."
              />
            )}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog/:id" element={<BlogDetails />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/projects" element={<ProjectPage />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
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
