# Portfolio 依赖配置

> 自动生成于 2026-01-12 | 完整配置文件内容 (可直接复刻)

---

## 1. package.json

```json
{
  "name": "portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  },
  "dependencies": {
    "gray-matter": "^4.0.3",
    "next": "16.1.1",
    "next-intl": "^4.7.0",
    "next-mdx-remote": "^5.0.0",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-icons": "^5.5.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.1",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^5.1.2",
    "@vitest/coverage-v8": "^4.0.17",
    "eslint": "^9",
    "eslint-config-next": "16.1.1",
    "jsdom": "^27.4.0",
    "tailwindcss": "^4",
    "typescript": "^5",
    "vitest": "^4.0.17"
  }
}
```

---

## 2. tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

---

## 3. vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
        include: ['src/**/*.{test,spec}.{ts,tsx}'],
        exclude: ['node_modules', '.next'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.{ts,tsx}'],
            exclude: [
                'src/**/*.test.{ts,tsx}',
                'src/**/*.spec.{ts,tsx}',
                'src/test/**',
                'src/types/**',
            ],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
```

---

## 4. postcss.config.mjs

```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

---

## 5. eslint.config.mjs

```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

---

## 6. next-env.d.ts

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.
```

---

## 7. 测试设置 src/test/setup.ts

```typescript
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
```

---

## 8. 目录结构初始化命令

```bash
# 创建项目
npx create-next-app@16.1.1 portfolio --typescript --tailwind --app --src-dir

# 添加依赖
pnpm add gray-matter next-mdx-remote react-icons next-intl

# 添加开发依赖
pnpm add -D vitest @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react

# 创建目录结构
mkdir -p content/projects content/learnings public/images/projects src/components/__tests__ src/lib/__tests__ src/types src/test
```
