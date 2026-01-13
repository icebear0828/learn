# 优化方案

**项目**: `D:\rag\learn\portfolio`
**生成时间**: 2026-01-12

---

## 🚨 紧急修复 (P0 - 24小时内)

### 1. 日期排序 NaN 处理

**问题**: 无效日期导致排序结果不可预测

**文件**: 
- `src/lib/projects.ts:44-48`
- `src/lib/learnings.ts:42-47`

**修复方案**:

```diff
 function sortProjectsByDate(projects: Project[]): Project[] {
   return projects.sort((a, b) => {
     const dateA = new Date(a.date).getTime();
     const dateB = new Date(b.date).getTime();
+    
+    // Handle invalid dates - push to end
+    if (isNaN(dateA) && isNaN(dateB)) return 0;
+    if (isNaN(dateA)) return 1;
+    if (isNaN(dateB)) return -1;
+    
     return dateB - dateA;
   });
 }
```

同样修改 `lib/learnings.ts` 中的 `sortLearningsByDate` 函数。

---

### 2. ProjectCard 图片加载失败降级

**问题**: 图片加载失败时无降级 UI

**文件**: `src/components/ProjectCard.tsx:30-38`

**修复方案**:

```diff
+'use client';
+
+import { useState } from 'react';
 import Image from 'next/image';
 // ... other imports

 export default function ProjectCard({ project }: ProjectCardProps) {
+  const [imageError, setImageError] = useState(false);
   const { slug, title, techStack, description, coverImage, category } = project;
   
+  const fallbackImage = '/images/placeholder-project.svg';
+  
   // ... rest of component
   
   <div className="relative w-full h-48">
-    <Image
-      src={coverImage}
-      alt={`${title} cover image`}
-      fill
-      className="object-cover"
-      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
-      priority={false}
-    />
+    <Image
+      src={imageError ? fallbackImage : coverImage}
+      alt={`${title} cover image`}
+      fill
+      className="object-cover"
+      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
+      priority={false}
+      onError={() => setImageError(true)}
+    />
   </div>
```

**附加步骤**: 创建占位图 `public/images/placeholder-project.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" fill="none">
  <rect width="400" height="200" fill="#1e293b"/>
  <path d="M170 80h60l30 40-30 40h-60l-30-40z" fill="#334155"/>
  <circle cx="200" cy="100" r="20" fill="#475569"/>
</svg>
```

---

## ⚠️ 重要改进 (P1 - 本周内)

### 3. 文件解析错误边界增强

**问题**: 解析失败时错误信息不够具体

**文件**: `src/lib/projects.ts:16-36`

**修复方案**:

```typescript
/**
 * Parse a single MDX file and return a Project object
 * Returns null if parsing fails with detailed logging
 */
function parseProjectFile(fileName: string): Project | null {
  const filePath = path.join(PROJECTS_DIRECTORY, fileName);
  
  // Pre-flight check
  if (!fs.existsSync(filePath)) {
    console.warn(`[projects] File not found: ${filePath}`);
    return null;
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Required field validation
    const requiredFields = ['title', 'date', 'category', 'description'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      console.warn(`[projects] Missing required fields in ${fileName}: ${missingFields.join(', ')}`);
    }

    const slug = data.slug || fileName.replace(/\.mdx$/, '');

    return {
      slug,
      title: data.title || 'Untitled Project',
      date: data.date || new Date().toISOString().split('T')[0],
      category: data.category || 'Other',
      techStack: Array.isArray(data.techStack) ? data.techStack : [],
      description: data.description || '',
      coverImage: data.coverImage || '/images/placeholder-project.svg',
      githubUrl: data.githubUrl,
      demoUrl: data.demoUrl,
      featured: Boolean(data.featured),
      content,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[projects] Failed to parse ${fileName}: ${error.message}`);
    } else {
      console.error(`[projects] Unknown error parsing ${fileName}:`, error);
    }
    return null;
  }
}
```

同样更新 `lib/learnings.ts` 中的 `parseLearningFile` 函数。

---

### 4. 删除或保护测试页面

**问题**: 开发调试页面暴露在生产环境

**文件**: `src/app/test/page.tsx`

**选项 A - 删除** (推荐):
```bash
rm -rf src/app/test
```

**选项 B - 环境保护**:
```diff
+import { notFound } from 'next/navigation';
+
 export default function TestPage() {
+  // Block access in production
+  if (process.env.NODE_ENV === 'production') {
+    notFound();
+  }
+
   const allProjects = getAllProjects();
   // ... rest of component
 }
```

---

### 5. i18n 完整化

**问题**: 中英文字符串混用

**步骤 1**: 创建/更新翻译文件

```json
// messages/zh-CN.json
{
  "projects": {
    "totalProjects": "共 {count} 个项目",
    "filteredProjects": "显示 {filtered} / {total} 个项目",
    "noMatch": "没有匹配的项目",
    "clearFilters": "清除筛选条件"
  },
  "about": {
    "title": "关于我",
    "description": "关于我",
    "tagline": "爱生活，更爱 Vibe Coding ✨",
    "backHome": "返回首页"
  }
}
```

**步骤 2**: 更新组件使用 `useTranslations`

```tsx
// components/ProjectsPageClient.tsx
'use client';

import { useTranslations } from 'next-intl';

export default function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  const t = useTranslations('projects');
  
  // ...
  
  <p className="text-lg text-slate-400">
    {filteredProjects.length === projects.length
      ? t('totalProjects', { count: projects.length })
      : t('filteredProjects', { filtered: filteredProjects.length, total: projects.length })}
  </p>
```

---

## 📋 长期优化 (P2 - 本月内)

### 6. FlipCard useEffect 优化

**问题**: 事件监听器频繁解绑/重绑

**文件**: `src/components/FlipCard.tsx:53-68`

**修复方案**:

```typescript
// 使用 ref 存储最新的 isFlipped 状态
const isFlippedRef = useRef(isFlipped);

// 同步 ref 与 state
useEffect(() => {
  isFlippedRef.current = isFlipped;
}, [isFlipped]);

// 事件监听器只绑定一次
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
  return () => document.removeEventListener('click', handleClickOutside);
}, []); // 空依赖数组 - 只绑定一次
```

---

### 7. 日期格式统一

**问题**: 日期格式化分散在各组件中

**修复方案**: 创建统一工具函数

```typescript
// src/lib/formatters.ts
import { format, parseISO } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';

type SupportedLocale = 'zh-CN' | 'en-US';

const localeMap = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

export function formatDate(
  dateString: string,
  locale: SupportedLocale = 'zh-CN',
  pattern: string = 'yyyy年M月d日'
): string {
  try {
    const date = parseISO(dateString);
    return format(date, pattern, { locale: localeMap[locale] });
  } catch {
    return dateString; // Fallback to original string
  }
}
```

然后在组件中使用:
```tsx
import { formatDate } from '@/lib/formatters';

<time dateTime={project.date}>
  {formatDate(project.date)}
</time>
```

---

### 8. 类型定义增强

**问题**: 类型约束不够严格

**修复方案**: 更新类型定义

```typescript
// src/types/index.ts

export type ProjectCategory =
  | 'Web App'
  | 'Game'
  | 'AI/ML'
  | 'Automation'
  | 'Tool'
  | 'Other';

export type LearningCategory =
  | 'DevOps'
  | 'AI/Agent'
  | 'Backend'
  | 'Frontend'
  | 'Other';

export interface Project {
  slug: string;
  title: string;
  date: string;
  category: ProjectCategory;  // 使用联合类型
  techStack: string[];
  description: string;
  coverImage: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  content: string;
}

export interface LearningCard {
  id: string;
  topic: string;
  category: LearningCategory;  // 使用联合类型
  icon: string;
  summary: string;
  details: string[];
  link?: string;
  date: string;
  content?: string;
}
```

---

### 9. TechStackIcon 配置化

**问题**: 图标映射硬编码

**修复方案**: 提取到配置文件

```typescript
// src/config/tech-icons.ts
import { IconType } from 'react-icons';
import { FaReact, FaPython, /* ... */ } from 'react-icons/fa';
import { SiTypescript, /* ... */ } from 'react-icons/si';

export interface TechIconConfig {
  icon: IconType;
  color?: string;
  aliases?: string[];
}

export const techIconConfig: Record<string, TechIconConfig> = {
  react: {
    icon: FaReact,
    color: '#61DAFB',
    aliases: ['react.js', 'reactjs'],
  },
  typescript: {
    icon: SiTypescript,
    color: '#3178C6',
    aliases: ['ts'],
  },
  // ... more entries
};

export function getTechIcon(tech: string): IconType {
  const normalized = tech.toLowerCase().trim();
  
  // Direct match
  if (techIconConfig[normalized]) {
    return techIconConfig[normalized].icon;
  }
  
  // Alias match
  for (const [key, config] of Object.entries(techIconConfig)) {
    if (config.aliases?.includes(normalized)) {
      return config.icon;
    }
  }
  
  // Default
  return FaCode;
}
```

---

## 验证清单

完成修复后，执行以下验证:

```bash
# 1. 类型检查
pnpm tsc --noEmit

# 2. Lint 检查
pnpm lint

# 3. 运行测试
pnpm test

# 4. 构建验证
pnpm build

# 5. 本地预览
pnpm start
```

---

*Generated by Code Quality Auditor Skill - 2026-01-12*
