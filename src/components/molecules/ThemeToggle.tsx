import React, { useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import type { Theme } from '../../types/theme';

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown' | 'switch';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'button',
  size = 'md',
  showLabel = false,
  className = '',
}) => {
  const { theme, isDark, setTheme, initializeTheme } = useThemeStore();

  // 初始化主题
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  const themes: Array<{
    value: Theme;
    label: string;
    icon: React.ReactNode;
    description: string;
  }> = [
    {
      value: 'light',
      label: '浅色',
      icon: <Sun className="h-4 w-4" />,
      description: '始终使用浅色主题',
    },
    {
      value: 'dark',
      label: '深色',
      icon: <Moon className="h-4 w-4" />,
      description: '始终使用深色主题',
    },
    {
      value: 'system',
      label: '跟随系统',
      icon: <Monitor className="h-4 w-4" />,
      description: '跟随系统主题设置',
    },
  ];

  const currentTheme = themes.find(t => t.value === theme);

  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  };

  const buttonClasses = `
    relative inline-flex items-center justify-center
    ${sizeClasses[size]}
    rounded-xl
    bg-background
    border border-border
    text-foreground
    transition-all duration-300 ease-in-out
    hover:bg-muted
    hover:border-primary/50
    hover:shadow-glow-blue
    focus:outline-none
    focus:ring-2
    focus:ring-ring
    focus:ring-offset-2
    active:scale-95
    group
    ${className}
  `;

  const iconClasses = `
    transition-all duration-300 ease-in-out
    group-hover:scale-110
    ${isDark ? 'text-blue-400' : 'text-orange-500'}
  `;

  if (variant === 'switch') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        {showLabel && <span className="text-muted-foreground text-sm font-medium">主题</span>}
        <div className="bg-muted flex items-center space-x-1 rounded-lg p-1">
          {themes.map(themeOption => (
            <button
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className={`
                relative flex items-center justify-center
                ${sizeClasses.sm}
                rounded-md
                transition-all duration-200 ease-in-out
                ${
                  theme === themeOption.value
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }
              `}
              title={themeOption.description}
            >
              {themeOption.icon}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className="group relative">
        <button className={buttonClasses} title={currentTheme?.description}>
          <span className={iconClasses}>{currentTheme?.icon}</span>
          {showLabel && <span className="ml-2 text-sm font-medium">{currentTheme?.label}</span>}
        </button>

        {/* 下拉菜单 */}
        <div
          className="
          bg-card border-border shadow-hard invisible
          absolute right-0
          top-full
          z-50 mt-2
          w-48
          rounded-xl
          border py-2
          opacity-0 transition-all
          duration-200 ease-in-out group-hover:visible
          group-hover:opacity-100
        "
        >
          {themes.map(themeOption => (
            <button
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className={`
                hover:bg-muted flex w-full items-center px-4
                py-3 text-left
                text-sm transition-colors
                duration-150
                ${theme === themeOption.value ? 'text-primary bg-primary/10' : 'text-foreground'}
              `}
            >
              <span className="mr-3">{themeOption.icon}</span>
              <div>
                <div className="font-medium">{themeOption.label}</div>
                <div className="text-muted-foreground text-xs">{themeOption.description}</div>
              </div>
              {theme === themeOption.value && (
                <div className="bg-primary ml-auto h-2 w-2 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 默认按钮变体
  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={buttonClasses}
      title={`切换到${isDark ? '浅色' : '深色'}主题`}
    >
      <span className={iconClasses}>
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </span>
      {showLabel && <span className="ml-2 text-sm font-medium">{isDark ? '浅色' : '深色'}</span>}

      {/* 动画背景 */}
      <div
        className="
        from-primary/20 to-accent/20 absolute
        inset-0 -z-10 rounded-xl
        bg-gradient-to-r opacity-0
        transition-opacity duration-300
        group-hover:opacity-100
      "
      />
    </button>
  );
};

export default ThemeToggle;
