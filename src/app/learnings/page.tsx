import { getAllLearnings, getAllLearningCategories } from '@/lib/learnings';
import LearningsPageClient from '@/components/LearningsPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Learnings | Portfolio',
    description: 'A collection of my learning notes and knowledge acquired during development journeys.',
};

/**
 * Learnings List Page
 * Server Component fetches data, Client Component handles filtering
 */
export default function LearningsPage() {
    const learnings = getAllLearnings();
    const categories = getAllLearningCategories();

    return (
        <div className="min-h-screen bg-slate-900">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <LearningsPageClient learnings={learnings} categories={categories} />
            </div>
        </div>
    );
}
