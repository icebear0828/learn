#!/usr/bin/env python3
"""
Podcast MP3 Processor

自动处理 podcasts-inbox/ 目录中的 MP3 文件：
1. 解析文件名获取日期和标题 (格式: YYYY-MM-DD-标题.mp3)
2. 提取 MP3 时长
3. 生成 content/podcasts/{slug}.md
4. 移动 MP3 到 public/audio/podcasts/

用法:
    uv run scripts/process-podcast.py
"""

import os
import re
import shutil
import logging
from pathlib import Path
from datetime import datetime

try:
    from mutagen.mp3 import MP3
    HAS_MUTAGEN = True
except ImportError:
    HAS_MUTAGEN = False
    print("Warning: mutagen not installed. Duration will default to 00:00")
    print("Install with: uv add mutagen")

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# 目录配置
PROJECT_ROOT = Path(__file__).parent.parent
INBOX_DIR = PROJECT_ROOT / "podcasts-inbox"
CONTENT_DIR = PROJECT_ROOT / "content" / "podcasts"
AUDIO_DIR = PROJECT_ROOT / "public" / "audio" / "podcasts"


def parse_filename(filename: str) -> tuple[str, str, str]:
    """
    解析文件名获取日期、标题和 slug
    
    支持格式:
    - 2026-01-19-AI代理的未来.mp3
    - 2026-01-19-future-of-ai.mp3
    
    Returns:
        (date, title, slug)
    """
    # 移除扩展名
    name = filename.rsplit('.', 1)[0]
    
    # 匹配日期 + 标题模式
    pattern = r'^(\d{4}-\d{2}-\d{2})-(.+)$'
    match = re.match(pattern, name)
    
    if match:
        date = match.group(1)
        title = match.group(2)
        # 生成 slug: 日期-标题（转换为小写，替换空格为短横线）
        slug = f"{date}-{title.lower().replace(' ', '-').replace('_', '-')}"
        return date, title, slug
    else:
        # 无法解析，使用当前日期
        today = datetime.now().strftime("%Y-%m-%d")
        return today, name, f"{today}-{name.lower().replace(' ', '-')}"


def get_duration(filepath: Path) -> str:
    """
    获取 MP3 时长，返回 MM:SS 格式
    """
    if not HAS_MUTAGEN:
        return "00:00"
    
    try:
        audio = MP3(filepath)
        total_seconds = int(audio.info.length)
        minutes = total_seconds // 60
        seconds = total_seconds % 60
        return f"{minutes:02d}:{seconds:02d}"
    except Exception as e:
        logger.warning(f"Failed to get duration: {e}")
        return "00:00"


def generate_markdown(date: str, title: str, slug: str, duration: str) -> str:
    """
    生成播客 Markdown 文件内容
    """
    return f"""---
title: "{title}"
description: ""
date: "{date}"
category: "Tech"
duration: "{duration}"
audioUrl: "/audio/podcasts/{slug}.mp3"
featured: false
---

"""


def process_mp3(mp3_file: Path) -> bool:
    """
    处理单个 MP3 文件
    
    Returns:
        True if successful, False otherwise
    """
    logger.info(f"Processing: {mp3_file.name}")
    
    # 解析文件名
    date, title, slug = parse_filename(mp3_file.name)
    logger.info(f"  Date: {date}, Title: {title}, Slug: {slug}")
    
    # 获取时长
    duration = get_duration(mp3_file)
    logger.info(f"  Duration: {duration}")
    
    # 确保目录存在
    CONTENT_DIR.mkdir(parents=True, exist_ok=True)
    AUDIO_DIR.mkdir(parents=True, exist_ok=True)
    
    # 生成 Markdown
    md_path = CONTENT_DIR / f"{slug}.md"
    if md_path.exists():
        logger.warning(f"  Markdown already exists: {md_path}")
        return False
    
    md_content = generate_markdown(date, title, slug, duration)
    md_path.write_text(md_content, encoding='utf-8')
    logger.info(f"  Created: {md_path}")
    
    # 移动 MP3
    audio_dest = AUDIO_DIR / f"{slug}.mp3"
    if audio_dest.exists():
        logger.warning(f"  Audio already exists: {audio_dest}")
        return False
    
    shutil.move(str(mp3_file), str(audio_dest))
    logger.info(f"  Moved to: {audio_dest}")
    
    return True


def main() -> None:
    """主入口"""
    logger.info("=" * 50)
    logger.info("Podcast MP3 Processor")
    logger.info("=" * 50)
    
    # 检查 inbox 目录
    if not INBOX_DIR.exists():
        logger.info(f"Creating inbox directory: {INBOX_DIR}")
        INBOX_DIR.mkdir(parents=True)
    
    # 扫描 MP3 文件
    mp3_files = list(INBOX_DIR.glob("*.mp3"))
    
    if not mp3_files:
        logger.info("No MP3 files found in inbox.")
        logger.info(f"Drop your MP3 files into: {INBOX_DIR}")
        return
    
    logger.info(f"Found {len(mp3_files)} MP3 file(s)")
    
    # 处理每个文件
    success_count = 0
    for mp3_file in mp3_files:
        try:
            if process_mp3(mp3_file):
                success_count += 1
        except Exception as e:
            logger.error(f"Error processing {mp3_file.name}: {e}")
    
    logger.info("=" * 50)
    logger.info(f"Processed: {success_count}/{len(mp3_files)} files")
    logger.info("=" * 50)


if __name__ == "__main__":
    main()
