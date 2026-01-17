import { getAllProjects } from '@/lib/projects';
import ProjectsPageClient from '@/components/ProjectsPageClient';

/**
 * Projects List Page
 * Server Component fetches data, Client Component handles filtering
 */
export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-base)' }}>
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <ProjectsPageClient projects={projects} />
      </div>
    </div>
  );
}
