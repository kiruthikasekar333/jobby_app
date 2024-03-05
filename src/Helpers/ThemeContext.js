// ThemeContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import homeLight from "../Assets/HomeLightImg.jpg";
import homeDark from "../Assets/HomeDarkImg.jpg";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState('dark');
  const [themeStyles, setThemeStyles] = useState({
    backgroundColor: 'white',
    color: 'black',
    backgroundImage: `url(${homeLight})`,
    
  });

  const handleToggleButton = () => {
    setThemeColor((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const updateThemeStyles = () => {
    setThemeStyles({
      backgroundColor: themeColor === 'dark' ? '' : 'white',
      color: themeColor === 'dark' ? '#f9cc0b' : 'black',
      backgroundImage: `url(${themeColor === 'dark' ? homeDark : homeLight})`,
    });
  };

  useEffect(() => {
    updateThemeStyles();
  }, [themeColor]);

  return (
    <ThemeContext.Provider
      value={{
        themeColor,
        themeStyles,
        handleToggleButton,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
