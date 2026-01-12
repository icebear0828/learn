'use client';

import { useState, useMemo } from 'react';
import { LearningCard as LearningCardType } from '@/types';
import LearningCard from './LearningCard';
import { FaBook, FaFilter } from 'react-icons/fa';

interface LearningsPageClientProps {
    learnings: LearningCardType[];
    categories: string[];
}

/**
 * LearningsPageClient - Client Component for Learnings Page
 * Handles category filtering with interactive UI
 */
export default function LearningsPageClient({
    learnings,
    categories,
}: LearningsPageClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Filter learnings based on selected category
    const filteredLearnings = useMemo(() => {
        if (!selectedCategory) return learnings;
        return learnings.filter((learning) => learning.category === selectedCategory);
    }, [learnings, selectedCategory]);

    return (
        <>
            {/* Header */}
            <header className="mb-12 text-center">
                <div className="inline-flex items-center gap-3 mb-4">
                    <FaBook className="text-4xl text-cyan-400" />
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        Learnings
                    </h1>
                </div>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    A collection of knowledge and insights from my development journey
                </p>
            </header>

            {/* Category Filter */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <FaFilter className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                        Filter by Category
                    </span>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === null
                                ? 'bg-cyan-600 text-white'
                                : 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700'
                            }`}
                    >
                        All ({learnings.length})
                    </button>
                    {categories.map((category) => {
                        const count = learnings.filter((l) => l.category === category).length;
                        return (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === category
                                        ? 'bg-cyan-600 text-white'
                                        : 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700'
                                    }`}
                            >
                                {category} ({count})
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Learnings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredLearnings.map((learning) => (
                    <LearningCard key={learning.id} learning={learning} />
                ))}
            </div>

            {/* Empty State */}
            {filteredLearnings.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-xl text-gray-400">
                        No learnings found in this category.
                    </p>
                </div>
            )}
        </>
    );
}
