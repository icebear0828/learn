# Portfolio 类型定义

> 自动生成于 2026-01-12 | 完整 TypeScript 类型源码 (可直接复刻)

---

## src/types/index.ts

```typescript
export interface Project {
  slug: string;
  title: string;
  date: string;
  category: string;
  techStack: string[];
  description: string;
  coverImage: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  content: string;
}

export interface LearningCard {
  id: string;
  topic: string;
  category: string;
  icon: string;
  summary: string;
  details: string[];
  link?: string;
  date: string;
  content?: string;
}

export type ProjectCategory =
  | 'Web App'
  | 'Game'
  | 'AI/ML'
  | 'Automation'
  | 'Tool'
  | 'Other';

export type LearningCategory =
  | 'DevOps'
  | 'AI/Agent'
  | 'Backend'
  | 'Frontend'
  | 'Other';
```

---

## 组件 Props 类型

### FlipCard Props

```typescript
interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}
```

### ProjectCard Props

```typescript
interface ProjectCardProps {
  project: Project;
}
```

### LearningCard Props

```typescript
interface LearningCardProps {
  learning: LearningCard;
}
```

### TechStackIcon Props

```typescript
interface TechStackIconProps {
  tech: string;
  size?: number;
  showLabel?: boolean;
  className?: string;
}
```

### ProjectFilter Props

```typescript
interface ProjectFilterProps {
  categories: string[];
  techStacks: string[];
  selectedCategory: string;
  selectedTech: string;
  onCategoryChange: (category: string) => void;
  onTechChange: (tech: string) => void;
  onClear: () => void;
}
```

### ProjectsPageClient Props

```typescript
interface ProjectsPageClientProps {
  projects: Project[];
}
```

### LearningsPageClient Props

```typescript
interface LearningsPageClientProps {
  learnings: LearningCard[];
  categories: string[];
}
```

---

## 页面参数类型

### Project Detail Page

```typescript
interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}
```

---

## 图标类型

### TechStackIcon 映射

```typescript
import { IconType } from 'react-icons';

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
```

### LearningCard 图标映射

```typescript
const iconMap: Record<string, IconType> = {
  // FontAwesome icons
  FaRobot: FaRobot,
  FaServer: FaServer,
  FaCloud: FaCloud,
  FaDatabase: FaDatabase,
  FaCode: FaCode,
  FaBook: FaBook,
  FaCog: FaCog,
  FaTools: FaTools,
  FaLightbulb: FaLightbulb,
  FaBrain: FaBrain,
  FaNetworkWired: FaNetworkWired,
  FaLock: FaLock,
  FaChartLine: FaChartLine,
  FaTerminal: FaTerminal,
  FaMicrochip: FaMicrochip,
  FaProjectDiagram: FaProjectDiagram,

  // Simple Icons (tech-specific)
  SiTypescript: SiTypescript,
  SiJavascript: SiJavascript,
  SiPython: SiPython,
  SiReact: SiReact,
  SiNextdotjs: SiNextdotjs,
  SiDocker: SiDocker,
  SiKubernetes: SiKubernetes,
  SiGooglecloud: SiGooglecloud,
  SiAmazonwebservices: SiAmazonwebservices,
  SiRabbitmq: SiRabbitmq,
  SiApachekafka: SiApachekafka,
  SiGraphql: SiGraphql,
  SiMongodb: SiMongodb,
  SiPostgresql: SiPostgresql,
  SiRedis: SiRedis,
  SiTerraform: SiTerraform,
};
```

---

## 颜色映射类型

### LearningCard 分类颜色

```typescript
const colorMap: Record<string, string> = {
  'AI Architecture': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'AI/Agent': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Middleware: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Backend: 'bg-green-500/20 text-green-300 border-green-500/30',
  Frontend: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  DevOps: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  Database: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Security: 'bg-red-500/20 text-red-300 border-red-500/30',
  Other: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
};
```
