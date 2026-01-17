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
    <div
      className="mb-8 p-4 rounded-xl"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-surface) 50%, transparent)',
        border: '1px solid var(--border-default)'
      }}
    >
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label
            htmlFor="category-filter"
            className="text-xs font-medium"
            style={{ color: 'var(--text-muted)' }}
          >
            Category
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full sm:w-48 px-3 py-2 text-sm rounded-lg focus:ring-2"
            style={{
              color: 'var(--text-primary)',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)'
            }}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label
            htmlFor="tech-filter"
            className="text-xs font-medium"
            style={{ color: 'var(--text-muted)' }}
          >
            Tech Stack
          </label>
          <select
            id="tech-filter"
            value={selectedTech}
            onChange={(e) => onTechChange(e.target.value)}
            className="w-full sm:w-48 px-3 py-2 text-sm rounded-lg focus:ring-2"
            style={{
              color: 'var(--text-primary)',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)'
            }}
          >
            <option value="">All Tech</option>
            {techStacks.map((tech) => <option key={tech} value={tech}>{tech}</option>)}
          </select>
        </div>
        <div className="sm:self-end">
          <button
            onClick={onClear}
            disabled={!hasActiveFilters}
            className="px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
            style={{
              color: hasActiveFilters ? 'var(--text-primary)' : 'var(--text-muted)',
              backgroundColor: hasActiveFilters ? 'var(--bg-elevated)' : 'color-mix(in srgb, var(--bg-elevated) 50%, transparent)'
            }}
          >
            Clear Filters
          </button>
        </div>
        {hasActiveFilters && (
          <div className="flex items-center gap-2 sm:ml-auto">
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Active:</span>
            {selectedCategory && (
              <span
                className="px-2 py-1 text-xs font-medium rounded-md"
                style={{
                  color: 'var(--color-primary-light)',
                  backgroundColor: 'color-mix(in srgb, var(--color-primary) 30%, transparent)'
                }}
              >
                {selectedCategory}
              </span>
            )}
            {selectedTech && (
              <span
                className="px-2 py-1 text-xs font-medium rounded-md"
                style={{
                  color: 'var(--color-success)',
                  backgroundColor: 'color-mix(in srgb, var(--color-success) 20%, transparent)'
                }}
              >
                {selectedTech}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

