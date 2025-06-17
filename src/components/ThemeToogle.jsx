import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({ theme, setTheme }) => (
  <button
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors relative overflow-hidden group"
    aria-label="Toggle theme"
  >
    <span className="relative z-10">
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </span>
    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
  </button>
);

export default ThemeToggle