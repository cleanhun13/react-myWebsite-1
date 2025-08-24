import * as React from 'react';
import { Menu, User, LogOut, Sun, Moon, ChevronDown } from 'lucide-react';
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

  // 点击页面其他区域关闭用户下拉菜单和移动端菜单
  React.useEffect(() => {
    // 创建处理外部点击的函数
    const handleClickOutside = (event: MouseEvent) => {
      // 关闭用户下拉菜单
      if (showUserDropdown) {
        setShowUserDropdown(false);
      }

      // 关闭移动端菜单（如果点击的不是菜单区域）
      if (isOpen) {
        // 检查点击是否在移动端菜单区域外
        const target = event.target as HTMLElement;
        const mobileMenu = document.querySelector('.mobile-menu-container');
        const menuButton = document.querySelector('.mobile-menu-button');

        // 如果点击的不是菜单按钮也不是菜单内容区域，则关闭菜单
        if (
          mobileMenu &&
          !mobileMenu.contains(target) &&
          menuButton &&
          !menuButton.contains(target)
        ) {
          setIsOpen(false);
        }
      }
    };

    // 添加点击事件监听
    document.addEventListener('click', handleClickOutside);

    // 清理事件监听
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserDropdown, isOpen]);

  // 切换菜单显示/隐藏
  const toggleMenu = (e: React.MouseEvent) => {
    // 阻止事件冒泡，以免立即触发外部点击处理
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // 点击导航项后关闭菜单
  const handleNavItemClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 防止触发外部点击
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
      <div className="flex items-center pl-4 md:pl-6">
        {/* Logo 和文字的组合，带有同步缩放效果 */}
        <LogoWithText iconName={iconName} text="TechNexus" scale="125" duration="300" />
      </div>

      {/* 桌面端导航菜单 - 中间 (仅桌面端显示) */}
      <nav className="hidden flex-1 items-center justify-center gap-4 space-x-4 pl-4 md:flex md:pl-6">
        {filteredNavItems.map(item => (
          <a
            key={item.id}
            href={item.href}
            onClick={e => handleNavItemClick(e)}
            className="font-medium whitespace-nowrap"
          >
            <ScaleText className="text-foreground hover:text-primary-400 text-xl">
              {item.label}
            </ScaleText>
          </a>
        ))}
      </nav>

      {/* 桌面端用户操作区 - 右侧 */}
      <div className="hidden items-center justify-center gap-4 md:flex md:pl-6">
        {/* 主题切换按钮 */}
        <button
          onClick={toggleTheme}
          className="hover:bg-tech-panel-700 focus:ring-primary-500/50 rounded-full transition-all duration-300 focus:ring-2 focus:outline-none"
          aria-label="切换主题"
        >
          {theme === 'dark' ? (
            <Sun className="h-8 w-8 text-yellow-300" />
          ) : (
            <Moon className="h-8 w-8 text-blue-300" />
          )}
        </button>

        {/* 用户登录状态 */}
        {isLogin ? (
          <div className="relative">
            <button
              onClick={handleUserMenuClick}
              className="bg-tech-panel-700/50 hover:bg-tech-panel-700 focus:ring-primary-500/50 rounded-fulltransition-all flex items-center duration-300 focus:ring-2 focus:outline-none"
            >
              <div className="to-neon-cyan-500 from-primary-500 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br font-medium text-white">
                {username?.charAt(0) || 'U'}
              </div>
              <span className="text-foreground hidden text-sm lg:inline-block">{username}</span>
              <ChevronDown
                className={`text-foreground h-4 w-4 transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''}`}
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
            onClick={e => {
              e.stopPropagation(); // 阻止事件冒泡
              e.preventDefault(); // 阻止默认行为
              onLogin(); // 调用登录函数
            }}
            className="bg-primary-600 shadow-primary-500/20 hover:bg-primary-500 hover:shadow-primary-500/40 focus:ring-primary-500/50 rounded-full px-4 py-2 font-medium text-white shadow-lg transition-all duration-300 focus:ring-2 focus:outline-none"
          >
            <User className="mr-2 inline-block h-4 w-4" />
            <span>登录</span>
          </button>
        )}
      </div>

      {/* 移动端菜单按钮 */}
      <button
        className="mobile-menu-button text-foreground hover:text-primary-400 focus:ring-primary-400/50 rounded-md p-2 transition-all duration-300 focus:ring-2 focus:outline-none md:hidden"
        onClick={toggleMenu}
        aria-label={isOpen ? '关闭菜单' : '打开菜单'}
      >
        {isOpen ? (
          <div className="relative h-6 w-6 rotate-45 transform">
            <div className="bg-primary-400 absolute top-3 h-0.5 w-6"></div>
            <div className="bg-primary-400 absolute left-3 h-6 w-0.5"></div>
          </div>
        ) : (
          <Menu size={24} className={isOpen ? 'text-primary-400' : 'text-foreground'} />
        )}
      </button>

      {/* 移动端导航菜单 - 下拉式 */}
      <div
        className={`mobile-menu-container bg-secondary border-tech-line-600 absolute top-[50px] right-0 w-1/3 overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? 'max-h-[80vh] translate-y-0 rounded-b-lg opacity-100'
            : 'max-h-0 -translate-y-2 opacity-0'
        }`}
        style={{
          borderRadius: '1rem',
          transformOrigin: 'top',
          zIndex: 49,
          boxShadow: isOpen
            ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
            : 'none',
        }}
      >
        <div className="bg-secondary container mx-auto flex flex-col space-y-1 px-4 py-3">
          {/* 移动端主题切换 */}
          <div className="border-secondary-foreground/10 border-b pb-2">
            <div className="bg-secondary-foreground/5 flex items-center justify-between rounded-md px-3 py-3">
              <span className="text-foreground font-medium">主题模式</span>
              <button
                onClick={toggleTheme}
                className="hover:bg-tech-panel-700 focus:ring-primary-400/50 rounded-full p-2 transition-all duration-300 focus:ring-2 focus:outline-none"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-yellow-300" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-300" />
                )}
              </button>
            </div>
          </div>

          {/* 移动端导航项 */}
          <div className="mt-2 space-y-1">
            {filteredNavItems.map(item => (
              <a
                key={item.id}
                href={item.href}
                onClick={handleNavItemClick}
                className="hover:bg-secondary-foreground/10 block rounded-md px-3 py-2 transition-all duration-200"
              >
                <ScaleText className="text-foreground hover:text-primary-400 text-medium">
                  {item.label}
                </ScaleText>
              </a>
            ))}
          </div>

          {/* 移动端用户操作 */}
          <div className="border-secondary-foreground/10 mt-2 border-t pt-3">
            {isLogin ? (
              <div className="bg-secondary-foreground/5 rounded-md px-3 py-3">
                <p className="text-foreground mb-3 font-medium">欢迎, {username}</p>
                <button
                  onClick={logout}
                  className="bg-tech-panel-900 hover:bg-tech-panel-800 focus:ring-destructive/30 flex w-full items-center justify-center space-x-2 rounded-md py-2 transition-all duration-300 focus:ring-2 focus:outline-none"
                >
                  <LogOut className="h-4 w-4" />
                  <span>退出登录</span>
                </button>
              </div>
            ) : (
              <button
                onClick={e => {
                  e.stopPropagation(); // 阻止事件冒泡
                  e.preventDefault(); // 阻止默认行为
                  onLogin(); // 调用登录函数
                  setIsOpen(false); // 关闭移动菜单
                }}
                className="bg-primary-600 hover:bg-primary-500 focus:ring-primary-400/50 w-full rounded-md py-3 font-medium text-white shadow-md transition-all duration-300 focus:ring-2 focus:outline-none"
              >
                <User className="mr-2 inline-block h-4 w-4" />
                <span>登录</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
