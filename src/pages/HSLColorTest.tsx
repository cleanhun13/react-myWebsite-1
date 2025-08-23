import React from 'react';

/**
 * OKLCH 颜色测试页面
 * 用于测试经过修复的 CSS 变量和 Tailwind 配置
 */
const HSLColorTest: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-8 text-3xl font-bold">OKLCH 颜色变量测试</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-medium">基础颜色</h2>

          <div className="space-y-4">
            {/* 主色测试 */}
            <div>
              <h3 className="mb-2 font-medium">主色</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                  <div className="bg-primary mb-2 h-20 w-20 rounded-lg"></div>
                  <span className="text-sm">bg-primary</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="mb-2 h-20 w-20 rounded-lg bg-sky-500"></div>
                  <span className="text-sm">bg-sky-500</span>
                </div>
              </div>
            </div>

            {/* 文本色测试 */}
            <div>
              <h3 className="mb-2 font-medium">文本颜色</h3>
              <p className="text-primary mb-1">这是 text-primary 颜色</p>
              <p className="text-sky-500">这是 text-sky-500 颜色</p>
            </div>
          </div>
        </section>

        <section className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-medium">主色色阶</h2>

          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center">
              <div className="bg-primary-100 mb-1 h-16 w-16 rounded-lg"></div>
              <span className="text-xs">100</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary-300 mb-1 h-16 w-16 rounded-lg"></div>
              <span className="text-xs">300</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary-500 mb-1 h-16 w-16 rounded-lg"></div>
              <span className="text-xs">500</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary-700 mb-1 h-16 w-16 rounded-lg"></div>
              <span className="text-xs">700</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary-900 mb-1 h-16 w-16 rounded-lg"></div>
              <span className="text-xs">900</span>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8 rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-medium">语义化颜色</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex flex-col items-center">
            <div className="bg-background mb-2 h-16 w-full rounded-lg border"></div>
            <span className="text-sm">背景色</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-card mb-2 h-16 w-full rounded-lg"></div>
            <span className="text-sm">卡片色</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-muted mb-2 h-16 w-full rounded-lg"></div>
            <span className="text-sm">禁用色</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-accent mb-2 h-16 w-full rounded-lg"></div>
            <span className="text-sm">强调色</span>
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-primary text-primary-foreground hover:bg-primary-600 mr-4 rounded-md px-4 py-2">
            主色按钮
          </button>
          <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 mr-4 rounded-md px-4 py-2">
            次要按钮
          </button>
          <button className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md px-4 py-2">
            警告按钮
          </button>
        </div>
      </div>
    </div>
  );
};

export default HSLColorTest;
