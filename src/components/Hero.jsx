import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TypeAnimation } from "react-type-animation";
import {
  ChevronDownIcon,
  DocumentArrowDownIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const Hero = ({ tags, tagline, cv }) => {
  const { t, i18n } = useTranslation();
  const sequence = tags.flatMap((tag) => [tag, 2000]);

  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-dark-900"
    >
      {/* Single, restrained background element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Single ambient glow — top right, barely visible */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-secondary-400/8 to-secondary-500/5 blur-3xl dark:from-secondary-400/6 dark:to-secondary-500/4" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 text-center px-6 mt-8 max-w-4xl mx-auto"
      >
        {/* Eyebrow — small status chip */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-stone-200 dark:border-dark-600 bg-stone-50 dark:bg-dark-800 text-xs font-medium text-stone-500 dark:text-stone-400 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-500 animate-pulse" />
            Available for work
          </span>
        </motion.div>

        {/* Main heading — refined weight and tracking */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl font-bold mb-5 leading-[1.05] tracking-tight text-stone-900 dark:text-white"
        >
          {t("hero_name")}
        </motion.h1>

        {/* Animated subtitle — constrained size */}
        <motion.div
          key={i18n.language}
          variants={itemVariants}
          className="text-xl sm:text-2xl font-medium mb-6 min-h-[2rem]"
        >
          <TypeAnimation
            sequence={sequence.length > 0 ? sequence : ["Loading...", 2000]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="gradient-text"
          />
        </motion.div>

        {/* Tagline — breathing room, restrained size */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-stone-500 dark:text-stone-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {tagline}
        </motion.p>

        {/* CTA Buttons — cleaner, not both filled */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-20"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-sm font-semibold hover:bg-gray-700 dark:hover:bg-stone-100 transition-colors duration-200"
          >
            <CodeBracketIcon className="w-4 h-4" />
            {t("hero_button_1")}
          </motion.a>

          <motion.a
            href={cv}
            target="_blank"
            download
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-200 dark:border-dark-600 text-gray-700 dark:text-stone-300 text-sm font-semibold hover:border-stone-400 dark:hover:border-dark-400 hover:bg-stone-50 dark:hover:bg-dark-800 transition-all duration-200"
          >
            <DocumentArrowDownIcon className="w-4 h-4" />
            {t("hero_button_2")}
          </motion.a>
        </motion.div>

        {/* Scroll indicator — minimal */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
          <span className="text-xs text-stone-400 dark:text-stone-500 tracking-widest uppercase">
            {t("hero_scroll")}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDownIcon className="w-4 h-4 text-gray-300 dark:text-stone-600" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;