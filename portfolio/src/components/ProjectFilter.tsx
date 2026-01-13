'use client';

interface ProjectFilterProps {
  categories: string[];
  techStacks: string[];
  selectedCategory: string;
  selectedTech: string;
  onCategoryChange: (category: string) => void;
  onTechChange: (tech: string) => void;
  onClear: () => void;
}

export default function ProjectFilter({
  categories,
  techStacks,
  selectedCategory,
  selectedTech,
  onCategoryChange,
  onTechChange,
  onClear,
}: ProjectFilterProps) {
  const hasActiveFilters = selectedCategory || selectedTech;

  return (
    <div className="mb-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label htmlFor="category-filter" className="text-xs font-medium text-slate-400">Category</label>
          <select id="category-filter" value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)} className="w-full sm:w-48 px-3 py-2 text-sm text-white bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500">
            <option value="">All Categories</option>
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label htmlFor="tech-filter" className="text-xs font-medium text-slate-400">Tech Stack</label>
          <select id="tech-filter" value={selectedTech} onChange={(e) => onTechChange(e.target.value)} className="w-full sm:w-48 px-3 py-2 text-sm text-white bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500">
            <option value="">All Tech</option>
            {techStacks.map((tech) => <option key={tech} value={tech}>{tech}</option>)}
          </select>
        </div>
        <div className="sm:self-end">
          <button onClick={onClear} disabled={!hasActiveFilters} className="px-4 py-2 text-sm font-medium rounded-lg transition-colors text-white bg-slate-600 hover:bg-slate-500 disabled:text-slate-500 disabled:bg-slate-700/50 disabled:cursor-not-allowed">Clear Filters</button>
        </div>
        {hasActiveFilters && (
          <div className="flex items-center gap-2 sm:ml-auto">
            <span className="text-xs text-slate-400">Active:</span>
            {selectedCategory && <span className="px-2 py-1 text-xs font-medium text-indigo-300 bg-indigo-600/30 rounded-md">{selectedCategory}</span>}
            {selectedTech && <span className="px-2 py-1 text-xs font-medium text-emerald-300 bg-emerald-600/30 rounded-md">{selectedTech}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
