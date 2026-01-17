'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';

/**
 * About Page with i18n support
 */
export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <main
            className="min-h-screen py-20 px-4"
            style={{
                background: 'linear-gradient(to bottom, var(--bg-base), var(--bg-surface))'
            }}
        >
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1
                        className="text-4xl md:text-5xl font-bold mb-6"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        {t('about.title')}
                    </h1>
                    <div
                        className="w-24 h-1 mx-auto rounded-full"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                    />
                </div>

                {/* Content */}
                <div
                    className="backdrop-blur-sm rounded-2xl p-8 md:p-12"
                    style={{
                        backgroundColor: 'var(--bg-surface)',
                        border: '1px solid var(--border-default)'
                    }}
                >
                    <p
                        className="text-2xl md:text-3xl text-center font-medium leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        {t('about.tagline')}
                    </p>
                </div>

                {/* Back Link */}
                <div className="text-center mt-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t('about.backHome')}
                    </Link>
                </div>
            </div>
        </main>
    );
}

