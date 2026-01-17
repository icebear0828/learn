'use client';

import React, { useState, useEffect } from 'react';
import { useTheme, ALL_THEMES } from '../contexts/ThemeContext';
import { THEME_INFO, DEFAULT_THEME } from '@/config/themes';

// Default theme info for SSR (must match config DEFAULT_THEME)
const DEFAULT_THEME_INFO = THEME_INFO[DEFAULT_THEME];

interface ThemeSwitcherProps {
  variant?: 'dropdown' | 'grid' | 'minimal';
  showPreview?: boolean;
  className?: string;
}

export function ThemeSwitcher({
  variant = 'dropdown',
  showPreview = true,
  className = '',
}: ThemeSwitcherProps) {
  const { theme, setTheme, toggleDark, isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only render theme-dependent content after hydration to prevent mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use default theme info during SSR, actual theme after hydration
  const currentThemeInfo = mounted ? THEME_INFO[theme] : DEFAULT_THEME_INFO;
  const currentIsDark = mounted ? isDark : true;

  if (variant === 'minimal') {
    return (
      <button
        onClick={toggleDark}
        className={`theme-switcher-minimal ${className}`}
        aria-label={`Switch to ${currentIsDark ? 'light' : 'dark'} mode`}
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-sm) var(--space-md)',
          cursor: 'pointer',
          fontSize: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-sm)',
          color: 'var(--text-primary)',
          transition: 'all 0.2s ease',
        }}
      >
        {currentIsDark ? '☀️' : '🌙'}
      </button>
    );
  }

  if (variant === 'grid') {
    return (
      <div
        className={`theme-switcher-grid ${className}`}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 'var(--space-md)',
        }}
      >
        {ALL_THEMES.map((t) => {
          const info = THEME_INFO[t];
          return (
            <button
              key={t}
              onClick={() => setTheme(t)}
              style={{
                background: theme === t ? 'var(--color-primary)' : 'var(--bg-surface)',
                border: `2px solid ${theme === t ? 'var(--color-primary)' : 'var(--border-default)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-md)',
                cursor: 'pointer',
                textAlign: 'center',
                color: theme === t ? '#fff' : 'var(--text-primary)',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>
                {info.emoji}
              </span>
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{info.name}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Default: dropdown
  return (
    <div className={`theme-switcher-dropdown ${className}`} style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-sm) var(--space-md)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-sm)',
          color: 'var(--text-primary)',
          minWidth: '160px',
          justifyContent: 'space-between',
        }}
      >
        <span>
          {currentThemeInfo?.emoji} {currentThemeInfo?.name}
        </span>
        <span style={{ opacity: 0.5 }}>▼</span>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: 'var(--space-xs)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 1000,
            overflow: 'hidden',
          }}
        >
          {ALL_THEMES.map((t) => {
            const info = THEME_INFO[t];
            return (
              <button
                key={t}
                onClick={() => {
                  setTheme(t);
                  setIsOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-sm)',
                  width: '100%',
                  padding: 'var(--space-sm) var(--space-md)',
                  border: 'none',
                  background: theme === t ? 'var(--color-primary)' : 'transparent',
                  color: theme === t ? '#fff' : 'var(--text-primary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (theme !== t) {
                    e.currentTarget.style.background = 'var(--bg-surface)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (theme !== t) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span>{info.emoji}</span>
                <span>{info.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
