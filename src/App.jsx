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

function App() {
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
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            </Routes>
          </Layout>
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
