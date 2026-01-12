import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import matter from 'gray-matter';
import type { Project } from '@/types';

// Create mock functions
const mockExistsSync = vi.fn();
const mockReaddirSync = vi.fn();
const mockReadFileSync = vi.fn();

// Mock fs module before imports
vi.mock('fs', () => ({
    default: {
        existsSync: (...args: Parameters<typeof mockExistsSync>) => mockExistsSync(...args),
        readdirSync: (...args: Parameters<typeof mockReaddirSync>) => mockReaddirSync(...args),
        readFileSync: (...args: Parameters<typeof mockReadFileSync>) => mockReadFileSync(...args),
    },
    existsSync: (...args: Parameters<typeof mockExistsSync>) => mockExistsSync(...args),
    readdirSync: (...args: Parameters<typeof mockReaddirSync>) => mockReaddirSync(...args),
    readFileSync: (...args: Parameters<typeof mockReadFileSync>) => mockReadFileSync(...args),
}));

// Import after mocks
import {
    getAllProjects,
    getProjectBySlug,
    getFeaturedProjects,
    getAllProjectCategories,
    getProjectsByCategory,
    getAllProjectSlugs,
} from '../projects';

// Sample MDX content
const mockProjectContent = `---
title: Test Project
date: 2025-01-15
category: Web App
techStack:
  - React
  - TypeScript
  - Tailwind
description: A test project description
coverImage: /images/test.jpg
githubUrl: https://github.com/test/project
featured: true
---

# Project Content

This is the project content.
`;

const mockProjectContent2 = `---
title: Second Project
date: 2025-01-10
category: AI/ML
techStack:
  - Python
  - TensorFlow
description: Another test project
coverImage: /images/test2.jpg
featured: false
---

# Another Project

More content here.
`;

const mockProjectContent3 = `---
title: Third Project
date: 2025-01-12
category: Web App
techStack:
  - Vue
  - JavaScript
description: Third project description
coverImage: /images/test3.jpg
featured: true
---

# Third Project

Content for third project.
`;

describe('projects.ts', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    describe('getAllProjects', () => {
        it('should return empty array when directory does not exist', () => {
            mockExistsSync.mockReturnValue(false);

            const result = getAllProjects();

            expect(result).toEqual([]);
        });

        it('should return all projects sorted by date descending', () => {
            mockExistsSync.mockReturnValue(true);
            mockReaddirSync.mockReturnValue([
                'project1.mdx',
                'project2.mdx',
                'project3.mdx',
            ]);
            mockReadFileSync
                .mockReturnValueOnce(mockProjectContent)
                .mockReturnValueOnce(mockProjectContent2)
                .mockReturnValueOnce(mockProjectContent3);

            const result = getAllProjects();

            expect(result).toHaveLength(3);
            // Should be sorted by date descending (newest first)
            expect(result[0].title).toBe('Test Project'); // 2025-01-15
            expect(result[1].title).toBe('Third Project'); // 2025-01-12
            expect(result[2].title).toBe('Second Project'); // 2025-01-10
        });

        it('should filter out non-mdx files', () => {
            mockExistsSync.mockReturnValue(true);
            mockReaddirSync.mockReturnValue([
                'project1.mdx',
                'readme.md',
                'notes.txt',
            ]);
            mockReadFileSync.mockReturnValue(mockProjectContent);

            const result = getAllProjects();

            expect(result).toHaveLength(1);
        });

        it('should handle parsing errors gracefully', () => {
            mockExistsSync.mockReturnValue(true);
            mockReaddirSync.mockReturnValue([
                'project1.mdx',
                'broken.mdx',
            ]);
            mockReadFileSync
                .mockReturnValueOnce(mockProjectContent)
                .mockImplementationOnce(() => {
                    throw new Error('Parse error');
                });

            const result = getAllProjects();

            expect(result).toHaveLength(1);
            expect(result[0].title).toBe('Test Project');
        });
    });

    describe('getProjectBySlug', () => {
        it('should return null when directory does not exist', () => {
            mockExistsSync.mockReturnValue(false);

            const result = getProjectBySlug('test-project');

            expect(result).toBeNull();
        });

        it('should find project by filename slug', () => {
            mockExistsSync.mockReturnValue(true);
            mockReadFileSync.mockReturnValue(mockProjectContent);

            const result = getProjectBySlug('test-project');

            expect(result).not.toBeNull();
            expect(result?.title).toBe('Test Project');
        });

        it('should search through all projects when direct file not found', () => {
            // First call: check if directory exists (in getProjectBySlug)
            // Second call: check if direct file exists (returns false)
            // Third call: check if directory exists (in getAllProjects, called as fallback)
            // Fourth call: check if file exists in parseProjectFile (returns true)
            mockExistsSync
                .mockReturnValueOnce(true) // directory exists (getProjectBySlug)
                .mockReturnValueOnce(false) // direct file does not exist
                .mockReturnValueOnce(true) // directory exists (getAllProjects)
                .mockReturnValueOnce(true); // file exists in parseProjectFile
            mockReaddirSync.mockReturnValue(['project1.mdx']);
            mockReadFileSync.mockReturnValue(mockProjectContent);

            const result = getProjectBySlug('project1');

            expect(result).not.toBeNull();
        });
    });

    describe('getFeaturedProjects', () => {
        it('should return only featured projects', () => {
            mockExistsSync.mockReturnValue(true);
            mockReaddirSync.mockReturnValue([
                'project1.mdx',
                'project2.mdx',
                'project3.mdx',
            ]);
            mockReadFileSync
                .mockReturnValueOnce(mockProjectContent) // featured: true
                .mockReturnValueOnce(mockProjectContent2) // featured: false
                .mockReturnValueOnce(mockProjectContent3); // featured: true

            const result = getFeaturedProjects();

            expect(result).toHaveLength(2);
            expect(result.every((p) => p.featured === true)).toBe(true);
        });

        it('should return at most 6 featured projects', () => {
            mockExistsSync.mockReturnValue(true);
            mockReaddirSync.mockReturnValue(
                Array(10)
                    .fill(null)
                    .map((_, i) => `project${i}.mdx`)
            );
            mockReadFileSync.mockReturnValue(mockProjectContent); // all featured

            const result = getFeaturedProjects();

            expect(result.length).toBeLessThanOrEqual(6);
        });
    });

    describe('getAllProjectCategories', () => {
        it('should return unique categories sorted', () => {
            mockExistsSync.mockReturnValue(true);
            mockReaddirSync.mockReturnValue([
                'project1.mdx',
                'project2.mdx',
                'project3.mdx',
            ]);
            mockReadFileSync
                .mockReturnValueOnce(mockProjectContent) // Web App
                .mockReturnValueOnce(mockProjectContent2) // AI/ML
                .mockReturnValueOnce(mockProjectContent3); // Web App

            const result = getAllProjectCategories();

            expect(result).toHaveLength(2);
            expect(result).toContain('Web App');
            expect(result).toContain('AI/ML');
        });
    });

    describe('getProjectsByCategory', () => {
        it('should filter projects by category', () => {
            mockExistsSync.mockReturnValue(true);
            mockReaddirSync.mockReturnValue([
                'project1.mdx',
                'project2.mdx',
                'project3.mdx',
            ]);
            mockReadFileSync
                .mockReturnValueOnce(mockProjectContent)
                .mockReturnValueOnce(mockProjectContent2)
                .mockReturnValueOnce(mockProjectContent3);

            const result = getProjectsByCategory('Web App');

            expect(result).toHaveLength(2);
            expect(result.every((p) => p.category === 'Web App')).toBe(true);
        });
    });

    describe('getAllProjectSlugs', () => {
        it('should return all project slugs', () => {
            mockExistsSync.mockReturnValue(true);
            mockReaddirSync.mockReturnValue([
                'project1.mdx',
                'project2.mdx',
            ]);
            mockReadFileSync
                .mockReturnValueOnce(mockProjectContent)
                .mockReturnValueOnce(mockProjectContent2);

            const result = getAllProjectSlugs();

            expect(result).toHaveLength(2);
            expect(Array.isArray(result)).toBe(true);
        });
    });
});
