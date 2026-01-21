'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

/**
 * FlipCard - A reusable 3D flip card component
 *
 * Features:
 * - Click to flip interaction
 * - Click outside to flip back
 * - Keyboard accessible (Enter/Space to toggle)
 * - 500ms CSS 3D animation
 * - Full accessibility support
 */
export default function FlipCard({
  front,
  back,
  className = '',
  'aria-label': ariaLabelProp,
  ...restProps
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Use custom aria-label if provided, otherwise use default
  const ariaLabel =
    ariaLabelProp ||
    (isFlipped ? 'Card is flipped. Press to flip back.' : 'Press to flip card.');

  // Toggle flip state
  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  // Handle keyboard interactions
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleFlip();
      }
    },
    [handleFlip]
  );

  // Use ref to store latest isFlipped state for event handler
  const isFlippedRef = useRef(isFlipped);

  // Sync ref with state
  useEffect(() => {
    isFlippedRef.current = isFlipped;
  }, [isFlipped]);

  // Click outside to flip back to front - bind only once
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isFlippedRef.current &&
        cardRef.current &&
        !cardRef.current.contains(event.target as Node)
      ) {
        setIsFlipped(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []); // Empty dependency array - bind only once

  return (
    <div
      ref={cardRef}
      className={`relative cursor-pointer card-premium card-shimmer card-glow ${className}`}
      style={{ perspective: '1000px' }}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      aria-pressed={isFlipped}
      aria-label={ariaLabel}
      {...restProps}
    >
      {/* Inner container that rotates */}
      <div
        className="relative w-full h-full transition-transform duration-500 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden' }}
          aria-hidden={isFlipped}
        >
          {front}
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          aria-hidden={!isFlipped}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
