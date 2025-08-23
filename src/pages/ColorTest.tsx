/**
 * CSS 变量颜色测试组件
 * 用于验证 CSS 变量与 Tailwind 颜色系统的集成
 */
import React from 'react';

export const ColorTest: React.FC = () => {
  const openRgbTest = () => {
    window.open('/rgb-test.html', '_blank');
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">颜色测试</h1>

      {/* 测试直接使用 Tailwind 类 */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-medium">Tailwind 类测试</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <ColorBlock name="bg-primary" className="bg-primary" />
          <ColorBlock name="bg-primary-500" className="bg-primary-500" />
          <ColorBlock name="bg-sky-500" className="bg-sky-500" />
          <ColorBlock name="bg-red-500" className="bg-red-500" />
        </div>
      </div>

      {/* 测试内联样式使用 CSS 变量 */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-medium">内联样式测试 (HSL)</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <ColorBlock name="--primary (HSL)" style={{ backgroundColor: 'hsl(var(--primary))' }} />
          <ColorBlock
            name="--primary-500 (HSL)"
            style={{ backgroundColor: 'hsl(var(--primary-500))' }}
          />
          <ColorBlock
            name="--primary with opacity (HSL)"
            style={{ backgroundColor: 'hsl(var(--primary) / 0.5)' }}
          />
        </div>
      </div>

      {/* 测试RGB变量 */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-medium">内联样式测试 (RGB)</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <ColorBlock name="--primary-rgb" style={{ backgroundColor: 'rgb(var(--primary-rgb))' }} />
          <ColorBlock
            name="--primary-500-rgb"
            style={{ backgroundColor: 'rgb(var(--primary-500-rgb))' }}
          />
          <ColorBlock
            name="--primary-rgb with opacity"
            style={{ backgroundColor: 'rgb(var(--primary-rgb) / 0.5)' }}
          />
        </div>
      </div>

      {/* 测试组合使用 */}
      <div>
        <h2 className="mb-4 text-lg font-medium">文本和背景色组合</h2>
        <div className="space-y-4">
          <div className="bg-primary text-primary-foreground rounded-md p-4">
            主色背景，主色前景文本
          </div>
          <div className="bg-secondary text-secondary-foreground rounded-md p-4">
            次色背景，次色前景文本
          </div>
          <div className="bg-accent text-accent-foreground rounded-md p-4">
            强调色背景，强调色前景文本
          </div>
          <div className="bg-primary-600 rounded-md p-4 text-white">主色-600 背景，白色文本</div>

          <button
            onClick={openRgbTest}
            className="bg-primary hover:bg-primary-600 mt-4 rounded-md px-4 py-2 text-white transition-colors"
          >
            打开独立RGB测试页面
          </button>
        </div>
      </div>
    </div>
  );
};

// 色块组件
const ColorBlock: React.FC<{
  name: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ name, className, style }) => {
  return (
    <div className="overflow-hidden rounded-md border">
      <div className={`h-20 ${className || ''}`} style={style}></div>
      <div className="bg-card p-2">
        <p className="text-sm font-medium">{name}</p>
      </div>
    </div>
  );
};

export default ColorTest;
