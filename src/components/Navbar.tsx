import * as React from 'react';
import { Menu, X, User, LogOut, Sun, Moon } from 'lucide-react';
import SvgIcon from './SvgIcon';
import { useUserStore, useThemeStore } from '../store';

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
    { id: 'about', label: '关于', href: '/' },
    { id: 'dashboard', label: '控制台', href: '/dashboard', requireAuth: true },
    { id: 'admin', label: '管理后台', href: '/admin', requireAuth: true, adminOnly: true },
  ],
  onLogin = () => console.log('Login button clicked'),
  className = '',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${className}
        ${scrolled ? 'bg-tech-dark-900/95 backdrop-blur-md shadow-glow-primary' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo - 左侧 */}
        <div className="flex items-center space-x-2">
          <div className="relative w-10 h-10">
            <SvgIcon iconName={iconName} className="w-full h-full text-primary-500" />
            <div className="absolute inset-0 rounded-full border border-primary-500/30 animate-pulse-slow"></div>
          </div>
          <span className="text-xl font-tech font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-neon-cyan-500">
            TechNexus
          </span>
        </div>

        {/* 桌面端导航菜单 - 中间 */}
        <nav className="hidden md:flex items-center space-x-6">
          {filteredNavItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={handleNavItemClick}
              className="relative group text-gray-300 hover:text-primary-400 transition-colors duration-300 font-medium"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* 桌面端用户操作区 - 右侧 */}
        <div className="hidden md:flex items-center space-x-3">
          {/* 主题切换按钮 */}
          <button onClick={toggleTheme} className="rounded-full hover:bg-tech-panel-700" aria-label="切换主题">
            {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-300" /> : <Moon className="h-5 w-5 text-blue-300" />}
          </button>

          {/* 用户登录状态 */}
          {isLogin ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-300">欢迎, {username}</span>
              <button onClick={logout} className="flex items-center space-x-1">
                <LogOut className="h-4 w-4" />
                <span>退出</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="group bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all duration-300"
            >
              <User className="mr-2 h-4 w-4" />
              <span>登录</span>
            </button>
          )}
        </div>

        {/* 移动端菜单按钮 */}
        <button
          className="md:hidden p-2 rounded-md text-gray-300 hover:text-primary-400 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? '关闭菜单' : '打开菜单'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 移动端导航菜单 */}
      {isOpen && (
        <div className="md:hidden bg-tech-panel-800 border-t border-tech-line-600">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            {/* 移动端主题切换 */}
            <div className="flex justify-between items-center px-3 py-2">
              <span className="text-gray-300">主题</span>
              <button onClick={toggleTheme} className="rounded-full">
                {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-300" /> : <Moon className="h-5 w-5 text-blue-300" />}
              </button>
            </div>

            {/* 移动端导航项 */}
            {filteredNavItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={handleNavItemClick}
                className="px-3 py-2 rounded-md text-gray-300 hover:bg-tech-panel-700 hover:text-primary-400 transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}

            {/* 移动端用户操作 */}
            {isLogin ? (
              <div className="px-3 py-2">
                <p className="text-sm text-gray-300 mb-2">欢迎, {username}</p>
                <button onClick={logout} className="w-full flex items-center justify-center space-x-1">
                  <LogOut className="h-4 w-4" />
                  <span>退出</span>
                </button>
              </div>
            ) : (
              <button onClick={onLogin} className="w-full mt-2 bg-primary-600 hover:bg-primary-500 text-white">
                <User className="mr-2 h-4 w-4" />
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
