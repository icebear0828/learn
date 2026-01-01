# 项目展示官网 - 开发规划路线图

> 本文档是 `project_showcase_website.md` 的配套开发计划，按阶段拆分，每个步骤可独立验收。

---

## 阶段概览

| 阶段 | 名称 | 核心交付物 | 验收标准 |
|:----:|------|-----------|----------|
| P0 | 项目初始化 | 可运行的 Next.js 空壳 | `npm run dev` 正常启动 |
| P1 | 数据层搭建 | 内容读取 API | 能输出所有项目/学习数据 |
| P2 | 核心组件开发 | FlipCard、ProjectCard、LearningCard | Storybook 或页面可预览 |
| P3 | 页面集成 | 首页、列表页、详情页 | 完整页面导航流程 |
| P4 | 交互与筛选 | 客户端筛选、翻转动画 | 筛选功能可用 |
| P5 | 样式打磨 | 响应式、暗色模式(可选) | 移动端适配良好 |
| P6 | 部署上线 | Vercel 自动化部署 | 公网可访问 |

---

## P0: 项目初始化

### 步骤 0.1: 创建 Next.js 项目
```bash
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir
cd portfolio
```

### 步骤 0.2: 安装核心依赖
```bash
npm install gray-matter next-mdx-remote react-icons
npm install -D @types/node
```

### 步骤 0.3: 创建目录结构
```
/portfolio
├── /content
│   ├── /projects      # 从现有仓库复制 .mdx 文件
│   └── /learnings     # 从现有仓库复制 .md 文件
├── /public
│   └── /images
│       └── /projects  # 项目封面图
├── /src
│   ├── /app
│   ├── /components
│   ├── /lib
│   └── /types
└── tailwind.config.ts
```

### 步骤 0.4: 配置 Tailwind 自定义类
```typescript
// tailwind.config.ts - 添加 3D 翻转支持
module.exports = {
  theme: {
    extend: {
      // 自定义工具类将在 P2 阶段添加
    },
  },
}
```

**验收点**：
- [ ] `npm run dev` 成功启动
- [ ] 访问 `localhost:3000` 显示 Next.js 默认页面

---

## P1: 数据层搭建

### 步骤 1.1: 定义 TypeScript 类型
创建 `src/types/index.ts`：
```typescript
export interface Project {
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

export interface LearningCard {
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

### 步骤 1.2: 实现项目数据读取
创建 `src/lib/projects.ts`：
- `getAllProjects()`: 读取所有项目
- `getProjectBySlug(slug)`: 读取单个项目
- `getFeaturedProjects()`: 读取精选项目 (最多 6 个)

### 步骤 1.3: 实现学习数据读取
创建 `src/lib/learnings.ts`：
- `getAllLearnings()`: 读取所有学习卡片
- `getRecentLearnings(limit)`: 读取最近 N 条

### 步骤 1.4: 验证数据读取
创建临时测试页面 `src/app/test/page.tsx`：
```tsx
export default async function TestPage() {
  const projects = getAllProjects();
  const learnings = getAllLearnings();
  return <pre>{JSON.stringify({ projects, learnings }, null, 2)}</pre>;
}
```

**验收点**：
- [ ] 访问 `/test` 显示所有项目和学习数据的 JSON
- [ ] 数据字段与类型定义一致

---

## P2: 核心组件开发

### 步骤 2.1: 实现 FlipCard 通用组件
文件：`src/components/FlipCard.tsx`

功能要求：
- 接收 `front` 和 `back` 两个 ReactNode
- 点击触发翻转
- 点击外部区域翻回正面
- 支持键盘操作 (Enter/Space)
- 动画时长 500ms

### 步骤 2.2: 实现 ProjectCard 组件
文件：`src/components/ProjectCard.tsx`

基于 FlipCard 封装：
- 正面：封面图、标题、技术栈标签
- 背面：描述、亮点、"View Details" 按钮

### 步骤 2.3: 实现 LearningCard 组件
文件：`src/components/LearningCard.tsx`

基于 FlipCard 封装：
- 正面：图标、主题名称
- 背面：details 列表、链接按钮

### 步骤 2.4: 实现 TechStackIcon 组件
文件：`src/components/TechStackIcon.tsx`

建立技术栈到图标的映射：
```typescript
const iconMap: Record<string, IconType> = {
  'React': FaReact,
  'Python': FaPython,
  'TypeScript': SiTypescript,
  // ...
};
```

**验收点**：
- [ ] 创建演示页面 `/components-demo` 展示所有组件
- [ ] 卡片翻转动画流畅
- [ ] 移动端点击正常工作

---

## P3: 页面集成

### 步骤 3.1: 实现首页 (`src/app/page.tsx`)

区块：
1. Hero Section - 一句话介绍 + CTA 按钮
2. Featured Projects - 精选项目网格 (最多 6 个)
3. Learning Zone - 最近学习卡片 (最多 4 个)
4. Skills - 技术栈图标网格

### 步骤 3.2: 实现项目列表页 (`src/app/projects/page.tsx`)

功能：
- 显示所有项目卡片
- 预留筛选组件位置（P4 实现）

### 步骤 3.3: 实现项目详情页 (`src/app/projects/[slug]/page.tsx`)

功能：
- 动态路由读取 slug
- 渲染 MDX 内容
- 显示 GitHub / Demo 链接

### 步骤 3.4: 实现导航栏 (`src/components/Navbar.tsx`)

链接：
- Home (/)
- Projects (/projects)
- About (/about) - 占位

**验收点**：
- [ ] 首页展示 Featured 项目和学习卡片
- [ ] 点击项目卡片可跳转详情页
- [ ] 详情页正确渲染 MDX 内容

---

## P4: 交互与筛选

### 步骤 4.1: 实现 ProjectFilter 组件
文件：`src/components/ProjectFilter.tsx`

功能：
- 分类下拉选择
- 技术栈下拉选择
- 清除筛选按钮
- 客户端实时筛选

### 步骤 4.2: 集成筛选到列表页
修改 `src/app/projects/page.tsx`：
- 使用 `use client` 转为客户端组件
- 管理筛选状态
- 显示筛选后的项目

### 步骤 4.3: 添加 Tailwind 3D 工具类
修改 `tailwind.config.ts`：
```typescript
extend: {
  perspective: { '1000': '1000px' },
  rotateY: { '180': '180deg' },
  backfaceVisibility: { 'hidden': 'hidden' },
  transformStyle: { '3d': 'preserve-3d' },
}
```

或使用 `@layer utilities` 在 CSS 中定义。

**验收点**：
- [ ] 筛选功能正常工作
- [ ] 筛选结果实时更新
- [ ] 清除筛选后显示全部项目

---

## P5: 样式打磨

### 步骤 5.1: 响应式布局调整

断点策略：
- Mobile (< 640px): 单列
- Tablet (640px - 1024px): 双列
- Desktop (> 1024px): 三列

### 步骤 5.2: 移动端翻转优化

确保：
- 卡片高度固定，避免翻转时抖动
- 点击区域足够大 (最小 44x44px)
- 背面内容不溢出

### 步骤 5.3: 动画与过渡
- 页面切换动画 (可选)
- 卡片 hover 阴影效果
- 按钮交互反馈

### 步骤 5.4: 暗色模式 (可选)
如需支持：
- 添加 `dark:` 变体样式
- 实现主题切换按钮

**验收点**：
- [ ] 在 iPhone SE、iPad、Desktop 尺寸下布局正常
- [ ] 无明显样式错位或溢出

---

## P6: 部署上线

### 步骤 6.1: 创建 GitHub 仓库
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 步骤 6.2: 连接 Vercel
1. 登录 Vercel
2. Import Git Repository
3. 选择刚创建的仓库
4. 使用默认 Next.js 设置
5. Deploy

### 步骤 6.3: 配置自定义域名 (可选)
在 Vercel Dashboard > Domains 添加自定义域名。

### 步骤 6.4: 验证自动部署
1. 在 `content/projects/` 添加新的 `.mdx` 文件
2. 提交并推送
3. 等待 Vercel 自动构建
4. 确认新项目出现在网站上

**验收点**：
- [ ] 网站公网可访问
- [ ] Git 推送自动触发部署
- [ ] 添加新内容无需修改代码

---

## 附录: 开发检查清单

### 每日开发结束前
- [ ] 代码已提交到 Git
- [ ] 无 TypeScript 编译错误
- [ ] 开发服务器可正常启动

### 阶段交付前
- [ ] 完成该阶段所有验收点
- [ ] 在移动端浏览器测试
- [ ] 无控制台错误

### 上线前最终检查
- [ ] 所有链接有效
- [ ] 图片已优化 (建议使用 next/image)
- [ ] meta 标签已配置
- [ ] favicon 已设置
