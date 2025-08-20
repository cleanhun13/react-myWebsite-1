import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme } from '../types/theme';

// 定义主题状态接口
interface ThemeState {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// 创建主题状态存储
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      // 默认使用系统主题
      theme: 'system',
      isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,

      // 设置主题
      setTheme: (theme: Theme) => {
        let isDark = get().isDark;

        if (theme === 'light') {
          isDark = false;
        } else if (theme === 'dark') {
          isDark = true;
        } else {
          // 系统主题
          isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

        // 更新DOM以反映主题变化
        document.documentElement.classList.toggle('dark', isDark);

        set({ theme, isDark });
        console.log('主题已更改为:', theme, '暗黑模式:', isDark);
      },

      // 切换主题（明暗切换）
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        // 当状态从存储中恢复时，更新DOM
        if (state) {
          document.documentElement.classList.toggle('dark', state.isDark);
        }
      },
    }
  )
);
