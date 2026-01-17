'use client';

import { useLanguage } from '@/i18n/LanguageContext';

/**
 * LocaleSwitcher - 语言切换按钮
 * 
 * 显示当前语言的对立语言作为切换目标
 * zh -> EN, en -> 中文
 */
export default function LocaleSwitcher() {
    const { locale, setLocale } = useLanguage();

    const toggleLocale = () => {
        setLocale(locale === 'zh' ? 'en' : 'zh');
    };

    return (
        <button
            onClick={toggleLocale}
            className="px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200"
            style={{
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-default)',
            }}
            aria-label={locale === 'zh' ? 'Switch to English' : '切换到中文'}
        >
            {locale === 'zh' ? 'EN' : '中文'}
        </button>
    );
}

