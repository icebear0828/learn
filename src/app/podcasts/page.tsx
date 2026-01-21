import { getAllPodcasts, getAllPodcastCategories } from '@/lib/podcasts';
import PodcastsPageClient from '@/components/PodcastsPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Podcasts | Portfolio',
    description: 'Daily podcast episodes on tech, AI, and life.',
};

/**
 * Podcasts List Page
 * Server Component fetches data, Client Component handles filtering
 */
export default function PodcastsPage() {
    const podcasts = getAllPodcasts();
    const categories = getAllPodcastCategories();

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-base)' }}>
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <PodcastsPageClient podcasts={podcasts} categories={categories} />
            </div>
        </div>
    );
}
