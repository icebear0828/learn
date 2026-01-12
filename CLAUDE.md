# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **personal learning knowledge repository** that also serves as the blueprint for a **portfolio showcase website**. The project has two main purposes:

1. **Content Repository**: Store learning notes and project documentation in Markdown/MDX format
2. **Portfolio Website Blueprint**: Technical specifications for building a Next.js portfolio site (implementation pending)

**Current State**: Specification and content collection phase. The website implementation has not started yet.

## Repository Structure

```
content/               # Core data layer - Content as Data pattern
├── projects/          # Project portfolio entries (MDX with frontmatter)
└── learnings/         # Learning notes (Markdown with frontmatter)

docs/specs/            # Technical specifications
├── project_showcase_website.md   # Full architecture & component design
└── development_roadmap.md        # 6-phase implementation plan (P0-P6)
```

## Architecture

**Core Pattern**: "Content as Data" - Non-technical users can add content without touching code.

**Data Models**:
- **Projects** (`content/projects/*.mdx`): Frontmatter with slug, title, date, category, techStack array, description, coverImage, githubUrl, demoUrl, featured flag
- **Learnings** (`content/learnings/*.md`): Frontmatter with id, topic, category, icon, summary, details array, link, date

**Planned Tech Stack** (per specs):
- Next.js with App Router, TypeScript, Tailwind CSS
- MDX for rich project content
- Static site deployment to Vercel

## Development Commands

Once implementation begins (following `docs/specs/development_roadmap.md`):

```bash
# P0 Setup
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir
npm install gray-matter next-mdx-remote react-icons

# Standard commands (after setup)
npm run dev      # Start dev server
npm run build    # Build static site
npm run lint     # Run ESLint
```

## Implementation Roadmap

Follow the phased approach in `docs/specs/development_roadmap.md`:
- **P0**: Project initialization
- **P1**: Data layer API (reading Markdown/MDX files)
- **P2**: Core components (FlipCard, ProjectCard, LearningCard)
- **P3**: Page integration (Home, Projects, Details)
- **P4**: Filtering & interaction
- **P5**: Responsive styling & animations
- **P6**: Deployment

All component architecture, TypeScript types, and pseudocode are pre-designed in `docs/specs/project_showcase_website.md`.

## Adding Content

**New Project**: Create `content/projects/{slug}.mdx` with required frontmatter fields
**New Learning**: Create `content/learnings/{topic}.md` with required frontmatter fields
**Featured Projects**: Set `featured: true` in frontmatter

## Commit Convention

Use conventional commits with Chinese descriptions:
- `feat:` for new features/content
- `docs:` for documentation changes
