import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center space-x-3 p-2 lg:p-3 rounded-full hover:bg-gray-100 dark:hover:bg-twitter-dark transition w-full text-gray-700 dark:text-gray-300"
    >
      {isDarkMode ? (
        <>
          <FiSun className="h-5 w-5" />
          <span className="hidden lg:inline text-sm">Light mode</span>
        </>
      ) : (
        <>
          <FiMoon className="h-5 w-5" />
          <span className="hidden lg:inline text-sm">Dark mode</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
