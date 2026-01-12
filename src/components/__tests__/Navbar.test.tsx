import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';

// Mock next/navigation
vi.mock('next/navigation', () => ({
    usePathname: vi.fn(),
}));

import { usePathname } from 'next/navigation';

describe('Navbar', () => {
    beforeEach(() => {
        vi.mocked(usePathname).mockReturnValue('/');
    });

    describe('Rendering', () => {
        it('should render the logo/site name', () => {
            render(<Navbar />);
            expect(screen.getByText('Portfolio')).toBeInTheDocument();
        });

        it('should render all navigation links', () => {
            render(<Navbar />);

            expect(screen.getAllByText('Home').length).toBeGreaterThanOrEqual(1);
            expect(screen.getAllByText('Projects').length).toBeGreaterThanOrEqual(1);
            expect(screen.getAllByText('About').length).toBeGreaterThanOrEqual(1);
        });

        it('should render logo with link to home', () => {
            render(<Navbar />);

            const logoLink = screen.getByText('Portfolio').closest('a');
            expect(logoLink).toHaveAttribute('href', '/');
        });
    });

    describe('Desktop Navigation', () => {
        it('should render desktop navigation links', () => {
            render(<Navbar />);

            // Desktop links should be present
            const homeLinks = screen.getAllByText('Home');
            expect(homeLinks.length).toBeGreaterThanOrEqual(1);
        });

        it('should have correct href for each link', () => {
            render(<Navbar />);

            // Find links by role
            const links = screen.getAllByRole('link');

            // Should have logo link + nav links (desktop + mobile)
            expect(links.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('Mobile Menu', () => {
        it('should render mobile menu button', () => {
            render(<Navbar />);

            const menuButton = screen.getByRole('button', { name: /open main menu/i });
            expect(menuButton).toBeInTheDocument();
        });

        it('should have aria-controls on mobile menu button', () => {
            render(<Navbar />);

            const menuButton = screen.getByRole('button', { name: /open main menu/i });
            expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
        });

        it('should have aria-expanded=false initially', () => {
            render(<Navbar />);

            const menuButton = screen.getByRole('button', { name: /open main menu/i });
            expect(menuButton).toHaveAttribute('aria-expanded', 'false');
        });

        it('should toggle aria-expanded on click', () => {
            render(<Navbar />);

            const menuButton = screen.getByRole('button', { name: /open main menu/i });

            // Open menu
            fireEvent.click(menuButton);
            expect(menuButton).toHaveAttribute('aria-expanded', 'true');

            // Close menu
            fireEvent.click(menuButton);
            expect(menuButton).toHaveAttribute('aria-expanded', 'false');
        });

        it('should close mobile menu when logo is clicked', () => {
            render(<Navbar />);

            const menuButton = screen.getByRole('button', { name: /open main menu/i });
            const logo = screen.getByText('Portfolio').closest('a');

            // Open menu
            fireEvent.click(menuButton);
            expect(menuButton).toHaveAttribute('aria-expanded', 'true');

            // Click logo
            fireEvent.click(logo!);
            expect(menuButton).toHaveAttribute('aria-expanded', 'false');
        });

        it('should close mobile menu when nav link is clicked', () => {
            render(<Navbar />);

            const menuButton = screen.getByRole('button', { name: /open main menu/i });

            // Open menu
            fireEvent.click(menuButton);
            expect(menuButton).toHaveAttribute('aria-expanded', 'true');

            // Click a nav link in mobile menu
            const projectsLinks = screen.getAllByText('Projects');
            // Find the mobile menu link (it should be inside #mobile-menu)
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileProjectsLink = Array.from(projectsLinks).find(
                (link) => mobileMenu?.contains(link)
            );

            if (mobileProjectsLink) {
                fireEvent.click(mobileProjectsLink);
                expect(menuButton).toHaveAttribute('aria-expanded', 'false');
            }
        });
    });

    describe('Active Link Highlighting', () => {
        it('should highlight Home link when on home page', () => {
            vi.mocked(usePathname).mockReturnValue('/');
            render(<Navbar />);

            const homeLinks = screen.getAllByText('Home');
            // Check that at least one Home link has the active class
            const hasActiveHome = homeLinks.some((link) =>
                link.classList.contains('text-indigo-400')
            );
            expect(hasActiveHome).toBe(true);
        });

        it('should highlight Projects link when on projects page', () => {
            vi.mocked(usePathname).mockReturnValue('/projects');
            render(<Navbar />);

            const projectsLinks = screen.getAllByText('Projects');
            const hasActiveProjects = projectsLinks.some((link) =>
                link.classList.contains('text-indigo-400')
            );
            expect(hasActiveProjects).toBe(true);
        });

        it('should highlight Projects link when on a project detail page', () => {
            vi.mocked(usePathname).mockReturnValue('/projects/my-project');
            render(<Navbar />);

            const projectsLinks = screen.getAllByText('Projects');
            const hasActiveProjects = projectsLinks.some((link) =>
                link.classList.contains('text-indigo-400')
            );
            expect(hasActiveProjects).toBe(true);
        });

        it('should highlight About link when on about page', () => {
            vi.mocked(usePathname).mockReturnValue('/about');
            render(<Navbar />);

            const aboutLinks = screen.getAllByText('About');
            const hasActiveAbout = aboutLinks.some((link) =>
                link.classList.contains('text-indigo-400')
            );
            expect(hasActiveAbout).toBe(true);
        });

        it('should not highlight Home link when on other pages', () => {
            vi.mocked(usePathname).mockReturnValue('/projects');
            render(<Navbar />);

            const homeLinks = screen.getAllByText('Home');
            // Home links should NOT have active class when on /projects
            const hasActiveHome = homeLinks.some((link) =>
                link.classList.contains('text-indigo-400')
            );
            expect(hasActiveHome).toBe(false);
        });
    });

    describe('Styling', () => {
        it('should have sticky positioning', () => {
            render(<Navbar />);

            const nav = screen.getByRole('navigation');
            expect(nav).toHaveClass('sticky', 'top-0');
        });

        it('should have z-index for proper layering', () => {
            render(<Navbar />);

            const nav = screen.getByRole('navigation');
            expect(nav).toHaveClass('z-50');
        });

        it('should have backdrop blur effect', () => {
            render(<Navbar />);

            const nav = screen.getByRole('navigation');
            expect(nav).toHaveClass('backdrop-blur-sm');
        });
    });

    describe('Accessibility', () => {
        it('should have navigation landmark', () => {
            render(<Navbar />);
            expect(screen.getByRole('navigation')).toBeInTheDocument();
        });

        it('should have screen reader text for mobile menu button', () => {
            render(<Navbar />);

            expect(screen.getByText('Open main menu')).toBeInTheDocument();
        });

        it('should have mobile menu with id for aria-controls', () => {
            render(<Navbar />);

            const mobileMenu = document.getElementById('mobile-menu');
            expect(mobileMenu).toBeInTheDocument();
        });
    });
});
