import { motion } from "framer-motion";
import {
  HeartIcon,
  CodeBracketIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/dpgaire",
      icon: <Github />,
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/durga-gairhe",
      icon: <Linkedin />,
      color: "hover:text-blue-600",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative dark:bg-dark-900 dark:text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Logo */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">DG</span>
                  </div>
                  <span className="text-2xl font-bold gradient-text">
                    Durga Gairhe
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
                  Full-Stack Developer passionate about creating exceptional
                  digital experiences. Building the future, one line of code at
                  a time.
                </p>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 dark:bg-dark-800 hover:bg-gradient-to-br hover:from-primary-500 hover:to-secondary-500 rounded-lg flex items-center justify-center transition-all duration-300 group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                        {social.icon}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Contact Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-6">Get In Touch</h3>
                <div className="space-y-3">
                  <p className="text-gray-400">
                    <span className="block font-medium text-white mb-1">
                      Email
                    </span>
                    gairhedurga13@gmail.com
                  </p>
                  <p className="text-gray-400">
                    <span className="block font-medium text-white mb-1">
                      Location
                    </span>
                    Kathmandu, Nepal
                  </p>
                  <p className="text-gray-400">
                    <span className="block font-medium text-white mb-1">
                      Availability
                    </span>
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      Available for projects
                    </span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        {/* <div className="border-t border-dark-700">
          <div className="container-custom px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center text-gray-400 text-sm mb-4 md:mb-0 space-y-2 md:space-y-0 md:space-x-1 text-center md:text-left"
              >
                <span>© {currentYear} Durga Gairhe. Made with</span>
                <HeartIcon className="w-4 h-4 text-red-500" />
                <span>and</span>
                <CodeBracketIcon className="w-4 h-4 text-primary-400" />
                <span>in Nepal</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-6 text-sm text-gray-400"
              >
                <button
                  onClick={() => handleNavClick("#home")}
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => handleNavClick("#home")}
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </button>
              </motion.div>
            </div>
          </div>
        </div> */}
        <div className="border-t border-dark-700">
  <div className="container-custom px-4 sm:px-6 lg:px-8 py-6">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 text-center md:text-left">
      
      {/* Left Side */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center lg:justify-between items-center gap-1 text-gray-400 text-sm"
      >
        <span>© {currentYear} Durga Gairhe. Made with</span>
        <HeartIcon className="w-4 h-4 text-red-500" />
        <span>and</span>
        <CodeBracketIcon className="w-4 h-4 text-primary-400" />
        <span>in Nepal</span>
      </motion.div>

      {/* Right Side */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="flex justify-center md:justify-end items-center gap-4 text-sm text-gray-500"
      >
        <button
          onClick={() => handleNavClick("#home")}
          className="hover:text-white transition-colors duration-200"
        >
          Privacy Policy
        </button>
        <button
          onClick={() => handleNavClick("#home")}
          className="hover:text-white transition-colors duration-200"
        >
          Terms of Service
        </button>
      </motion.div>

    </div>
  </div>
</div>

      </div>

      {/* Scroll to Top Button */}
      {/* <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-1 right-4 w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group"
      >
        <ArrowUpIcon className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
      </motion.button> */}
    </footer>
  );
};

export default Footer;
