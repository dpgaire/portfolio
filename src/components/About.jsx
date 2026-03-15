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
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const stats = statData.map((item) => ({
    ...item,
    icon: statIconMap[item.title] || RocketLaunchIcon,
  }));

  const expertise = areasOfExpertise.map((item) => ({
    ...item,
    icon: iconMap[item.title] || RocketLaunchIcon,
  }));

  return (
    <section className="section-padding bg-stone-50 dark:bg-dark-800/50">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container-custom"
      >
        <SectionHeader title={t("about_title")} subtitle="About me" />

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Column */}
          <motion.div variants={itemVariants} className="space-y-10">
            {/* Profile image — cleaner frame */}
            <div className="relative w-72 h-72 mx-auto lg:mx-0">
              {/* Offset border for depth */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-emerald-200 dark:border-emerald-900" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-stone-200 dark:border-dark-600 bg-stone-100 dark:bg-dark-700">
                <img
                  alt="profile"
                  className="w-full h-full object-cover"
                  src={profileImage}
                />
              </div>
            </div>

            {/* Stats — horizontal rule style, no cards */}
            <div className="grid grid-cols-2 gap-px bg-stone-200 dark:bg-dark-600 rounded-xl overflow-hidden border border-stone-200 dark:border-dark-600">
              {stats.map((stat) => (
                <div
                  key={stat.title}
                  className="bg-white dark:bg-dark-800 px-6 py-5"
                >
                  <div className="text-2xl font-bold text-stone-900 dark:text-white mb-0.5">
                    {stat.count}
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 font-medium tracking-wide">
                    {stat.title}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div variants={itemVariants} className="space-y-10">
            {/* Main description */}
            <div>
              <h3 className="text-xl font-semibold text-stone-900 dark:text-white mb-4">
                {title}
              </h3>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Expertise — border-left style, no card backgrounds */}
            <div>
              <h4 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-5">
                Areas of Expertise
              </h4>
              <div className="space-y-5">
                {expertise.map((item, index) => (
                  <div
                    key={item.title + index}
                    className="flex items-start gap-4 pl-4 border-l-2 border-secondary-500/30 hover:border-secondary-500 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-secondary-50 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mt-0.5">
                      <item.icon className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-stone-900 dark:text-white text-sm mb-1">
                        {item.title}
                      </h5>
                      <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Philosophy — clean blockquote */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-4">
                {t("about_philosophy_title")}
              </h4>
              <blockquote className="text-stone-600 dark:text-stone-400 italic leading-relaxed border-l-2 border-stone-200 dark:border-dark-600 pl-5">
                {philosophy}
              </blockquote>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;