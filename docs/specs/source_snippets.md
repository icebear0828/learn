# Portfolio 关键代码实现

> 自动生成于 2026-01-12 | 核心组件完整源码 (可直接复刻)

---

## 1. 核心组件

### 1.1 FlipCard.tsx (完整源码)

```tsx
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

  // Click outside to flip back to front
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isFlipped &&
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
  }, [isFlipped]);

  return (
    <div
      ref={cardRef}
      className={`relative cursor-pointer ${className}`}
      style={{ perspective: '1000px' }}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
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
```

---

### 1.2 TechStackIcon.tsx (关键映射部分)

```tsx
'use client';

import { IconType } from 'react-icons';
import {
  FaReact, FaPython, FaNodeJs, FaCode, FaDocker, FaGitAlt,
  FaHtml5, FaCss3Alt, FaDatabase, FaRobot, FaServer, FaCloud,
} from 'react-icons/fa';
import {
  SiTypescript, SiJavascript, SiNextdotjs, SiGodotengine,
  SiTailwindcss, SiOpenai, SiMongodb, SiPostgresql, SiRedis,
  SiGraphql, SiPrisma, SiVercel, SiVite, SiRust, SiGo, SiCplusplus,
  SiKotlin, SiSwift, SiFlutter, SiVuedotjs, SiSvelte, SiAngular,
  SiSupabase, SiFirebase, SiAmazonwebservices, SiKubernetes, SiElectron,
} from 'react-icons/si';

interface TechStackIconProps {
  tech: string;
  size?: number;
  showLabel?: boolean;
  className?: string;
}

const techIconMap: Record<string, IconType> = {
  // Frontend
  react: FaReact, 'react.js': FaReact, reactjs: FaReact,
  vue: SiVuedotjs, 'vue.js': SiVuedotjs, vuejs: SiVuedotjs,
  svelte: SiSvelte, angular: SiAngular,
  // JavaScript/TypeScript
  typescript: SiTypescript, ts: SiTypescript,
  javascript: SiJavascript, js: SiJavascript,
  // Meta-frameworks
  'next.js': SiNextdotjs, nextjs: SiNextdotjs, next: SiNextdotjs,
  vite: SiVite,
  // CSS
  tailwind: SiTailwindcss, tailwindcss: SiTailwindcss, 'tailwind css': SiTailwindcss,
  css: FaCss3Alt, css3: FaCss3Alt, html: FaHtml5, html5: FaHtml5,
  // Backend
  'node.js': FaNodeJs, nodejs: FaNodeJs, node: FaNodeJs,
  python: FaPython, rust: SiRust, go: SiGo, golang: SiGo,
  'c++': SiCplusplus, cpp: SiCplusplus, 'c#': FaCode, csharp: FaCode,
  kotlin: SiKotlin, swift: SiSwift,
  // Game Development
  godot: SiGodotengine, gdscript: SiGodotengine, 'godot engine': SiGodotengine,
  // Mobile
  flutter: SiFlutter, electron: SiElectron,
  // AI/ML
  openai: SiOpenai, 'openai api': SiOpenai, gpt: SiOpenai, 'gpt-4': SiOpenai,
  ai: FaRobot, 'ai/ml': FaRobot, llm: FaRobot,
  // Databases
  mongodb: SiMongodb, mongo: SiMongodb,
  postgresql: SiPostgresql, postgres: SiPostgresql,
  redis: SiRedis, database: FaDatabase, db: FaDatabase, sql: FaDatabase,
  prisma: SiPrisma, graphql: SiGraphql, supabase: SiSupabase, firebase: SiFirebase,
  // DevOps & Cloud
  docker: FaDocker, kubernetes: SiKubernetes, k8s: SiKubernetes,
  aws: SiAmazonwebservices, 'amazon web services': SiAmazonwebservices,
  vercel: SiVercel, cloud: FaCloud,
  // Tools
  git: FaGitAlt, github: FaGitAlt, server: FaServer,
};

function getIconForTech(tech: string): IconType {
  const normalizedTech = tech.toLowerCase().trim();
  return techIconMap[normalizedTech] || FaCode;
}

export default function TechStackIcon({
  tech, size = 24, showLabel = false, className = '',
}: TechStackIconProps) {
  const Icon = getIconForTech(tech);

  return (
    <div className={`inline-flex items-center gap-2 ${className}`} title={tech}>
      <Icon size={size} aria-hidden="true" />
      {showLabel && <span className="text-sm font-medium">{tech}</span>}
    </div>
  );
}

export { getIconForTech, techIconMap };
```

---

## 2. 数据访问层

### 2.1 lib/projects.ts (完整源码)

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Project } from '@/types';

const PROJECTS_DIRECTORY = path.join(process.cwd(), 'content', 'projects');

function parseProjectFile(fileName: string): Project {
  const filePath = path.join(PROJECTS_DIRECTORY, fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const slug = data.slug || fileName.replace(/\.mdx$/, '');

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    category: data.category || '',
    techStack: data.techStack || [],
    description: data.description || '',
    coverImage: data.coverImage || '',
    githubUrl: data.githubUrl,
    demoUrl: data.demoUrl,
    featured: data.featured || false,
    content,
  };
}

function sortProjectsByDate(projects: Project[]): Project[] {
  return projects.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIRECTORY)) {
    console.warn(`Projects directory not found: ${PROJECTS_DIRECTORY}`);
    return [];
  }

  const fileNames = fs.readdirSync(PROJECTS_DIRECTORY);
  const mdxFiles = fileNames.filter((fileName) => fileName.endsWith('.mdx'));

  const projects = mdxFiles.map((fileName) => {
    try {
      return parseProjectFile(fileName);
    } catch (error) {
      console.error(`Error parsing project file ${fileName}:`, error);
      return null;
    }
  });

  const validProjects = projects.filter((project): project is Project => project !== null);
  return sortProjectsByDate(validProjects);
}

export function getProjectBySlug(slug: string): Project | null {
  if (!fs.existsSync(PROJECTS_DIRECTORY)) {
    console.warn(`Projects directory not found: ${PROJECTS_DIRECTORY}`);
    return null;
  }

  const directFilePath = path.join(PROJECTS_DIRECTORY, `${slug}.mdx`);
  if (fs.existsSync(directFilePath)) {
    try {
      return parseProjectFile(`${slug}.mdx`);
    } catch (error) {
      console.error(`Error parsing project file ${slug}.mdx:`, error);
      return null;
    }
  }

  const allProjects = getAllProjects();
  return allProjects.find((project) => project.slug === slug) || null;
}

export function getFeaturedProjects(): Project[] {
  const allProjects = getAllProjects();
  const featuredProjects = allProjects.filter((project) => project.featured === true);
  return featuredProjects.slice(0, 6);
}

export function getAllProjectCategories(): string[] {
  const allProjects = getAllProjects();
  const categories = new Set(allProjects.map((project) => project.category));
  return Array.from(categories).sort();
}

export function getProjectsByCategory(category: string): Project[] {
  const allProjects = getAllProjects();
  return allProjects.filter((project) => project.category === category);
}

export function getAllProjectSlugs(): string[] {
  const allProjects = getAllProjects();
  return allProjects.map((project) => project.slug);
}
```

---

### 2.2 lib/learnings.ts (关键部分)

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { LearningCard } from '@/types';

const LEARNINGS_DIRECTORY = path.join(process.cwd(), 'content', 'learnings');

function parseLearningFile(fileName: string): LearningCard {
  const filePath = path.join(LEARNINGS_DIRECTORY, fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const id = data.id || fileName.replace(/\.md$/, '');

  return {
    id,
    topic: data.topic || '',
    category: data.category || '',
    icon: data.icon || '',
    summary: data.summary || '',
    details: data.details || [],
    link: data.link,
    date: data.date || '',
    content,
  };
}

export function getAllLearnings(): LearningCard[] {
  if (!fs.existsSync(LEARNINGS_DIRECTORY)) return [];
  
  const fileNames = fs.readdirSync(LEARNINGS_DIRECTORY);
  const mdFiles = fileNames.filter((fileName) => fileName.endsWith('.md'));

  const learnings = mdFiles.map((fileName) => {
    try { return parseLearningFile(fileName); }
    catch (error) { console.error(`Error parsing ${fileName}:`, error); return null; }
  });

  return learnings
    .filter((l): l is LearningCard => l !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getRecentLearnings(limit: number): LearningCard[] {
  return getAllLearnings().slice(0, limit);
}

export function getAllLearningCategories(): string[] {
  const categories = new Set(getAllLearnings().map((l) => l.category));
  return Array.from(categories).sort();
}
```

---

## 3. 布局和页面

### 3.1 app/layout.tsx

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio | Developer Showcase",
  description: "A portfolio showcasing projects and learning journey",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100 min-h-screen`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

---

### 3.2 app/globals.css

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}

@layer utilities {
  .perspective-1000 { perspective: 1000px; }
  .transform-style-3d { transform-style: preserve-3d; }
  .backface-hidden { backface-visibility: hidden; }
  .rotate-y-180 { transform: rotateY(180deg); }
  .rotate-y-0 { transform: rotateY(0deg); }
}
```

---

## 4. Navbar 组件

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-white hover:text-indigo-400">
            <span className="text-indigo-500">Portfolio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActiveLink(link.href) ? 'text-indigo-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-slate-400 hover:text-white"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger/Close icon SVG */}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-md ${
                isActiveLink(link.href) ? 'text-indigo-400 bg-slate-800' : 'text-slate-300'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

---

## 5. 项目详情页 (关键部分)

```tsx
// app/projects/[slug]/page.tsx
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/projects';
import TechStackIcon from '@/components/TechStackIcon';

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-3 mb-6">
          {project.techStack.map((tech) => (
            <div key={tech} className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg">
              <TechStackIcon tech={tech} size={18} />
              <span className="text-sm text-gray-300">{tech}</span>
            </div>
          ))}
        </div>

        {/* MDX Content */}
        <main className="prose prose-invert prose-lg max-w-none">
          <MDXRemote source={project.content} />
        </main>
      </div>
    </article>
  );
}
```
