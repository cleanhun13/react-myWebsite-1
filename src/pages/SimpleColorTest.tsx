import React from 'react';

/**
 * 简单颜色测试组件
 */
const SimpleColorTest: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-6 text-3xl font-bold">简单颜色测试</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 主色 */}
        <div className="overflow-hidden rounded-lg border shadow">
          <div className="bg-primary h-32"></div>
          <div className="p-4">
            <h3 className="font-medium">主色 bg-primary</h3>
            <p className="text-xs text-gray-500">这应该是天蓝色 (#0ea5e9)</p>
          </div>
        </div>

        {/* 天蓝色 */}
        <div className="overflow-hidden rounded-lg border shadow">
          <div className="h-32 bg-sky-500"></div>
          <div className="p-4">
            <h3 className="font-medium">天蓝色 bg-sky-500</h3>
            <p className="text-xs text-gray-500">这是标准的天蓝色 (#0ea5e9)</p>
          </div>
        </div>

        {/* 文本颜色 */}
        <div className="rounded-lg border p-4 shadow">
          <h3 className="mb-2 font-medium">文本颜色测试</h3>
          <p className="text-primary mb-1">这是主色文本 (text-primary)</p>
          <p className="text-sky-500">这是天蓝色文本 (text-sky-500)</p>
        </div>

        {/* 按钮 */}
        <div className="rounded-lg border p-4 shadow">
          <h3 className="mb-4 font-medium">按钮测试</h3>
          <div className="flex space-x-4">
            <button className="bg-primary rounded px-4 py-2 text-white">主色按钮</button>
            <button className="rounded bg-sky-500 px-4 py-2 text-white">天蓝色按钮</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleColorTest;
