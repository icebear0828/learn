import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { LanguageProvider } from '@/i18n/LanguageContext';

/**
 * Custom render function that wraps components with required providers
 * Use this instead of render() when testing components that use i18n hooks
 */
function renderWithProviders(
    ui: React.ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <LanguageProvider>{children}</LanguageProvider>
    );

    return render(ui, { wrapper: Wrapper, ...options });
}

// Re-export everything
export * from '@testing-library/react';

// Override render with our wrapped version
export { renderWithProviders as render };
