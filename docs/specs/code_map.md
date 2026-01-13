# Portfolio 代码地图

> 自动生成于 2026-01-12 | 文件索引和职责说明

---

## 📁 src/app (页面路由)

| 文件 | 类型 | 职责 |
|------|------|------|
| `layout.tsx` | Root Layout | 全局 HTML 结构、字体配置 (Geist)、SEO 元数据、Navbar 集成 |
| `page.tsx` | Home Page | Hero 区域、Featured Projects 网格、Recent Learnings 展示 |
| `globals.css` | Global Styles | Tailwind 导入、CSS 变量 (明/暗模式)、3D FlipCard 工具类 |
| `about/page.tsx` | About Page | 个人简介页面 |
| `learnings/page.tsx` | Learnings List | 学习笔记列表页，调用 `LearningsPageClient` |
| `projects/page.tsx` | Projects List | 项目列表页，调用 `ProjectsPageClient` |
| `projects/[slug]/page.tsx` | Project Detail | 项目详情页，MDX 渲染，SSG 静态生成 |

---

## 📁 src/components (UI 组件)

### 核心组件

| 文件 | 导出 | 类型 | 职责 |
|------|------|------|------|
| `FlipCard.tsx` | `FlipCard` | Client | 3D 翻转卡片基础组件，ARIA 可访问，键盘支持 |
| `ProjectCard.tsx` | `ProjectCard` | Client | 项目卡片 (基于 FlipCard)，封面图 + 标题 + 技术栈 |
| `LearningCard.tsx` | `LearningCard`, `iconMap`, `getIconComponent`, `getCategoryColor` | Client | 学习卡片 (基于 FlipCard)，图标映射 (Fa/Si) |
| `TechStackIcon.tsx` | `TechStackIcon`, `getIconForTech`, `techIconMap` | Client | 技术栈图标服务，50+ 技术映射 |

### 页面组件

| 文件 | 导出 | 类型 | 职责 |
|------|------|------|------|
| `Navbar.tsx` | `Navbar` | Client | 响应式导航栏，移动端汉堡菜单，路由高亮 |
| `ProjectsPageClient.tsx` | `ProjectsPageClient` | Client | 项目列表容器，筛选逻辑 (分类 + 技术栈) |
| `LearningsPageClient.tsx` | `LearningsPageClient` | Client | 学习列表容器，分类过滤 |
| `ProjectFilter.tsx` | `ProjectFilter` | Client | 项目筛选 UI (下拉选择 + 清除按钮) |

---

## 📁 src/lib (数据访问层)

| 文件 | 导出函数 | 数据源 | 职责 |
|------|----------|--------|------|
| `projects.ts` | `getAllProjects`, `getProjectBySlug`, `getFeaturedProjects`, `getAllProjectCategories`, `getProjectsByCategory`, `getAllProjectSlugs` | `content/projects/*.mdx` | 项目数据 CRUD |
| `learnings.ts` | `getAllLearnings`, `getRecentLearnings`, `getLearningById`, `getAllLearningCategories`, `getLearningsByCategory`, `getAllLearningIds` | `content/learnings/*.md` | 学习数据 CRUD |

---

## 📁 src/types (类型定义)

| 文件 | 导出 | 描述 |
|------|------|------|
| `index.ts` | `Project`, `LearningCard`, `ProjectCategory`, `LearningCategory` | 核心数据类型 |

### Project 接口

```typescript
interface Project {
  slug: string;
  title: string;
  date: string;
  category: string;
  techStack: string[];
  description: string;
  coverImage: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  content: string;
}
```

### LearningCard 接口

```typescript
interface LearningCard {
  id: string;
  topic: string;
  category: string;
  icon: string;
  summary: string;
  details: string[];
  link?: string;
  date: string;
  content?: string;
}
```

---

## 📁 src/components/__tests__ (组件测试)

| 文件 | 测试数量 | 覆盖范围 |
|------|----------|----------|
| `FlipCard.test.tsx` | 19 | 渲染、翻转交互、键盘访问、ARIA 属性、点击外部 |
| `Navbar.test.tsx` | 19 | 渲染、桌面导航、移动菜单、路由高亮、样式 |
| `ProjectCard.test.tsx` | 13 | 正反面渲染、技术栈截断、可访问性 |
| `TechStackIcon.test.tsx` | 17 | 图标映射、大小写、别名、Fallback |

---

## 📁 src/lib/__tests__ (单元测试)

| 文件 | 测试数量 | 覆盖范围 |
|------|----------|----------|
| `projects.test.ts` | 10 | getAllProjects, getProjectBySlug, getFeaturedProjects, 分类/筛选 |
| `learnings.test.ts` | 10 | getAllLearnings, getLearningById, getRecentLearnings, 分类/筛选 |

---

## 📁 配置文件

| 文件 | 用途 |
|------|------|
| `package.json` | 依赖管理、脚本 (dev/build/test/lint) |
| `tsconfig.json` | TypeScript 配置，路径别名 `@/*` |
| `vitest.config.ts` | Vitest 配置，jsdom 环境，覆盖率报告 |
| `eslint.config.mjs` | ESLint 配置 |
| `postcss.config.mjs` | PostCSS + Tailwind |

---

## 📁 content (内容数据)

### projects/

| 文件 | 项目名 |
|------|--------|
| `genui.mdx` | GenUI |
| `godot-2d-platformer.mdx` | Godot 2D Platformer |
| `guess-song.mdx` | Guess Song |
| `notebooklm-automation.mdx` | NotebookLM Automation |
| `rss.mdx` | RSS |
| `self-evolving-agent.mdx` | Self-Evolving Agent |
| `sparkle-survivors.mdx` | Sparkle Survivors |
| `twitter-like-catcher.mdx` | Twitter Like Catcher |

### learnings/

| 文件 | 主题 |
|------|------|
| `cicd-pipelines.md` | CI/CD Pipelines |
| `google-agent-day1-intro.md` | Google Agent Day 1: Intro |
| `google-agent-day2-mcp.md` | Google Agent Day 2: MCP |
| `google-agent-day3-memory.md` | Google Agent Day 3: Memory |
| `google-agent-day4-eval.md` | Google Agent Day 4: Eval |
| `google-agent-day5-prod.md` | Google Agent Day 5: Prod |
| `message-queues.md` | Message Queues |
