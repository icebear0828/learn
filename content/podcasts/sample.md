---
title: "示例播客"
description:
  zh: "这是一个示例播客，用于测试系统"
  en: "This is a sample podcast for testing the system"
date: "2026-01-19"
category: "Tech"
duration: "05:00"
audioUrl: "/audio/podcasts/sample.mp3"
featured: true
---

这是示例播客的文字稿内容。

你可以将 MP3 文件放入 `podcasts-inbox/` 目录，然后运行：

```bash
uv run scripts/process-podcast.py
```

脚本会自动：
1. 解析文件名获取日期和标题
2. 提取 MP3 时长
3. 生成 Markdown 文件
4. 移动 MP3 到正确位置
