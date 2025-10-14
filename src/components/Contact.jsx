import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { postContactForm } from "../api";

const Contact = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company_website: "", 
  });

  const [formStatus, setFormStatus] = useState({
    type: "", // 'success', 'error', 'loading'
    message: "",
  });

  const sanitizeInput = (str) => {
    const temp = document.createElement("div");
    temp.textContent = str;
    return temp.innerHTML;
  };

  const isValidForm = ({ name, email, subject, message }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      return { valid: false, message: "All fields are required." };
    }

    if (!emailRegex.test(email)) {
      return { valid: false, message: "Please enter a valid email address." };
    }

    if (message.length > 1000) {
      return {
        valid: false,
        message: "Message is too long (max 1000 characters).",
      };
    }

    return { valid: true };
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      label: t("contact_info_email_label"),
      value: "gairhedurga13@gmail.com",
      href: "mailto:gairhedurga13@gmail.com",
    },
    {
      icon: PhoneIcon,
      label: t("contact_info_phone_label"),
      value: "+977 9846724440",
      href: "tel:+9779846724440",
    },
    {
      icon: MapPinIcon,
      label: t("contact_info_location_label"),
      value: "Kathmandu, Nepal",
      href: "https://maps.google.com/?q=Kathmandu,Nepal",
    },
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check
    // if (formData.company_website !== "") {
    //   console.warn("Bot detected via honeypot!");
    //   return;
    // }

    // Validation
    const validation = isValidForm(formData);
    if (!validation.valid) {
      setFormStatus({ type: "error", message: validation.message });
      return;
    }

    setFormStatus({ type: "loading", message: "Sending message..." });

    try {
      await postContactForm(formData);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        company_website: "",
      });

      setFormStatus({
        type: "success",
        message: t("contact_form_success"),
      });

      setTimeout(() => {
        setFormStatus({ type: "", message: "" });
      }, 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setFormStatus({
        type: "error",
        message: t("contact_form_error"),
      });
    }
  };

  return (
    <section className="section-padding bg-gray-50 dark:bg-dark-800/50">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container-custom"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">{t("contact_title")}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("contact_subtitle")}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-green-600 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t("contact_info_title")}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {t("contact_info_subtitle")}
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    info.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="flex items-center p-4 bg-white dark:bg-dark-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-emerald-400 via-teal-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {info.label}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t("contact_follow_title")}
              </h4>
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
            </div>

            {/* Availability Status */}
            <motion.div
              variants={itemVariants}
              className="p-6 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/10 dark:to-primary-900/10 rounded-xl border border-accent-200/50 dark:border-accent-800/50"
            >
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {t("contact_availability_title")}
                </h4>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t("contact_availability_desc")}
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t("contact_form_title")}
              </h3>

              {/* Form Status */}
              {formStatus.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-lg flex items-center ${
                    formStatus.type === "success"
                      ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800"
                      : formStatus.type === "error"
                      ? "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"
                      : "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                  }`}
                >
                  {formStatus.type === "success" && (
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                  )}
                  {formStatus.type === "error" && (
                    <ExclamationCircleIcon className="w-5 h-5 mr-2" />
                  )}
                  {formStatus.type === "loading" && (
                    <div className="w-5 h-5 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  )}
                  <span>{formStatus.message}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("contact_form_name_label")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                      placeholder={t("contact_form_name_placeholder")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("contact_form_email_label")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                      placeholder={t("contact_form_email_placeholder")}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Company Website
                    </label>
                    <input
                      type="text"
                      name="company_website"
                      value={formData.company_website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Company website (optional)"
                      tabIndex="-1"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t("contact_form_subject_label")}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                      placeholder={t("contact_form_subject_placeholder")}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("contact_form_message_label")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none"
                    placeholder={t("contact_form_message_placeholder")}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={
                    formStatus.type === "loading" ||
                    !formData.name.trim() ||
                    !formData.email.trim() ||
                    !formData.subject.trim() ||
                    !formData.message.trim()
                  }
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus.type === "loading" ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                      {t("contact_form_button")}
                    </div>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
