import React, { useState } from "react";
import Header from "./components/Header";
import Timeline from "./components/Timeline";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="p-16 px-0 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Timeline />
      </div>
    </div>
  );
}

export default App;
