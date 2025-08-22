import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme } from '../types/theme';

// 定义主题状态接口
interface ThemeState {
  theme: Theme;
  isDark: boolean;
  isSystemTheme: boolean;
  systemTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
}

// 检测系统主题偏好
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// 应用主题到 DOM
const applyTheme = (isDark: boolean) => {
  const root = document.documentElement;

  if (isDark) {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
  }

  // 设置 meta theme-color 以支持移动端状态栏
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', isDark ? '#0f172a' : '#ffffff');
  }
};

// 创建主题状态存储
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      // 初始状态
      theme: 'system',
      isDark: false,
      isSystemTheme: true,
      systemTheme: getSystemTheme(),

      // 初始化主题
      initializeTheme: () => {
        const state = get();
        const systemTheme = getSystemTheme();

        let isDark = false;
        let isSystemTheme = false;

        switch (state.theme) {
          case 'light':
            isDark = false;
            isSystemTheme = false;
            break;
          case 'dark':
            isDark = true;
            isSystemTheme = false;
            break;
          case 'system':
          default:
            isDark = systemTheme === 'dark';
            isSystemTheme = true;
            break;
        }

        applyTheme(isDark);

        set({
          isDark,
          isSystemTheme,
          systemTheme,
        });

        console.log('主题已初始化:', {
          theme: state.theme,
          isDark,
          isSystemTheme,
          systemTheme,
        });
      },

      // 设置主题
      setTheme: (theme: Theme) => {
        const systemTheme = getSystemTheme();
        let isDark = false;
        let isSystemTheme = false;

        switch (theme) {
          case 'light':
            isDark = false;
            isSystemTheme = false;
            break;
          case 'dark':
            isDark = true;
            isSystemTheme = false;
            break;
          case 'system':
            isDark = systemTheme === 'dark';
            isSystemTheme = true;
            break;
        }

        applyTheme(isDark);

        set({
          theme,
          isDark,
          isSystemTheme,
          systemTheme,
        });

        console.log('主题已更改:', {
          theme,
          isDark,
          isSystemTheme,
          systemTheme,
        });
      },

      // 切换主题（明暗切换）
      toggleTheme: () => {
        const { theme } = get();

        if (theme === 'system') {
          // 如果当前是系统主题，切换到相反的固定主题
          const systemTheme = getSystemTheme();
          const newTheme = systemTheme === 'dark' ? 'light' : 'dark';
          get().setTheme(newTheme);
        } else {
          // 如果是固定主题，切换到相反的主题
          const newTheme = theme === 'light' ? 'dark' : 'light';
          get().setTheme(newTheme);
        }
      },
    }),
    {
      name: 'theme-storage',
      version: 1,
      onRehydrateStorage: () => state => {
        // 当状态从存储中恢复时，初始化主题
        if (state) {
          // 延迟执行以确保 DOM 已准备好
          setTimeout(() => {
            state.initializeTheme();
          }, 0);
        }
      },
    }
  )
);

// 监听系统主题变化
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  mediaQuery.addEventListener('change', e => {
    const store = useThemeStore.getState();
    const newSystemTheme = e.matches ? 'dark' : 'light';

    // 更新系统主题状态
    useThemeStore.setState({ systemTheme: newSystemTheme });

    // 如果当前使用系统主题，则更新显示
    if (store.isSystemTheme) {
      const isDark = newSystemTheme === 'dark';
      applyTheme(isDark);
      useThemeStore.setState({ isDark });

      console.log('系统主题已变更:', newSystemTheme);
    }
  });
}

// 导出主题相关工具函数
export const themeUtils = {
  getSystemTheme,
  applyTheme,

  // 获取当前主题的 CSS 变量值
  getCSSVariable: (variable: string): string => {
    if (typeof window === 'undefined') return '';
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  },

  // 设置 CSS 变量
  setCSSVariable: (variable: string, value: string): void => {
    if (typeof window === 'undefined') return;
    document.documentElement.style.setProperty(variable, value);
  },

  // 获取主题颜色对象
  getThemeColors: () => {
    const { isDark } = useThemeStore.getState();
    return {
      primary: themeUtils.getCSSVariable('--primary'),
      secondary: themeUtils.getCSSVariable('--secondary'),
      accent: themeUtils.getCSSVariable('--accent'),
      background: themeUtils.getCSSVariable('--background'),
      foreground: themeUtils.getCSSVariable('--foreground'),
      card: themeUtils.getCSSVariable('--card'),
      border: themeUtils.getCSSVariable('--border'),
      isDark,
    };
  },
};
