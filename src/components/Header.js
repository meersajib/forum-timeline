import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const Header = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md fixed top-0 w-full">
      <h1 className="text-2xl font-bold text-blue-900 dark:text-white">
        Forum Timeline
      </h1>
      <button onClick={toggleDarkMode} className="text-2xl">
        <FontAwesomeIcon
          icon={isDarkMode ? faSun : faMoon}
          className="text-yellow-500 dark:text-white"
        />
      </button>
    </header>
  );
};

export default Header;
