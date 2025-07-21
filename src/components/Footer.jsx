import { motion } from "framer-motion";
import {
  HeartIcon,
  CodeBracketIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { Github, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
    const navigate = useNavigate()

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
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/durga-gairhe",
      icon: <Linkedin />,
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
     navigate(`/${href}`)
  };

  return (
    <footer className="relative bg-white dark:bg-dark-900 dark:text-gray-200 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Branding */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">DG</span>
                  </div>
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
                    Durga Gairhe
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
                  Full-Stack Developer passionate about creating exceptional
                  digital experiences. Building the future, one line of code at
                  a time.
                </p>

                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-gray-100 dark:bg-dark-800 hover:bg-gradient-to-br hover:from-primary-500 hover:to-secondary-500 rounded-lg flex items-center justify-center transition-all duration-300 group"
                    >
                      <span className="text-xl text-gray-600 dark:text-gray-300 group-hover:text-white">
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
                        className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Contact */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
                <div className="space-y-3 text-gray-600 dark:text-gray-400">
                  <p>
                    <span className="font-medium text-gray-800 dark:text-white block">
                      Email
                    </span>
                    gairhedurga13@gmail.com
                  </p>
                  <p>
                    <span className="font-medium text-gray-800 dark:text-white block">
                      Location
                    </span>
                    Kathmandu, Nepal
                  </p>
                  <p>
                    <span className="font-medium text-gray-800 dark:text-white block">
                      Availability
                    </span>
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                      Available for projects
                    </span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-dark-700">
          <div className="container-custom px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-wrap items-center justify-center gap-1"
              >
                <span>© {currentYear} Durga Gairhe. Made with</span>
                <HeartIcon className="w-4 h-4 text-red-500" />
                <span>and</span>
                <CodeBracketIcon className="w-4 h-4 text-primary-500" />
                <span>in Nepal</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex space-x-4"
              >
                <button
                  onClick={() => handleNavClick("#home")}
                  className="hover:text-primary-500 dark:hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => handleNavClick("#home")}
                  className="hover:text-primary-500 dark:hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Scroll To Top */}
      {/* <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 right-4 w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group"
      >
        <ArrowUpIcon className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
      </motion.button> */}
    </footer>
  );
};

export default Footer;
