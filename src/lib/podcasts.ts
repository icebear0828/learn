import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Podcast } from '@/types';

/**
 * Directory containing podcast Markdown files
 */
const PODCASTS_DIRECTORY = path.join(process.cwd(), 'content', 'podcasts');

/**
 * Parse a single Markdown file and return a Podcast object
 * Returns null if parsing fails with detailed logging
 * @param fileName - The Markdown file name (e.g., 'my-podcast.md')
 * @returns Podcast object with frontmatter data and content, or null on failure
 */
function parsePodcastFile(fileName: string): Podcast | null {
    const filePath = path.join(PODCASTS_DIRECTORY, fileName);

    // Pre-flight check
    if (!fs.existsSync(filePath)) {
        console.warn(`[podcasts] File not found: ${filePath}`);
        return null;
    }

    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        // Required field validation
        const requiredFields = ['title', 'date', 'duration', 'audioUrl'];
        const missingFields = requiredFields.filter(field => !data[field]);

        if (missingFields.length > 0) {
            console.warn(`[podcasts] Missing required fields in ${fileName}: ${missingFields.join(', ')}`);
        }

        // Use slug from frontmatter if available, otherwise derive from filename
        const slug = data.slug || fileName.replace(/\.md$/, '');

        return {
            slug,
            // 支持双语: { zh: '中文', en: 'English' } 或单语字符串
            title: data.title?.zh
                ? { zh: data.title.zh, en: data.title.en || data.title.zh }
                : data.title || 'Untitled Podcast',
            description: data.description?.zh
                ? { zh: data.description.zh, en: data.description.en || data.description.zh }
                : data.description || '',
            date: data.date || new Date().toISOString().split('T')[0],
            category: data.category || 'Other',
            duration: data.duration || '00:00',
            audioUrl: data.audioUrl || '',
            coverImage: data.coverImage,
            featured: Boolean(data.featured),
            content,
        };
    } catch (error) {
        if (error instanceof Error) {
            console.error(`[podcasts] Failed to parse ${fileName}: ${error.message}`);
        } else {
            console.error(`[podcasts] Unknown error parsing ${fileName}:`, error);
        }
        return null;
    }
}

/**
 * Sort podcasts by date in descending order (newest first)
 * @param podcasts - Array of podcasts to sort
 * @returns Sorted array of podcasts
 */
function sortPodcastsByDate(podcasts: Podcast[]): Podcast[] {
    return podcasts.sort((a, b) => {
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
 * Get all podcasts from the content/podcasts directory
 * @returns Array of all podcasts sorted by date (descending)
 */
export function getAllPodcasts(): Podcast[] {
    // Check if directory exists
    if (!fs.existsSync(PODCASTS_DIRECTORY)) {
        console.warn(`Podcasts directory not found: ${PODCASTS_DIRECTORY}`);
        return [];
    }

    const fileNames = fs.readdirSync(PODCASTS_DIRECTORY);
    const mdFiles = fileNames.filter((fileName) => fileName.endsWith('.md'));

    const podcasts = mdFiles.map((fileName) => {
        try {
            return parsePodcastFile(fileName);
        } catch (error) {
            console.error(`Error parsing podcast file ${fileName}:`, error);
            return null;
        }
    });

    // Filter out any null values from parsing errors
    const validPodcasts = podcasts.filter(
        (podcast): podcast is Podcast => podcast !== null
    );

    return sortPodcastsByDate(validPodcasts);
}

/**
 * Get a single podcast by its slug
 * @param slug - The podcast slug (filename without extension or frontmatter slug)
 * @returns Podcast object or null if not found
 */
export function getPodcastBySlug(slug: string): Podcast | null {
    // Check if directory exists
    if (!fs.existsSync(PODCASTS_DIRECTORY)) {
        console.warn(`Podcasts directory not found: ${PODCASTS_DIRECTORY}`);
        return null;
    }

    // First, try to find the file directly by slug
    const directFilePath = path.join(PODCASTS_DIRECTORY, `${slug}.md`);
    if (fs.existsSync(directFilePath)) {
        try {
            return parsePodcastFile(`${slug}.md`);
        } catch (error) {
            console.error(`Error parsing podcast file ${slug}.md:`, error);
            return null;
        }
    }

    // If not found by filename, search through all podcasts for matching slug in frontmatter
    const allPodcasts = getAllPodcasts();
    return allPodcasts.find((podcast) => podcast.slug === slug) || null;
}

/**
 * Get the most recent podcasts
 * @param limit - Maximum number of podcasts to return
 * @returns Array of recent podcasts sorted by date (descending)
 */
export function getRecentPodcasts(limit: number): Podcast[] {
    const allPodcasts = getAllPodcasts();
    return allPodcasts.slice(0, limit);
}

/**
 * Get all unique podcast categories
 * @returns Array of unique category strings
 */
export function getAllPodcastCategories(): string[] {
    const allPodcasts = getAllPodcasts();
    const categories = new Set(allPodcasts.map((podcast) => podcast.category));
    return Array.from(categories).sort();
}

/**
 * Get podcasts by category
 * @param category - The category to filter by
 * @returns Array of podcasts in the specified category, sorted by date
 */
export function getPodcastsByCategory(category: string): Podcast[] {
    const allPodcasts = getAllPodcasts();
    return allPodcasts.filter((podcast) => podcast.category === category);
}

/**
 * Get all podcast slugs (useful for static path generation)
 * @returns Array of slug strings
 */
export function getAllPodcastSlugs(): string[] {
    const allPodcasts = getAllPodcasts();
    return allPodcasts.map((podcast) => podcast.slug);
}
