import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-tech-dark-900 border-t border-tech-line-600 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-neon-cyan-400">
                TechNexus
              </span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">
              为现代Web应用提供强大支持
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                关于我们
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                服务支持
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                隐私政策
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} TechNexus. 保留所有权利。
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;