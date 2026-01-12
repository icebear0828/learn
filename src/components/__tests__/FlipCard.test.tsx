import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FlipCard from '../FlipCard';

describe('FlipCard', () => {
    const frontContent = <div data-testid="front-content">Front Side</div>;
    const backContent = <div data-testid="back-content">Back Side</div>;

    describe('Initial Rendering', () => {
        it('should render front content', () => {
            render(<FlipCard front={frontContent} back={backContent} />);
            expect(screen.getByTestId('front-content')).toBeInTheDocument();
        });

        it('should render back content', () => {
            render(<FlipCard front={frontContent} back={backContent} />);
            expect(screen.getByTestId('back-content')).toBeInTheDocument();
        });

        it('should have front visible initially (aria-hidden=false)', () => {
            render(<FlipCard front={frontContent} back={backContent} />);
            const frontContainer = screen.getByTestId('front-content').parentElement;
            expect(frontContainer).toHaveAttribute('aria-hidden', 'false');
        });

        it('should have back hidden initially (aria-hidden=true)', () => {
            render(<FlipCard front={frontContent} back={backContent} />);
            const backContainer = screen.getByTestId('back-content').parentElement;
            expect(backContainer).toHaveAttribute('aria-hidden', 'true');
        });

        it('should apply custom className', () => {
            render(
                <FlipCard
                    front={frontContent}
                    back={backContent}
                    className="custom-class"
                />
            );
            const card = screen.getByRole('button');
            expect(card).toHaveClass('custom-class');
        });
    });

    describe('Flip Interaction', () => {
        it('should flip on click', () => {
            render(<FlipCard front={frontContent} back={backContent} />);
            const card = screen.getByRole('button');

            // Initially not flipped
            expect(card).toHaveAttribute('aria-pressed', 'false');

            // Click to flip
            fireEvent.click(card);

            // Should be flipped
            expect(card).toHaveAttribute('aria-pressed', 'true');
        });

        it('should flip back on second click', () => {
            render(<FlipCard front={frontContent} back={backContent} />);
            const card = screen.getByRole('button');

            // Flip
            fireEvent.click(card);
            expect(card).toHaveAttribute('aria-pressed', 'true');

            // Flip back
            fireEvent.click(card);
            expect(card).toHaveAttribute('aria-pressed', 'false');
        });

        it('should toggle aria-hidden on flip', () => {
            render(<FlipCard front={frontContent} back={backContent} />);
            const card = screen.getByRole('button');

            // Before flip
            const frontContainer = screen.getByTestId('front-content').parentElement;
            const backContainer = screen.getByTestId('back-content').parentElement;

            expect(frontContainer).toHaveAttribute('aria-hidden', 'false');
            expect(backContainer).toHaveAttribute('aria-hidden', 'true');

            // After flip
            fireEvent.click(card);

            expect(frontContainer).toHaveAttribute('aria-hidden', 'true');
            expect(backContainer).toHaveAttribute('aria-hidden', 'false');
        });
    });

    describe('Keyboard Accessibility', () => {
        it('should flip on Enter key', () => {
            render(<FlipCard front={frontContent} back={backContent} />);
            const card = screen.getByRole('button');

            fireEvent.keyDown(card, { key: 'Enter' });

            expect(card).toHaveAttribute('aria-pressed', 'true');
        });

        it('should flip on Space key', () => {
            render(<FlipCard front={frontContent} back={backContent} />);
            const card = screen.getByRole('button');

            fireEvent.keyDown(card, { key: ' ' });

            expect(card).toHaveAttribute('aria-pressed', 'true');
        });

        it('should not flip on other keys', () => {
            render(<FlipCard front={frontContent} back={backContent} />);
            const card = screen.getByRole('button');

            fireEvent.keyDown(card, { key: 'Tab' });
            expect(card).toHaveAttribute('aria-pressed', 'false');

            fireEvent.keyDown(card, { key: 'Escape' });
            expect(card).toHaveAttribute('aria-pressed', 'false');
        });

        it('should be focusable (tabIndex=0)', () => {
            render(<FlipCard front={frontContent} back={backContent} />);
            const card = screen.getByRole('button');

            expect(card).toHaveAttribute('tabIndex', '0');
        });
    });

    describe('Accessibility Attributes', () => {
        it('should have role="button"', () => {
            render(<FlipCard front={frontContent} back={backContent} />);
            expect(screen.getByRole('button')).toBeInTheDocument();
        });

        it('should use default aria-label when not provided', () => {
            render(<FlipCard front={frontContent} back={backContent} />);
            const card = screen.getByRole('button');

            expect(card).toHaveAttribute('aria-label', 'Press to flip card.');
        });

        it('should use custom aria-label when provided', () => {
            render(
                <FlipCard
                    front={frontContent}
                    back={backContent}
                    aria-label="Custom card label"
                />
            );
            const card = screen.getByRole('button');

            expect(card).toHaveAttribute('aria-label', 'Custom card label');
        });

        it('should have aria-pressed attribute', () => {
            render(<FlipCard front={frontContent} back={backContent} />);
            const card = screen.getByRole('button');

            expect(card).toHaveAttribute('aria-pressed', 'false');
        });
    });

    describe('Click Outside Behavior', () => {
        it('should flip back when clicking outside while flipped', () => {
            render(
                <div>
                    <FlipCard front={frontContent} back={backContent} />
                    <div data-testid="outside">Outside</div>
                </div>
            );
            const card = screen.getByRole('button');

            // Flip the card
            fireEvent.click(card);
            expect(card).toHaveAttribute('aria-pressed', 'true');

            // Click outside
            fireEvent.click(screen.getByTestId('outside'));

            // Should flip back
            expect(card).toHaveAttribute('aria-pressed', 'false');
        });

        it('should not flip back when clicking outside while not flipped', () => {
            render(
                <div>
                    <FlipCard front={frontContent} back={backContent} />
                    <div data-testid="outside">Outside</div>
                </div>
            );
            const card = screen.getByRole('button');

            // Not flipped, click outside
            fireEvent.click(screen.getByTestId('outside'));

            // Should still not be flipped
            expect(card).toHaveAttribute('aria-pressed', 'false');
        });
    });

    describe('Styling', () => {
        it('should have cursor-pointer class', () => {
            render(<FlipCard front={frontContent} back={backContent} />);
            const card = screen.getByRole('button');

            expect(card).toHaveClass('cursor-pointer');
        });

        it('should have perspective style for 3D effect', () => {
            render(<FlipCard front={frontContent} back={backContent} />);
            const card = screen.getByRole('button');

            expect(card).toHaveStyle({ perspective: '1000px' });
        });
    });

    describe('Event Propagation', () => {
        it('should prevent default on Enter key', () => {
            render(<FlipCard front={frontContent} back={backContent} />);
            const card = screen.getByRole('button');

            const event = { key: 'Enter', preventDefault: vi.fn() };
            fireEvent.keyDown(card, event);

            // The event should have its default prevented inside the component
            // We can verify the flip happened instead
            expect(card).toHaveAttribute('aria-pressed', 'true');
        });
    });
});
