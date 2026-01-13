import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { LearningCard } from '@/types';

/**
 * Directory containing learning Markdown files
 */
const LEARNINGS_DIRECTORY = path.join(process.cwd(), 'content', 'learnings');

/**
 * Parse a single Markdown file and return a LearningCard object
 * Returns null if parsing fails with detailed logging
 * @param fileName - The Markdown file name (e.g., 'my-topic.md')
 * @returns LearningCard object with frontmatter data and content, or null on failure
 */
function parseLearningFile(fileName: string): LearningCard | null {
  const filePath = path.join(LEARNINGS_DIRECTORY, fileName);

  // Pre-flight check
  if (!fs.existsSync(filePath)) {
    console.warn(`[learnings] File not found: ${filePath}`);
    return null;
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Required field validation
    const requiredFields = ['topic', 'category', 'summary', 'date'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      console.warn(`[learnings] Missing required fields in ${fileName}: ${missingFields.join(', ')}`);
    }

    // Use id from frontmatter if available, otherwise derive from filename
    const id = data.id || fileName.replace(/\.md$/, '');

    return {
      id,
      // 支持双语: { zh: '中文', en: 'English' } 或单语字符串
      topic: data.topic?.zh
        ? { zh: data.topic.zh, en: data.topic.en || data.topic.zh }
        : data.topic || 'Untitled Topic',
      summary: data.summary?.zh
        ? { zh: data.summary.zh, en: data.summary.en || data.summary.zh }
        : data.summary || '',
      category: data.category || 'Other',
      icon: data.icon || '',
      details: Array.isArray(data.details) ? data.details : [],
      link: data.link,
      date: data.date || new Date().toISOString().split('T')[0],
      content,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[learnings] Failed to parse ${fileName}: ${error.message}`);
    } else {
      console.error(`[learnings] Unknown error parsing ${fileName}:`, error);
    }
    return null;
  }
}

/**
 * Sort learnings by date in descending order (newest first)
 * @param learnings - Array of learnings to sort
 * @returns Sorted array of learnings
 */
function sortLearningsByDate(learnings: LearningCard[]): LearningCard[] {
  return learnings.sort((a, b) => {
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
 * Get all learnings from the content/learnings directory
 * @returns Array of all learnings sorted by date (descending)
 */
export function getAllLearnings(): LearningCard[] {
  // Check if directory exists
  if (!fs.existsSync(LEARNINGS_DIRECTORY)) {
    console.warn(`Learnings directory not found: ${LEARNINGS_DIRECTORY}`);
    return [];
  }

  const fileNames = fs.readdirSync(LEARNINGS_DIRECTORY);
  const mdFiles = fileNames.filter((fileName) => fileName.endsWith('.md'));

  const learnings = mdFiles.map((fileName) => {
    try {
      return parseLearningFile(fileName);
    } catch (error) {
      console.error(`Error parsing learning file ${fileName}:`, error);
      return null;
    }
  });

  // Filter out any null values from parsing errors
  const validLearnings = learnings.filter(
    (learning): learning is LearningCard => learning !== null
  );

  return sortLearningsByDate(validLearnings);
}

/**
 * Get the most recent learnings
 * @param limit - Maximum number of learnings to return
 * @returns Array of recent learnings sorted by date (descending)
 */
export function getRecentLearnings(limit: number): LearningCard[] {
  const allLearnings = getAllLearnings();
  return allLearnings.slice(0, limit);
}

/**
 * Get a single learning by its ID
 * @param id - The learning ID (filename without extension or frontmatter id)
 * @returns LearningCard object or null if not found
 */
export function getLearningById(id: string): LearningCard | null {
  // Check if directory exists
  if (!fs.existsSync(LEARNINGS_DIRECTORY)) {
    console.warn(`Learnings directory not found: ${LEARNINGS_DIRECTORY}`);
    return null;
  }

  // First, try to find the file directly by id
  const directFilePath = path.join(LEARNINGS_DIRECTORY, `${id}.md`);
  if (fs.existsSync(directFilePath)) {
    try {
      return parseLearningFile(`${id}.md`);
    } catch (error) {
      console.error(`Error parsing learning file ${id}.md:`, error);
      return null;
    }
  }

  // If not found by filename, search through all learnings for matching id in frontmatter
  const allLearnings = getAllLearnings();
  return allLearnings.find((learning) => learning.id === id) || null;
}

/**
 * Get all unique learning categories
 * @returns Array of unique category strings
 */
export function getAllLearningCategories(): string[] {
  const allLearnings = getAllLearnings();
  const categories = new Set(allLearnings.map((learning) => learning.category));
  return Array.from(categories).sort();
}

/**
 * Get learnings by category
 * @param category - The category to filter by
 * @returns Array of learnings in the specified category, sorted by date
 */
export function getLearningsByCategory(category: string): LearningCard[] {
  const allLearnings = getAllLearnings();
  return allLearnings.filter((learning) => learning.category === category);
}

/**
 * Get all learning IDs (useful for static path generation)
 * @returns Array of ID strings
 */
export function getAllLearningIds(): string[] {
  const allLearnings = getAllLearnings();
  return allLearnings.map((learning) => learning.id);
}
