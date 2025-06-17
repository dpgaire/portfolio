import { Cpu, Layers, Monitor, Palette, Server, Shield, Smartphone, Terminal, Type } from "lucide-react";
import { motion } from 'framer-motion';
import ProgressBar from "./ui/ProgressBar";

const skills = [
  { name: "React", level: 95, category: "Frontend", icon: <Layers size={16} /> },
  { name: "TypeScript", level: 90, category: "Language", icon: <Type size={16} /> },
  { name: "Node.js", level: 88, category: "Backend", icon: <Server size={16} /> },
  { name: "Tailwind CSS", level: 92, category: "Styling", icon: <Palette size={16} /> },
  { name: "Electron", level: 85, category: "Desktop", icon: <Monitor size={16} /> },
  { name: "React Native", level: 80, category: "Mobile", icon: <Smartphone size={16} /> },
  { name: "Python", level: 78, category: "Language", icon: <Terminal size={16} /> },
  { name: "Bash/Shell", level: 85, category: "DevOps", icon: <Terminal size={16} /> },
  { name: "Webpack", level: 82, category: "Build Tools", icon: <Cpu size={16} /> },
  { name: "ESLint", level: 88, category: "Tools", icon: <Shield size={16} /> }
];


const Skills = () => (
  <section id="skills" className="py-20 bg-white dark:bg-gray-900 relative">
    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-900 dark:to-transparent -z-10"></div>
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Technical Skills</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          My expertise across different technologies and platforms
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <ProgressBar skill={skill} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;