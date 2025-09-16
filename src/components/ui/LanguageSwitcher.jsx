import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ne", name: "Nepali", flag: "🇳🇵" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    languages.find((l) => l.code === i18n.language) || languages[0]
  );
  const dropdownRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block w-full max-w-[12rem]" ref={dropdownRef}>
      {/* Label for accessibility */}
      <label htmlFor="language-select" className="sr-only">
        Select language
      </label>

      {/* Button */}
      <button
        id="language-select"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center space-x-2">
          <span className="text-lg">{selected.flag}</span>
          <span className="truncate text-gray-700 dark:text-gray-200 text-sm sm:text-base">
            {selected.name}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 shadow-lg ring-1 ring-black/5 focus:outline-none text-sm sm:text-base"
        >
          {languages.map((lang) => (
            <li
              key={lang.code}
              role="option"
              aria-selected={selected.code === lang.code}
              onClick={() => {
                setSelected(lang);
                changeLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`cursor-pointer select-none py-2 px-3 flex items-center space-x-2 ${
                selected.code === lang.code
                  ? "bg-primary-500 text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700"
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
