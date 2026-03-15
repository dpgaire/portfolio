import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAbout } from "../context/AboutContext";
import LoadingSpinner from "./ui/LoadingSpinner";
import FallbackError from "./ui/FallbackError";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const { aboutData, loading, error } = useAbout();

  if (loading) return <LoadingSpinner />;
  if (error) return <FallbackError />;
  if (!aboutData?.contactDetails) return null;

  const { fullName, email, location } = aboutData.contactDetails;
  const { tagline } = aboutData;

  const quickLinks = [
    { name: t("home"), href: "#home" },
    { name: t("about"), href: "#about" },
    { name: t("projects"), href: "#projects" },
    { name: t("skills"), href: "#skills" },
    { name: t("blog"), href: "#blog" },
    { name: t("contact"), href: "#contact" },
  ];

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/dpgaire", icon: <Github className="w-4 h-4" /> },
    { name: "LinkedIn", url: "https://linkedin.com/in/durga-gairhe", icon: <Linkedin className="w-4 h-4" /> },
  ];

  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    navigate(`/${href}`);
  };

  return (
    <footer className="bg-white dark:bg-dark-900 border-t border-stone-100 dark:border-dark-700">
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Branding */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Logo row */}
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{initials}</span>
                </div>
                <span className="font-semibold text-stone-900 dark:text-white">{fullName}</span>
              </div>

              <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed mb-6 max-w-xs">
                {tagline}
              </p>

              {/* Social links — button style matching contact page */}
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-stone-200 dark:border-dark-600 text-sm text-stone-600 dark:text-stone-400 hover:border-stone-400 dark:hover:border-dark-400 hover:text-stone-900 dark:hover:text-white transition-all duration-200"
                    aria-label={social.name}
                  >
                    {social.icon}
                    <span className="text-xs">{social.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-5">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors duration-200"
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
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-5">
                {t("contact_title")}
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-xs text-stone-400 dark:text-stone-500 mb-1">
                    {t("contact_info_email_label")}
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="text-gray-700 dark:text-stone-300 hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors duration-200"
                  >
                    {email}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-stone-400 dark:text-stone-500 mb-1">
                    {t("contact_info_location_label")}
                  </p>
                  <p className="text-gray-700 dark:text-stone-300">{location}</p>
                </div>
                <div>
                  <p className="text-xs text-stone-400 dark:text-stone-500 mb-1">
                    {t("footer_availability_title")}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-secondary-600 dark:text-secondary-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-500" />
                    {t("contact_availability_title")}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-100 dark:border-dark-700">
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-stone-400 dark:text-stone-500">
            <span>
              {t("footer_text", { year: currentYear, name: t("nav_title") })}
            </span>
            <div className="flex gap-5">
              <button
                onClick={() => navigate("/privacy-policy")}
                className="hover:text-stone-900 dark:hover:text-white transition-colors duration-200"
              >
                {t("privacy_policy")}
              </button>
              <button
                onClick={() => navigate("/terms-of-service")}
                className="hover:text-stone-900 dark:hover:text-white transition-colors duration-200"
              >
                {t("terms_of_service")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;