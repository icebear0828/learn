'use client';

import { Podcast } from '@/types';
import { useLanguage } from '@/i18n/LanguageContext';
import { useLocalizedContent } from '@/i18n/useLocalizedContent';
import Link from 'next/link';
import { useState, useRef } from 'react';

interface PodcastsPageClientProps {
    podcasts: Podcast[];
    categories: string[];
}

export default function PodcastsPageClient({ podcasts, categories }: PodcastsPageClientProps) {
    const { t } = useLanguage();
    const { localize } = useLocalizedContent();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [playingSlug, setPlayingSlug] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const filteredPodcasts = selectedCategory
        ? podcasts.filter((p) => p.category === selectedCategory)
        : podcasts;

    const handlePlay = (e: React.MouseEvent, podcast: Podcast) => {
        e.preventDefault();
        e.stopPropagation();

        if (playingSlug === podcast.slug) {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            setPlayingSlug(null);
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            const audio = new Audio(podcast.audioUrl);
            audio.onended = () => setPlayingSlug(null);
            audio.play();
            audioRef.current = audio;
            setPlayingSlug(podcast.slug);
        }
    };

    return (
        <>
            {/* Header */}
            <div className="mb-8">
                <h1
                    className="text-3xl font-bold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                >
                    {t('podcasts.title')}
                </h1>
                <p style={{ color: 'var(--text-muted)' }}>
                    {filteredPodcasts.length} {t('podcasts.episodes')}
                </p>
            </div>

            {/* Category Filters */}
            {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                        style={{
                            backgroundColor: selectedCategory === null
                                ? 'var(--color-primary)'
                                : 'var(--bg-elevated)',
                            color: selectedCategory === null
                                ? '#ffffff'
                                : 'var(--text-secondary)',
                        }}
                    >
                        {t('podcasts.all')}
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                            style={{
                                backgroundColor: selectedCategory === category
                                    ? 'var(--color-primary)'
                                    : 'var(--bg-elevated)',
                                color: selectedCategory === category
                                    ? '#ffffff'
                                    : 'var(--text-secondary)',
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            )}

            {/* Podcast List */}
            {filteredPodcasts.length === 0 ? (
                <div className="text-center py-12">
                    <p style={{ color: 'var(--text-muted)' }}>{t('podcasts.noPodcasts')}</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredPodcasts.map((podcast) => (
                        <div
                            key={podcast.slug}
                            className="rounded-xl p-6 transition-colors border"
                            style={{
                                backgroundColor: 'var(--bg-surface)',
                                borderColor: 'var(--border-default)',
                            }}
                        >
                            <div className="flex items-start gap-4">
                                {/* Play/Pause Button */}
                                <button
                                    onClick={(e) => handlePlay(e, podcast)}
                                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                                    style={{
                                        backgroundColor: playingSlug === podcast.slug
                                            ? 'var(--color-primary)'
                                            : 'color-mix(in srgb, var(--color-primary) 20%, transparent)',
                                        color: playingSlug === podcast.slug
                                            ? '#ffffff'
                                            : 'var(--color-primary)',
                                        transform: playingSlug === podcast.slug ? 'scale(1.1)' : 'scale(1)',
                                    }}
                                    aria-label={playingSlug === podcast.slug ? 'Pause' : 'Play'}
                                >
                                    {playingSlug === podcast.slug ? (
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    )}
                                </button>

                                <Link href={`/podcasts/${podcast.slug}`} className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span
                                            className="text-xs font-medium"
                                            style={{ color: 'var(--color-primary)' }}
                                        >
                                            {podcast.category}
                                        </span>
                                        <span style={{ color: 'var(--text-muted)' }} className="text-xs">•</span>
                                        <span style={{ color: 'var(--text-muted)' }} className="text-xs">{podcast.date}</span>
                                    </div>

                                    <h2
                                        className="text-lg font-semibold mb-1 truncate transition-colors"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {localize(podcast.title)}
                                    </h2>

                                    <p
                                        className="text-sm line-clamp-2"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        {localize(podcast.description)}
                                    </p>

                                    <div className="flex items-center gap-4 mt-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {podcast.duration}
                                        </span>
                                        {playingSlug === podcast.slug && (
                                            <span className="flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
                                                <span
                                                    className="w-2 h-2 rounded-full animate-pulse"
                                                    style={{ backgroundColor: 'var(--color-primary)' }}
                                                />
                                                {t('podcasts.playing')}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
