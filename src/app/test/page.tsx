import { notFound } from 'next/navigation';
import { getAllProjects, getFeaturedProjects } from '@/lib/projects';
import { getAllLearnings, getRecentLearnings } from '@/lib/learnings';

export default function TestPage() {
  // Block access in production
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  const allProjects = getAllProjects();
  const featuredProjects = getFeaturedProjects();
  const allLearnings = getAllLearnings();
  const recentLearnings = getRecentLearnings(4);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Data Layer Test Page</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-400">
          All Projects ({allProjects.length})
        </h2>
        <pre className="bg-slate-800 p-4 rounded-lg overflow-auto max-h-96 text-sm">
          {JSON.stringify(allProjects, null, 2)}
        </pre>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-400">
          Featured Projects ({featuredProjects.length})
        </h2>
        <pre className="bg-slate-800 p-4 rounded-lg overflow-auto max-h-96 text-sm">
          {JSON.stringify(featuredProjects, null, 2)}
        </pre>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-green-400">
          All Learnings ({allLearnings.length})
        </h2>
        <pre className="bg-slate-800 p-4 rounded-lg overflow-auto max-h-96 text-sm">
          {JSON.stringify(allLearnings, null, 2)}
        </pre>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-green-400">
          Recent Learnings ({recentLearnings.length})
        </h2>
        <pre className="bg-slate-800 p-4 rounded-lg overflow-auto max-h-96 text-sm">
          {JSON.stringify(recentLearnings, null, 2)}
        </pre>
      </section>

      <footer className="text-slate-500 text-sm">
        <p>Visit <code className="text-slate-400">/test</code> to see this page</p>
        <p>Data read from <code className="text-slate-400">content/projects/</code> and <code className="text-slate-400">content/learnings/</code></p>
      </footer>
    </div>
  );
}
