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
  // Enhanced heading styles - Theme-aware
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-3xl font-bold mt-12 mb-6 first:mt-0"
      style={{ color: 'var(--text-primary)' }}
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-xl font-bold mt-10 mb-4 flex items-center gap-2"
      style={{ color: 'var(--color-primary)' }}
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-lg font-semibold mt-6 mb-3"
      style={{ color: 'var(--text-primary)' }}
      {...props}
    />
  ),
  // Enhanced paragraph
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="leading-relaxed mb-4"
      style={{ color: 'var(--text-secondary)' }}
      {...props}
    />
  ),
  // Enhanced list items with bold label support
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="space-y-3 my-4" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      className="leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:rounded-full"
      style={{
        color: 'var(--text-secondary)',
        // Note: pseudo-element colors need CSS, so we keep a fallback
      }}
      {...props}
    />
  ),
  // Enhanced strong for bold labels
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong
      className="font-bold"
      style={{ color: 'var(--text-primary)' }}
      {...props}
    />
  ),
  // Enhanced table styling - Theme-aware
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div
      className="overflow-hidden rounded-lg my-6"
      style={{ border: '1px solid var(--border-default)' }}
    >
      <table className="w-full text-left" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead style={{ backgroundColor: 'var(--bg-elevated)' }} {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody style={{ borderColor: 'var(--border-subtle)' }} className="divide-y" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className="transition-colors"
      style={{ backgroundColor: 'var(--bg-surface)' }}
      {...props}
    />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-3 font-bold text-sm uppercase tracking-wider"
      style={{ color: 'var(--text-primary)' }}
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-3"
      style={{ color: 'var(--text-secondary)' }}
      {...props}
    />
  ),
  // Enhanced code blocks - Theme-aware
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="px-1.5 py-0.5 rounded text-sm"
      style={{
        color: 'var(--color-primary)',
        backgroundColor: 'var(--bg-elevated)'
      }}
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="rounded-lg p-4 overflow-x-auto my-4"
      style={{
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--border-default)'
      }}
      {...props}
    />
  ),
  // Enhanced blockquote - Theme-aware
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="pl-4 py-2 my-4 italic rounded-r-lg"
      style={{
        borderLeft: '4px solid var(--color-primary)',
        color: 'var(--text-muted)',
        backgroundColor: 'var(--bg-surface)'
      }}
      {...props}
    />
  ),
  // Enhanced links - Theme-aware
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="underline underline-offset-2 transition-colors"
      style={{ color: 'var(--color-primary)' }}
      {...props}
    />
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
    <article
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--bg-base)',
        color: 'var(--text-primary)'
      }}
    >
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(var(--color-primary-rgb, 99, 102, 241), 0.05)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(168, 85, 247, 0.05)' }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-12">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 transition-colors mb-8 group"
          style={{ color: 'var(--text-muted)' }}
        >
          <FaArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </Link>

        {/* Hero Section */}
        <header className="mb-12">
          {/* Title */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            {projectTitle}
          </h1>

          {/* Description as subtitle */}
          <p
            className="text-xl md:text-2xl italic mb-8 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {projectDescription}
          </p>

          {/* Meta badges */}
          <div className="flex flex-wrap gap-4 mb-8">
            {/* Date badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-default)'
              }}
            >
              <FaCalendarAlt size={12} style={{ color: 'var(--color-primary)' }} />
              <time dateTime={project.date} style={{ color: 'var(--text-secondary)' }}>
                {new Date(project.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            {/* Category badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
              style={{
                backgroundColor: 'rgba(var(--color-primary-rgb, 59, 130, 246), 0.1)',
                border: '1px solid rgba(var(--color-primary-rgb, 59, 130, 246), 0.3)'
              }}
            >
              <FaFolder size={12} style={{ color: 'var(--color-primary)' }} />
              <span style={{ color: 'var(--color-primary-light)' }}>{project.category}</span>
            </div>

            {/* Featured badge */}
            {project.featured && (
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-sm"
              >
                <span className="text-amber-500 font-medium">★ Featured</span>
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-default)'
                }}
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{
                  background: 'var(--color-primary)',
                  boxShadow: '0 4px 14px 0 rgba(var(--color-primary-rgb, 59, 130, 246), 0.39)'
                }}
              >
                <FaExternalLinkAlt size={16} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </header>

        {/* Tech Stack Section */}
        {project.techStack && project.techStack.length > 0 && (
          <section
            className="mb-12 p-6 rounded-xl"
            style={{
              backgroundColor: 'rgba(var(--bg-surface-rgb), 0.5)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <h2
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ color: 'var(--color-primary)' }}
            >
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all group"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-default)'
                  }}
                >
                  <TechStackIcon tech={tech} size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{tech}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Divider */}
        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" style={{ borderColor: 'var(--border-subtle)' }} />
          </div>
          <div className="relative flex justify-center">
            <span
              className="px-4 text-sm"
              style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-muted)' }}
            >
              Project Details
            </span>
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
        <footer className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 transition-colors font-medium group"
              style={{ color: 'var(--color-primary)' }}
            >
              <FaArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Projects</span>
            </Link>

            {/* Share or other actions could go here */}
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Last updated: {new Date(project.date).toLocaleDateString('zh-CN')}
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
