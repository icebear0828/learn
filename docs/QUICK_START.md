# 添加新内容快速指南

快速参考：如何向 Portfolio 添加新项目或学习记录。

---

## 🚀 添加新项目 (3分钟)

### Step 1: 创建文件
```bash
# 在 content/projects/ 创建 MDX 文件
touch content/projects/my-project.mdx
```

### Step 2: 复制模板 (支持双语)

```mdx
---
title:
  zh: "项目名称"
  en: "Project Name"
slug: "my-project"
date: "2026-01-12"
category: "Web App"
techStack: ["React", "TypeScript", "Tailwind"]
description:
  zh: "一句话中文描述你的项目。"
  en: "One-line English description of your project."
coverImage: "/images/projects/my-project.png"
githubUrl: "https://github.com/username/repo"
demoUrl: "https://demo.example.com"
featured: false
---

# 项目标题

简短介绍...

## 核心目标
解决什么问题...

## 关键特性
- **特性1**：描述
- **特性2**：描述

## 技术架构
| 模块 | 技术栈 |
|------|--------|
| 后端 | FastAPI |
| 前端 | React |
```

> **💡 双语支持**: `title` 和 `description` 可以使用双语格式，也可以只写字符串（向后兼容）

### Step 3: 添加封面图
```bash
# 将封面图放入 public/images/projects/
copy my-image.png public/images/projects/my-project.png
```

### Step 4: 验证
```bash
pnpm dev
# 访问 http://localhost:3000/projects/my-project
```

---

## 📚 添加新学习记录 (2分钟)

### Step 1: 创建文件
```bash
touch content/learnings/my-learning.md
```

### Step 2: 复制模板 (支持双语)

```markdown
---
id: "my-learning"
topic:
  zh: "主题名称"
  en: "Topic Name"
category: "Backend"
icon: "FaServer"
summary:
  zh: "一句话总结这个知识点。"
  en: "One-line summary of this topic."
details:
  - "要点1"
  - "要点2"
  - "要点3"
link: "/notes/optional-link"
date: "2026-01-12"
---

# 详细内容（可选）

更详细的笔记内容...
```

---

## 🌐 国际化 (i18n)

项目支持 **中英双语即时切换**，点击导航栏右上角的 `EN` / `中文` 按钮切换语言。

### 双语字段格式
```yaml
title:
  zh: "中文标题"
  en: "English Title"
```

### 单语格式 (向后兼容)
```yaml
title: "只有一种语言的标题"
```

---

## 📋 速查表

### 项目分类 (category)
| 分类 | 使用场景 |
|------|----------|
| `Web App` | 网站、Web 应用 |
| `Game` | 游戏项目 |
| `AI/ML` | 机器学习、AI 应用 |
| `Automation` | 自动化工具 |
| `Tool` | 开发工具、CLI |

### 学习分类
| 分类 | 颜色 |
|------|------|
| `AI/Agent` | 紫色 |
| `Backend` | 绿色 |
| `Frontend` | 青色 |
| `DevOps` | 橙色 |

### 常用图标
```
FaRobot    - AI/机器人
FaServer   - 后端服务
FaCloud    - 云服务
FaDatabase - 数据库
FaCode     - 编程
FaBrain    - AI思维
SiPython   - Python
SiReact    - React
```

---

## ✅ Checklist

添加新项目前确认：
- [ ] MDX 文件已创建在 `content/projects/`
- [ ] 封面图已放入 `public/images/projects/`
- [ ] `date` 格式正确 (YYYY-MM-DD)
- [ ] `techStack` 是数组格式
- [ ] 双语字段格式正确 (可选)
- [ ] 本地预览正常

添加新学习前确认：
- [ ] MD 文件已创建在 `content/learnings/`
- [ ] `icon` 使用有效的图标名
- [ ] `details` 是字符串数组
- [ ] 本地预览正常
