import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(true), 300);
    const timer2 = setTimeout(() => setShowText(true), 1200);
    const timer3 = setTimeout(() => setShowTagline(true), 1800);
    const timer4 = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => onComplete && onComplete(), 800);
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  const logoVariants = {
    hidden: { 
      scale: 0,
      rotate: -180,
      opacity: 0
    },
    visible: { 
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.8
      }
    },
    exit: {
      scale: 1.2,
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const textVariants = {
    hidden: { 
      y: 50,
      opacity: 0
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.6
      }
    },
    exit: {
      y: -50,
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const taglineVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5 }
    }
  };

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    },
    exit: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    }
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0
                }}
                animate={{
                  y: [null, -100],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center">
            {/* Logo */}
            <AnimatePresence>
              {showLogo && (
                <motion.div
                  variants={logoVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mb-8"
                >
                  <div className="relative">
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-xl opacity-60"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.6, 0.8, 0.6]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Logo container */}
                    <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                      <motion.span
                        className="text-3xl font-bold text-white"
                        animate={{
                          textShadow: [
                            "0 0 10px rgba(255,255,255,0.5)",
                            "0 0 20px rgba(255,255,255,0.8)",
                            "0 0 10px rgba(255,255,255,0.5)"
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        DG
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Name */}
            <AnimatePresence>
              {showText && (
                <motion.div
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mb-4"
                >
                  <h1 className="text-4xl md:text-5xl font-bold text-white">
                    <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-teal-300 bg-clip-text text-transparent">
                      Durga Gairhe
                    </span>
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tagline */}
            <AnimatePresence>
              {showTagline && (
                <motion.div
                  variants={taglineVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <p className="text-lg md:text-xl text-purple-200 font-medium">
                    Full-Stack Developer
                  </p>
                  
                  {/* Loading indicator */}
                  <motion.div
                    className="mt-8 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex space-x-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-3 h-3 bg-white/60 rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.6, 1, 0.6]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;

