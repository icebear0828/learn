# Portfolio 内容模式

> 自动生成于 2026-01-12 | Frontmatter Schema 和完整样例 (可直接复刻)

---

## 1. 项目内容 (content/projects/*.mdx)

### Frontmatter Schema

| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `title` | string | ✅ | 项目标题 |
| `slug` | string | ❌ | URL 路径 (默认使用文件名) |
| `date` | string (YYYY-MM-DD) | ✅ | 发布日期 |
| `category` | string | ✅ | 分类: Web App, Game Dev, AI/ML, Automation, Tool, Other |
| `techStack` | string[] | ✅ | 技术栈数组 |
| `description` | string | ✅ | 一句话描述 |
| `coverImage` | string | ✅ | 封面图路径 (相对于 public/) |
| `githubUrl` | string | ❌ | GitHub 仓库链接 |
| `demoUrl` | string | ❌ | 在线演示链接 |
| `featured` | boolean | ❌ | 是否在首页展示 (默认 false) |

### 完整样例

```mdx
---
title: "Sparkle Survivors"
slug: "sparkle-survivors"
date: "2025-10-20"
category: "Game Dev"
techStack: ["TypeScript", "Canvas API", "Custom Engine"]
description: "Vampire Survivors 风格的卡通 Roguelite 生存游戏，自研引擎，数据驱动设计。"
coverImage: "/images/projects/sparkle-survivors.png"
githubUrl: "https://github.com/mygameworld9/Vampire-Survivors-like"
featured: true
---

# Sparkle Survivors

灵感来自 Vampire Survivors 的 Roguelite 生存游戏，采用可爱卡通画风。

## 核心特性
- **自研游戏引擎**：零依赖，纯 TypeScript 物理和渲染逻辑
- **高性能**：优化至 60 FPS，使用 requestAnimationFrame 和 Canvas API
- **数据驱动设计**：武器、敌人、技能均定义在 JSON 对象中，无需改代码即可添加内容
- **Meta 进化**：持久化的 "军械库" 系统，使用金币跨局升级属性
- **可爱画风**：程序化绘制的 Kawaii 风格图形
- **国际化**：内置 i18n 支持（英文 & 中文）

## Roguelite 元素
- 随机升级选项
- 多样化的构建流派
- 程序化敌人波次
```

---

## 2. 学习笔记 (content/learnings/*.md)

### Frontmatter Schema

| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `id` | string | ❌ | 唯一标识 (默认使用文件名) |
| `topic` | string | ✅ | 主题名称 |
| `category` | string | ✅ | 分类: DevOps, AI/Agent, Backend, Frontend, Other |
| `icon` | string | ✅ | 图标名称 (见下表) |
| `summary` | string | ✅ | 简短摘要 |
| `details` | string[] | ✅ | 关键知识点列表 |
| `link` | string | ❌ | 关联链接 |
| `date` | string (YYYY-MM-DD) | ✅ | 记录日期 |

### 可用图标

#### FontAwesome (Fa*)
```
FaRobot, FaServer, FaCloud, FaDatabase, FaCode, FaBook, FaCog, FaTools, 
FaLightbulb, FaBrain, FaNetworkWired, FaLock, FaChartLine, FaTerminal, 
FaMicrochip, FaProjectDiagram, FaRocket
```

#### Simple Icons (Si*)
```
SiTypescript, SiJavascript, SiPython, SiReact, SiNextdotjs, SiDocker, 
SiKubernetes, SiGooglecloud, SiAmazonwebservices, SiRabbitmq, SiApachekafka, 
SiGraphql, SiMongodb, SiPostgresql, SiRedis, SiTerraform
```

### 完整样例

```markdown
---
id: "cicd-pipelines"
topic: "CI/CD Pipelines"
category: "DevOps"
icon: "FaRocket"
summary: "Automating software delivery with Continuous Integration and Continuous Deployment."
details: 
  - "Automated Testing & Linting"
  - "Docker Containerization"
  - "Blue/Green Deployment"
  - "GitHub Actions / GitLab CI"
  - "Infrastructure as Code"
link: "/notes/devops/cicd-mastery"
date: "2025-12-29"
---

# CI/CD Mastery

## The Pipeline

### 1. Continuous Integration (CI)
- **Code Checkout**: Fetching the latest code.
- **Linting**: Static code analysis (ESLint, Pylint).
- **Unit Testing**: Running Jest/Pytest suites.
- **Build**: Compiling assets or building Docker images.

### 2. Continuous Deployment (CD)
- **Staging**: Deploying to a pre-production environment.
- **Integration Tests**: End-to-end testing (Cypress/Playwright).
- **Production**: Live deployment with rollback capabilities.

## Tools Mastered
- **GitHub Actions**: Defining workflows in YAML.
- **Docker**: Ensuring environment consistency.
```

---

## 3. 分类颜色映射 (LearningCard)

| 分类 | Tailwind 类 |
|------|-------------|
| AI Architecture | `bg-purple-500/20 text-purple-300 border-purple-500/30` |
| AI/Agent | `bg-purple-500/20 text-purple-300 border-purple-500/30` |
| Middleware | `bg-blue-500/20 text-blue-300 border-blue-500/30` |
| Backend | `bg-green-500/20 text-green-300 border-green-500/30` |
| Frontend | `bg-cyan-500/20 text-cyan-300 border-cyan-500/30` |
| DevOps | `bg-orange-500/20 text-orange-300 border-orange-500/30` |
| Database | `bg-yellow-500/20 text-yellow-300 border-yellow-500/30` |
| Security | `bg-red-500/20 text-red-300 border-red-500/30` |
| Other | `bg-gray-500/20 text-gray-300 border-gray-500/30` |

---

## 4. 项目分类参考

| 分类 | 适用场景 |
|------|----------|
| Web App | 网站、Web 应用 |
| Game Dev | 游戏项目 |
| AI/ML | 机器学习、AI 应用 |
| Automation | 自动化工具、脚本 |
| Tool | 开发工具、CLI |
| Other | 其他类型 |

---

## 5. 内容目录结构

```
content/
├── learnings/
│   ├── cicd-pipelines.md
│   ├── google-agent-day1-intro.md
│   ├── google-agent-day2-mcp.md
│   ├── google-agent-day3-memory.md
│   ├── google-agent-day4-eval.md
│   ├── google-agent-day5-prod.md
│   └── message-queues.md
└── projects/
    ├── genui.mdx
    ├── godot-2d-platformer.mdx
    ├── guess-song.mdx
    ├── notebooklm-automation.mdx
    ├── rss.mdx
    ├── self-evolving-agent.mdx
    ├── sparkle-survivors.mdx
    └── twitter-like-catcher.mdx
```
