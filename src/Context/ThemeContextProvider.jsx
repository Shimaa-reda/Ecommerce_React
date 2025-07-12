import React, { createContext, useEffect, useState } from 'react';

export const themeContext = createContext();

export default function ThemeContextProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <themeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </themeContext.Provider>
  );
}
