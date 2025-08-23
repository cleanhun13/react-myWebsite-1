import React from 'react';

export const ColorConfirmation: React.FC = () => {
  const colors = [
    { name: 'primary', class: 'bg-primary' },
    { name: 'primary-50', class: 'bg-primary-50' },
    { name: 'primary-100', class: 'bg-primary-100' },
    { name: 'primary-200', class: 'bg-primary-200' },
    { name: 'primary-300', class: 'bg-primary-300' },
    { name: 'primary-400', class: 'bg-primary-400' },
    { name: 'primary-500', class: 'bg-primary-500' },
    { name: 'primary-600', class: 'bg-primary-600' },
    { name: 'primary-700', class: 'bg-primary-700' },
    { name: 'primary-800', class: 'bg-primary-800' },
    { name: 'primary-900', class: 'bg-primary-900' },
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-6 text-2xl font-bold">颜色确认测试</h1>

      <div className="mb-8">
        <h2 className="mb-4 text-xl">基本颜色测试</h2>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-5 lg:grid-cols-7">
          {colors.map(color => (
            <div key={color.name} className="overflow-hidden rounded-lg shadow">
              <div className={`h-20 ${color.class}`}></div>
              <div className="bg-gray-100 p-3 dark:bg-gray-800">
                <p className="text-sm font-medium">{color.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">.{color.class}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl">文本颜色测试</h2>
        <div className="space-y-2">
          <p className="text-primary text-lg">这是主色文本 (text-primary)</p>
          <p className="text-primary-500 text-lg">这是主色-500文本 (text-primary-500)</p>
          <p className="text-primary-700 text-lg">这是主色-700文本 (text-primary-700)</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl">按钮测试</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-primary hover:bg-primary-600 rounded px-4 py-2 text-white">
            主色按钮
          </button>
          <button className="bg-primary-500 hover:bg-primary-600 rounded px-4 py-2 text-white">
            主色-500按钮
          </button>
          <button className="bg-primary-700 hover:bg-primary-800 rounded px-4 py-2 text-white">
            主色-700按钮
          </button>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl">带透明度测试</h2>
        <div className="space-y-4">
          <div className="bg-primary/50 rounded-lg p-4">背景色 50% 透明度 (bg-primary/50)</div>
          <div className="bg-primary-500/30 rounded-lg p-4">
            背景色-500 30% 透明度 (bg-primary-500/30)
          </div>
          <div className="border-primary rounded-lg border-2 p-4">主色边框 (border-primary)</div>
        </div>
      </div>
    </div>
  );
};

export default ColorConfirmation;
