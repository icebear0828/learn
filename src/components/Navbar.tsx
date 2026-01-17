'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/i18n/LanguageContext';
import LocaleSwitcher from './LocaleSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';

/**
 * Navbar - Responsive navigation component with i18n support
 *
 * Features:
 * - Sticky positioning at top
 * - Theme-aware styling
 * - Mobile hamburger menu
 * - Active link highlighting
 * - Language switcher
 * - Theme switcher with all 7 themes
 */
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  // Navigation links with translated labels
  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/projects', label: t('nav.projects') },
    { href: '/about', label: t('nav.about') },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-sm border-b"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-surface) 95%, transparent)',
        borderColor: 'var(--border-default)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Site Name */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold transition-colors"
            onClick={closeMobileMenu}
            style={{ color: 'var(--color-primary)' }}
          >
            <span>Portfolio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors"
                style={{
                  color: isActiveLink(link.href)
                    ? 'var(--color-primary)'
                    : 'var(--text-secondary)',
                }}
              >
                {link.label}
              </Link>
            ))}
            {/* Theme Switcher - Dropdown shows all 7 themes */}
            <ThemeSwitcher variant="dropdown" />
            {/* Language Switcher */}
            <LocaleSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeSwitcher variant="minimal" />
            <LocaleSwitcher />
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset"
              style={{
                color: 'var(--text-muted)',
              }}
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                /* Close icon */
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
          ? 'max-h-64 opacity-100'
          : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        id="mobile-menu"
      >
        <div
          className="px-2 pt-2 pb-3 space-y-1 border-t"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-default)',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium transition-colors"
              style={{
                color: isActiveLink(link.href)
                  ? 'var(--color-primary)'
                  : 'var(--text-secondary)',
                backgroundColor: isActiveLink(link.href)
                  ? 'var(--bg-elevated)'
                  : 'transparent',
              }}
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

