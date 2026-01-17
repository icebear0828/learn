/**
 * Theme Configuration - Single Source of Truth
 * 
 * 添加新主题时只需在此文件添加条目，其他组件会自动读取
 */

export interface ThemeMetadata {
    id: string;
    name: string;
    emoji: string;
    isDark: boolean;
    /** 切换深色/浅色时的对应主题 */
    counterpart: string;
}

/**
 * 主题元数据配置
 * 
 * 添加新主题步骤:
 * 1. 在 src/themes/ 创建 CSS 文件
 * 2. 在 src/themes/index.css 添加 @import
 * 3. 在此处添加主题条目
 */
export const THEME_CONFIG: ThemeMetadata[] = [
    { id: 'dark-elegance', name: 'Dark Elegance', emoji: '🌙', isDark: true, counterpart: 'light-clean' },
    { id: 'light-clean', name: 'Light Clean', emoji: '☀️', isDark: false, counterpart: 'dark-elegance' },
    { id: 'ocean-blue', name: 'Ocean Blue', emoji: '🌊', isDark: true, counterpart: 'light-clean' },
    { id: 'forest-green', name: 'Forest Green', emoji: '🌲', isDark: true, counterpart: 'light-clean' },
    { id: 'sunset-orange', name: 'Sunset Orange', emoji: '🔥', isDark: true, counterpart: 'sakura-pink' },
    { id: 'royal-purple', name: 'Royal Purple', emoji: '💜', isDark: true, counterpart: 'sakura-pink' },
    { id: 'sakura-pink', name: 'Sakura Pink', emoji: '🌸', isDark: false, counterpart: 'royal-purple' },
];

// 自动派生的常量 (无需手动维护)
export const ALL_THEMES = THEME_CONFIG.map(t => t.id);
export const DARK_THEMES = THEME_CONFIG.filter(t => t.isDark).map(t => t.id);
export const LIGHT_THEMES = THEME_CONFIG.filter(t => !t.isDark).map(t => t.id);

export const THEME_INFO: Record<string, Omit<ThemeMetadata, 'id' | 'counterpart'>> =
    Object.fromEntries(THEME_CONFIG.map(t => [t.id, { name: t.name, emoji: t.emoji, isDark: t.isDark }]));

export const LIGHT_COUNTERPARTS: Record<string, string> =
    Object.fromEntries(THEME_CONFIG.map(t => [t.id, t.counterpart]));

export const DEFAULT_THEME = 'dark-elegance';
export const DEFAULT_LIGHT_THEME = 'light-clean';
