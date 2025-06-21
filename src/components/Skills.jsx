import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "🎨",
      skills: [
        { name: "React", level: 95, color: "from-blue-500 to-cyan-500" },
        { name: "TypeScript", level: 90, color: "from-blue-600 to-blue-400" },
        { name: "Next.js", level: 85, color: "from-gray-800 to-gray-600" },
        { name: "Tailwind CSS", level: 92, color: "from-cyan-500 to-blue-500" },
        { name: "Framer Motion", level: 88, color: "from-purple-500 to-pink-500" }
      ]
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      skills: [
        { name: "Node.js", level: 88, color: "from-green-600 to-green-400" },
        { name: "Express.js", level: 85, color: "from-gray-700 to-gray-500" },
        { name: "PostgreSQL", level: 82, color: "from-blue-700 to-blue-500" },
        { name: "MongoDB", level: 80, color: "from-green-700 to-green-500" },
        { name: "GraphQL", level: 75, color: "from-pink-600 to-purple-600" }
      ]
    },
    {
      title: "Mobile Development",
      icon: "📱",
      skills: [
        { name: "React Native", level: 87, color: "from-blue-500 to-purple-500" },
        { name: "Expo", level: 85, color: "from-indigo-600 to-blue-600" },
        { name: "Flutter", level: 70, color: "from-blue-400 to-cyan-400" },
        { name: "iOS Development", level: 65, color: "from-gray-600 to-gray-400" },
        { name: "Android Development", level: 68, color: "from-green-600 to-green-400" }
      ]
    },
    {
      title: "Tools & Technologies",
      icon: "🛠️",
      skills: [
        { name: "Git & GitHub", level: 93, color: "from-gray-800 to-gray-600" },
        { name: "Docker", level: 78, color: "from-blue-600 to-blue-400" },
        { name: "AWS", level: 75, color: "from-orange-500 to-yellow-500" },
        { name: "Webpack", level: 82, color: "from-blue-500 to-cyan-500" },
        { name: "Jest", level: 85, color: "from-red-600 to-red-400" }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.5
      }
    })
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
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="card p-8"
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className="text-3xl mr-4">{category.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
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
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="relative h-3 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                      <motion.div
                        variants={progressVariants}
                        custom={skill.level}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      />
                      
                      {/* Shine Effect */}
                      <motion.div
                        animate={{
                          x: [-100, 300],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "easeInOut"
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
        <motion.div variants={itemVariants} className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Additional Technologies
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              "JavaScript", "Python", "Java", "C++", "PHP", "Ruby",
              "Vue.js", "Angular", "Svelte", "Redux", "MobX", "Zustand",
              "Firebase", "Supabase", "Prisma", "Sequelize", "Mongoose",
              "Electron", "Tauri", "PWA", "WebAssembly", "Three.js",
              "D3.js", "Chart.js", "Storybook", "Cypress", "Playwright",
              "Jenkins", "GitHub Actions", "Vercel", "Netlify", "Heroku"
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
        </motion.div>

        {/* Certifications & Achievements */}
        <motion.div variants={itemVariants} className="mt-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                AWS Certified
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Solutions Architect Associate
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📜</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Google Developer Expert
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Web Technologies
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Open Source Contributor
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                500+ contributions on GitHub
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;

