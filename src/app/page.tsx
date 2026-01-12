import { getFeaturedProjects } from '@/lib/projects';
import { getRecentLearnings } from '@/lib/learnings';
import HomePageClient from '@/components/HomePageClient';

/**
 * Home Page - Server Component
 * 
 * Fetches data on server, renders with client component for i18n
 */
export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const recentLearnings = getRecentLearnings(4);

  return (
    <HomePageClient
      featuredProjects={featuredProjects}
      recentLearnings={recentLearnings}
    />
  );
}
