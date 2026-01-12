# Portfolio - Developer Showcase

一个现代化的个人作品集网站，使用 Next.js 16、React 19、TypeScript 和 Tailwind CSS 构建。

## ✨ 特性

- 🌐 **中英双语支持** - 即时切换语言，无需刷新页面
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🎴 **3D 翻转卡片** - 交互式项目展示
- 📝 **MDX 内容** - 使用 Markdown 编写项目和学习记录
- 🎨 **深色主题** - 现代化的暗色 UI

## 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 运行测试
pnpm test

# 生产构建
pnpm build
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

## 📁 项目结构

```
portfolio/
├── content/              # MDX 内容文件
│   ├── projects/         # 项目文件
│   └── learnings/        # 学习记录
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React 组件
│   ├── lib/              # 工具函数
│   ├── i18n/             # 国际化文件
│   │   ├── messages/     # 翻译文件 (zh.json, en.json)
│   │   └── LanguageContext.tsx
│   ├── types/            # TypeScript 类型
│   └── config/           # 配置文件
└── public/               # 静态资源
```

## 🌐 国际化 (i18n)

项目支持中英双语，默认语言为中文。

### 使用翻译
```tsx
import { useLanguage } from '@/i18n/LanguageContext';

function MyComponent() {
  const { t, locale, setLocale } = useLanguage();
  return <h1>{t('home.title')}</h1>;
}
```

### 双语项目内容
```yaml
# content/projects/xxx.mdx
title:
  zh: "中文标题"
  en: "English Title"
description:
  zh: "中文描述"
  en: "English Description"
```

## 📦 技术栈

| 技术 | 版本 |
|------|------|
| Next.js | 16.1.1 |
| React | 19.2.3 |
| TypeScript | ^5 |
| Tailwind CSS | ^4 |
| Vitest | ^4.0.17 |

## 📝 添加新项目

1. 在 `content/projects/` 创建新的 `.mdx` 文件
2. 添加 frontmatter 元数据:

```yaml
---
title:
  zh: "项目名称"
  en: "Project Name"
description:
  zh: "项目描述"
  en: "Project Description"
date: "2025-01-15"
category: "Web App"
techStack:
  - React
  - TypeScript
coverImage: "/images/project-cover.jpg"
featured: true
---

这里是项目详情内容...
```

## 🧪 测试

```bash
# 运行所有测试
pnpm test

# 观察模式
pnpm test:ui

# 测试覆盖率
pnpm test:coverage
```

## 📄 License

MIT
