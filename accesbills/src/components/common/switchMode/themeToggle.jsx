import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import "./themeToggle.scss";
import { useTranslation } from "react-i18next";

const ThemeToggle = () => {
  const {t} = useTranslation()
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("darktheme");
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("darktheme");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("darktheme");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <div className="icon-container">
        {darkMode ? (
          <Sun className="icon" size={20} />
        ) : (
          <Moon className="icon" size={20} />
        )}
      </div>
      <span>{darkMode ? t("navBar.toggleLight") : t("navBar.toogleDark")}</span>
    </button>
  );
};

export default ThemeToggle;
