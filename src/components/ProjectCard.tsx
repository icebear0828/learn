'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';
import FlipCard from './FlipCard';
import { useLanguage } from '@/i18n/LanguageContext';
import { useLocalizedContent } from '@/i18n/useLocalizedContent';

interface ProjectCardProps {
  project: Project;
}

/**
 * ProjectCard - A project showcase card built on FlipCard
 *
 * Front: Cover image, title, tech stack tags (max 3)
 * Back: Description, "View Details" button
 * Dimensions: 100% width, 320px height
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const { t } = useLanguage();
  const { localize } = useLocalizedContent();

  const { slug, title, techStack, description, coverImage, category } = project;

  // Get localized strings
  const localizedTitle = localize(title);
  const localizedDescription = localize(description);

  // Fallback image for failed loads
  const fallbackImage = '/images/placeholder-project.svg';

  // Display at most 3 tech stack items
  const displayedTechStack = techStack.slice(0, 3);
  const remainingCount = techStack.length - 3;

  // Front side of the card
  const frontContent = (
    <div
      className="relative w-full h-full overflow-hidden rounded-xl"
      style={{ backgroundColor: 'var(--bg-surface)' }}
    >
      {/* Cover Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={imageError ? fallbackImage : coverImage}
          alt={`${localizedTitle} cover image`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          onError={() => setImageError(true)}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {/* Category badge with pulse effect */}
        <div className="absolute top-3 left-3">
          <span
            className="px-3 py-1.5 text-xs font-semibold text-white rounded-full backdrop-blur-md badge-pulse"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
            }}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Content area */}
      <div className="p-4">
        {/* Title with subtle glow on hover */}
        <h3
          className="text-lg font-bold truncate mb-3 transition-all duration-300"
          style={{ color: 'var(--text-primary)' }}
        >
          {localizedTitle}
        </h3>

        {/* Tech Stack Tags with gradient backgrounds */}
        <div className="flex flex-wrap gap-2">
          {displayedTechStack.map((tech, index) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-300 hover:scale-105"
              style={{
                color: 'var(--text-primary)',
                background: `linear-gradient(135deg, 
                  rgba(99, 102, 241, ${0.2 + index * 0.1}), 
                  rgba(168, 85, 247, ${0.15 + index * 0.05}))`,
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {tech}
            </span>
          ))}
          {remainingCount > 0 && (
            <span
              className="px-2.5 py-1 text-xs font-medium rounded-full"
              style={{
                color: 'var(--text-muted)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              +{remainingCount}
            </span>
          )}
        </div>
      </div>

      {/* Animated flip hint */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1">
        <span
          className="text-xs transition-all duration-300"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('card.clickToFlip')}
        </span>
        <svg
          className="w-3 h-3 animate-pulse"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ color: 'var(--text-muted)' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
    </div>
  );

  // Back side of the card
  const backContent = (
    <div
      className="flex flex-col justify-between w-full h-full p-6 rounded-xl"
      style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.05) 50%, var(--bg-surface) 100%)'
      }}
    >
      {/* Description */}
      <div className="flex-1 overflow-hidden">
        <h3
          className="text-lg font-bold mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          {localizedTitle}
        </h3>
        <p
          className="text-sm leading-relaxed line-clamp-6"
          style={{ color: 'var(--text-secondary)' }}
        >
          {localizedDescription}
        </p>
      </div>

      {/* Action Button with gradient and hover effects */}
      <div className="mt-4">
        <Link
          href={`/projects/${slug}`}
          className="group inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:shadow-lg hover:scale-[1.02]"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
          }}
          onClick={(e) => e.stopPropagation()}
          aria-label={`${t('projects.viewDetails')} - ${localizedTitle}`}
        >
          <span>{t('projects.viewDetails')}</span>
          <svg
            className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>

      {/* Flip back hint */}
      <div className="mt-3 text-center">
        <span
          className="text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('card.clickToFlipBack')}
        </span>
      </div>
    </div>
  );

  return (
    <FlipCard
      front={frontContent}
      back={backContent}
      className="w-full h-80 group"
      aria-label={`Project card for ${localizedTitle}`}
    />
  );
}

