import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Navigation />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
