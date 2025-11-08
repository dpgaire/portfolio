import { useState, useCallback, useMemo, memo } from 'react';
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
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './ui/LanguageSwitcher';
import { useAbout } from '../context/AboutContext';
import LoadingSpinner from './ui/LoadingSpinner';
import FallbackError from './ui/FallbackError';
import { useScrollActiveSection } from '../hooks/useScrollActiveSection';
import { useTripleClick } from '../hooks/useTripleClick';

const NAV_ITEMS = [
  { id: 'home', icon: HomeIcon, href: '#home' },
  { id: 'about', icon: UserIcon, href: '#about' },
  { id: 'skills', icon: WrenchScrewdriverIcon, href: '#skills' },
  { id: 'projects', icon: CodeBracketIcon, href: '#projects' },
  { id: 'blog', icon: DocumentTextIcon, href: '#blog' },
  { id: 'contact', icon: EnvelopeIcon, href: '#contact' },
];

const Navigation = memo(() => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { aboutData, loading, error } = useAbout();
  const currentYear = new Date().getFullYear();

  // Hooks that must always run
  const activeSection = useScrollActiveSection(NAV_ITEMS.map(item => item.id));
  const handleLogoTripleClick = useTripleClick(() => {
    window.open('https://admin-dashboard-coral-nu-61.vercel.app/', '_blank');
  });

  // Memoized nav items
  const navItems = useMemo(
    () =>
      NAV_ITEMS.map(item => ({
        ...item,
        label: t(item.id),
      })),
    [t]
  );

  const handleNavClick = useCallback(
    href => {
      setIsOpen(false);
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
      navigate(href);
    },
    [navigate]
  );

  const handleLogoClick = useCallback(() => {
    handleLogoTripleClick();
    navigate('/');
  }, [navigate, handleLogoTripleClick]);

  // Conditional UI logic moved inside render
  const initials = aboutData?.contactDetails?.fullName
    ?.split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const fullName = aboutData?.contactDetails?.fullName || '';
  const scrolled = activeSection !== 'home';

  return (
    <>
      {loading && <LoadingSpinner />}
      {error && <FallbackError />}
      {!loading && !error && aboutData?.contactDetails && (
        <>
          {/* Desktop & Mobile Nav */}
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
              scrolled ? 'glass-strong shadow-lg' : 'bg-transparent'
            } backdrop-blur-md`}
            aria-label="Main navigation"
          >
            <div className="container-custom">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 cursor-pointer"
                  onClick={handleLogoClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && handleLogoClick()}
                  aria-label={`Go to home - ${fullName}`}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 via-teal-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-lg tracking-wider">
                      {initials}
                    </span>
                  </div>
                  <span className="text-xl font-bold gradient-text hidden sm:block">
                    {fullName}
                  </span>
                </motion.div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-2">
                  {navItems.map(item => (
                    <NavButton
                      key={item.id}
                      item={item}
                      isActive={activeSection === item.id}
                      onClick={() => handleNavClick(item.href)}
                    />
                  ))}
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-3">
                  <LanguageSwitcher />
                  <ThemeToggle theme={theme} onToggle={toggleTheme} />
                  <MobileMenuToggle
                    isOpen={isOpen}
                    onToggle={() => setIsOpen(!isOpen)}
                  />
                </div>
              </div>
            </div>
          </motion.nav>

          {/* Mobile Menu */}
          <MobileMenu
            isOpen={isOpen}
            navItems={navItems}
            activeSection={activeSection}
            onNavClick={handleNavClick}
            onClose={() => setIsOpen(false)}
            fullName={fullName}
            currentYear={currentYear}
          />

          {/* Overlay */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
              aria-hidden="true"
            />
          )}
        </>
      )}
    </>
  );
});

// Extracted Components
const NavButton = memo(({ item, isActive, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
      isActive
        ? 'bg-primary-500 text-white shadow-xl'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
    }`}
    aria-label={`Go to ${item.label}`}
    aria-current={isActive ? 'page' : undefined}
  >
    <item.icon className="w-5 h-5" aria-hidden="true" />
    <span>{item.label}</span>
  </motion.button>
));

const ThemeToggle = memo(({ theme, onToggle }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onToggle}
    className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600 transition-all"
    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
  >
    {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
  </motion.button>
));

const MobileMenuToggle = memo(({ isOpen, onToggle }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onToggle}
    className="md:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-dark-700"
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
    aria-expanded={isOpen}
    aria-controls="mobile-menu"
  >
    {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
  </motion.button>
));

const MobileMenu = memo(
  ({ isOpen, navItems, activeSection, onNavClick, fullName, currentYear }) => (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-dark-900 shadow-2xl z-40 md:hidden ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div className="flex flex-col h-full pt-24 px-8">
        <div className="space-y-3">
          {navItems.map(item => (
            <motion.button
              key={item.id}
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavClick(item.href)}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-lg font-medium transition-all ${
                activeSection === item.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="mt-auto pb-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} {fullName}
          </p>
          <p className="text-xs text-gray-400 mt-1">Full-Stack Developer</p>
        </div>
      </div>
    </motion.div>
  )
);

Navigation.displayName = 'Navigation';
export default Navigation;
