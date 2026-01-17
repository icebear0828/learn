/**
 * Bilingual content type
 */
export interface LocalizedString {
    zh: string;
    en: string;
}

export type Locale = 'zh' | 'en';

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
