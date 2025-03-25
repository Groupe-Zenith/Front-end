import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import './themeToggle.scss';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Vérifier le thème au chargement
    const isDark = document.documentElement.classList.contains('darktheme');
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('darktheme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('darktheme');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
      {darkMode ? (
        <Sun className="icon" size={20} />
      ) : (
        <Moon className="icon" size={20} />
      )}
      <span>{darkMode ? 'Thème clair' : 'Thème sombre'}</span>
    </button>
  );
};

export default ThemeToggle;