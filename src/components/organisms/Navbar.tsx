import * as React from 'react';
import { Menu, X, User, LogOut, Sun, Moon, ChevronDown } from 'lucide-react';
import { useUserStore, useThemeStore } from '../../store';
import { ScaleText, LogoWithText } from '../atoms';

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
  iconName = 'MyWebLogo.svg',
  // 导航项配置
  navItems = [
    { id: 'home', label: '首页', href: '/' },
    { id: 'features', label: '博客', href: '/features' },
    { id: 'services', label: '小应用', href: '/services' },
    { id: 'about', label: '收藏', href: '/about' },
    { id: 'theme', label: '主题预览', href: '/theme-preview' },
    { id: 'color-test', label: '颜色测试', href: '/color-test' },
    { id: 'color-confirm', label: '颜色确认', href: '/color-confirm' },
    { id: 'dashboard', label: '控制台', href: '/dashboard', requireAuth: true },
    { id: 'admin', label: '管理后台', href: '/admin', requireAuth: true, adminOnly: true },
  ],
  onLogin = () => console.log('Login button clicked'),
  className = '',
}) => {
  // 定义导航栏状态
  const [isOpen, setIsOpen] = React.useState(false);
  // 定义滚动状态
  const [scrolled, setScrolled] = React.useState(false);
  // 定义用户下拉菜单状态
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
  const filteredNavItems = navItems.filter(item => {
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
      className={`fixed top-0 right-0 left-0 z-50 flex flex-row justify-between transition-all duration-300 ease-in-out ${className} h-[50px] md:h-[64px] ${scrolled ? 'bg-tech-dark-900/95 shadow-glow-primary backdrop-blur-md' : 'bg-transparent'}`}
      style={{ maxWidth: '100vw' }}
    >
      {/* Logo - 左侧 */}
      <div className="p-4 px-6 md:p-6">
        {/* Logo 和文字的组合，带有同步缩放效果 */}
        <LogoWithText iconName={iconName} text="TechNexus" scale="125" duration="300" />
      </div>

      {/* 桌面端导航菜单 - 中间 */}
      <nav className="hidden flex-1 items-center justify-center gap-4 space-x-8 md:flex">
        {filteredNavItems.map(item => (
          <a
            key={item.id}
            href={item.href}
            onClick={handleNavItemClick}
            className="font-medium whitespace-nowrap text-gray-300"
          >
            <ScaleText className="hover:text-primary-400">{item.label}</ScaleText>
          </a>
        ))}
      </nav>

      {/* 桌面端用户操作区 - 右侧 */}
      <div className="hidden items-center space-x-3 md:flex">
        {/* 主题切换按钮 */}
        <button
          onClick={toggleTheme}
          className="hover:bg-tech-panel-700 focus:ring-primary-500/50 rounded-full p-2 transition-all duration-300 focus:ring-2 focus:outline-none"
          aria-label="切换主题"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-yellow-300" />
          ) : (
            <Moon className="h-5 w-5 text-blue-300" />
          )}
        </button>

        {/* 用户登录状态 */}
        {isLogin ? (
          <div className="relative">
            <button
              onClick={handleUserMenuClick}
              className="bg-tech-panel-700/50 hover:bg-tech-panel-700 focus:ring-primary-500/50 flex items-center space-x-2 rounded-full px-3 py-2 transition-all duration-300 focus:ring-2 focus:outline-none"
            >
              <div className="to-neon-cyan-500 from-primary-500 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br font-medium text-white">
                {username?.charAt(0) || 'U'}
              </div>
              <span className="hidden text-sm text-gray-200 lg:inline-block">{username}</span>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''}`}
              />
            </button>

            {/* 用户下拉菜单 */}
            {showUserDropdown && (
              <div className="bg-tech-panel-800 border-tech-line-600 absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border shadow-lg transition-all duration-300">
                <button
                  onClick={handleLogout}
                  className="hover:bg-tech-panel-700 flex w-full items-center space-x-2 px-4 py-2 text-left transition-colors duration-200"
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
            className="bg-primary-600 shadow-primary-500/20 hover:bg-primary-500 hover:shadow-primary-500/40 focus:ring-primary-500/50 rounded-full px-4 py-2 font-medium text-white shadow-lg transition-all duration-300 focus:ring-2 focus:outline-none"
          >
            <User className="mr-2 inline-block h-4 w-4" />
            <span>登录</span>
          </button>
        )}
      </div>

      {/* 移动端菜单按钮 */}
      <button
        className="hover:bg-tech-panel-700/50 hover:text-primary-400 rounded-md p-2 text-gray-300 transition-colors duration-200 focus:outline-none md:hidden"
        onClick={toggleMenu}
        aria-label={isOpen ? '关闭菜单' : '打开菜单'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 移动端导航菜单 */}
      {isOpen && (
        <div className="bg-tech-panel-800 border-tech-line-600 border-t md:hidden">
          <div className="container mx-auto flex flex-col space-y-1 px-4 py-3">
            {/* 移动端主题切换 */}
            <div className="flex items-center justify-between px-3 py-3">
              <span className="text-gray-300">主题</span>
              <button
                onClick={toggleTheme}
                className="hover:bg-tech-panel-700 rounded-full p-2 transition-colors duration-200"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-yellow-300" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-300" />
                )}
              </button>
            </div>

            {/* 移动端导航项 */}
            {filteredNavItems.map(item => (
              <a
                key={item.id}
                href={item.href}
                onClick={handleNavItemClick}
                className="hover:bg-tech-panel-700 hover:text-primary-400 rounded-md px-3 py-3 text-gray-300 transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}

            {/* 移动端用户操作 */}
            {isLogin ? (
              <div className="bg-tech-panel-700/30 mt-2 rounded-md px-3 py-3">
                <p className="mb-3 text-sm text-gray-300">欢迎, {username}</p>
                <button
                  onClick={logout}
                  className="bg-tech-panel-900 hover:bg-tech-panel-800 flex w-full items-center justify-center space-x-2 rounded-md py-2 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>退出登录</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="bg-primary-600 hover:bg-primary-500 mt-2 w-full rounded-md py-3 font-medium text-white transition-colors duration-200"
              >
                <User className="mr-2 inline-block h-4 w-4" />
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
