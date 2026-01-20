import { getPodcastBySlug, getAllPodcastSlugs } from '@/lib/podcasts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PodcastDetailClient from '@/components/PodcastDetailClient';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = getAllPodcastSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const podcast = getPodcastBySlug(slug);

    if (!podcast) {
        return { title: 'Podcast Not Found' };
    }

    const title = typeof podcast.title === 'string' ? podcast.title : podcast.title.en;
    const description = typeof podcast.description === 'string' ? podcast.description : podcast.description.en;

    return {
        title: `${title} | Podcasts`,
        description,
    };
}

export default async function PodcastDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const podcast = getPodcastBySlug(slug);

    if (!podcast) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-900">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-4xl">
                <PodcastDetailClient podcast={podcast} />
            </div>
        </div>
    );
}
