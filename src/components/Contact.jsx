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

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-16">
    <p className="text-xs font-semibold tracking-widest text-secondary-600 dark:text-secondary-400 uppercase mb-3">
      {subtitle}
    </p>
    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-white">
      {title}
    </h2>
  </div>
);

const Contact = ({ contactDetails }) => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company_website: "",
  });

  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  const isValidForm = ({ name, email, subject, message }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim())
      return { valid: false, message: "All fields are required." };
    if (!emailRegex.test(email))
      return { valid: false, message: "Please enter a valid email address." };
    if (message.length > 1000)
      return { valid: false, message: "Message is too long (max 1000 characters)." };
    return { valid: true };
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      label: t("contact_info_email_label"),
      value: contactDetails?.email,
      href: `mailto:${contactDetails?.email}`,
    },
    {
      icon: PhoneIcon,
      label: t("contact_info_phone_label"),
      value: contactDetails?.phone,
      href: `tel:${contactDetails?.phone}`,
    },
    {
      icon: MapPinIcon,
      label: t("contact_info_location_label"),
      value: contactDetails?.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(contactDetails?.location)}`,
    },
  ];

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/dpgaire", icon: <Github className="w-4 h-4" /> },
    { name: "LinkedIn", url: "https://linkedin.com/in/durga-gairhe", icon: <Linkedin className="w-4 h-4" /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = isValidForm(formData);
    if (!validation.valid) {
      setFormStatus({ type: "error", message: validation.message });
      return;
    }
    setFormStatus({ type: "loading", message: "Sending message..." });
    try {
      await postContactForm(formData);
      setFormData({ name: "", email: "", subject: "", message: "", company_website: "" });
      setFormStatus({ type: "success", message: t("contact_form_success") });
      setTimeout(() => setFormStatus({ type: "", message: "" }), 5000);
    } catch (error) {
      setFormStatus({ type: "error", message: t("contact_form_error") });
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-white dark:bg-dark-800 border border-stone-200 dark:border-dark-600 rounded-xl text-sm text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-secondary-500/40 focus:border-secondary-500 transition-all duration-200";

  return (
    <section className="section-padding bg-stone-50 dark:bg-dark-800/50">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container-custom"
      >
        <SectionHeader title={t("contact_title")} subtitle="Get in touch" />

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left — contact info */}
          <motion.div variants={itemVariants} className="space-y-10">
            <div>
              <h3 className="text-xl font-semibold text-stone-900 dark:text-white mb-3">
                {t("contact_info_title")}
              </h3>
              <p className="text-stone-500 dark:text-stone-400 leading-relaxed">
                {t("contact_info_subtitle")}
              </p>
            </div>

            {/* Contact items — minimal, no card backgrounds */}
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-secondary-50 dark:bg-emerald-900/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors duration-200">
                    <info.icon className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 dark:text-stone-500 font-medium mb-0.5">
                      {info.label}
                    </p>
                    <p className="text-sm font-medium text-stone-900 dark:text-white group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors duration-200">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-4">
                {t("contact_follow_title")}
              </p>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 dark:border-dark-600 text-sm font-medium text-stone-600 dark:text-stone-400 hover:border-stone-400 dark:hover:border-dark-400 hover:text-stone-900 dark:hover:text-white transition-all duration-200"
                    aria-label={social.name}
                  >
                    {social.icon}
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability — clean status */}
            <div className="flex items-start gap-3 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 bg-secondary-50/50 dark:bg-emerald-900/10">
              <span className="w-2 h-2 rounded-full bg-secondary-500 mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-stone-900 dark:text-white">
                  {t("contact_availability_title")}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {t("contact_availability_desc")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white dark:bg-dark-800 rounded-2xl border border-stone-100 dark:border-dark-600 p-8">
              <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-6">
                {t("contact_form_title")}
              </h3>

              {formStatus.message && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-3.5 rounded-xl flex items-center gap-2.5 text-sm ${
                    formStatus.type === "success"
                      ? "bg-secondary-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                      : formStatus.type === "error"
                      ? "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"
                      : "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                  }`}
                >
                  {formStatus.type === "success" && <CheckCircleIcon className="w-4 h-4 flex-shrink-0" />}
                  {formStatus.type === "error" && <ExclamationCircleIcon className="w-4 h-4 flex-shrink-0" />}
                  {formStatus.type === "loading" && (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin flex-shrink-0" />
                  )}
                  <span>{formStatus.message}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot — truly hidden from users */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
                  <input
                    type="text"
                    name="company_website"
                    value={formData.company_website}
                    onChange={handleInputChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-1.5">
                      {t("contact_form_name_label")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={inputClass}
                      placeholder={t("contact_form_name_placeholder")}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-1.5">
                      {t("contact_form_email_label")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={inputClass}
                      placeholder={t("contact_form_email_placeholder")}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-1.5">
                    {t("contact_form_subject_label")}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                    placeholder={t("contact_form_subject_placeholder")}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-1.5">
                    {t("contact_form_message_label")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder={t("contact_form_message_placeholder")}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={
                    formStatus.type === "loading" ||
                    !formData.name.trim() ||
                    !formData.email.trim() ||
                    !formData.subject.trim() ||
                    !formData.message.trim()
                  }
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-sm font-semibold hover:bg-gray-700 dark:hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {formStatus.type === "loading" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <PaperAirplaneIcon className="w-4 h-4" />
                      {t("contact_form_button")}
                    </>
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