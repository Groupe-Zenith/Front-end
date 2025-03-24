import React, { useContext } from "react";
import { ThemeContext } from "../../../contexts/themeContext";
import "./themeToggle.scss"; // On va ajouter un style simple

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === "lighttheme" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
