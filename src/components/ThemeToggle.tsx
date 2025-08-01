import React from "react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700"
      aria-label="Toggle theme"
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};

export default ThemeToggle;
