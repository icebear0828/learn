/**
 * Tech Stack Icon Configuration
 * 
 * This file contains the configuration for mapping technology names
 * to their corresponding react-icons components. Edit this file to
 * add, modify, or remove tech stack icon mappings.
 */

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

/**
 * Configuration for a tech stack icon
 */
export interface TechIconConfig {
    icon: IconType;
    color?: string;
    aliases?: string[];
}

/**
 * Default icon for unrecognized technologies
 */
export const DEFAULT_ICON = FaCode;

/**
 * Tech stack icon configuration map
 * Key: Normalized tech name (lowercase)
 * Value: Icon configuration with optional color and aliases
 */
export const techIconConfig: Record<string, TechIconConfig> = {
    // Frontend Frameworks
    react: {
        icon: FaReact,
        color: '#61DAFB',
        aliases: ['react.js', 'reactjs'],
    },
    vue: {
        icon: SiVuedotjs,
        color: '#4FC08D',
        aliases: ['vue.js', 'vuejs'],
    },
    svelte: {
        icon: SiSvelte,
        color: '#FF3E00',
    },
    angular: {
        icon: SiAngular,
        color: '#DD0031',
    },

    // JavaScript/TypeScript
    typescript: {
        icon: SiTypescript,
        color: '#3178C6',
        aliases: ['ts'],
    },
    javascript: {
        icon: SiJavascript,
        color: '#F7DF1E',
        aliases: ['js'],
    },

    // Meta-frameworks
    'next.js': {
        icon: SiNextdotjs,
        color: '#000000',
        aliases: ['nextjs', 'next'],
    },
    vite: {
        icon: SiVite,
        color: '#646CFF',
    },

    // CSS
    tailwind: {
        icon: SiTailwindcss,
        color: '#06B6D4',
        aliases: ['tailwindcss', 'tailwind css'],
    },
    css: {
        icon: FaCss3Alt,
        color: '#1572B6',
        aliases: ['css3'],
    },
    html: {
        icon: FaHtml5,
        color: '#E34F26',
        aliases: ['html5'],
    },

    // Backend Languages
    'node.js': {
        icon: FaNodeJs,
        color: '#339933',
        aliases: ['nodejs', 'node'],
    },
    python: {
        icon: FaPython,
        color: '#3776AB',
    },
    rust: {
        icon: SiRust,
        color: '#000000',
    },
    go: {
        icon: SiGo,
        color: '#00ADD8',
        aliases: ['golang'],
    },
    'c++': {
        icon: SiCplusplus,
        color: '#00599C',
        aliases: ['cpp'],
    },
    'c#': {
        icon: FaCode,
        color: '#239120',
        aliases: ['csharp'],
    },
    kotlin: {
        icon: SiKotlin,
        color: '#7F52FF',
    },
    swift: {
        icon: SiSwift,
        color: '#FA7343',
    },

    // Game Development
    godot: {
        icon: SiGodotengine,
        color: '#478CBF',
        aliases: ['gdscript', 'godot engine'],
    },

    // Mobile/Desktop
    flutter: {
        icon: SiFlutter,
        color: '#02569B',
    },
    electron: {
        icon: SiElectron,
        color: '#47848F',
    },

    // AI/ML
    openai: {
        icon: SiOpenai,
        color: '#412991',
        aliases: ['openai api', 'gpt', 'gpt-4'],
    },
    ai: {
        icon: FaRobot,
        color: '#8B5CF6',
        aliases: ['ai/ml', 'llm'],
    },

    // Databases
    mongodb: {
        icon: SiMongodb,
        color: '#47A248',
        aliases: ['mongo'],
    },
    postgresql: {
        icon: SiPostgresql,
        color: '#4169E1',
        aliases: ['postgres'],
    },
    redis: {
        icon: SiRedis,
        color: '#DC382D',
    },
    database: {
        icon: FaDatabase,
        color: '#6B7280',
        aliases: ['db', 'sql'],
    },
    prisma: {
        icon: SiPrisma,
        color: '#2D3748',
    },
    graphql: {
        icon: SiGraphql,
        color: '#E10098',
    },
    supabase: {
        icon: SiSupabase,
        color: '#3ECF8E',
    },
    firebase: {
        icon: SiFirebase,
        color: '#FFCA28',
    },

    // DevOps & Cloud
    docker: {
        icon: FaDocker,
        color: '#2496ED',
    },
    kubernetes: {
        icon: SiKubernetes,
        color: '#326CE5',
        aliases: ['k8s'],
    },
    aws: {
        icon: SiAmazonwebservices,
        color: '#FF9900',
        aliases: ['amazon web services'],
    },
    vercel: {
        icon: SiVercel,
        color: '#000000',
    },
    cloud: {
        icon: FaCloud,
        color: '#4A90D9',
    },

    // Tools
    git: {
        icon: FaGitAlt,
        color: '#F05032',
        aliases: ['github'],
    },
    server: {
        icon: FaServer,
        color: '#6B7280',
    },
};

/**
 * Get icon for a technology name
 * Supports exact match and alias matching
 * @param tech - Technology name
 * @returns Icon component
 */
export function getTechIcon(tech: string): IconType {
    const normalized = tech.toLowerCase().trim();

    // Direct match
    if (techIconConfig[normalized]) {
        return techIconConfig[normalized].icon;
    }

    // Alias match
    for (const [, config] of Object.entries(techIconConfig)) {
        if (config.aliases?.includes(normalized)) {
            return config.icon;
        }
    }

    // Default
    return DEFAULT_ICON;
}

/**
 * Get icon color for a technology name
 * @param tech - Technology name
 * @returns Color string or undefined
 */
export function getTechColor(tech: string): string | undefined {
    const normalized = tech.toLowerCase().trim();

    // Direct match
    if (techIconConfig[normalized]) {
        return techIconConfig[normalized].color;
    }

    // Alias match
    for (const [, config] of Object.entries(techIconConfig)) {
        if (config.aliases?.includes(normalized)) {
            return config.color;
        }
    }

    return undefined;
}
