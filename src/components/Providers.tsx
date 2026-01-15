'use client';

import { ReactNode } from 'react';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

interface ProvidersProps {
    children: ReactNode;
}

/**
 * Providers - Client-side context providers wrapper
 * Combines LanguageProvider and ThemeProvider for the entire app
 */
export default function Providers({ children }: ProvidersProps) {
    return (
        <LanguageProvider>
            <ThemeProvider defaultTheme="dark-elegance">
                {children}
            </ThemeProvider>
        </LanguageProvider>
    );
}
