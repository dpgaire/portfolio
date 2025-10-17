import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import Chatbot from "../components/Chatbot";
import { Analytics } from "@vercel/analytics/react";
import Toast from "../components/ui/Toast";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Navigation />
      {children}
      <Analytics />
      <Chatbot />
      <Toast />
      <Footer />
    </div>
  );
};

export default Layout;
