'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';

/**
 * About Page with i18n support
 */
export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 py-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        {t('about.title')}
                    </h1>
                    <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full" />
                </div>

                {/* Content */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
                    <p className="text-2xl md:text-3xl text-slate-200 text-center font-medium leading-relaxed">
                        {t('about.tagline')}
                    </p>
                </div>

                {/* Back Link */}
                <div className="text-center mt-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors"
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
