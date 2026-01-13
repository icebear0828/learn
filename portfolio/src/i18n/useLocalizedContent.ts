'use client';

import { useLanguage, type Locale } from './LanguageContext';

/**
 * 双语内容类型
 */
export interface LocalizedString {
    zh: string;
    en: string;
}

/**
 * Hook to get localized content from bilingual fields (Client-side)
 */
export function useLocalizedContent() {
    const { locale } = useLanguage();

    const localize = (content: LocalizedString | string | undefined): string => {
        if (!content) return '';
        if (typeof content === 'string') return content;
        return content[locale] || content.zh || '';
    };

    return { localize, locale };
}

/**
 * Server-side helper to get localized string (defaults to Chinese)
 * Use this in Server Components where hooks are not available
 */
export function getLocalizedString(
    content: LocalizedString | string | undefined,
    locale: Locale = 'zh'
): string {
    if (!content) return '';
    if (typeof content === 'string') return content;
    return content[locale] || content.zh || '';
}
