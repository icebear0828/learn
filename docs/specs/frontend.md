# Portfolio 前端文档

> 自动生成于 2026-01-12 | React + Next.js 前端架构

---

## 1. 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.1.1 | App Router, SSG, Image Optimization |
| React | 19.2.3 | UI 渲染 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4.x | 样式框架 |
| react-icons | 5.5.0 | 图标库 (FontAwesome + Simple Icons) |

---

## 2. 组件层次结构

```
App (layout.tsx)
├── Navbar (全局导航)
│   └── navLinks[] (Home, Projects, About)
│
└── Pages
    ├── Home (page.tsx)
    │   ├── Hero Section
    │   ├── Featured Projects Grid
    │   │   └── ProjectCard[]
    │   └── Recent Learnings Grid
    │       └── LearningCard[]
    │
    ├── Projects (projects/page.tsx)
    │   └── ProjectsPageClient
    │       ├── ProjectFilter
    │       └── ProjectCard[]
    │
    ├── Project Detail (projects/[slug]/page.tsx)
    │   ├── Header (Title, Meta, TechStack)
    │   │   └── TechStackIcon[]
    │   └── MDXRemote (正文渲染)
    │
    ├── Learnings (learnings/page.tsx)
    │   └── LearningsPageClient
    │       └── LearningCard[]
    │
    └── About (about/page.tsx)
```

---

## 3. 核心组件详解

### 3.1 FlipCard

**位置**: `src/components/FlipCard.tsx`

3D 翻转卡片基础组件，提供点击翻转、键盘访问、点击外部翻回等交互。

**Props**:

```typescript
interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  front: React.ReactNode;   // 正面内容
  back: React.ReactNode;    // 背面内容
  className?: string;
}
```

**特性**:
- 500ms CSS 3D 动画 (`rotateY`)
- `perspective: 1000px` 透视效果
- `aria-pressed` 状态指示
- Enter/Space 键盘触发
- 点击卡片外部自动翻回

**使用示例**:

```tsx
<FlipCard
  front={<div>正面内容</div>}
  back={<div>背面内容</div>}
  className="w-full h-80"
  aria-label="My flip card"
/>
```

---

### 3.2 ProjectCard

**位置**: `src/components/ProjectCard.tsx`

基于 FlipCard 的项目展示卡片。

**正面**:
- 封面图 (Next.js Image)
- 分类徽章
- 项目标题
- 技术栈标签 (最多 3 个 + "+N" 溢出指示)

**背面**:
- 项目描述
- "View Details" 按钮 (跳转详情页)

**Props**:

```typescript
interface ProjectCardProps {
  project: Project;
}
```

---

### 3.3 LearningCard

**位置**: `src/components/LearningCard.tsx`

基于 FlipCard 的学习笔记卡片，带动态图标渲染。

**图标映射**:

```typescript
const iconMap: Record<string, IconType> = {
  // FontAwesome
  FaRobot, FaServer, FaCloud, FaDatabase, ...
  // Simple Icons
  SiTypescript, SiPython, SiReact, SiDocker, ...
};
```

**分类颜色**:

```typescript
const colorMap: Record<string, string> = {
  'AI/Agent': 'bg-purple-500/20 text-purple-300',
  'Backend': 'bg-green-500/20 text-green-300',
  'Frontend': 'bg-cyan-500/20 text-cyan-300',
  'DevOps': 'bg-orange-500/20 text-orange-300',
  // ...
};
```

---

### 3.4 TechStackIcon

**位置**: `src/components/TechStackIcon.tsx`

技术栈名称到 react-icons 图标的映射服务，支持 50+ 技术。

**特性**:
- 大小写不敏感
- 支持别名 (`react` = `reactjs` = `React.js`)
- 未知技术显示默认图标 (FaCode)

**支持的技术类别**:

| 类别 | 技术示例 |
|------|----------|
| Frontend | React, Vue, Angular, Svelte |
| JavaScript/TypeScript | TypeScript, JavaScript, ts, js |
| Meta-frameworks | Next.js, Vite |
| CSS | Tailwind, CSS, HTML |
| Backend | Node.js, Python, Rust, Go, C++ |
| Game Dev | Godot, GDScript |
| Mobile | Flutter, Electron |
| AI/ML | OpenAI, GPT, AI, LLM |
| Databases | PostgreSQL, MongoDB, Redis, Prisma |
| DevOps | Docker, Kubernetes, AWS, Vercel |

**使用示例**:

```tsx
<TechStackIcon tech="React" size={24} showLabel />
<TechStackIcon tech="python" />  // 大小写不敏感
```

---

### 3.5 Navbar

**位置**: `src/components/Navbar.tsx`

响应式导航栏，支持移动端汉堡菜单。

**特性**:
- Sticky 定位 + 背景模糊
- 路由高亮 (使用 `usePathname`)
- 移动端菜单动画 (max-height 过渡)
- ARIA 可访问性 (aria-controls, aria-expanded)

**导航链接**:

```typescript
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
];
```

---

## 4. 样式系统

### 4.1 Tailwind CSS 配置

使用 Tailwind CSS 4，通过 `@import "tailwindcss"` 导入。

### 4.2 自定义工具类

**位置**: `src/app/globals.css`

```css
@layer utilities {
  .perspective-1000 { perspective: 1000px; }
  .transform-style-3d { transform-style: preserve-3d; }
  .backface-hidden { backface-visibility: hidden; }
  .rotate-y-180 { transform: rotateY(180deg); }
  .rotate-y-0 { transform: rotateY(0deg); }
}
```

### 4.3 颜色主题

- **主色**: Indigo 系列 (`indigo-400`, `indigo-600`)
- **强调色**: Cyan 系列 (`cyan-400`, `cyan-600`)
- **背景**: Slate 系列 (`slate-900`, `slate-950`)
- **暗色模式**: 默认启用 (`bg-slate-950 text-slate-100`)

---

## 5. 状态管理

项目使用 React 内置状态管理，无外部状态库：

| 组件 | 状态 | 用途 |
|------|------|------|
| FlipCard | `isFlipped` | 翻转状态 |
| Navbar | `isMobileMenuOpen` | 移动菜单开关 |
| ProjectsPageClient | `selectedCategory`, `selectedTech` | 筛选条件 |
| LearningsPageClient | `selectedCategory` | 分类过滤 |

---

## 6. 性能优化

1. **Next.js Image**: 自动优化和懒加载
2. **SSG**: 项目详情页静态生成 (`generateStaticParams`)
3. **useMemo**: 筛选逻辑缓存
4. **Server Components**: 数据获取在服务端完成

---

## 7. 可访问性 (A11y)

- **ARIA 属性**: `aria-pressed`, `aria-hidden`, `aria-label`, `aria-expanded`, `aria-controls`
- **键盘导航**: FlipCard 支持 Enter/Space
- **Semantic HTML**: `<nav>`, `<article>`, `<header>`, `<main>`, `<footer>`
- **Screen Reader**: `.sr-only` 隐藏文本
- **Focus Ring**: Tailwind `focus:ring-*` 样式
