import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TypeAnimation } from "react-type-animation";
import {
  ChevronDownIcon,
  DocumentArrowDownIcon,
  CodeBracketIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-400/30 to-secondary-400/30 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-secondary-400/20 to-accent-400/20 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "4s" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-accent-400/25 to-primary-400/25 rounded-full blur-3xl"
        />

        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute top-1/4 right-1/4 w-4 h-4 bg-primary-500/40 transform rotate-45"
        />
        <motion.div
          animate={{
            rotate: -360,
            y: [-20, 20, -20],
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute bottom-1/3 left-1/4 w-6 h-6 border-2 border-secondary-500/40 rounded-full"
        />
        <motion.div
          animate={{
            rotate: 360,
            x: [-15, 15, -15],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute top-2/3 right-1/3 w-3 h-3 bg-accent-500/50"
        />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      >
        {/* Greeting */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="flex flex-wrap items-center justify-start p-2 lg:justify-center gap-2  bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200/50 dark:border-dark-600/50 max-w-xs sm:max-w-none">
            <SparklesIcon className="w-4 h-4 text-primary-500" />
            <span className="whitespace-normal">
              Welcome to my digital space
            </span>
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="block text-gray-900 dark:text-white">
            Hi, I'm <span className="gradient-text">Durga Gairhe</span>
          </span>
        </motion.h1>

        {/* Animated Subtitle */}
        <motion.div
          variants={itemVariants}
          className="text-xl sm:text-2xl lg:text-3xl font-medium mb-8 text-gray-700 dark:text-gray-300 min-h-[2.5rem]"
        >
          <TypeAnimation
            sequence={[
              "Full-Stack Developer",
              2000,
              "System Architect",
              2000,
              "React Specialist",
              2000,
              "Node.js Expert",
              2000,
              "UI/UX Enthusiast",
              2000,
              "Problem Solver",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="gradient-text"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          A one-person dev powerhouse with a sharp eye for design and a mind
          wired for structure. I craft tailored solutions from React setups to
          dynamic APIs, bringing precision and a DIY attitude that sets projects
          apart.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary group flex items-center"
          >
            <CodeBracketIcon className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            View My Work
          </motion.a>

          <motion.a
            href="/files/Durga_Gairhe_Resume.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary group flex items-center"
          >
            <DocumentArrowDownIcon className="w-5 h-5 mr-2 group-hover:translate-y-1 transition-transform duration-300" />
            Download Resume
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDownIcon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Code Elements */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute top-20 right-20 hidden lg:block opacity-20 dark:opacity-10"
      >
        <div className="text-6xl font-mono text-primary-500">{"<>"}</div>
      </motion.div>

      <motion.div
        animate={{
          rotate: [360, 0],
          y: [-20, 20, -20],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-32 left-20 hidden lg:block opacity-20 dark:opacity-10"
      >
        <div className="text-4xl font-mono text-secondary-500">{"{ }"}</div>
      </motion.div>
    </section>
  );
};

export default Hero;
