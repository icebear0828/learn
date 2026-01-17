import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaFolder, FaArrowLeft } from 'react-icons/fa';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/projects';
import TechStackIcon from '@/components/TechStackIcon';
import { getLocalizedString } from '@/lib/localization';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all project pages
 * Enables static site generation for all projects
 */
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  const title = getLocalizedString(project.title);
  const description = getLocalizedString(project.description);

  return {
    title: `${title} | Portfolio`,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'article',
      images: project.coverImage ? [project.coverImage] : undefined,
    },
  };
}

/**
 * Custom MDX components for enhanced rendering
 */
const mdxComponents = {
  // Enhanced heading styles
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold text-white mt-12 mb-6 first:mt-0" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-xl font-bold text-cyan-400 mt-10 mb-4 flex items-center gap-2" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-lg font-semibold text-white mt-6 mb-3" {...props} />
  ),
  // Enhanced paragraph
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-300 leading-relaxed mb-4" {...props} />
  ),
  // Enhanced list items with bold label support
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="space-y-3 my-4" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-gray-300 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-cyan-500 before:rounded-full" {...props} />
  ),
  // Enhanced strong for bold labels
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-white" {...props} />
  ),
  // Enhanced table styling
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-hidden rounded-lg border border-gray-700 my-6">
      <table className="w-full text-left" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-gray-800/80" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-gray-700/50" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="bg-gray-900/30 hover:bg-gray-800/50 transition-colors" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 font-bold text-gray-200 text-sm uppercase tracking-wider" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 text-gray-300" {...props} />
  ),
  // Enhanced code blocks
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="text-cyan-300 bg-gray-800/80 px-1.5 py-0.5 rounded text-sm" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-gray-800/80 border border-gray-700 rounded-lg p-4 overflow-x-auto my-4" {...props} />
  ),
  // Enhanced blockquote
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-cyan-500 pl-4 py-2 my-4 text-gray-400 italic bg-gray-800/30 rounded-r-lg" {...props} />
  ),
  // Enhanced links
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors" {...props} />
  ),
};

/**
 * Project Detail Page - Redesigned with modern dark theme
 * Features: Hero section, feature cards, tech architecture table
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  // Handle 404 if project not found
  if (!project) {
    notFound();
  }

  // Convert LocalizedString to plain strings for rendering
  const projectTitle = getLocalizedString(project.title);
  const projectDescription = getLocalizedString(project.description);

  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-12">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 group"
        >
          <FaArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </Link>

        {/* Hero Section */}
        <header className="mb-12">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {projectTitle}
          </h1>

          {/* Description as subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 italic mb-8 leading-relaxed">
            {projectDescription}
          </p>

          {/* Meta badges */}
          <div className="flex flex-wrap gap-4 mb-8">
            {/* Date badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 border border-gray-700/50 rounded-full text-sm">
              <FaCalendarAlt size={12} className="text-cyan-400" />
              <time dateTime={project.date} className="text-gray-300">
                {new Date(project.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            {/* Category badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm">
              <FaFolder size={12} className="text-cyan-400" />
              <span className="text-cyan-300">{project.category}</span>
            </div>

            {/* Featured badge */}
            {project.featured && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-sm">
                <span className="text-amber-400">★ Featured</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 rounded-lg text-white font-medium transition-all hover:scale-[1.02] hover:shadow-lg"
              >
                <FaGithub size={20} />
                <span>View on GitHub</span>
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 rounded-lg text-white font-medium transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/25"
              >
                <FaExternalLinkAlt size={16} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </header>

        {/* Tech Stack Section */}
        {project.techStack && project.techStack.length > 0 && (
          <section className="mb-12 p-6 bg-gray-800/30 border border-gray-700/50 rounded-xl">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900/60 rounded-lg border border-gray-700/50 hover:border-cyan-500/50 hover:bg-gray-800/60 transition-all group"
                >
                  <TechStackIcon tech={tech} size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-200">{tech}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Divider */}
        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700/50" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-gray-900 text-gray-500 text-sm">Project Details</span>
          </div>
        </div>

        {/* Main Content - MDX Rendered with custom components */}
        <main className="prose prose-invert prose-lg max-w-none">
          <MDXRemote
            source={project.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </main>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-700/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium group"
            >
              <FaArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Projects</span>
            </Link>

            {/* Share or other actions could go here */}
            <div className="text-sm text-gray-500">
              Last updated: {new Date(project.date).toLocaleDateString('zh-CN')}
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
