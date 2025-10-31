import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  BoltIcon,
  CodeBracketIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const About = ({
  title,
  description,
  areasOfExpertise,
  stats: statData,
  philosophy,
  profileImage,
}) => {
  const iconMap = {
    "Full-Stack Development": CodeBracketIcon,
    "Mobile Development": DevicePhoneMobileIcon,
    "Web Applications": GlobeAltIcon,
    "System Architecture": CpuChipIcon,
  };

  const statIconMap = {
    "Projects Delivered": RocketLaunchIcon,
    "Years Experience": BoltIcon,
    Technologies: CpuChipIcon,
    "Client Satisfaction": GlobeAltIcon,
  };

  const { t } = useTranslation();
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

  const stats = statData.map((item) => ({
    ...item,
    icon: statIconMap[item.title] || RocketLaunchIcon, // fallback icon
  }));

  const expertise = areasOfExpertise.map((item) => ({
    ...item,
    icon: iconMap[item.title] || RocketLaunchIcon,
  }));

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
            <span className="gradient-text">{t("about_title")}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("about_subtitle")}
          </p>
          <div className="w-20 h-1   bg-gradient-to-r from-emerald-400 to-green-600 mx-auto mt-6 rounded-full"></div>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image and Stats */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Profile Image */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative w-80 h-80 mx-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-dark-700 dark:to-dark-600 rounded-full overflow-hidden border-4 border-white dark:border-dark-800 shadow-2xl">
                  {/* Placeholder for profile image */}
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 flex items-center justify-center">
                    <img
                      alt="profile"
                      className=" h-full bg-cover"
                      src={profileImage}
                    />
                  </div>
                </div>
                {/* Floating badge */}
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <BoltIcon className="w-8 h-8 text-white" />
                </motion.div>
              </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="card text-center p-6"
                >
                  <stat.icon className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                  <div className="text-3xl font-bold gradient-text mb-1">
                    {stat.count}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Main Description */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </h3>

              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Expertise Areas */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                Areas of Expertise
              </h4>
              <div className="grid gap-4">
                {expertise.map((item, index) => (
                  <motion.div
                    key={item.title + index}
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-white/50 dark:bg-dark-700/50 border border-gray-200/50 dark:border-dark-600/50 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-emerald-400 via-teal-500 to-green-600 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Philosophy */}
            <motion.div
              variants={itemVariants}
              className="p-6 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/10 dark:to-secondary-900/10 rounded-xl border border-primary-200/50 dark:border-primary-800/50"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t("about_philosophy_title")}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 italic">
                {philosophy}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
