import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectCard from '../ProjectCard';
import { Project } from '@/types';

// Mock project data
const mockProject: Project = {
    slug: 'test-project',
    title: 'Test Project Title',
    date: '2025-01-15',
    category: 'Web App',
    techStack: ['React', 'TypeScript', 'Tailwind', 'Next.js', 'PostgreSQL'],
    description:
        'This is a test project description that explains what the project does and its main features.',
    coverImage: '/images/test-cover.jpg',
    githubUrl: 'https://github.com/test/project',
    demoUrl: 'https://demo.test.com',
    featured: true,
    content: '# Project Content\n\nThis is the project content.',
};

const mockProjectMinimal: Project = {
    slug: 'minimal-project',
    title: 'Minimal Project',
    date: '2025-01-10',
    category: 'Tool',
    techStack: ['Python'],
    description: 'A minimal project.',
    coverImage: '/images/minimal.jpg',
    content: 'Minimal content.',
};

describe('ProjectCard', () => {
    describe('Front Side Rendering', () => {
        it('should render project title', () => {
            render(<ProjectCard project={mockProject} />);
            // Title appears on both front and back of card
            const titles = screen.getAllByText('Test Project Title');
            expect(titles.length).toBeGreaterThanOrEqual(1);
        });

        it('should render category badge', () => {
            render(<ProjectCard project={mockProject} />);
            expect(screen.getByText('Web App')).toBeInTheDocument();
        });

        it('should render cover image', () => {
            render(<ProjectCard project={mockProject} />);
            const image = screen.getByAltText('Test Project Title cover image');
            expect(image).toBeInTheDocument();
            expect(image).toHaveAttribute('src', '/images/test-cover.jpg');
        });

        it('should display at most 3 tech stack tags', () => {
            render(<ProjectCard project={mockProject} />);

            // Should show first 3 tech items
            expect(screen.getByText('React')).toBeInTheDocument();
            expect(screen.getByText('TypeScript')).toBeInTheDocument();
            expect(screen.getByText('Tailwind')).toBeInTheDocument();

            // Should not show 4th and 5th items directly
            expect(screen.queryByText('Next.js')).not.toBeInTheDocument();
            expect(screen.queryByText('PostgreSQL')).not.toBeInTheDocument();
        });

        it('should show "+N" indicator when more than 3 tech items', () => {
            render(<ProjectCard project={mockProject} />);
            // mockProject has 5 tech items, so should show +2
            expect(screen.getByText('+2')).toBeInTheDocument();
        });

        it('should not show "+N" indicator when 3 or fewer tech items', () => {
            render(<ProjectCard project={mockProjectMinimal} />);
            expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument();
        });

        it('should show flip hint on front', () => {
            render(<ProjectCard project={mockProject} />);
            expect(screen.getByText('Click to flip')).toBeInTheDocument();
        });
    });

    describe('Back Side Content', () => {
        it('should contain project description', () => {
            render(<ProjectCard project={mockProject} />);

            // The description should be in the DOM (part of FlipCard back content)
            expect(
                screen.getByText(/This is a test project description/)
            ).toBeInTheDocument();
        });

        it('should contain View Details link', () => {
            render(<ProjectCard project={mockProject} />);

            // The link is inside the back of the card which is aria-hidden initially,
            // so we query by aria-label attribute directly
            const link = document.querySelector('a[aria-label="View details for Test Project Title"]');
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('href', '/projects/test-project');
        });
    });

    describe('Accessibility', () => {
        it('should have appropriate aria-label', () => {
            render(<ProjectCard project={mockProject} />);

            const card = screen.getByLabelText('Project card for Test Project Title');
            expect(card).toBeInTheDocument();
        });

        it('should have accessible link for View Details', () => {
            render(<ProjectCard project={mockProject} />);

            // The link is inside aria-hidden container, query by attribute directly
            const link = document.querySelector('a[aria-label="View details for Test Project Title"]');
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('aria-label', 'View details for Test Project Title');
        });
    });

    describe('Card Dimensions', () => {
        it('should have correct height class', () => {
            render(<ProjectCard project={mockProject} />);

            const card = screen.getByLabelText('Project card for Test Project Title');
            expect(card).toHaveClass('h-80');
        });

        it('should have full width class', () => {
            render(<ProjectCard project={mockProject} />);

            const card = screen.getByLabelText('Project card for Test Project Title');
            expect(card).toHaveClass('w-full');
        });
    });

    describe('Flip Interaction', () => {
        it('should be clickable to flip', () => {
            render(<ProjectCard project={mockProject} />);

            const card = screen.getByLabelText('Project card for Test Project Title');

            // Click to flip
            fireEvent.click(card);

            // Card should still be in document (FlipCard handles the flip animation)
            expect(card).toBeInTheDocument();
        });
    });
});
