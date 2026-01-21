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
                className="inline-flex items-center gap-2 transition-colors mb-8"
                style={{ color: 'var(--color-primary)' }}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t('podcasts.backToPodcasts')}
            </Link>

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                    <span
                        className="px-3 py-1 text-sm font-medium rounded-full"
                        style={{
                            backgroundColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)',
                            color: 'var(--color-primary)',
                        }}
                    >
                        {podcast.category}
                    </span>
                    <span style={{ color: 'var(--text-muted)' }} className="text-sm">{podcast.date}</span>
                    <span style={{ color: 'var(--text-muted)' }} className="text-sm">•</span>
                    <span style={{ color: 'var(--text-muted)' }} className="text-sm flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {podcast.duration}
                    </span>
                </div>

                <h1
                    className="text-3xl md:text-4xl font-bold mb-4"
                    style={{ color: 'var(--text-primary)' }}
                >
                    {localize(podcast.title)}
                </h1>

                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                    {localize(podcast.description)}
                </p>
            </div>

            {/* Audio Player */}
            <div
                className="rounded-xl p-6 border mb-8"
                style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-default)',
                }}
            >
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
                <div className="max-w-none">
                    <h2
                        className="text-xl font-semibold mb-4"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        {t('podcasts.transcript')}
                    </h2>
                    <div
                        className="whitespace-pre-wrap"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        {podcast.content}
                    </div>
                </div>
            )}
        </>
    );
}
