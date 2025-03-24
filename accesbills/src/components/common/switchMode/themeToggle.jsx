import React, { useState, useEffect } from 'react';
import './themeToggle.scss';


const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <button 
      className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Toggle theme"
    >
      <div className="toggle-circle"></div>
    </button>
  );
};

export default ThemeToggle;
