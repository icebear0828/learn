import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Project } from '@/types';

/**
 * Directory containing project MDX files
 */
const PROJECTS_DIRECTORY = path.join(process.cwd(), 'content', 'projects');

/**
 * Parse a single MDX file and return a Project object
 * Returns null if parsing fails with detailed logging
 * @param fileName - The MDX file name (e.g., 'my-project.mdx')
 * @returns Project object with frontmatter data and content, or null on failure
 */
function parseProjectFile(fileName: string): Project | null {
  const filePath = path.join(PROJECTS_DIRECTORY, fileName);

  // Pre-flight check
  if (!fs.existsSync(filePath)) {
    console.warn(`[projects] File not found: ${filePath}`);
    return null;
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Required field validation
    const requiredFields = ['title', 'date', 'category', 'description'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      console.warn(`[projects] Missing required fields in ${fileName}: ${missingFields.join(', ')}`);
    }

    // Use slug from frontmatter if available, otherwise derive from filename
    const slug = data.slug || fileName.replace(/\.mdx$/, '');

    return {
      slug,
      // 支持双语: { zh: '中文', en: 'English' } 或单语字符串
      title: data.title?.zh
        ? { zh: data.title.zh, en: data.title.en || data.title.zh }
        : data.title || 'Untitled Project',
      description: data.description?.zh
        ? { zh: data.description.zh, en: data.description.en || data.description.zh }
        : data.description || '',
      date: data.date || new Date().toISOString().split('T')[0],
      category: data.category || 'Other',
      techStack: Array.isArray(data.techStack) ? data.techStack : [],
      coverImage: data.coverImage || '/images/placeholder-project.svg',
      githubUrl: data.githubUrl,
      demoUrl: data.demoUrl,
      featured: Boolean(data.featured),
      content,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[projects] Failed to parse ${fileName}: ${error.message}`);
    } else {
      console.error(`[projects] Unknown error parsing ${fileName}:`, error);
    }
    return null;
  }
}

/**
 * Sort projects by date in descending order (newest first)
 * @param projects - Array of projects to sort
 * @returns Sorted array of projects
 */
function sortProjectsByDate(projects: Project[]): Project[] {
  return projects.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    // Handle invalid dates - push to end
    if (isNaN(dateA) && isNaN(dateB)) return 0;
    if (isNaN(dateA)) return 1;
    if (isNaN(dateB)) return -1;

    return dateB - dateA;
  });
}

/**
 * Get all projects from the content/projects directory
 * @returns Array of all projects sorted by date (descending)
 */
export function getAllProjects(): Project[] {
  // Check if directory exists
  if (!fs.existsSync(PROJECTS_DIRECTORY)) {
    console.warn(`Projects directory not found: ${PROJECTS_DIRECTORY}`);
    return [];
  }

  const fileNames = fs.readdirSync(PROJECTS_DIRECTORY);
  const mdxFiles = fileNames.filter((fileName) => fileName.endsWith('.mdx'));

  const projects = mdxFiles.map((fileName) => {
    try {
      return parseProjectFile(fileName);
    } catch (error) {
      console.error(`Error parsing project file ${fileName}:`, error);
      return null;
    }
  });

  // Filter out any null values from parsing errors
  const validProjects = projects.filter((project): project is Project => project !== null);

  return sortProjectsByDate(validProjects);
}

/**
 * Get a single project by its slug
 * @param slug - The project slug (filename without extension or frontmatter slug)
 * @returns Project object or null if not found
 */
export function getProjectBySlug(slug: string): Project | null {
  // Check if directory exists
  if (!fs.existsSync(PROJECTS_DIRECTORY)) {
    console.warn(`Projects directory not found: ${PROJECTS_DIRECTORY}`);
    return null;
  }

  // First, try to find the file directly by slug
  const directFilePath = path.join(PROJECTS_DIRECTORY, `${slug}.mdx`);
  if (fs.existsSync(directFilePath)) {
    try {
      return parseProjectFile(`${slug}.mdx`);
    } catch (error) {
      console.error(`Error parsing project file ${slug}.mdx:`, error);
      return null;
    }
  }

  // If not found by filename, search through all projects for matching slug in frontmatter
  const allProjects = getAllProjects();
  return allProjects.find((project) => project.slug === slug) || null;
}

/**
 * Get featured projects (limited to 6)
 * @returns Array of featured projects sorted by date (descending), max 6 items
 */
export function getFeaturedProjects(): Project[] {
  const allProjects = getAllProjects();
  const featuredProjects = allProjects.filter((project) => project.featured === true);

  // Return at most 6 featured projects
  return featuredProjects.slice(0, 6);
}

/**
 * Get all unique project categories
 * @returns Array of unique category strings
 */
export function getAllProjectCategories(): string[] {
  const allProjects = getAllProjects();
  const categories = new Set(allProjects.map((project) => project.category));
  return Array.from(categories).sort();
}

/**
 * Get projects by category
 * @param category - The category to filter by
 * @returns Array of projects in the specified category, sorted by date
 */
export function getProjectsByCategory(category: string): Project[] {
  const allProjects = getAllProjects();
  return allProjects.filter((project) => project.category === category);
}

/**
 * Get all project slugs (useful for static path generation)
 * @returns Array of slug strings
 */
export function getAllProjectSlugs(): string[] {
  const allProjects = getAllProjects();
  return allProjects.map((project) => project.slug);
}
