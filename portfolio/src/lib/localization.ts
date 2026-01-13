/**
 * Server-safe localization utilities
 * These can be used in both Server and Client components
 */

interface LocalizedString {
    zh: string;
    en: string;
}

type Locale = 'zh' | 'en';

/**
 * Get localized string from bilingual content
 * For Server Components, this defaults to Chinese
 * @param content - LocalizedString object or plain string
 * @param locale - Target locale (defaults to 'zh')
 */
export function getLocalizedString(
    content: LocalizedString | string | undefined,
    locale: Locale = 'zh'
): string {
    if (!content) return '';
    if (typeof content === 'string') return content;
    return content[locale] || content.zh || '';
}
