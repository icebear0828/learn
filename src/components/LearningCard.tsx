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
      className="flex flex-col items-center justify-center h-full p-6 rounded-xl transition-colors relative overflow-hidden card-holographic"
      style={{
        background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Floating icon with glow effect */}
      <div
        className="mb-4 p-4 rounded-full icon-float relative"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.1))',
          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)'
        }}
      >
        <Icon size={48} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
        {/* Icon glow overlay */}
        <div
          className="absolute inset-0 rounded-full opacity-50 blur-md"
          style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent 70%)' }}
        />
      </div>
      <h3
        className="text-lg font-bold text-center mb-3"
        style={{ color: 'var(--text-primary)' }}
      >
        {localizedTopic}
      </h3>
      <span
        className={`px-4 py-1.5 text-xs font-semibold rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${categoryColorClass}`}
        style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
      >
        {learning.category}
      </span>
      <p className="mt-4 text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
        {t('card.clickToFlip')}
        <svg className="w-3 h-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </p>
    </div>
  );

  const backContent = (
    <div
      className="flex flex-col h-full p-6 rounded-xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, var(--bg-elevated) 50%, var(--bg-base) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
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
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                aria-hidden="true"
              />
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
          className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 mt-auto text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02]"
          style={{
            color: 'white',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {t('learnings.viewAll')}
          <FaExternalLinkAlt size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </a>
      )}
    </div>
  );

  return (
    <FlipCard
      front={frontContent}
      back={backContent}
      className="w-full h-[280px] group"
      aria-label={`Learning card: ${localizedTopic}. ${localizedSummary}`}
    />
  );
}

export { iconMap, getIconComponent, getCategoryColor };

