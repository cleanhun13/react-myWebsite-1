# 🚀 科技感主题系统

基于 **Tailwind CSS 4** 和 **Zustand** 构建的现代化科技感主题系统，提供 Light 和 Dark 两种主题模式，具有流畅的切换动画和丰富的 UI 组件。

## ✨ 特性

### 🎨 主题系统

- **三种主题模式**：Light、Dark、System（跟随系统）
- **平滑切换动画**：使用 CSS 过渡效果实现流畅的主题切换
- **持久化存储**：使用 Zustand persist 中间件保存用户偏好
- **响应式设计**：完美适配各种设备尺寸

### 🎭 科技感设计

- **现代配色方案**：精心设计的科技感配色
- **动态效果**：悬停动画、发光效果、渐变背景
- **毛玻璃效果**：现代感十足的半透明背景
- **科技感动画**：加载动画、脉冲效果、缩放过渡

### 🧩 组件库

- **TechCard**：多种变体的科技感卡片
- **TechButton**：丰富样式的按钮组件
- **TechInput**：科技感输入框组件
- **ThemeToggle**：多种样式的主题切换器

## 📦 安装与使用

### 1. 克隆项目

```bash
git clone <repository-url>
cd MyWebsiteDemo
```

### 2. 安装依赖

```bash
npm install
# 或
pnpm install
```

### 3. 启动开发服务器

```bash
npm run dev
# 或
pnpm dev
```

### 4. 访问演示页面

打开浏览器访问 `http://localhost:5173/demo` 查看完整的组件演示。

## 🛠️ 技术栈

- **React 19** - UI 框架
- **TypeScript** - 类型安全
- **Tailwind CSS 4** - 样式框架
- **Zustand** - 状态管理
- **Vite** - 构建工具
- **Lucide React** - 图标库

## 🎯 核心组件

### ThemeToggle 主题切换器

```tsx
import { ThemeToggle } from './components/molecules';

// 按钮样式
<ThemeToggle variant="button" size="lg" />

// 下拉菜单样式
<ThemeToggle variant="dropdown" showLabel />

// 切换开关样式
<ThemeToggle variant="switch" showLabel />
```

### TechCard 科技感卡片

```tsx
import { TechCard } from './components/atoms';

// 默认卡片
<TechCard variant="default">
  <h3>标题</h3>
  <p>内容</p>
</TechCard>

// 毛玻璃效果
<TechCard variant="glass">
  内容
</TechCard>

// 渐变边框
<TechCard variant="gradient">
  内容
</TechCard>

// 发光效果
<TechCard variant="glow">
  内容
</TechCard>
```

### TechButton 科技感按钮

```tsx
import { TechButton } from './components/atoms';
import { Star } from 'lucide-react';

// 主要按钮
<TechButton variant="primary" icon={<Star />}>
  主要操作
</TechButton>

// 渐变按钮
<TechButton variant="gradient">
  渐变效果
</TechButton>

// 发光按钮
<TechButton variant="glow">
  发光效果
</TechButton>

// 加载状态
<TechButton loading={true}>
  加载中...
</TechButton>
```

### TechInput 科技感输入框

```tsx
import { TechInput } from './components/atoms';
import { Mail } from 'lucide-react';

// 基础输入框
<TechInput
  label="邮箱"
  type="email"
  placeholder="请输入邮箱"
  icon={<Mail />}
/>

// 发光效果
<TechInput
  variant="glow"
  label="密码"
  type="password"
/>

// 毛玻璃效果
<TechInput
  variant="glass"
  placeholder="搜索..."
/>
```

## 🎨 主题配置

### CSS 变量

主题系统使用 CSS 变量定义颜色，支持 Light 和 Dark 两种模式：

```css
/* Light Theme */
:root {
  --background: 220 24% 98%;
  --foreground: 220 26% 14%;
  --primary: 200 98% 39%;
  --secondary: 220 13% 91%;
  --accent: 158 64% 52%;
  /* ... 更多变量 */
}

/* Dark Theme */
.dark {
  --background: 220 26% 7%;
  --foreground: 220 24% 98%;
  --primary: 200 98% 74%;
  /* ... 更多变量 */
}
```

### Tailwind 配置

```javascript
// tailwind.config.js
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        // ... 更多颜色
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        glow: 'glow 2s ease-in-out infinite alternate',
        // ... 更多动画
      },
    },
  },
};
```

## 🔧 状态管理

使用 Zustand 管理主题状态：

```typescript
import { useThemeStore } from './store/useThemeStore';

const Component = () => {
  const { theme, isDark, setTheme, toggleTheme } = useThemeStore();

  return (
    <div>
      <p>当前主题: {theme}</p>
      <button onClick={() => setTheme('dark')}>切换到暗色</button>
      <button onClick={toggleTheme}>切换主题</button>
    </div>
  );
};
```

## 🎭 特殊效果

### 毛玻璃效果

```css
.glass-effect {
  backdrop-filter: blur(16px) saturate(180%);
  background-color: hsl(var(--background) / 0.8);
  border: 1px solid hsl(var(--border) / 0.2);
}
```

### 发光效果

```css
.glow {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}
```

### 渐变背景

```css
.gradient-bg {
  background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
}
```

## 📱 响应式设计

所有组件都支持响应式设计：

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  <TechCard>移动端: 1列</TechCard>
  <TechCard>平板: 2列</TechCard>
  <TechCard>桌面: 3列</TechCard>
</div>
```

## 🚀 部署

### 构建生产版本

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests 来改进这个项目！

## 📄 许可证

MIT License

---

**享受科技感的编程体验！** 🚀✨
