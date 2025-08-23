import React from 'react';

/**
 * 主题颜色预览组件
 * 此组件用于展示和测试 CSS 变量定义的主题颜色
 */
export const ThemePreview: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-2xl font-bold">主题颜色预览</h1>

      {/* 基础颜色 */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">基础颜色</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <ColorCard name="background" cssVar="--background" />
          <ColorCard name="foreground" cssVar="--foreground" />
          <ColorCard name="card" cssVar="--card" />
          <ColorCard name="card-foreground" cssVar="--card-foreground" />
          <ColorCard name="popover" cssVar="--popover" />
          <ColorCard name="popover-foreground" cssVar="--popover-foreground" />
          <ColorCard name="border" cssVar="--border" />
          <ColorCard name="input" cssVar="--input" />
          <ColorCard name="ring" cssVar="--ring" />
          <ColorCard name="muted" cssVar="--muted" />
          <ColorCard name="muted-foreground" cssVar="--muted-foreground" />
          <ColorCard name="destructive" cssVar="--destructive" />
          <ColorCard name="destructive-foreground" cssVar="--destructive-foreground" />
        </div>
      </section>

      {/* 主色调系列 */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">主色调系列</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <ColorCard name="primary" cssVar="--primary" tailwindClass="bg-primary" />
          <ColorCard name="primary-50" cssVar="--primary-50" tailwindClass="bg-primary-50" />
          <ColorCard name="primary-100" cssVar="--primary-100" tailwindClass="bg-primary-100" />
          <ColorCard name="primary-200" cssVar="--primary-200" tailwindClass="bg-primary-200" />
          <ColorCard name="primary-300" cssVar="--primary-300" tailwindClass="bg-primary-300" />
          <ColorCard name="primary-400" cssVar="--primary-400" tailwindClass="bg-primary-400" />
          <ColorCard name="primary-500" cssVar="--primary-500" tailwindClass="bg-primary-500" />
          <ColorCard name="primary-600" cssVar="--primary-600" tailwindClass="bg-primary-600" />
          <ColorCard name="primary-700" cssVar="--primary-700" tailwindClass="bg-primary-700" />
          <ColorCard name="primary-800" cssVar="--primary-800" tailwindClass="bg-primary-800" />
          <ColorCard name="primary-900" cssVar="--primary-900" tailwindClass="bg-primary-900" />
          <ColorCard name="primary-950" cssVar="--primary-950" tailwindClass="bg-primary-950" />
          <ColorCard name="primary-foreground" cssVar="--primary-foreground" />
        </div>
      </section>

      {/* 次色和强调色 */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">次色和强调色</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <ColorCard name="secondary" cssVar="--secondary" tailwindClass="bg-secondary" />
          <ColorCard name="secondary-foreground" cssVar="--secondary-foreground" />
          <ColorCard name="accent" cssVar="--accent" tailwindClass="bg-accent" />
          <ColorCard name="accent-foreground" cssVar="--accent-foreground" />
        </div>
      </section>

      {/* 主题切换 */}
      <section className="mt-12 flex justify-center">
        <ThemeSwitcher />
      </section>
    </div>
  );
};

/**
 * 颜色卡片组件
 */
const ColorCard: React.FC<{
  name: string;
  cssVar: string;
  tailwindClass?: string;
}> = ({ name, cssVar, tailwindClass }) => {
  // 从CSS变量中获取HSL值
  const getComputedColor = () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const hslValue = rootStyles.getPropertyValue(cssVar).trim();
    return `hsl(${hslValue})`;
  };

  return (
    <div className="overflow-hidden rounded-lg border shadow">
      <div
        className={`h-24 ${tailwindClass || ''}`}
        style={!tailwindClass ? { backgroundColor: getComputedColor() } : undefined}
      ></div>
      <div className="bg-card p-3">
        <p className="text-foreground font-medium">{name}</p>
        <p className="text-muted-foreground text-sm">var({cssVar})</p>
        <p className="mt-1 text-xs opacity-70">{tailwindClass || getComputedColor()}</p>
      </div>
    </div>
  );
};

/**
 * 主题切换器
 */
const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-primary hover:bg-primary-600 text-primary-foreground rounded-md px-4 py-2 shadow transition-colors"
    >
      切换到 {theme === 'light' ? '暗色' : '亮色'} 主题
    </button>
  );
};

export default ThemePreview;
