import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

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
    getAllLearnings,
    getRecentLearnings,
    getLearningById,
    getAllLearningCategories,
    getLearningsByCategory,
    getAllLearningIds,
} from '../learnings';

// Sample markdown content
const mockLearningContent1 = `---
topic: Docker Fundamentals
category: DevOps
icon: docker
summary: Understanding containerization basics
details:
  - Container basics
  - Dockerfile syntax
  - Docker Compose
date: 2025-01-15
---

# Docker Fundamentals

Content about Docker.
`;

const mockLearningContent2 = `---
topic: React Hooks
category: Frontend
icon: react
summary: Modern React state management
details:
  - useState
  - useEffect
  - Custom hooks
date: 2025-01-10
---

# React Hooks

Content about React hooks.
`;

const mockLearningContent3 = `---
topic: FastAPI Basics
category: Backend
icon: python
summary: Building APIs with FastAPI
details:
  - Route definition
  - Pydantic models
  - Async support
date: 2025-01-12
---

# FastAPI Basics

Content about FastAPI.
`;

describe('learnings.ts', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    describe('getAllLearnings', () => {
        it('should return empty array when directory does not exist', () => {
            mockExistsSync.mockReturnValue(false);

            const result = getAllLearnings();

            expect(result).toEqual([]);
        });

        it('should return all learnings sorted by date descending', () => {
            mockExistsSync.mockReturnValue(true);
            mockReaddirSync.mockReturnValue([
                'learning1.md',
                'learning2.md',
                'learning3.md',
            ]);
            mockReadFileSync
                .mockReturnValueOnce(mockLearningContent1)
                .mockReturnValueOnce(mockLearningContent2)
                .mockReturnValueOnce(mockLearningContent3);

            const result = getAllLearnings();

            expect(result).toHaveLength(3);
            // Should be sorted by date descending
            expect(result[0].topic).toBe('Docker Fundamentals'); // 2025-01-15
            expect(result[1].topic).toBe('FastAPI Basics'); // 2025-01-12
            expect(result[2].topic).toBe('React Hooks'); // 2025-01-10
        });

        it('should filter out non-md files', () => {
            mockExistsSync.mockReturnValue(true);
            mockReaddirSync.mockReturnValue([
                'learning1.md',
                'readme.txt',
                'data.json',
            ]);
            mockReadFileSync.mockReturnValue(mockLearningContent1);

            const result = getAllLearnings();

            expect(result).toHaveLength(1);
        });

        it('should handle parsing errors gracefully', () => {
            mockExistsSync.mockReturnValue(true);
            mockReaddirSync.mockReturnValue([
                'learning1.md',
                'broken.md',
            ]);
            mockReadFileSync
                .mockReturnValueOnce(mockLearningContent1)
                .mockImplementationOnce(() => {
                    throw new Error('Parse error');
                });

            const result = getAllLearnings();

            expect(result).toHaveLength(1);
            expect(result[0].topic).toBe('Docker Fundamentals');
        });
    });

    describe('getRecentLearnings', () => {
        it('should return limited number of learnings', () => {
            mockExistsSync.mockReturnValue(true);
            mockReaddirSync.mockReturnValue([
                'learning1.md',
                'learning2.md',
                'learning3.md',
            ]);
            mockReadFileSync
                .mockReturnValueOnce(mockLearningContent1)
                .mockReturnValueOnce(mockLearningContent2)
                .mockReturnValueOnce(mockLearningContent3);

            const result = getRecentLearnings(2);

            expect(result).toHaveLength(2);
            // Should be the most recent ones
            expect(result[0].topic).toBe('Docker Fundamentals');
            expect(result[1].topic).toBe('FastAPI Basics');
        });
    });

    describe('getLearningById', () => {
        it('should return null when directory does not exist', () => {
            mockExistsSync.mockReturnValue(false);

            const result = getLearningById('docker-fundamentals');

            expect(result).toBeNull();
        });

        it('should find learning by filename id', () => {
            mockExistsSync.mockReturnValue(true);
            mockReadFileSync.mockReturnValue(mockLearningContent1);

            const result = getLearningById('docker-fundamentals');

            expect(result).not.toBeNull();
            expect(result?.topic).toBe('Docker Fundamentals');
        });

        it('should search through all learnings when direct file not found', () => {
            // First call: check if directory exists (in getLearningById)
            // Second call: check if direct file exists (returns false)
            // Third call: check if directory exists (in getAllLearnings, called as fallback)
            // Fourth call: check if file exists in parseLearningFile (returns true)
            mockExistsSync
                .mockReturnValueOnce(true) // directory exists (getLearningById)
                .mockReturnValueOnce(false) // direct file does not exist
                .mockReturnValueOnce(true) // directory exists (getAllLearnings)
                .mockReturnValueOnce(true); // file exists in parseLearningFile
            mockReaddirSync.mockReturnValue(['learning1.md']);
            mockReadFileSync.mockReturnValue(mockLearningContent1);

            const result = getLearningById('learning1');

            expect(result).not.toBeNull();
        });
    });

    describe('getAllLearningCategories', () => {
        it('should return unique categories sorted', () => {
            mockExistsSync.mockReturnValue(true);
            mockReaddirSync.mockReturnValue([
                'learning1.md',
                'learning2.md',
                'learning3.md',
            ]);
            mockReadFileSync
                .mockReturnValueOnce(mockLearningContent1) // DevOps
                .mockReturnValueOnce(mockLearningContent2) // Frontend
                .mockReturnValueOnce(mockLearningContent3); // Backend

            const result = getAllLearningCategories();

            expect(result).toHaveLength(3);
            expect(result).toContain('DevOps');
            expect(result).toContain('Frontend');
            expect(result).toContain('Backend');
        });
    });

    describe('getLearningsByCategory', () => {
        it('should filter learnings by category', () => {
            mockExistsSync.mockReturnValue(true);
            mockReaddirSync.mockReturnValue([
                'learning1.md',
                'learning2.md',
                'learning3.md',
            ]);
            mockReadFileSync
                .mockReturnValueOnce(mockLearningContent1)
                .mockReturnValueOnce(mockLearningContent2)
                .mockReturnValueOnce(mockLearningContent3);

            const result = getLearningsByCategory('DevOps');

            expect(result).toHaveLength(1);
            expect(result[0].topic).toBe('Docker Fundamentals');
        });
    });

    describe('getAllLearningIds', () => {
        it('should return all learning ids', () => {
            mockExistsSync.mockReturnValue(true);
            mockReaddirSync.mockReturnValue([
                'learning1.md',
                'learning2.md',
            ]);
            mockReadFileSync
                .mockReturnValueOnce(mockLearningContent1)
                .mockReturnValueOnce(mockLearningContent2);

            const result = getAllLearningIds();

            expect(result).toHaveLength(2);
            expect(Array.isArray(result)).toBe(true);
        });
    });
});
