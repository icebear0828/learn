# 项目展示官网 - 技术规格与实施架构书

> [!NOTE]
> 本文档由 Antigravity 自动从用户需求 ("创建网页用于展示多个项目，要求网站可维护") 转换而来。
> 这是一个 **Developer-Ready** 的实施蓝图，开发者可以直接依照此文档构建系统。

## 1. 系统概览

### 1.1 核心目标
构建一个专业、现代化的个人/团队项目展示官网（Portfolio Website）。
**核心诉求**：**高可维护性**。这意味着添加新项目、修改内容不需要修改代码，而是通过配置或数据文件完成。

### 1.2 架构理念
采用 **"内容即数据" (Content as Data)** 的架构模式。
- **前端渲染**：负责 UI 展示，不包含硬编码的项目内容。
- **数据层**：独立的 Markdown/JSON/YAML 文件存储项目信息。
- **构建系统**：自动将数据层编译为静态页面。

### 1.3 技术选型推荐
| 层次 | 推荐技术 | 理由 |
|------|----------|------|
| **框架** | **Next.js (App Router)** | 性能极佳，SEO 友好，React 生态丰富 |
| **样式** | **Tailwind CSS** | 原子化 CSS，维护方便，构建体积小 |
| **内容源** | **MDX** 或 **Contentlayer** | 允许使用 Markdown 编写项目详情，同时支持 React 组件 |
| **部署** | **Vercel** | Git 自动化部署，零配置 |

---

## 2. 详细功能设计

### 2.1 核心页面规划

#### A. 首页 (Home)
- **英雄区 (Hero Section)**：一句话介绍作者/团队，醒目的 CTA 按钮。
- **精选项目 (Featured Projects)**：展示 3-6 个核心项目卡片，**支持翻转交互**。
- **学习专区 (Learning Zone)**：展示最近的学习成就，**全翻转交互**。
- **技能/技术栈 (Skills)**：图标网格展示掌握的技术。

#### B. 学习专区 (Learning Zone) [NEW]
- **展示形式**：网格布局的"知识卡片"。
- **交互效果**：
  - 默认状态：显示技术图标和标题（如 "RabbitMQ", "Google Whitepapers"）。
  - **点击翻转**：卡片翻转到背面，显示具体的学习心得、关键知识点或笔记链接。
  - **移动端适配**：触屏设备统一使用点击触发翻转，无悬停效果。
- **数据源**：独立的 `content/learnings/` 目录。

#### C. 项目列表页 (Projects)
- **筛选/搜索**：按类别（Web, Mobile, AI）、技术栈筛选。
- **统一交互**：所有项目采用与学习卡片一致的**翻转交互**。
  - **正面**：预览图、标题、核心技术栈。
  - **背面**：项目简介、核心亮点、"View Details" 按钮。

#### D. 项目详情页 (Project Detail)
- **动态路由**：`/projects/[slug]`
- **内容结构**：
  - 项目标题、简介、日期
  - 核心截图/演示视频 (Carousel)
  - 技术栈列表
  - "关于项目" (支持 Markdown 详细排版)
  - "GitHub" 和 "Live Demo" 链接按钮

#### E. 关于/联系 (About/Contact)
- 个人经历时间轴
- 联系表单 或 社交媒体链接

---

## 3. 数据结构设计 (关键点：可维护性)

为了保证可维护性，所有项目数据应存储在 `content/projects/` 目录下，学习记录存储在 `content/learnings/` 目录下。

### 3.1 Frontmatter 数据模型
每个项目为一个 `.mdx` 文件，头部包含元数据：

```yaml
---
title: "Antigravity Automation System"
slug: "antigravity-system"
date: "2025-12-31"
category: "AI Tool"
techStack: ["Python", "RabbitMQ", "React"]
description: "一个基于 LLM 的全自动编码助手系统。"
coverImage: "/images/projects/antigravity-cover.png"
githubUrl: "https://github.com/..."
demoUrl: "https://demo.com/..."
featured: true
---

# 这里是项目的详细介绍内容...
```

### 3.2 类型定义 (TypeScript Interface)

```typescript
// src/types/project.ts
export interface Project {
  slug: string;
  title: string;
  date: string;
  category: string;
  techStack: string[];
  description: string;
  coverImage: string;
  githubUrl?: string; // 可选
  demoUrl?: string;   // 可选
  content: string;    // 编译后的 MDX 内容
}
```

### 3.3 学习卡片数据模型 [UPDATED]

**数据格式**：采用 Markdown + YAML Frontmatter（与 Projects 保持一致）

文件路径：`content/learnings/{topic-slug}.md`

```yaml
---
id: "message-queues"
topic: "Message Queues"
category: "Middleware"
icon: "FaServer"           # 使用 react-icons 图标名称
summary: "Mastering asynchronous communication using RabbitMQ and Kafka."
details:
  - "Decoupling Microservices"
  - "Exchange Types (Direct, Topic, Fanout)"
  - "Dead Letter Queues (DLQ)"
link: "/notes/backend/mq-deep-dive"  # 可选
date: "2025-12-30"
---

# 这里是学习笔记的详细内容（可选）...
```

```typescript
// src/types/learning.ts
export interface LearningCard {
  id: string;
  topic: string;        // 卡片标题
  category: string;     // 分类 (Middleware, Frontend, AI, etc.)
  icon: string;         // react-icons 图标名称
  summary: string;      // 正面显示的简短描述
  details: string[];    // 背面显示的关键点列表
  link?: string;        // 指向详细笔记的链接（可选）
  date: string;         // 学习日期
  content?: string;     // 编译后的 Markdown 内容（可选）
}
```

---

## 4. 实现架构 (Code Structure)

```text
/my-portfolio
├── /content           <-- [核心] 数据维护区，非技术人员只需改这里
│   └── /projects
│       ├── project-1.mdx
│       └── project-2.mdx
│   └── /learnings     <-- [NEW] 学习记录数据
│       └── mq-learning.json
├── /public
│   └── /images
├── /src
│   ├── /app
│   │   ├── page.tsx          (首页)
│   │   ├── /projects
│   │   │   ├── page.tsx      (列表页)
│   │   │   └── /[slug]
│   │   │       └── page.tsx  (详情页动态路由)
│   ├── /components
│   │   ├── FlipCard.tsx      <-- [UPDATED] 通用翻转卡片组件
│   │   ├── ProjectCard.tsx   <-- 基于 FlipCard 封装
│   │   ├── LearningCard.tsx  <-- 基于 FlipCard 封装
│   │   ├── ProjectFilter.tsx
│   │   └── Navbar.tsx
│   └── /lib
│       └── projects.ts       (读取/解析 content 目录的逻辑)
├── tailwind.config.ts
└── package.json
```

---

## 5. 核心逻辑伪代码

### 5.1 获取项目数据 (`src/lib/projects.ts`)

```typescript
function getAllProjects(): Project[] {
    // 1. 读取 content/projects 目录下的所有文件
    // 2. 使用 gray-matter 解析 Frontmatter
    // 3. 按日期倒序排序
    // 4. 返回项目数组
}

function getProjectBySlug(slug: string): Project | null {
    // 1. 读取对应 slug 的文件
    // 2. 编译 MDX 内容
    // 3. 返回完整项目对象
}
```

### 5.2 列表页渲染 (`src/app/projects/page.tsx`)

```tsx
export default async function ProjectsPage() {
    const projects = getAllProjects();
    const categories = extractCategories(projects);

    return (
        <main>
            <FilterBar categories={categories} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <ProjectCard key={project.slug} data={project} />
                ))}
            </div>
        </main>
    );
}
```

### 5.3 客户端筛选逻辑 (`src/components/ProjectFilter.tsx`) [NEW]

**实现策略**：客户端筛选（适用于 <50 个项目的小规模场景）

```tsx
// 伪代码：客户端筛选
export const ProjectFilter = ({ projects, onFilter }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTech, setActiveTech] = useState<string | null>(null);

  // 提取所有分类和技术栈
  const categories = [...new Set(projects.map(p => p.category))];
  const techStacks = [...new Set(projects.flatMap(p => p.techStack))];

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchCategory = !activeCategory || project.category === activeCategory;
      const matchTech = !activeTech || project.techStack.includes(activeTech);
      return matchCategory && matchTech;
    });
  }, [projects, activeCategory, activeTech]);

  useEffect(() => {
    onFilter(filteredProjects);
  }, [filteredProjects]);

  return (
    <div className="flex gap-4 mb-6">
      <FilterDropdown
        label="Category"
        options={categories}
        value={activeCategory}
        onChange={setActiveCategory}
      />
      <FilterDropdown
        label="Tech Stack"
        options={techStacks}
        value={activeTech}
        onChange={setActiveTech}
      />
      <button onClick={() => { setActiveCategory(null); setActiveTech(null); }}>
        Clear Filters
      </button>
    </div>
  );
};
```

### 5.4 通用翻转卡片逻辑 (`src/components/FlipCard.tsx`)

**交互规范**：
- **桌面端**：点击触发翻转（不使用悬停，保持一致性）
- **移动端**：点击触发翻转，点击卡片外部区域自动翻回正面
- **动画时长**：500ms，使用 ease-out 缓动函数
- **无障碍**：支持键盘 Enter/Space 触发翻转

```tsx
// 伪代码：通用翻转容器
export const FlipCard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 点击外部区域翻回正面
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsFlipped(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div
      ref={cardRef}
      className="perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      onKeyDown={(e) => e.key === 'Enter' && setIsFlipped(!isFlipped)}
      tabIndex={0}
      role="button"
      aria-pressed={isFlipped}
    >
      <div className={`transition-transform duration-500 ease-out transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

        {/* 正面内容 */}
        <div className="backface-hidden absolute w-full h-full">
           {front}
        </div>

        {/* 背面内容 */}
        <div className="backface-hidden absolute w-full h-full rotate-y-180 bg-slate-900/95">
           {back}
        </div>

      </div>
    </div>
  );
}
```

### 5.5 Featured 项目筛选逻辑 [NEW]

**筛选规则**：
1. 筛选 `featured: true` 的项目
2. 按 `date` 倒序排序
3. 最多显示 **6 个**（首页空间限制）
4. 不足 6 个时显示全部 featured 项目

```typescript
// src/lib/projects.ts
function getFeaturedProjects(): Project[] {
  const allProjects = getAllProjects();
  return allProjects
    .filter(p => p.featured === true)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);
}
```

---

## 6. 实施步骤

1.  **初始化项目**：
    ```bash
    npx create-next-app@latest my-portfolio --typescript --tailwind --eslint
    ```

2.  **配置内容层**：
    安装依赖：`npm install gray-matter next-mdx-remote` (或者使用 Contentlayer)。
    创建 `content/projects` 目录并添加一个测试文件。

3.  **开发组件**：
    实现 `ProjectCard` 组件，确保在移动端和桌面端都有良好展示。

4.  **实现页面逻辑**：
    完成 `lib/projects.ts` 中的文件读取逻辑。
    将数据接入 Next.js 页面。

5.  **部署上线**：
    推送到 GitHub，连接 Vercel 进行自动化部署。

## 7. 维护指南

**如何添加新项目？**
1. 准备一张封面图放入 `public/images/projects/`。
2. 在 `content/projects/` 下新建 `my-new-project.mdx`。
3. 复制元数据模板，填写标题、链接等信息。
4. 提交 Git，网站会自动更新。

**不需要修改任何代码 (No Code Changes Required)!**
