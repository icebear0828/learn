/**
 * Bilingual string type for i18n content
 */
export interface LocalizedString {
  zh: string;
  en: string;
}

/**
 * Valid project categories
 */
export type ProjectCategory =
  | 'Web App'
  | 'Game'
  | 'AI/ML'
  | 'Automation'
  | 'Tool'
  | 'Other';

/**
 * Valid learning categories
 */
export type LearningCategory =
  | 'DevOps'
  | 'AI/Agent'
  | 'Backend'
  | 'Frontend'
  | 'Other';

/**
 * Project data structure with bilingual support
 */
export interface Project {
  slug: string;
  title: LocalizedString | string;       // 支持双语或单语
  description: LocalizedString | string; // 支持双语或单语
  date: string;
  category: ProjectCategory;
  techStack: string[];
  coverImage: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  content: string;
}

/**
 * Learning card data structure with bilingual support
 */
export interface LearningCard {
  id: string;
  topic: LocalizedString | string;   // 支持双语或单语
  summary: LocalizedString | string; // 支持双语或单语
  category: LearningCategory;
  icon: string;
  details: string[];
  link?: string;
  date: string;
  content?: string;
}
