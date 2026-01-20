'use client';

import { Podcast } from '@/types';
import { useLanguage } from '@/i18n/LanguageContext';
import { useLocalizedContent } from '@/i18n/useLocalizedContent';
import Link from 'next/link';

interface PodcastDetailClientProps {
    podcast: Podcast;
}

export default function PodcastDetailClient({ podcast }: PodcastDetailClientProps) {
    const { t } = useLanguage();
    const { localize } = useLocalizedContent();

    return (
        <>
            {/* Back Link */}
            <Link
                href="/podcasts"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t('podcasts.backToPodcasts')}
            </Link>

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-purple-600/20 text-purple-400 text-sm font-medium rounded-full">
                        {podcast.category}
                    </span>
                    <span className="text-slate-500 text-sm">{podcast.date}</span>
                    <span className="text-slate-500 text-sm">•</span>
                    <span className="text-slate-500 text-sm flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {podcast.duration}
                    </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {localize(podcast.title)}
                </h1>

                <p className="text-lg text-slate-400">
                    {localize(podcast.description)}
                </p>
            </div>

            {/* Audio Player */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 mb-8">
                <audio
                    controls
                    className="w-full"
                    src={podcast.audioUrl}
                >
                    Your browser does not support the audio element.
                </audio>
            </div>

            {/* Content / Transcript */}
            {podcast.content && (
                <div className="prose prose-invert prose-slate max-w-none">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        {t('podcasts.transcript')}
                    </h2>
                    <div className="text-slate-300 whitespace-pre-wrap">
                        {podcast.content}
                    </div>
                </div>
            )}
        </>
    );
}
