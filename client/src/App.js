import React, { useState, useEffect } from 'react';
import ReportViewer from './pages/ReportViewer';
import './index.css'; // Import the compiled Tailwind CSS

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#3F1470] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="px-6 py-4 flex justify-between items-center shadow-md dark:shadow-purple-950 bg-white dark:bg-[#2A0F49] sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-50">
          Perceive Now
        </h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-[#FFA301] text-gray-800 dark:text-[#3F1470] font-medium hover:opacity-90 transition-opacity"
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </header>
      <main className="container mx-auto px-4 py-8">
        <ReportViewer />
      </main>
    </div>
  );
}

export default App;