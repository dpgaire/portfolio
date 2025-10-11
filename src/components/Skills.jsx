import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { fetchSkillsData } from "../api";
import SkillsSkeleton from "./ui/SkillsSkeleton";
import { getRandomGradient } from "../utils";

const Skills = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const randomGradient = getRandomGradient();


    useEffect(() => {
      const getProjects = async () => {
        try {
          const data = await fetchSkillsData();
          setSkillsData(data);
        } catch (err) {
          setError("Failed to fetch skills.",err);
        } finally {
          setLoading(false);
        }
      };
      getProjects();
    }, []);

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

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.5,
      },
    }),
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
            <span className="gradient-text">{t("skills_title")}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("skills_subtitle")}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-green-600 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Skills Grid */}
         {loading ? <SkillsSkeleton/>:error ? <p className="text-center text-red-500">{error}</p> : null}
        <div className="grid lg:grid-cols-2 gap-8">
         
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="card p-8"
            >
              <div className="flex items-center mb-6">
                <div className="text-3xl mr-4">{category.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-6">
                {category?.skills?.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {skill.percentage}%
                      </span>
                    </div>

                    <div className="relative h-3 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                      <motion.div
                        variants={progressVariants}
                        custom={skill.percentage}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className={`absolute top-0 left-0 h-full bg-gradient-to-r ${randomGradient} rounded-full`}
                      />

                      <motion.div
                        animate={{
                          x: [-100, 300],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "easeInOut",
                        }}
                        className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Section */}
        {/* <motion.div variants={itemVariants} className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t("skills_additional_title")}
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              "JavaScript",
              "Python",
              "Java",
              "PHP",
              "React.js",
              "Redux",
              "Zustand",
              "Firebase",
              "Supabase",
              "Prisma",
              "Mongoose",
              "Electron",
              "PWA",
              "WebAssembly",
              "Three.js",
              "D3.js",
              "Chart.js",
              "Storybook",
              "Cypress",
              "Playwright",
              "Jenkins",
              "GitHub Actions",
              "Vercel",
              "Netlify",
              "Heroku",
            ].map((tech, index) => (
              <motion.span
                key={tech}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 bg-white dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div> */}

        {/* Certifications & Achievements */}
        {/* <motion.div variants={itemVariants} className="mt-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 via-teal-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t("skills_cert_1_title")}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t("skills_cert_1_desc")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📜</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t("skills_cert_2_title")}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t("skills_cert_2_desc")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t("skills_cert_3_title")}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t("skills_cert_3_desc")}
              </p>
            </div>
          </div>
        </motion.div> */}
      </motion.div>
    </section>
  );
};

export default Skills;
