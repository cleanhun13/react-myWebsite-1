# 组件架构说明

本项目采用**原子设计系统(Atomic Design)**来组织React组件，将UI组件分为三个层级：

## 📁 目录结构

```
src/components/
├── atoms/           # 原子组件 - 最基础的UI元素
├── molecules/       # 分子组件 - 原子组件的组合
├── organisms/       # 结构组件 - 复杂的页面结构
└── index.ts         # 统一导出文件
```

## 🔬 组件分类

### 原子组件 (Atoms)

最基础、不可再分的UI组件，如按钮、图标、输入框等。

**当前组件:**

- `MyIcon` - 自定义SVG图标组件 (IPddos, ShowListButton)
- `CardIcon` - 带图标的卡片组件
- `DynamicIcon` - 动态加载的图标组件
- `SvgLoader` - SVG加载器组件
- `SideNavigationSeparator` - 侧边导航分隔器

### 分子组件 (Molecules)

由多个原子组件组合而成的复合组件。

**当前组件:**

- `EncryptIcons` - 加密相关图标组合
- `ThemeToggle` - 主题切换按钮
- `ModeToggle` - 模式切换组件

### 结构组件 (Organisms)

复杂的页面结构组件，通常包含多个分子和原子组件。

**当前组件:**

- `Navbar` - 导航栏组件
- `Footer` - 页脚组件
- `AuthForm` - 认证表单组件
- `AuthCard` - 认证卡片组件
- `ThemeProvider` - 主题提供者组件

## 📦 使用方式

### 从主入口导入

```typescript
import {
  // 原子组件
  IPddos,
  ShowListButton,
  CardIcon,
  DynamicIcon,
  SvgLoader,

  // 分子组件
  ThemeToggle,
  ModeToggle,

  // 结构组件
  Navbar,
  Footer,
  AuthCard,
} from '@/components';
```

### 从分类目录导入

```typescript
// 只导入原子组件
import { IPddos, CardIcon } from '@/components/atoms';

// 只导入分子组件
import { ThemeToggle } from '@/components/molecules';

// 只导入结构组件
import { Navbar, Footer } from '@/components/organisms';
```

## 🎨 设计原则

1. **原子组件**应该是纯展示组件，不包含业务逻辑
2. **分子组件**可以包含简单的交互逻辑
3. **结构组件**可以包含复杂的业务逻辑和状态管理
4. 组件间的依赖关系应该是单向的：Organisms → Molecules → Atoms

## 🔄 组件重构指南

当添加新组件时，请考虑：

1. **这个组件能否进一步拆分？** → 考虑放入 atoms
2. **这个组件是否由基础组件组合而成？** → 考虑放入 molecules
3. **这个组件是否承担页面结构职责？** → 考虑放入 organisms

## 📋 TODO

- [ ] 添加组件的 Storybook 文档
- [ ] 为每个组件添加 TypeScript 类型定义
- [ ] 统一组件的 props 接口规范
- [ ] 添加组件单元测试
