# Portfolio 测试文档

> 自动生成于 2026-01-12 | Vitest + React Testing Library 测试架构

---

## 1. 测试框架

| 工具 | 版本 | 用途 |
|------|------|------|
| Vitest | 4.0.17 | 测试运行器 |
| @testing-library/react | 16.3.1 | React 组件测试 |
| @testing-library/jest-dom | 6.9.1 | DOM 断言扩展 |
| jsdom | 27.4.0 | 浏览器环境模拟 |
| @vitest/coverage-v8 | 4.0.17 | 覆盖率报告 |

---

## 2. 配置

### vitest.config.ts

```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: { '@': './src' },
  },
});
```

### 测试命令

```bash
pnpm test          # 运行所有测试
pnpm test:ui       # 带 UI 界面
pnpm test:coverage # 覆盖率报告
```

---

## 3. 测试设置 (setup.ts)

**位置**: `src/test/setup.ts`

全局 Mock 配置：

```typescript
// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }) => 
    React.createElement('img', { src, alt, ...props }),
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }) => 
    React.createElement('a', { href, ...props }, children),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), ... }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));
```

---

## 4. 测试统计

| 测试文件 | 测试用例数 | 类型 |
|----------|------------|------|
| FlipCard.test.tsx | 19 | 组件测试 |
| Navbar.test.tsx | 19 | 组件测试 |
| ProjectCard.test.tsx | 13 | 组件测试 |
| TechStackIcon.test.tsx | 17 | 组件测试 |
| projects.test.ts | 10 | 单元测试 |
| learnings.test.ts | 10 | 单元测试 |
| **总计** | **~88** | - |

---

## 5. 组件测试详解

### 5.1 FlipCard.test.tsx

**测试分类**:

| 分类 | 测试数 | 描述 |
|------|--------|------|
| Initial Rendering | 5 | 正反面渲染、aria-hidden 初始状态 |
| Flip Interaction | 3 | 点击翻转、二次点击翻回 |
| Keyboard Accessibility | 4 | Enter/Space 键触发、Tab 无效 |
| Accessibility Attributes | 4 | role=button, aria-pressed, aria-label |
| Click Outside Behavior | 2 | 点击外部翻回、未翻转时不变 |
| Styling | 2 | cursor-pointer, perspective |

**关键测试模式**:

```typescript
// ARIA 状态断言
expect(card).toHaveAttribute('aria-pressed', 'false');
fireEvent.click(card);
expect(card).toHaveAttribute('aria-pressed', 'true');

// 键盘交互
fireEvent.keyDown(card, { key: 'Enter' });
expect(card).toHaveAttribute('aria-pressed', 'true');

// 点击外部
fireEvent.click(screen.getByTestId('outside'));
expect(card).toHaveAttribute('aria-pressed', 'false');
```

---

### 5.2 Navbar.test.tsx

**测试分类**:

| 分类 | 测试数 | 描述 |
|------|--------|------|
| Rendering | 3 | Logo、导航链接渲染 |
| Desktop Navigation | 2 | 桌面端链接可见 |
| Mobile Menu | 6 | 汉堡按钮、折叠展开、点击关闭 |
| Active Link Highlighting | 5 | 路由高亮验证 |
| Styling | 3 | sticky、z-index、backdrop-blur |
| Accessibility | 3 | navigation landmark、sr-only |

**Mock usePathname 模式**:

```typescript
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

beforeEach(() => {
  vi.mocked(usePathname).mockReturnValue('/');
});

it('should highlight Projects link when on projects page', () => {
  vi.mocked(usePathname).mockReturnValue('/projects');
  render(<Navbar />);
  // 验证高亮类
  expect(projectsLinks.some(link => 
    link.classList.contains('text-indigo-400')
  )).toBe(true);
});
```

---

### 5.3 ProjectCard.test.tsx

**测试分类**:

| 分类 | 测试数 | 描述 |
|------|--------|------|
| Front Side Rendering | 7 | 标题、分类徽章、封面图、技术栈标签 |
| Back Side Content | 2 | 描述、View Details 链接 |
| Accessibility | 2 | aria-label 验证 |
| Card Dimensions | 2 | w-full、h-80 |
| Flip Interaction | 1 | 点击翻转 |

**aria-hidden 内元素查询**:

```typescript
// 背面内容在 aria-hidden 容器内，需直接查询 DOM
const link = document.querySelector(
  'a[aria-label="View details for Test Project Title"]'
);
expect(link).toHaveAttribute('href', '/projects/test-project');
```

---

### 5.4 TechStackIcon.test.tsx

**测试分类**:

| 分类 | 测试数 | 描述 |
|------|--------|------|
| Component Rendering | 6 | 默认渲染、自定义 size、showLabel |
| Icon Mapping | 6 | React/Python/TypeScript 图标、大小写、Fallback |
| getIconForTech function | 4 | 大小写不敏感、trim、Fallback |
| techIconMap | 6 | 各类别技术验证、别名验证 |

**别名验证模式**:

```typescript
expect(techIconMap['react']).toBe(techIconMap['reactjs']);
expect(techIconMap['next.js']).toBe(techIconMap['nextjs']);
expect(techIconMap['typescript']).toBe(techIconMap['ts']);
```

---

## 6. 单元测试详解

### 6.1 projects.test.ts

**文件系统 Mock 模式**:

```typescript
const mockExistsSync = vi.fn();
const mockReaddirSync = vi.fn();
const mockReadFileSync = vi.fn();

vi.mock('fs', () => ({
  default: {
    existsSync: (...args) => mockExistsSync(...args),
    readdirSync: (...args) => mockReaddirSync(...args),
    readFileSync: (...args) => mockReadFileSync(...args),
  },
  existsSync: (...args) => mockExistsSync(...args),
  // ...
}));
```

**测试用例**:

| 函数 | 测试数 | 测试点 |
|------|--------|--------|
| getAllProjects | 4 | 目录不存在、日期排序、非 .mdx 过滤、解析错误处理 |
| getProjectBySlug | 3 | 目录不存在、直接匹配、全量搜索匹配 |
| getFeaturedProjects | 2 | featured 过滤、最多 6 个限制 |
| getAllProjectCategories | 1 | 唯一分类排序 |
| getProjectsByCategory | 1 | 分类筛选 |
| getAllProjectSlugs | 1 | slug 列表 |

---

### 6.2 learnings.test.ts

与 `projects.test.ts` 类似，测试 `getAllLearnings`, `getRecentLearnings`, `getLearningById` 等函数。

**测试数据示例**:

```typescript
const mockLearningContent = `---
topic: Docker Fundamentals
category: DevOps
icon: docker
summary: Understanding containerization basics
details:
  - Container basics
  - Dockerfile syntax
date: 2025-01-15
---

# Docker Fundamentals
Content about Docker.
`;
```

---

## 7. 测试最佳实践

### 7.1 测试结构

```typescript
describe('ComponentName', () => {
  describe('Category 1', () => {
    it('should do something', () => {});
    it('should do another thing', () => {});
  });
  
  describe('Category 2', () => {
    it('should handle edge case', () => {});
  });
});
```

### 7.2 清理

```typescript
beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.resetAllMocks();
});
```

### 7.3 查询优先级

1. `getByRole` - 最推荐，基于可访问性
2. `getByLabelText` - 表单元素
3. `getByText` - 文本内容
4. `getByTestId` - 最后手段

### 7.4 断言扩展

```typescript
import '@testing-library/jest-dom/vitest';

// 可用断言
expect(element).toBeInTheDocument();
expect(element).toHaveAttribute('aria-pressed', 'true');
expect(element).toHaveClass('custom-class');
expect(element).toHaveStyle({ perspective: '1000px' });
```

---

## 8. 覆盖率

运行 `pnpm test:coverage` 生成覆盖率报告。

排除项 (vitest.config.ts):
- `src/**/*.test.{ts,tsx}`
- `src/**/*.spec.{ts,tsx}`
- `src/test/**`
- `src/types/**`
