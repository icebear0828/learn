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
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-slate-800 shadow-lg">
      {/* Cover Image */}
      <div className="relative w-full h-48">
        <Image
          src={imageError ? fallbackImage : coverImage}
          alt={`${localizedTitle} cover image`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          onError={() => setImageError(true)}
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 text-xs font-medium text-white bg-indigo-600/90 rounded-md backdrop-blur-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Content area */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-white truncate mb-3">
          {localizedTitle}
        </h3>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2">
          {displayedTechStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-medium text-slate-300 bg-slate-700 rounded-md"
            >
              {tech}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="px-2 py-1 text-xs font-medium text-slate-400 bg-slate-700/50 rounded-md">
              +{remainingCount}
            </span>
          )}
        </div>
      </div>

      {/* Flip hint */}
      <div className="absolute bottom-3 right-3">
        <span className="text-xs text-slate-500">{t('card.clickToFlip')}</span>
      </div>
    </div>
  );

  // Back side of the card
  const backContent = (
    <div className="flex flex-col justify-between w-full h-full p-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg">
      {/* Description */}
      <div className="flex-1 overflow-hidden">
        <h3 className="text-lg font-semibold text-white mb-3">{localizedTitle}</h3>
        <p className="text-sm text-slate-300 leading-relaxed line-clamp-6">
          {localizedDescription}
        </p>
      </div>

      {/* Action Button */}
      <div className="mt-4">
        <Link
          href={`/projects/${slug}`}
          className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          onClick={(e) => e.stopPropagation()}
          aria-label={`${t('projects.viewDetails')} - ${localizedTitle}`}
        >
          <span>{t('projects.viewDetails')}</span>
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Flip back hint */}
      <div className="mt-3 text-center">
        <span className="text-xs text-slate-500">{t('card.clickToFlipBack')}</span>
      </div>
    </div>
  );

  return (
    <FlipCard
      front={frontContent}
      back={backContent}
      className="w-full h-80"
      aria-label={`Project card for ${localizedTitle}`}
    />
  );
}
