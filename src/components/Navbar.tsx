import * as React from 'react';
import { Menu, X, User, LogOut, Sun, Moon, ChevronDown } from 'lucide-react';
import { useUserStore, useThemeStore } from '../store';
import DynamicIcon from './DynamicIcon';

interface NavItem {
  id: string;
  label: string;
  href: string;
  requireAuth?: boolean;
  adminOnly?: boolean;
}

interface NavbarProps {
  iconName?: string;
  navItems?: NavItem[];
  onLogin?: () => void;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  iconName = 'Weblogo.svg',
  navItems = [
    { id: 'home', label: '首页', href: '/' },
    { id: 'features', label: '功能', href: '/features' },
    { id: 'services', label: '服务', href: '/services' },
    { id: 'about', label: '关于', href: '/about' },
    { id: 'dashboard', label: '控制台', href: '/dashboard', requireAuth: true },
    { id: 'admin', label: '管理后台', href: '/admin', requireAuth: true, adminOnly: true },
  ],
  onLogin = () => console.log('Login button clicked'),
  className = '',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [showUserDropdown, setShowUserDropdown] = React.useState(false);

  // 从Zustand状态存储中获取用户和主题状态
  const { isLogin, username, userRole, logout } = useUserStore();
  const { theme, toggleTheme } = useThemeStore();

  // 监听滚动事件以改变导航栏样式
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 点击页面其他区域关闭用户下拉菜单
  React.useEffect(() => {
    if (showUserDropdown) {
      const handleClickOutside = () => setShowUserDropdown(false);
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showUserDropdown]);

  // 切换菜单显示/隐藏
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 点击导航项后关闭菜单
  const handleNavItemClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  // 过滤导航项，只显示用户有权限访问的
  const filteredNavItems = navItems.filter((item) => {
    // 如果需要登录但用户未登录，则不显示
    if (item.requireAuth && !isLogin) return false;
    // 如果是管理员专用但用户不是管理员，则不显示
    if (item.adminOnly && userRole !== 'admin') return false;
    return true;
  });

  // 处理用户菜单点击，阻止事件冒泡
  const handleUserMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowUserDropdown(!showUserDropdown);
  };

  // 处理退出登录
  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    logout();
    setShowUserDropdown(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${className} 
      h-[50px] md:h-[64px] ${scrolled ? 'bg-tech-dark-900/95 backdrop-blur-md shadow-glow-primary' : 'bg-transparent'}`}
      style={{ maxWidth: '100vw' }}
    >
      <div className="w-full px-4 flex flex-row items-center justify-between h-full">
        {/* Logo - 左侧 */}
        <div className="flex flex-row items-center justify-baseline space-x-2">
          <div className="p-2 rounded-full hover:bg-tech-panel-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50">
            <DynamicIcon name={iconName.replace('.svg', '')} className="w-full h-full text-primary-500 hover:scale-125" />
          </div>
          <div className="rounded-full animate-pulse-slow">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-neon-cyan-500">TechNexus</span>
          </div>
        </div>

        {/* 桌面端导航菜单 - 中间 */}
        <nav className="hidden md:flex items-center justify-center space-x-8 flex-1 gap-4">
          {filteredNavItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={handleNavItemClick}
              className="text-gray-300 hover:text-primary-400 font-medium transition-colors duration-300 whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* 桌面端用户操作区 - 右侧 */}
        <div className="hidden md:flex items-center space-x-3">
          {/* 主题切换按钮 */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-tech-panel-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            aria-label="切换主题"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-300" /> : <Moon className="h-5 w-5 text-blue-300" />}
          </button>

          {/* 用户登录状态 */}
          {isLogin ? (
            <div className="relative">
              <button
                onClick={handleUserMenuClick}
                className="flex items-center space-x-2 px-3 py-2 rounded-full bg-tech-panel-700/50 hover:bg-tech-panel-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-neon-cyan-500 flex items-center justify-center text-white font-medium">
                  {username?.charAt(0) || 'U'}
                </div>
                <span className="text-sm text-gray-200 hidden lg:inline-block">{username}</span>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* 用户下拉菜单 */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-tech-panel-800 rounded-lg shadow-lg border border-tech-line-600 overflow-hidden transition-all duration-300">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-tech-panel-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4 text-gray-400" />
                    <span>退出登录</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="px-4 py-2 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-medium shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            >
              <User className="inline-block mr-2 h-4 w-4" />
              <span>登录</span>
            </button>
          )}
        </div>

        {/* 移动端菜单按钮 */}
        <button
          className="md:hidden p-2 rounded-md text-gray-300 hover:text-primary-400 hover:bg-tech-panel-700/50 transition-colors duration-200 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? '关闭菜单' : '打开菜单'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 移动端导航菜单 */}
      {isOpen && (
        <div className="md:hidden bg-tech-panel-800 border-t border-tech-line-600">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-1">
            {/* 移动端主题切换 */}
            <div className="flex justify-between items-center px-3 py-3">
              <span className="text-gray-300">主题</span>
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-tech-panel-700 transition-colors duration-200">
                {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-300" /> : <Moon className="h-5 w-5 text-blue-300" />}
              </button>
            </div>

            {/* 移动端导航项 */}
            {filteredNavItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={handleNavItemClick}
                className="px-3 py-3 rounded-md text-gray-300 hover:bg-tech-panel-700 hover:text-primary-400 transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}

            {/* 移动端用户操作 */}
            {isLogin ? (
              <div className="mt-2 px-3 py-3 bg-tech-panel-700/30 rounded-md">
                <p className="text-sm text-gray-300 mb-3">欢迎, {username}</p>
                <button
                  onClick={logout}
                  className="w-full py-2 bg-tech-panel-900 hover:bg-tech-panel-800 rounded-md flex items-center justify-center space-x-2 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>退出登录</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="w-full mt-2 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-md font-medium transition-colors duration-200"
              >
                <User className="inline-block mr-2 h-4 w-4" />
                <span>登录</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
