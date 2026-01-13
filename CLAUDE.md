# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **personal portfolio website** built with Next.js 16, featuring:
- 🌐 **Bilingual Support** (Chinese/English) with real-time switching
- 📝 **MDX Content** for projects and learning notes
- 🎴 **Interactive FlipCard** components
- 🎨 **Dark Theme** with Tailwind CSS

## Repository Structure

```
portfolio/                # Next.js portfolio website
├── content/              # Content as Data
│   ├── projects/         # Project entries (MDX)
│   └── learnings/        # Learning notes (MD)
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/              # Data utilities
│   ├── i18n/             # Internationalization
│   │   ├── messages/     # zh.json, en.json
│   │   └── LanguageContext.tsx
│   └── types/            # TypeScript types
└── public/               # Static assets
```

## Tech Stack

| Tech | Version |
|------|---------|
| Next.js | 16.1.1 |
| React | 19.x |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| Vitest | 4.x |

## Development Commands

```bash
pnpm install     # Install dependencies
pnpm dev         # Start dev server (http://localhost:3000)
pnpm build       # Production build
pnpm test        # Run tests
pnpm lint        # ESLint
pnpm tsc --noEmit # Type check
```

## Architecture

**Core Pattern**: "Content as Data" - Add content via MDX without code changes.

**Data Models**:
- **Projects** (`content/projects/*.mdx`): Bilingual title/description, techStack array, coverImage
- **Learnings** (`content/learnings/*.md`): Bilingual topic/summary, icon, details array

**i18n Pattern**: React Context with localStorage persistence, real-time switching without page reload.

## Adding Content

### New Project
Create `content/projects/{slug}.mdx`:
```yaml
---
title:
  zh: "中文标题"
  en: "English Title"
description:
  zh: "中文描述"
  en: "English description"
date: "2026-01-12"
category: "Web App"
techStack: ["React", "TypeScript"]
coverImage: "/images/projects/cover.png"
featured: true
---
```

### New Learning
Create `content/learnings/{id}.md`:
```yaml
---
topic:
  zh: "主题"
  en: "Topic"
category: "Backend"
icon: "FaServer"
summary:
  zh: "摘要"
  en: "Summary"
---
```

## i18n Development

```tsx
// Using translations
import { useLanguage } from '@/i18n/LanguageContext';
const { t, locale, setLocale } = useLanguage();
<h1>{t('home.title')}</h1>

// Localized content
import { useLocalizedContent } from '@/i18n/useLocalizedContent';
const { localize } = useLocalizedContent();
<h1>{localize(project.title)}</h1>
```

## Commit Convention

Use conventional commits with Chinese descriptions:
- `feat:` New features/content
- `fix:` Bug fixes
- `docs:` Documentation
- `refactor:` Code refactoring
