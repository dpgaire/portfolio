import { useState, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const activeSection = useScrollActiveSection(NAV_ITEMS.map(item => item.id));
  const handleLogoTripleClick = useTripleClick(() => {
    window.open('https://admin-dashboard-coral-nu-61.vercel.app/', '_blank');
  });

  const navItems = useMemo(
    () => NAV_ITEMS.map(item => ({ ...item, label: t(item.id) })),
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
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
              scrolled
                ? 'bg-white/90 dark:bg-dark-900/90 backdrop-blur-md border-b border-stone-100 dark:border-dark-700'
                : 'bg-transparent'
            }`}
            aria-label="Main navigation"
          >
            <div className="container-custom">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2.5 cursor-pointer"
                  onClick={handleLogoClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && handleLogoClick()}
                  aria-label={`Go to home - ${fullName}`}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-sm">
                      {initials}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-stone-900 dark:text-white hidden sm:block">
                    {fullName}
                  </span>
                </motion.div>

                {/* Desktop Nav — pill-style indicator, not full button */}
                <div className="hidden md:flex items-center gap-1">
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
                <div className="flex items-center gap-2">
                  {/* <LanguageSwitcher /> */}
                  <ThemeToggle theme={theme} onToggle={toggleTheme} />
                  <MobileMenuToggle
                    isOpen={isOpen}
                    onToggle={() => setIsOpen(!isOpen)}
                  />
                </div>
              </div>
            </div>
          </motion.nav>

          <MobileMenu
            isOpen={isOpen}
            navItems={navItems}
            activeSection={activeSection}
            onNavClick={handleNavClick}
            onClose={() => setIsOpen(false)}
            fullName={fullName}
            currentYear={currentYear}
          />

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
                aria-hidden="true"
              />
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
});

// Nav button: text-only with underline indicator — no filled background on active
const NavButton = memo(({ item, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 ${
      isActive
        ? 'text-stone-900 dark:text-white'
        : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100/60 dark:hover:bg-dark-700/60'
    }`}
    aria-label={`Go to ${item.label}`}
    aria-current={isActive ? 'page' : undefined}
  >
    {item.label}
    {isActive && (
      <motion.span
        layoutId="nav-active"
        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-secondary-500"
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      />
    )}
  </button>
));

const ThemeToggle = memo(({ theme, onToggle }) => (
  <button
    onClick={onToggle}
    className="p-2 rounded-lg text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-dark-700 hover:text-stone-900 dark:hover:text-white transition-colors duration-200"
    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
  >
    {theme === 'dark' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
  </button>
));

const MobileMenuToggle = memo(({ isOpen, onToggle }) => (
  <button
    onClick={onToggle}
    className="md:hidden p-2 rounded-lg text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-dark-700 transition-colors duration-200"
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
    aria-expanded={isOpen}
    aria-controls="mobile-menu"
  >
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={isOpen ? 'close' : 'open'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {isOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
      </motion.div>
    </AnimatePresence>
  </button>
));

const MobileMenu = memo(
  ({ isOpen, navItems, activeSection, onNavClick, fullName, currentYear }) => (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 220 }}
      className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-dark-900 shadow-2xl z-40 md:hidden border-l border-stone-100 dark:border-dark-700"
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      <div className="flex flex-col h-full pt-20 px-6">
        {/* Nav items — clean list style */}
        <nav className="space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavClick(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-stone-100 dark:bg-dark-800 text-stone-900 dark:text-white'
                  : 'text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-dark-800 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
              {activeSection === item.id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary-500" />
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto pb-8">
          <div className="pt-6 border-t border-stone-100 dark:border-dark-700">
            <p className="text-xs text-stone-400 dark:text-stone-500">
              © {currentYear} {fullName}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
);

Navigation.displayName = 'Navigation';
export default Navigation;