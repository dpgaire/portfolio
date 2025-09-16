import { useTranslation } from 'react-i18next';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ne', name: 'Nepali' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative inline-block">
      {/* Accessible hidden label */}
      <label htmlFor="language-select" className="sr-only">
        Select language
      </label>

      {/* Icon */}
      <GlobeAltIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400 pointer-events-none" />

      {/* Styled select */}
      <select
        id="language-select"
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        className="appearance-none w-44 pl-10 pr-8 py-2 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 cursor-pointer"
        aria-label="Language selector"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>

      {/* Custom dropdown arrow */}
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
       <ChevronDown/>
      </span>
    </div>
  );
};

export default LanguageSwitcher;
