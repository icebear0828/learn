# 📚 Portfolio 开发文档

欢迎！这里是 Portfolio 项目的开发文档索引。

---

## 🚀 快速入门

| 文档 | 说明 |
|------|------|
| [QUICK_START.md](./QUICK_START.md) | **添加新项目/学习的3分钟指南** |
| [specs/dev_guide.md](./specs/dev_guide.md) | 完整开发指南 |

---

## 📋 模板文件

直接复制使用：

| 模板 | 用途 |
|------|------|
| [templates/project.template.mdx](./templates/project.template.mdx) | 新项目模板 |
| [templates/learning.template.md](./templates/learning.template.md) | 新学习记录模板 |

---

## 📖 技术文档

| 文档 | 说明 |
|------|------|
| [specs/content_schema.md](./specs/content_schema.md) | 内容 Schema 定义 |
| [specs/architecture.md](./specs/architecture.md) | 系统架构 |
| [specs/frontend.md](./specs/frontend.md) | 前端实现 |
| [specs/types.md](./specs/types.md) | TypeScript 类型 |
| [specs/testing.md](./specs/testing.md) | 测试指南 |
| [specs/code_map.md](./specs/code_map.md) | 代码导航 |

---

## 🛠️ 快速命令

```bash
# 开发
pnpm dev

# 测试
pnpm test

# 构建
pnpm build
```

---

## 🎯 添加新内容（最简步骤）

### 新项目
```bash
# 1. 复制模板
cp docs/templates/project.template.mdx content/projects/my-project.mdx

# 2. 编辑内容
# 3. 添加封面图到 public/images/projects/
# 4. 访问 http://localhost:3000/projects/my-project
```

### 新学习
```bash
# 1. 复制模板
cp docs/templates/learning.template.md content/learnings/my-learning.md

# 2. 编辑内容
# 3. 访问 http://localhost:3000/learnings
```
