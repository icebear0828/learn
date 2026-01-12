'use client';

import { IconType } from 'react-icons';
import {
  FaReact,
  FaPython,
  FaNodeJs,
  FaCode,
  FaDocker,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaDatabase,
  FaRobot,
  FaServer,
  FaCloud,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiGodotengine,
  SiTailwindcss,
  SiOpenai,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiGraphql,
  SiPrisma,
  SiVercel,
  SiVite,
  SiRust,
  SiGo,
  SiCplusplus,
  SiKotlin,
  SiSwift,
  SiFlutter,
  SiVuedotjs,
  SiSvelte,
  SiAngular,
  SiSupabase,
  SiFirebase,
  SiAmazonwebservices,
  SiKubernetes,
  SiElectron,
} from 'react-icons/si';

interface TechStackIconProps {
  tech: string;
  size?: number;
  showLabel?: boolean;
  className?: string;
}

/**
 * 技术栈名称到 react-icons 图标的映射
 * 支持大小写不敏感匹配
 */
const techIconMap: Record<string, IconType> = {
  // Frontend
  react: FaReact,
  'react.js': FaReact,
  reactjs: FaReact,
  vue: SiVuedotjs,
  'vue.js': SiVuedotjs,
  vuejs: SiVuedotjs,
  svelte: SiSvelte,
  angular: SiAngular,

  // JavaScript/TypeScript
  typescript: SiTypescript,
  ts: SiTypescript,
  javascript: SiJavascript,
  js: SiJavascript,

  // Meta-frameworks
  'next.js': SiNextdotjs,
  nextjs: SiNextdotjs,
  next: SiNextdotjs,
  vite: SiVite,

  // CSS
  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  'tailwind css': SiTailwindcss,
  css: FaCss3Alt,
  css3: FaCss3Alt,
  html: FaHtml5,
  html5: FaHtml5,

  // Backend
  'node.js': FaNodeJs,
  nodejs: FaNodeJs,
  node: FaNodeJs,
  python: FaPython,
  rust: SiRust,
  go: SiGo,
  golang: SiGo,
  'c++': SiCplusplus,
  cpp: SiCplusplus,
  'c#': FaCode,
  csharp: FaCode,
  kotlin: SiKotlin,
  swift: SiSwift,

  // Game Development
  godot: SiGodotengine,
  gdscript: SiGodotengine,
  'godot engine': SiGodotengine,

  // Mobile
  flutter: SiFlutter,
  electron: SiElectron,

  // AI/ML
  openai: SiOpenai,
  'openai api': SiOpenai,
  gpt: SiOpenai,
  'gpt-4': SiOpenai,
  ai: FaRobot,
  'ai/ml': FaRobot,
  llm: FaRobot,

  // Databases
  mongodb: SiMongodb,
  mongo: SiMongodb,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  redis: SiRedis,
  database: FaDatabase,
  db: FaDatabase,
  sql: FaDatabase,
  prisma: SiPrisma,
  graphql: SiGraphql,
  supabase: SiSupabase,
  firebase: SiFirebase,

  // DevOps & Cloud
  docker: FaDocker,
  kubernetes: SiKubernetes,
  k8s: SiKubernetes,
  aws: SiAmazonwebservices,
  'amazon web services': SiAmazonwebservices,
  vercel: SiVercel,
  cloud: FaCloud,

  // Tools
  git: FaGitAlt,
  github: FaGitAlt,
  server: FaServer,
};

/**
 * 获取技术栈对应的图标组件
 * @param tech 技术栈名称
 * @returns 对应的图标组件，未找到则返回默认图标
 */
function getIconForTech(tech: string): IconType {
  const normalizedTech = tech.toLowerCase().trim();
  return techIconMap[normalizedTech] || FaCode;
}

/**
 * TechStackIcon - 技术栈图标组件
 *
 * 根据技术栈名称自动匹配对应的 react-icons 图标
 * 支持可选的文字标签显示
 */
export default function TechStackIcon({
  tech,
  size = 24,
  showLabel = false,
  className = '',
}: TechStackIconProps) {
  const Icon = getIconForTech(tech);

  return (
    <div
      className={`inline-flex items-center gap-2 ${className}`}
      title={tech}
    >
      <Icon size={size} aria-hidden="true" />
      {showLabel && (
        <span className="text-sm font-medium">{tech}</span>
      )}
    </div>
  );
}

/**
 * 导出图标映射函数，供其他组件使用
 */
export { getIconForTech, techIconMap };
