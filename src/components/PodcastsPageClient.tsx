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
            // 暂停当前播放
            if (audioRef.current) {
                audioRef.current.pause();
            }
            setPlayingSlug(null);
        } else {
            // 播放新的
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
                <h1 className="text-3xl font-bold text-white mb-2">
                    {t('podcasts.title')}
                </h1>
                <p className="text-slate-400">
                    {filteredPodcasts.length} {t('podcasts.episodes')}
                </p>
            </div>

            {/* Category Filters */}
            {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === null
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                    >
                        {t('podcasts.all')}
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                                ? 'bg-purple-600 text-white'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            )}

            {/* Podcast List */}
            {filteredPodcasts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-slate-400">{t('podcasts.noPodcasts')}</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredPodcasts.map((podcast) => (
                        <div
                            key={podcast.slug}
                            className="bg-slate-800/50 rounded-xl p-6 hover:bg-slate-800 transition-colors border border-slate-700/50 hover:border-purple-500/50"
                        >
                            <div className="flex items-start gap-4">
                                {/* Play/Pause Button */}
                                <button
                                    onClick={(e) => handlePlay(e, podcast)}
                                    className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${playingSlug === podcast.slug
                                            ? 'bg-purple-600 text-white scale-110'
                                            : 'bg-purple-600/20 text-purple-400 hover:bg-purple-600 hover:text-white'
                                        }`}
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
                                        <span className="text-xs text-purple-400 font-medium">
                                            {podcast.category}
                                        </span>
                                        <span className="text-xs text-slate-500">•</span>
                                        <span className="text-xs text-slate-500">{podcast.date}</span>
                                    </div>

                                    <h2 className="text-lg font-semibold text-white mb-1 truncate hover:text-purple-400 transition-colors">
                                        {localize(podcast.title)}
                                    </h2>

                                    <p className="text-sm text-slate-400 line-clamp-2">
                                        {localize(podcast.description)}
                                    </p>

                                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {podcast.duration}
                                        </span>
                                        {playingSlug === podcast.slug && (
                                            <span className="flex items-center gap-1 text-purple-400">
                                                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
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
