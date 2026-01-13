# Portfolio 开发指南

> 自动生成于 2026-01-12 | 快速上手和开发流程

---

## 1. 快速开始

### 环境要求

- Node.js 20+
- pnpm (推荐) 或 npm

### 安装和运行

```bash
# 克隆项目
cd d:\rag\learn\portfolio

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 访问 http://localhost:3000
```

### 常用命令

| 命令 | 用途 |
|------|------|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建生产版本 |
| `pnpm start` | 运行生产版本 |
| `pnpm test` | 运行测试 |
| `pnpm test:ui` | 带 UI 的测试界面 |
| `pnpm test:coverage` | 测试覆盖率 |
| `pnpm lint` | ESLint 检查 |

---

## 2. 添加新项目

### 步骤 1: 创建 MDX 文件

在 `content/projects/` 目录下创建新的 `.mdx` 文件：

```bash
# 文件名即为 URL slug
content/projects/my-new-project.mdx
```

### 步骤 2: 编写 Frontmatter

```yaml
---
title: 项目名称
date: 2025-01-20
category: Web App  # Web App | Game | AI/ML | Automation | Tool | Other
techStack:
  - React
  - TypeScript
  - Tailwind
description: 一句话描述项目的功能和特点
coverImage: /images/projects/my-new-project.png
githubUrl: https://github.com/username/repo  # 可选
demoUrl: https://demo.example.com            # 可选
featured: true                                # 是否在首页展示
---
```

### 步骤 3: 编写正文

使用 Markdown/MDX 语法编写项目详情：

```markdown
## 项目背景

描述项目的起源和目的...

## 核心功能

- 功能 1
- 功能 2

## 技术实现

代码示例：

\`\`\`typescript
const example = () => {
  // ...
};
\`\`\`

## 总结

项目收获和未来计划...
```

### 步骤 4: 添加封面图

将封面图放入 `public/images/projects/` 目录，确保与 frontmatter 中的 `coverImage` 路径一致。

---

## 3. 添加学习笔记

### 步骤 1: 创建 Markdown 文件

```bash
content/learnings/my-topic.md
```

### 步骤 2: 编写 Frontmatter

```yaml
---
topic: 主题名称
category: DevOps  # DevOps | AI/Agent | Backend | Frontend | Other
icon: FaDocker    # FontAwesome: FaXxx / Simple Icons: SiXxx
summary: 一两句话总结
details:
  - 知识点 1
  - 知识点 2
  - 知识点 3
link: /path/to/detail  # 可选，关联链接
date: 2025-01-20
---
```

### 可用图标

**FontAwesome (Fa*)**:
FaRobot, FaServer, FaCloud, FaDatabase, FaCode, FaBook, FaCog, FaTools, FaLightbulb, FaBrain, FaNetworkWired, FaLock, FaChartLine, FaTerminal, FaMicrochip, FaProjectDiagram

**Simple Icons (Si*)**:
SiTypescript, SiJavascript, SiPython, SiReact, SiNextdotjs, SiDocker, SiKubernetes, SiGooglecloud, SiAmazonwebservices, SiRabbitmq, SiApachekafka, SiGraphql, SiMongodb, SiPostgresql, SiRedis, SiTerraform

---

## 4. 创建新组件

### 组件模板

```tsx
// src/components/MyComponent.tsx
'use client';  // 如果需要客户端交互

import { useState } from 'react';

interface MyComponentProps {
  title: string;
  description?: string;
}

/**
 * MyComponent - 组件描述
 *
 * Features:
 * - 特性 1
 * - 特性 2
 */
export default function MyComponent({ title, description }: MyComponentProps) {
  const [state, setState] = useState(false);

  return (
    <div className="p-4 bg-slate-800 rounded-lg">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description && (
        <p className="text-slate-300">{description}</p>
      )}
    </div>
  );
}
```

### 测试模板

```tsx
// src/components/__tests__/MyComponent.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  describe('Rendering', () => {
    it('should render title', () => {
      render(<MyComponent title="Test Title" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should render description when provided', () => {
      render(<MyComponent title="Title" description="Test Description" />);
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
  });
});
```

---

## 5. 扩展 TechStackIcon

在 `src/components/TechStackIcon.tsx` 中添加新的图标映射：

```typescript
import { SiNewTech } from 'react-icons/si';  // 或 FaNewTech

const techIconMap: Record<string, IconType> = {
  // 现有映射...
  
  // 添加新技术
  newtech: SiNewTech,
  'new-tech': SiNewTech,  // 别名
};
```

---

## 6. 样式指南

### 颜色规范

| 用途 | Tailwind 类 |
|------|-------------|
| 主背景 | `bg-slate-950`, `bg-slate-900` |
| 卡片背景 | `bg-slate-800` |
| 主色调 | `text-indigo-400`, `bg-indigo-600` |
| 强调色 | `text-cyan-400`, `bg-cyan-600` |
| 正文文字 | `text-slate-300` |
| 辅助文字 | `text-slate-400`, `text-slate-500` |

### 常用 Class 组合

```jsx
// 卡片
<div className="p-6 bg-slate-800 rounded-xl border border-slate-700">

// 按钮 (主)
<button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors">

// 按钮 (次)
<button className="px-6 py-3 border border-slate-600 hover:bg-slate-800 rounded-lg text-slate-300 font-medium transition-colors">

// 链接
<a className="text-indigo-400 hover:text-indigo-300 transition-colors">

// 标签
<span className="px-2 py-1 text-xs font-medium bg-slate-700 rounded-md text-slate-300">
```

---

## 7. 部署

### Vercel 部署

项目已配置 Vercel 部署 (`.vercel/` 目录存在)：

1. 推送到 GitHub
2. Vercel 自动检测 Next.js 项目
3. 自动构建和部署

### 手动构建

```bash
# 构建
pnpm build

# 启动生产服务器
pnpm start
```

---

## 8. 目录参考

```
portfolio/
├── content/
│   ├── learnings/          # 学习笔记 (*.md)
│   └── projects/           # 项目 (*.mdx)
├── public/
│   └── images/projects/    # 项目封面图
├── src/
│   ├── app/                # 页面路由
│   ├── components/         # React 组件
│   │   └── __tests__/      # 组件测试
│   ├── lib/                # 数据访问层
│   │   └── __tests__/      # 单元测试
│   ├── types/              # TypeScript 类型
│   └── test/               # 测试配置
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

---

## 9. 常见问题

### Q: 新添加的项目/学习笔记不显示？

A: 确保 frontmatter 格式正确，日期格式为 `YYYY-MM-DD`。重启开发服务器 (`pnpm dev`)。

### Q: 图标不显示？

A: 检查 `icon` 字段是否在 `iconMap` 中定义。参考第 3 节的可用图标列表。

### Q: 测试失败？

A: 确保运行 `pnpm test` 在项目根目录。检查是否有 Mock 设置遗漏。

### Q: 样式不生效？

A: Tailwind CSS 4 使用 `@import "tailwindcss"` 语法。确保 `postcss.config.mjs` 正确配置。
