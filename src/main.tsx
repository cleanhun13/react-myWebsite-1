import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { useUserStore, useThemeStore } from './store';

// 初始化应用状态
const initializeApp = () => {
  // 检查用户认证状态
  useUserStore.getState().checkAuthStatus();

  // 初始化主题
  const themeStore = useThemeStore.getState();
  themeStore.setTheme(themeStore.theme);
};

// 在应用挂载前初始化状态
initializeApp();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
