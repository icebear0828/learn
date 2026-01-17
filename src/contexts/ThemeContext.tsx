'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = string;

interface ThemeContextType {
  theme: Theme;
  themes: Theme[];
  setTheme: (theme: Theme) => void;
  toggleDark: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'app-theme';
const DEFAULT_THEME = 'dark-elegance';

// Define dark themes for toggle logic
const DARK_THEMES = ['dark-elegance', 'ocean-blue', 'forest-green', 'sunset-orange', 'royal-purple'];
const LIGHT_COUNTERPARTS: Record<string, string> = {
  'dark-elegance': 'light-clean',
  'ocean-blue': 'light-clean',
  'forest-green': 'light-clean',
  'sunset-orange': 'sakura-pink',
  'royal-purple': 'sakura-pink',
  'light-clean': 'dark-elegance',
  'sakura-pink': 'royal-purple',
};

export const ALL_THEMES = [
  'dark-elegance',
  'light-clean',
  'ocean-blue',
  'forest-green',
  'sunset-orange',
  'royal-purple',
  'sakura-pink',
];

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  disableTransition?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  storageKey = THEME_STORAGE_KEY,
  disableTransition = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      if (stored && ALL_THEMES.includes(stored)) {
        return stored;
      }
      // Respect system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return defaultTheme;
      }
      return 'light-clean';
    }
    return defaultTheme;
  });

  const setTheme = useCallback((newTheme: Theme) => {
    if (!ALL_THEMES.includes(newTheme)) {
      console.warn(`Theme "${newTheme}" not found. Available: ${ALL_THEMES.join(', ')}`);
      return;
    }

    if (!disableTransition) {
      document.documentElement.classList.add('no-transitions');
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('no-transitions');
      });
    }

    setThemeState(newTheme);
    localStorage.setItem(storageKey, newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }, [storageKey, disableTransition]);

  const isDark = DARK_THEMES.includes(theme);

  const toggleDark = useCallback(() => {
    const counterpart = LIGHT_COUNTERPARTS[theme] || (isDark ? 'light-clean' : 'dark-elegance');
    setTheme(counterpart);
  }, [theme, isDark, setTheme]);

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem(storageKey);
      if (!stored) {
        setTheme(e.matches ? defaultTheme : 'light-clean');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [defaultTheme, storageKey, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, themes: ALL_THEMES, setTheme, toggleDark, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
