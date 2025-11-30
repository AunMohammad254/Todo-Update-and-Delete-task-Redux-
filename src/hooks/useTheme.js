import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for theme management with localStorage persistence
 * @returns {Object} - Theme state and toggle function
 */
export function useTheme() {
  // Initialize theme from localStorage or system preference
  const getInitialTheme = () => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (error) {
      console.warn('Error reading theme from localStorage:', error);
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const isDark = theme === 'dark';

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Save to localStorage
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.warn('Error saving theme to localStorage:', error);
    }
  }, [theme, isDark]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      const stored = localStorage.getItem('theme');
      // Only auto-switch if user hasn't manually set a preference
      if (!stored) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, isDark, toggleTheme };
}

export default useTheme;
