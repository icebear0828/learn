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
            className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white 
                 border border-slate-600 rounded-md hover:bg-slate-800 
                 transition-colors duration-200"
            aria-label={locale === 'zh' ? 'Switch to English' : '切换到中文'}
        >
            {locale === 'zh' ? 'EN' : '中文'}
        </button>
    );
}
