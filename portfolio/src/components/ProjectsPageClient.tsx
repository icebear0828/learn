'use client';

import { useState, useMemo } from 'react';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';
import { useLanguage } from '@/i18n/LanguageContext';

interface ProjectsPageClientProps {
  projects: Project[];
}

export default function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTech, setSelectedTech] = useState('');
  const { t } = useLanguage();

  // Extract unique categories and tech stacks
  const categories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category));
    return Array.from(cats).sort();
  }, [projects]);

  const techStacks = useMemo(() => {
    const techs = new Set(projects.flatMap(p => p.techStack));
    return Array.from(techs).sort();
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchCategory = !selectedCategory || project.category === selectedCategory;
      const matchTech = !selectedTech || project.techStack.includes(selectedTech);
      return matchCategory && matchTech;
    });
  }, [projects, selectedCategory, selectedTech]);

  const handleClear = () => {
    setSelectedCategory('');
    setSelectedTech('');
  };

  return (
    <>
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">{t('projects.title')}</h1>
        <p className="text-lg text-slate-400">
          {filteredProjects.length === projects.length
            ? t('projects.totalProjects', { count: projects.length })
            : t('projects.filteredProjects', { filtered: filteredProjects.length, total: projects.length })}
        </p>
      </header>

      <ProjectFilter
        categories={categories}
        techStacks={techStacks}
        selectedCategory={selectedCategory}
        selectedTech={selectedTech}
        onCategoryChange={setSelectedCategory}
        onTechChange={setSelectedTech}
        onClear={handleClear}
      />

      <section aria-label="Projects list">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">{t('projects.noMatch')}</p>
            <button onClick={handleClear} className="mt-4 text-indigo-400 hover:text-indigo-300">
              {t('projects.clearFilters')}
            </button>
          </div>
        )}
      </section>
    </>
  );
}
