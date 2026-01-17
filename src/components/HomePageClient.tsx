'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { Project, LearningCard as LearningCardType } from '@/types';
import ProjectCard from './ProjectCard';
import LearningCard from './LearningCard';

interface HomePageClientProps {
    featuredProjects: Project[];
    recentLearnings: LearningCardType[];
}

/**
 * HomePageClient - Client-side wrapper for home page with i18n support
 */
export default function HomePageClient({ featuredProjects, recentLearnings }: HomePageClientProps) {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-theme-base">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-theme-gradient">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-theme-primary mb-6">
                        {t('home.greeting')}{' '}
                        <span className="text-theme-accent">
                            {t('home.developer')}
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-theme-secondary max-w-2xl mx-auto mb-10">
                        {t('home.subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/projects"
                            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-theme-accent rounded-lg hover:opacity-90 transition-opacity duration-200 w-full sm:w-auto"
                        >
                            {t('home.viewProjects')}
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                        <Link
                            href="/about"
                            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-theme-secondary border border-theme rounded-lg hover:bg-theme-surface hover:text-theme-primary transition-colors duration-200 w-full sm:w-auto"
                        >
                            {t('home.aboutMe')}
                        </Link>
                    </div>
                </div>
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                />
            </section>

            {/* Featured Projects Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-theme-base">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-theme-primary">
                            {t('projects.featured')}
                        </h2>
                        <Link href="/projects" className="text-sm font-medium text-theme-accent hover:opacity-80 transition-opacity">
                            {t('projects.viewAll')}
                            <span className="ml-1">&rarr;</span>
                        </Link>
                    </div>
                    {featuredProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredProjects.map((project) => (
                                <ProjectCard key={project.slug} project={project} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-theme-muted">
                            <p>{t('common.noProjectsYet')}</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Learning Zone Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-theme-surface">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-theme-primary">
                            {t('learnings.recent')}
                        </h2>
                        <Link href="/learnings" className="text-sm font-medium text-theme-accent hover:opacity-80 transition-opacity">
                            {t('learnings.viewAll')}
                            <span className="ml-1">&rarr;</span>
                        </Link>
                    </div>
                    {recentLearnings.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {recentLearnings.map((learning) => (
                                <LearningCard key={learning.id} learning={learning} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-theme-muted">
                            <p>{t('common.noLearningsYet')}</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-theme-base border-t border-theme">
                <div className="max-w-7xl mx-auto text-center text-theme-muted text-sm">
                    <p>{t('common.builtWith')}</p>
                </div>
            </footer>
        </div>
    );
}

