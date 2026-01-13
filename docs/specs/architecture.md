# Portfolio 项目架构文档

> 自动生成于 2026-01-12 | 基于源码分析

---

## 1. 项目概览

**Portfolio** 是一个基于 **Next.js 16.1.1 App Router** 构建的个人作品集网站，采用 React 19 和 TypeScript 5 开发，使用 Tailwind CSS 4 进行样式设计。

### 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 框架 | Next.js | 16.1.1 |
| UI | React | 19.2.3 |
| 语言 | TypeScript | 5.x |
| 样式 | Tailwind CSS | 4.x |
| 内容 | MDX/Markdown + gray-matter | 5.0.0 / 4.0.3 |
| 测试 | Vitest + RTL | 4.0.17 |

---

## 2. 目录结构

```
portfolio/
├── content/                    # 内容数据 (File-based CMS)
│   ├── learnings/             # 学习笔记 (*.md)
│   └── projects/              # 项目介绍 (*.mdx)
├── public/
│   └── images/projects/       # 项目封面图
├── src/
│   ├── app/                   # Next.js App Router 页面
│   │   ├── layout.tsx         # 根布局
│   │   ├── page.tsx           # 首页
│   │   ├── about/             # 关于页
│   │   ├── learnings/         # 学习笔记列表页
│   │   └── projects/          # 项目列表和详情页
│   │       └── [slug]/        # 动态路由
│   ├── components/            # React 组件
│   │   ├── __tests__/         # 组件测试
│   │   ├── FlipCard.tsx       # 3D 翻转卡片 (基础组件)
│   │   ├── ProjectCard.tsx    # 项目卡片
│   │   ├── LearningCard.tsx   # 学习卡片
│   │   ├── TechStackIcon.tsx  # 技术栈图标服务
│   │   └── ...
│   ├── lib/                   # 数据访问层
│   │   ├── __tests__/
│   │   ├── projects.ts        # 项目数据 CRUD
│   │   └── learnings.ts       # 学习数据 CRUD
│   ├── types/                 # TypeScript 类型定义
│   └── test/                  # 测试配置
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

---

## 3. 架构模式

### 3.1 Server-Client Component 分离

项目采用 Next.js App Router 的 **Server Components + Client Components** 架构：

```
┌─────────────────────────────────────────────────────────┐
│  Server Components (数据获取)                            │
│  ┌─────────────────┐    ┌─────────────────┐            │
│  │ page.tsx        │    │ layout.tsx      │            │
│  │ (数据获取)       │    │ (SEO, 全局布局)   │            │
│  └────────┬────────┘    └─────────────────┘            │
│           │                                              │
│           ▼                                              │
│  ┌─────────────────────────────────────────────────┐   │
│  │  lib/projects.ts, lib/learnings.ts              │   │
│  │  (gray-matter 解析, 文件系统读取)                   │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  Client Components (交互逻辑)                            │
│  ┌─────────────────┐    ┌─────────────────┐            │
│  │ *PageClient.tsx │    │ FlipCard.tsx    │            │
│  │ (过滤/筛选)      │    │ (3D 翻转动画)    │            │
│  └─────────────────┘    └─────────────────┘            │
└─────────────────────────────────────────────────────────┘
```

### 3.2 File-based CMS

内容通过 MDX/Markdown 文件管理，使用 `gray-matter` 解析 YAML frontmatter：

```yaml
# content/projects/example.mdx
---
title: 项目标题
date: 2025-01-15
category: Web App
techStack: [React, TypeScript]
description: 项目描述
coverImage: /images/projects/example.png
featured: true
---

# 正文内容 (MDX)
```

### 3.3 组件组合模式

FlipCard 作为基础组件，ProjectCard 和 LearningCard 通过组合继承其 3D 翻转能力：

```
FlipCard (base)
    ├── ProjectCard (项目展示)
    └── LearningCard (学习笔记)
```

---

## 4. 数据流

```
┌───────────────────┐
│  content/*.md(x)  │
│  (YAML + Markdown)│
└────────┬──────────┘
         │ fs.readFileSync
         ▼
┌───────────────────┐
│   gray-matter     │
│   (解析 frontmatter)│
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  lib/*.ts         │
│  (Repository API) │
└────────┬──────────┘
         │ getAllProjects()
         ▼
┌───────────────────┐
│  Server Component │
│  (page.tsx)       │
└────────┬──────────┘
         │ props
         ▼
┌───────────────────┐
│  Client Component │
│  (*PageClient.tsx)│
└───────────────────┘
```

---

## 5. 路由结构

| 路由 | 页面 | 类型 |
|------|------|------|
| `/` | 首页 (Hero + Featured Projects + Recent Learnings) | Server |
| `/about` | 关于页 | Server |
| `/projects` | 项目列表 (带筛选) | Server + Client |
| `/projects/[slug]` | 项目详情 (MDX 渲染) | Server (SSG) |
| `/learnings` | 学习笔记列表 (带分类过滤) | Server + Client |

---

## 6. 关键依赖

### 运行时依赖

- **next**: App Router, SSG, Image Optimization
- **react**: UI 渲染
- **gray-matter**: Frontmatter 解析
- **next-mdx-remote**: MDX 服务端渲染
- **react-icons**: 技术栈图标 (50+ 映射)

### 开发依赖

- **vitest**: 测试框架
- **@testing-library/react**: 组件测试
- **tailwindcss**: CSS 框架
- **typescript**: 类型系统
