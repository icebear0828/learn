'use client';

import { IconType } from 'react-icons';
import {
  FaRobot,
  FaServer,
  FaCloud,
  FaDatabase,
  FaCode,
  FaBook,
  FaCog,
  FaTools,
  FaLightbulb,
  FaBrain,
  FaNetworkWired,
  FaLock,
  FaChartLine,
  FaTerminal,
  FaMicrochip,
  FaProjectDiagram,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiDocker,
  SiKubernetes,
  SiGooglecloud,
  SiAmazonwebservices,
  SiRabbitmq,
  SiApachekafka,
  SiGraphql,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiTerraform,
} from 'react-icons/si';

import { LearningCard as LearningCardType } from '@/types';
import FlipCard from './FlipCard';
import { useLanguage } from '@/i18n/LanguageContext';
import { useLocalizedContent } from '@/i18n/useLocalizedContent';

interface LearningCardProps {
  learning: LearningCardType;
}

/**
 * 图标名称到 react-icons 组件的映射
 */
const iconMap: Record<string, IconType> = {
  FaRobot, FaServer, FaCloud, FaDatabase, FaCode, FaBook, FaCog, FaTools,
  FaLightbulb, FaBrain, FaNetworkWired, FaLock, FaChartLine, FaTerminal,
  FaMicrochip, FaProjectDiagram,
  SiTypescript, SiJavascript, SiPython, SiReact, SiNextdotjs, SiDocker,
  SiKubernetes, SiGooglecloud, SiAmazonwebservices, SiRabbitmq, SiApachekafka,
  SiGraphql, SiMongodb, SiPostgresql, SiRedis, SiTerraform,
};

function getIconComponent(iconName: string): IconType {
  return iconMap[iconName] || FaCode;
}

function getCategoryColor(category: string): string {
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
  return colorMap[category] || colorMap['Other'];
}

/**
 * LearningCard with i18n support
 */
export default function LearningCard({ learning }: LearningCardProps) {
  const Icon = getIconComponent(learning.icon);
  const categoryColorClass = getCategoryColor(learning.category);
  const { t } = useLanguage();
  const { localize } = useLocalizedContent();

  const localizedTopic = localize(learning.topic);
  const localizedSummary = localize(learning.summary);

  const frontContent = (
    <div
      className="flex flex-col items-center justify-center h-full p-6 rounded-xl transition-colors"
      style={{
        background: 'linear-gradient(to bottom right, var(--bg-surface), var(--bg-elevated))',
        border: '1px solid var(--border-default)'
      }}
    >
      <div
        className="mb-4 p-4 rounded-full icon-float"
        style={{ backgroundColor: 'color-mix(in srgb, var(--bg-elevated) 50%, transparent)' }}
      >
        <Icon size={48} style={{ color: 'var(--text-secondary)' }} aria-hidden="true" />
      </div>
      <h3
        className="text-lg font-semibold text-center mb-3"
        style={{ color: 'var(--text-primary)' }}
      >
        {localizedTopic}
      </h3>
      <span className={`px-3 py-1 text-xs font-medium rounded-full border tag-pulse transition-all duration-200 ${categoryColorClass}`}>
        {learning.category}
      </span>
      <p className="mt-4 text-xs" style={{ color: 'var(--text-muted)' }}>
        {t('card.clickToFlip')}
      </p>
    </div>
  );

  const backContent = (
    <div
      className="flex flex-col h-full p-6 rounded-xl overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom right, var(--bg-elevated), var(--bg-base))',
        border: '1px solid var(--border-default)'
      }}
    >
      <p
        className="text-sm mb-4 leading-relaxed"
        style={{ color: 'var(--text-secondary)' }}
      >
        {localizedSummary}
      </p>
      {learning.details && learning.details.length > 0 && (
        <ul className="flex-1 space-y-2 overflow-y-auto mb-4">
          {learning.details.map((detail, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm"
              style={{ color: 'var(--text-muted)' }}
            >
              <span style={{ color: 'var(--text-muted)' }} className="mt-0.5" aria-hidden="true">&#8226;</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}
      {learning.link && (
        <a
          href={learning.link}
          target={learning.link.startsWith('http') ? '_blank' : undefined}
          rel={learning.link.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 mt-auto text-sm font-medium rounded-lg transition-all duration-200 btn-arrow-slide hover:brightness-110"
          style={{
            color: 'var(--text-primary)',
            backgroundColor: 'var(--bg-surface)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {t('learnings.viewAll')}
          <FaExternalLinkAlt size={12} aria-hidden="true" />
        </a>
      )}
    </div>
  );

  return (
    <FlipCard
      front={frontContent}
      back={backContent}
      className="w-full h-[280px]"
      aria-label={`Learning card: ${localizedTopic}. ${localizedSummary}`}
    />
  );
}

export { iconMap, getIconComponent, getCategoryColor };

