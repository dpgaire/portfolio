import { useEffect, useState } from "react";
import FloatingParticles from "./FloatingParticles";
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Download, X, ExternalLink } from "lucide-react";
import Button from "./ui/Button";
import Dialog from "./ui/Dialog";

const Hero = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  
  const skills = [
    "AI Saas","React.js", "Next.js", "TypeScript", "Node.js", "Tailwind CSS",
    "Framer Motion", "GraphQL", "MongoDB", "UI/UX Design", "AWS"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 1000);
    const skillsTimer = setTimeout(() => setSkillsVisible(true), 1500);
    return () => {
      clearTimeout(timer);
      clearTimeout(skillsTimer);
    };
  }, []);
  
  const handleResumeAction = (action) => {
    if (action === 'download') {
      const link = document.createElement('a');
      link.href = '/files/Durga_Gairhe_Resume.pdf';
      link.download = 'Durga_Gairhe_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (action === 'preview') {
      window.open('/files/Durga_Gairhe_Resume.pdf', '_blank');
    }
    setShowResumeModal(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 relative overflow-hidden">
      <FloatingParticles />
      <div className="max-w-6xl mx-auto text-center px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Durga <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Gairhe</span>
            </h1>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-3 -right-6 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full"
            >
              Available
            </motion.div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Full Stack Developer specializing in modern web technologies and exceptional user experiences
          </p>

          {skillsVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="group glow hover:shadow-lg transition-all"
              icon={<Download size={20} className="group-hover:animate-bounce" />}
              onClick={() => setShowResumeModal(true)}
            >
              Resume Options
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              icon={<ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
              className="hover:bg-white/10 dark:hover:bg-gray-700/50"
            >
              Get In Touch
            </Button>
          </div>
        </motion.div>
        
        {animationComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown 
              size={32} 
              className="text-gray-400 animate-bounce cursor-pointer hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
            />
          </motion.div>
        )}
      </div>

      {/* Resume Options Modal */}
      <Dialog isOpen={showResumeModal} onClose={() => setShowResumeModal(false)}>
        <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md mx-auto shadow-2xl">
          <button 
            onClick={() => setShowResumeModal(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X size={24} />
          </button>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Resume Options
          </h3>
          
          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full justify-between group"
              onClick={() => handleResumeAction('preview')}
              icon={<ExternalLink size={18} className="text-gray-500 group-hover:text-white transition-colors" />}
            >
              Preview in New Tab
              <span className="text-sm text-gray-500 group-hover:text-white">(PDF Viewer)</span>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="w-full justify-between group"
              onClick={() => handleResumeAction('download')}
              icon={<Download size={18} className="text-gray-500 group-hover:text-blue-600 transition-colors" />}
            >
              Download Directly
              <span className="text-sm text-gray-500 group-hover:text-blue-600">(~2MB PDF)</span>
            </Button>
          </div>
        </div>
      </Dialog>
    </section>
  );
};

export default Hero;