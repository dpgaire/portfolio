import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
  Bars3Icon, 
  XMarkIcon, 
  SunIcon, 
  MoonIcon,
  HomeIcon,
  UserIcon,
  CodeBracketIcon,
  WrenchScrewdriverIcon,
  DocumentTextIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './ui/LanguageSwitcher';

const Navigation = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate()

  const navItems = [
    { id: 'home', label: t('home'), icon: HomeIcon, href: '#home' },
    { id: 'about', label: t('about'), icon: UserIcon, href: '#about' },
    { id: 'skills', label: t('skills'), icon: WrenchScrewdriverIcon, href: '#skills' },
    { id: 'projects', label: t('projects'), icon: CodeBracketIcon, href: '#projects' },
    { id: 'blog', label: t('blog'), icon: DocumentTextIcon, href: '#blog' },
    { id: 'contact', label: t('contact'), icon: EnvelopeIcon, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const handleNavClick = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    navigate(`/${href}`)
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? 'glass-strong shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={()=>navigate('/')}
            >
              <div className="w-8 h-8  bg-gradient-to-r from-emerald-400 via-teal-500 to-green-600 rounded-lg flex items-center justify-center">
                <span onClick={()=>navigate('/')} className="text-white font-bold text-sm">DG</span>
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:block">
               { t('nav_title')}
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center  space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none  focus:ring-blue-500 focus:ring-offset-2 ${
                    activeSection === item.id
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                  }`}
                  aria-label={`Go to ${item.label}`}
                  aria-current={activeSection === item.id ? "page" : undefined}
                >
                  <item.icon className="w-4 h-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center space-x-2">
              <LanguageSwitcher />
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                aria-pressed={theme === "dark"}
              >
                {theme === 'dark' ? (
                  <SunIcon className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <MoonIcon className="w-5 h-5" aria-hidden="true" />
                )}
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? (
                  <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="w-5 h-5" aria-hidden="true" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{
          opacity: isOpen ? 1 : 0,
          x: isOpen ? '0%' : '100%',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white dark:bg-dark-900 shadow-2xl z-40 md:hidden ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          {/* Mobile Navigation Items */}
          <div className="space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  activeSection === item.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                }`}
                aria-label={`Go to ${item.label}`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                <item.icon className="w-4 h-4" aria-hidden="true" />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Footer */}
          <div className="mt-auto pb-6">
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>© {currentYear}     {t('nav_title')}</p>
              <p className="mt-1">Full-Stack Developer</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </>
  );
};

export default Navigation;

