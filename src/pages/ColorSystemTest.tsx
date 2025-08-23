import React from 'react';

/**
 * 颜色系统测试组件
 * 使用不同的方式渲染颜色，确认 Tailwind CSS 颜色是否正确生效
 */
const ColorSystemTest: React.FC = () => {
  // 测试颜色组
  const colorTests = [
    { name: '原生 Tailwind 类 bg-primary', className: 'bg-primary' },
    { name: '原生 Tailwind 类 bg-primary-500', className: 'bg-primary-500' },
    { name: '原生 Tailwind 类 bg-sky-500', className: 'bg-sky-500' },
    { name: 'CSS 变量 rgb(var(--primary))', style: { backgroundColor: 'rgb(var(--primary))' } },
    {
      name: 'CSS 变量 rgb(var(--primary-500))',
      style: { backgroundColor: 'rgb(var(--primary-500))' },
    },
    { name: '硬编码 rgb(14, 165, 233)', style: { backgroundColor: 'rgb(14, 165, 233)' } },
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-6 text-3xl font-bold">颜色系统测试</h1>
      <div className="mb-8">
        <p className="mb-4">
          这个页面测试不同方式的颜色应用是否一致。如果所有色块显示相同的蓝色，说明颜色系统配置正确。
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {colorTests.map((test, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-gray-200 shadow dark:border-gray-700"
            >
              <div className={`h-40 w-full ${test.className || ''}`} style={test.style} />
              <div className="bg-white p-4 dark:bg-gray-800">
                <h3 className="font-medium">{test.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 文本颜色测试 */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">文本颜色测试</h2>
        <div className="space-y-4">
          <p className="text-primary text-xl">这是 text-primary 类文本</p>
          <p className="text-primary-500 text-xl">这是 text-primary-500 类文本</p>
          <p style={{ color: 'rgb(var(--primary))' }} className="text-xl">
            这是 color: rgb(var(--primary)) 样式文本
          </p>
          <p style={{ color: 'rgb(14, 165, 233)' }} className="text-xl">
            这是 color: rgb(14, 165, 233) 样式文本
          </p>
        </div>
      </div>

      {/* 按钮测试 */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">按钮测试</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-primary hover:bg-primary-600 rounded px-6 py-2 font-medium text-white">
            使用 bg-primary 的按钮
          </button>
          <button className="bg-primary-500 hover:bg-primary-600 rounded px-6 py-2 font-medium text-white">
            使用 bg-primary-500 的按钮
          </button>
          <button
            className="rounded px-6 py-2 font-medium text-white hover:opacity-90"
            style={{ backgroundColor: 'rgb(var(--primary))' }}
          >
            使用 rgb(var(--primary)) 的按钮
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorSystemTest;
