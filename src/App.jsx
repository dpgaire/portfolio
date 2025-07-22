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
import { useEffect, useState } from "react";

function App() {
  //  const [showSplash, setShowSplash] = useState(false)

  //  useEffect(() => {
  //   const isStandalone =
  //     window.matchMedia('(display-mode: standalone)').matches ||
  //     window.navigator.standalone === true

  //   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  //   if (isStandalone && isMobile) {
  //     setShowSplash(true)
  //   }
  // }, [])

  // const handleSplashComplete = () => {
  //   setShowSplash(false)
  // }

  return (
    <HelmetProvider>
      <Router>
        <ThemeProvider>
          <Layout>
             {/* {showSplash && <SplashScreen onComplete={handleSplashComplete} />} */}
            <SpeedInsights />
             <InstallPWAButton />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/projects" element={<ProjectPage />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
