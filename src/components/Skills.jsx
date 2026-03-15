import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { fetchSkillsData } from "../api";
import SkillsSkeleton from "./ui/SkillsSkeleton";

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

const Skills = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSkills = async () => {
      try {
        const data = await fetchSkillsData();
        setSkillsData(data);
      } catch (err) {
        setError("Error loading skills data.");
      } finally {
        setLoading(false);
      }
    };
    getSkills();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <section className="section-padding bg-white dark:bg-dark-900">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container-custom"
      >
        <SectionHeader title={t("skills_title")} subtitle="Technical skills" />

        {loading ? (
          <SkillsSkeleton />
        ) : error ? (
          <span className="text-center text-red-500">
            {error}{" "}
            <a href="tel:+9779846724440" className="underline hover:text-red-600">
              +9779846724440
            </a>
            .
          </span>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {skillsData.map((category) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="bg-stone-50 dark:bg-dark-800 rounded-2xl border border-stone-100 dark:border-dark-700 p-7"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-7">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-base font-semibold text-stone-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills */}
                <div className="space-y-5">
                  {category?.skills?.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-stone-300">
                          {skill.name}
                        </span>
                        <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
                          {skill.percentage}%
                        </span>
                      </div>

                      {/* Track — thinner, more refined */}
                      <div className="h-1.5 bg-stone-200 dark:bg-dark-600 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.percentage}%` } : { width: 0 }}
                          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
                          className="h-full bg-secondary-500 dark:bg-secondary-400 rounded-full relative overflow-hidden"
                        >
                          {/* Single shimmer pass — not looping */}
                          <motion.div
                            initial={{ x: "-100%" }}
                            animate={inView ? { x: "200%" } : { x: "-100%" }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Skills;