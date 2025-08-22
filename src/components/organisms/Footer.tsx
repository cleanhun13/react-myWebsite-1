import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-tech-dark-900 border-tech-line-600 border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-600 flex h-8 w-8 items-center justify-center rounded-md">
                <span className="font-bold text-white">T</span>
              </div>
              <span className="from-primary-400 to-neon-cyan-400 bg-gradient-to-r bg-clip-text text-lg font-bold text-transparent">
                TechNexus
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-400">为现代Web应用提供强大支持</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="mb-4 flex space-x-4">
              <a href="#" className="hover:text-primary-400 text-gray-400 transition-colors">
                关于我们
              </a>
              <a href="#" className="hover:text-primary-400 text-gray-400 transition-colors">
                服务支持
              </a>
              <a href="#" className="hover:text-primary-400 text-gray-400 transition-colors">
                隐私政策
              </a>
            </div>
            <p className="text-sm text-gray-500">&copy; {currentYear} TechNexus. 保留所有权利。</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
