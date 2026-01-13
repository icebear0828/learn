import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TechStackIcon, { getIconForTech, techIconMap } from '../TechStackIcon';

describe('TechStackIcon', () => {
    describe('Component Rendering', () => {
        it('should render with default props', () => {
            render(<TechStackIcon tech="React" />);

            const container = screen.getByTitle('React');
            expect(container).toBeInTheDocument();
        });

        it('should render with custom size', () => {
            render(<TechStackIcon tech="React" size={32} />);

            const container = screen.getByTitle('React');
            expect(container).toBeInTheDocument();
        });

        it('should show label when showLabel is true', () => {
            render(<TechStackIcon tech="React" showLabel />);

            expect(screen.getByText('React')).toBeInTheDocument();
        });

        it('should not show label when showLabel is false', () => {
            render(<TechStackIcon tech="React" showLabel={false} />);

            expect(screen.queryByText('React')).not.toBeInTheDocument();
        });

        it('should apply custom className', () => {
            render(<TechStackIcon tech="React" className="custom-class" />);

            const container = screen.getByTitle('React');
            expect(container).toHaveClass('custom-class');
        });

        it('should have inline-flex layout', () => {
            render(<TechStackIcon tech="React" />);

            const container = screen.getByTitle('React');
            expect(container).toHaveClass('inline-flex', 'items-center', 'gap-2');
        });
    });

    describe('Icon Mapping', () => {
        it('should render correct icon for React', () => {
            render(<TechStackIcon tech="React" />);
            expect(screen.getByTitle('React')).toBeInTheDocument();
        });

        it('should render correct icon for Python', () => {
            render(<TechStackIcon tech="Python" />);
            expect(screen.getByTitle('Python')).toBeInTheDocument();
        });

        it('should render correct icon for TypeScript', () => {
            render(<TechStackIcon tech="TypeScript" />);
            expect(screen.getByTitle('TypeScript')).toBeInTheDocument();
        });

        it('should be case-insensitive', () => {
            render(<TechStackIcon tech="REACT" />);
            expect(screen.getByTitle('REACT')).toBeInTheDocument();
        });

        it('should handle tech with spaces', () => {
            render(<TechStackIcon tech="Next.js" />);
            expect(screen.getByTitle('Next.js')).toBeInTheDocument();
        });

        it('should render fallback icon for unknown tech', () => {
            render(<TechStackIcon tech="UnknownTech123" />);
            expect(screen.getByTitle('UnknownTech123')).toBeInTheDocument();
        });
    });

    describe('getIconForTech function', () => {
        it('should return icon for known tech', () => {
            const icon = getIconForTech('react');
            expect(icon).toBeDefined();
            expect(icon).toBe(techIconMap['react']);
        });

        it('should be case-insensitive', () => {
            const icon1 = getIconForTech('React');
            const icon2 = getIconForTech('REACT');
            const icon3 = getIconForTech('react');

            expect(icon1).toBe(icon2);
            expect(icon2).toBe(icon3);
        });

        it('should trim whitespace', () => {
            const icon1 = getIconForTech('  react  ');
            const icon2 = getIconForTech('react');

            expect(icon1).toBe(icon2);
        });

        it('should return fallback for unknown tech', () => {
            const icon = getIconForTech('completely-unknown-tech');
            expect(icon).toBeDefined();
        });
    });

    describe('techIconMap', () => {
        it('should have frontend tech icons', () => {
            expect(techIconMap['react']).toBeDefined();
            expect(techIconMap['vue']).toBeDefined();
            expect(techIconMap['angular']).toBeDefined();
            expect(techIconMap['svelte']).toBeDefined();
        });

        it('should have backend tech icons', () => {
            expect(techIconMap['python']).toBeDefined();
            expect(techIconMap['nodejs']).toBeDefined();
            expect(techIconMap['rust']).toBeDefined();
            expect(techIconMap['go']).toBeDefined();
        });

        it('should have database tech icons', () => {
            expect(techIconMap['postgresql']).toBeDefined();
            expect(techIconMap['mongodb']).toBeDefined();
            expect(techIconMap['redis']).toBeDefined();
        });

        it('should have devops tech icons', () => {
            expect(techIconMap['docker']).toBeDefined();
            expect(techIconMap['kubernetes']).toBeDefined();
            expect(techIconMap['aws']).toBeDefined();
        });

        it('should have AI/ML tech icons', () => {
            expect(techIconMap['openai']).toBeDefined();
            expect(techIconMap['ai']).toBeDefined();
        });

        it('should support tech aliases', () => {
            // Test that aliases map to the same icon
            expect(techIconMap['react']).toBe(techIconMap['reactjs']);
            expect(techIconMap['next.js']).toBe(techIconMap['nextjs']);
            expect(techIconMap['typescript']).toBe(techIconMap['ts']);
            expect(techIconMap['javascript']).toBe(techIconMap['js']);
        });
    });
});
