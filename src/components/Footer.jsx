import { motion } from "framer-motion";
import {
  HeartIcon,
  CodeBracketIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { Github, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const quickLinks = [
    { name: t("home"), href: "#home" },
    { name: t("about"), href: "#about" },
    { name: t("projects"), href: "#projects" },
    { name: t("skills"), href: "#skills" },
    { name: t("blog"), href: "#blog" },
    { name: t("contact"), href: "#contact" },
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

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    navigate(`/${href}`);
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
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 via-teal-500 to-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">DG</span>
                  </div>
                  <span className="text-2xl font-bold bg-clip-text text-transparent  bg-gradient-to-r from-emerald-400 via-teal-500 to-green-600">
                    {t("nav_title")}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
                  {t('footer_intro')}
                  
                </p>

                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 dark:bg-dark-800 hover:bg-gradient-to-br hover:from-emerald-400 hover:to-green-600 rounded-lg flex items-center justify-center transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      aria-label={`Visit ${social.name}`}
                    >
                      <span className="text-xl" aria-hidden="true">
                        {social.icon}
                      </span>
                      {/* Hidden text for screen readers (optional alternative to aria-label) */}
                      {/* <span className="sr-only">{social.name}</span> */}
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
                <h3 className="text-lg font-semibold mb-4">{t("contact_title")}</h3>
                <div className="space-y-3 text-gray-600 dark:text-gray-400">
                  <p>
                    <span className="font-medium text-gray-800 dark:text-white block">
                     {t("contact_info_email_label")}
                    </span>
                    gairhedurga13@gmail.com
                  </p>
                  <p>
                    <span className="font-medium text-gray-800 dark:text-white block">
                      {t("contact_info_location_label")}
                    </span>
                    Kathmandu, Nepal
                  </p>
                  <p>
                    <span className="font-medium text-gray-800 dark:text-white block">
                     {t("footer_availability_title")}
                    </span>
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                     {t("contact_availability_title")}
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
              ><span>
  {t("footer_text", { year: currentYear, name: t("nav_title") })}
</span>

              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex space-x-4"
              >
                <button
                  onClick={() => navigate("/privacy-policy")}
                  className="hover:text-primary-500 dark:hover:text-white transition-colors duration-200"
                >
                  {t("privacy_policy")}
                </button>
                <button
                  onClick={() => navigate("/terms-of-service")}
                  className="hover:text-primary-500 dark:hover:text-white transition-colors duration-200"
                >
                  {t("terms_of_service")}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
