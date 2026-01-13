'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import zhMessages from './messages/zh.json';
import enMessages from './messages/en.json';

export type Locale = 'zh' | 'en';

type Messages = typeof zhMessages;

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string, params?: Record<string, string | number>) => string;
}

const messages: Record<Locale, Messages> = {
    zh: zhMessages,
    en: enMessages,
};

const LanguageContext = createContext<LanguageContextType | null>(null);

// 用于 SSR 安全读取 localStorage
function getStoredLocale(): Locale {
    if (typeof window === 'undefined') return 'zh';
    const saved = localStorage.getItem('locale');
    return (saved === 'zh' || saved === 'en') ? saved : 'zh';
}

// 订阅 storage 变化
function subscribeToStorage(callback: () => void) {
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
}

// SSR 快照
function getServerSnapshot(): Locale {
    return 'zh';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    // 使用 useSyncExternalStore 确保 SSR/CSR 一致性
    const storedLocale = useSyncExternalStore(
        subscribeToStorage,
        getStoredLocale,
        getServerSnapshot
    );

    const [locale, setLocaleState] = useState<Locale>(storedLocale);
    const [mounted, setMounted] = useState(false);

    // 客户端挂载后同步 localStorage 状态
    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('locale') as Locale;
        if (saved === 'zh' || saved === 'en') {
            setLocaleState(saved);
        }
    }, []);

    // 切换语言并保存到 localStorage
    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);
        if (typeof window !== 'undefined') {
            localStorage.setItem('locale', newLocale);
        }
    }, []);

    // 翻译函数: 支持嵌套 key 和参数替换
    // SSR 时始终使用 'zh'，客户端挂载后使用实际 locale
    const currentLocale = mounted ? locale : 'zh';

    const t = useCallback(
        (key: string, params?: Record<string, string | number>): string => {
            const keys = key.split('.');
            let value: unknown = messages[currentLocale];

            for (const k of keys) {
                value = (value as Record<string, unknown>)?.[k];
            }

            if (typeof value !== 'string') {
                console.warn(`[i18n] Missing translation for key: ${key}`);
                return key;
            }

            // 替换参数, e.g. {count} -> 实际值
            if (params) {
                return value.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? `{${k}}`));
            }

            return value;
        },
        [currentLocale]
    );

    return (
        <LanguageContext.Provider value={{ locale: currentLocale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

/**
 * Hook to access language context
 * @returns { locale, setLocale, t }
 */
export function useLanguage(): LanguageContextType {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
