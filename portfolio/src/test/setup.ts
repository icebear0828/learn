import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import React from 'react';

// Mock next/image
vi.mock('next/image', () => ({
    default: ({
        src,
        alt,
        width,
        height,
        fill,
        ...props
    }: {
        src: string;
        alt: string;
        width?: number;
        height?: number;
        fill?: boolean;
        [key: string]: unknown;
    }) => {
        // eslint-disable-next-line @next/next/no-img-element
        return React.createElement('img', {
            src,
            alt,
            width: fill ? undefined : width,
            height: fill ? undefined : height,
            'data-fill': fill ? 'true' : undefined,
            ...props,
        });
    },
}));

// Mock next/link
vi.mock('next/link', () => ({
    default: ({
        children,
        href,
        ...props
    }: {
        children: React.ReactNode;
        href: string;
        [key: string]: unknown;
    }) => {
        return React.createElement('a', { href, ...props }, children);
    },
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
}));
