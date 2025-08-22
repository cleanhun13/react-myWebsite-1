import React, { useEffect, useState } from 'react';
import { useThemeStore } from '../../store/useThemeStore';

interface TechThemeProviderProps {
  children: React.ReactNode;
  enableAnimations?: boolean;
  enableGradients?: boolean;
  enableGlow?: boolean;
}

const TechThemeProvider: React.FC<TechThemeProviderProps> = ({
  children,
  enableAnimations = true,
  enableGradients = true,
  enableGlow = true,
}) => {
  const { initializeTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 初始化主题
    initializeTheme();
    setMounted(true);

    // 添加主题相关的 CSS 类
    const root = document.documentElement;

    if (enableAnimations) {
      root.classList.add('tech-animations');
    }

    if (enableGradients) {
      root.classList.add('tech-gradients');
    }

    if (enableGlow) {
      root.classList.add('tech-glow');
    }

    // 添加 meta 标签用于移动端主题颜色
    const addMetaThemeColor = () => {
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.setAttribute('name', 'theme-color');
        document.head.appendChild(metaThemeColor);
      }
      return metaThemeColor;
    };

    const metaThemeColor = addMetaThemeColor();

    // 根据主题设置 meta theme-color
    const updateMetaThemeColor = () => {
      const isDarkTheme = document.documentElement.classList.contains('dark');
      metaThemeColor.setAttribute('content', isDarkTheme ? '#0f172a' : '#ffffff');
    };

    updateMetaThemeColor();

    // 监听主题变化
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateMetaThemeColor();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
    };
  }, [initializeTheme, enableAnimations, enableGradients, enableGlow]);

  // 避免水合不匹配，在客户端挂载前显示加载状态
  if (!mounted) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="animate-pulse">
          <div className="bg-primary/20 h-8 w-8 animate-bounce rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`
          bg-background 
          text-foreground 
          min-h-screen 
          transition-colors 
          duration-300 
          ease-in-out
          ${enableAnimations ? 'tech-animations' : ''}
          ${enableGradients ? 'tech-gradients' : ''}
          ${enableGlow ? 'tech-glow' : ''}
        `}
      >
        {children}
      </div>

      {/* 动态样式注入 */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .tech-animations * {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .tech-gradients .gradient-bg {
          background: var(--gradient-primary);
        }
        
        .tech-gradients .gradient-text {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .tech-glow .glow-on-hover:hover {
          box-shadow: var(--shadow-glow);
        }
        
        /* 科技感滚动条 */
        .tech-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .tech-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--muted));
          border-radius: 4px;
        }
        
        .tech-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--muted-foreground));
          border-radius: 4px;
          transition: background-color 0.3s ease;
        }
        
        .tech-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary));
        }
        
        /* 科技感选择高亮 */
        ::selection {
          background-color: hsl(var(--primary) / 0.3);
          color: hsl(var(--primary-foreground));
        }
        
        /* 科技感焦点环 */
        .tech-focus:focus-visible {
          outline: 2px solid hsl(var(--ring));
          outline-offset: 2px;
          border-radius: 8px;
        }
        
        /* 毛玻璃效果 */
        .glass-effect {
          backdrop-filter: blur(16px) saturate(180%);
          background-color: hsl(var(--background) / 0.8);
          border: 1px solid hsl(var(--border) / 0.2);
        }
        
        /* 科技感网格背景 */
        .tech-grid {
          background-image: 
            linear-gradient(rgba(var(--foreground) / 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--foreground) / 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        /* 科技感点状背景 */
        .tech-dots {
          background-image: radial-gradient(circle, rgba(var(--foreground) / 0.1) 1px, transparent 1px);
          background-size: 16px 16px;
        }
        
        /* 科技感渐变边框 */
        .gradient-border {
          position: relative;
          background: hsl(var(--background));
        }
        
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          background: var(--gradient-primary);
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
        }
        
        /* 科技感加载动画 */
        .tech-loading {
          position: relative;
          overflow: hidden;
        }
        
        .tech-loading::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(var(--primary) / 0.2),
            transparent
          );
          animation: loading-shimmer 2s infinite;
        }
        
        @keyframes loading-shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        /* 响应式调整 */
        @media (max-width: 768px) {
          .tech-animations * {
            transition-duration: 0.2s;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .tech-animations *,
          .tech-animations *::before,
          .tech-animations *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `,
        }}
      />
    </>
  );
};

export default TechThemeProvider;
