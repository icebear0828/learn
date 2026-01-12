import { format, parseISO } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';

type SupportedLocale = 'zh-CN' | 'en-US';

const localeMap = {
    'zh-CN': zhCN,
    'en-US': enUS,
};

/**
 * Format a date string to a localized display format
 * @param dateString - ISO date string (e.g., '2024-01-15')
 * @param locale - Locale for formatting (default: 'zh-CN')
 * @param pattern - date-fns format pattern (default: 'yyyy年M月d日')
 * @returns Formatted date string, or original string if parsing fails
 */
export function formatDate(
    dateString: string,
    locale: SupportedLocale = 'zh-CN',
    pattern: string = 'yyyy年M月d日'
): string {
    try {
        const date = parseISO(dateString);
        return format(date, pattern, { locale: localeMap[locale] });
    } catch {
        return dateString; // Fallback to original string
    }
}

/**
 * Format a date string for English locale
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., 'January 15, 2024')
 */
export function formatDateEN(dateString: string): string {
    return formatDate(dateString, 'en-US', 'MMMM d, yyyy');
}

/**
 * Format a date string for Chinese locale
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., '2024年1月15日')
 */
export function formatDateZH(dateString: string): string {
    return formatDate(dateString, 'zh-CN', 'yyyy年M月d日');
}
