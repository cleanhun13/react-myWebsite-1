// 全局用户参数
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 定义用户状态结构
interface UserState {
  user_id: string;
  username: string | null;
  isLogin: boolean;
  userRole: 'user' | 'admin' | null;
  login: (userId: string, username: string, role?: 'user' | 'admin') => void;
  logout: () => void;
  checkAuthStatus: () => void;
}

// 创建用户状态存储，使用persist中间件保持状态持久化
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user_id: '0',
      username: null,
      isLogin: false,
      userRole: null,

      // 登录函数
      login: (userId: string, username: string, role: 'user' | 'admin' = 'user') => {
        set({
          user_id: userId,
          username,
          isLogin: true,
          userRole: role,
        });
        console.log('用户登录成功:', { userId, username, role });
      },

      // 注销函数
      logout: () => {
        set({
          user_id: '0',
          username: null,
          isLogin: false,
          userRole: null,
        });
        // 派发登出事件，通知应用程序其他部分用户已登出
        window.dispatchEvent(new CustomEvent('auth:logout'));
        console.log('用户已登出');
      },

      // 检查认证状态
      checkAuthStatus: () => {
        // 实际项目中这里应该调用API检查令牌有效性
        // 这里简化处理，直接检查本地存储
        const storedUserId = localStorage.getItem('user_id');
        const storedUsername = localStorage.getItem('username');
        const storedRole = localStorage.getItem('userRole') as 'user' | 'admin' | null;

        if (storedUserId && storedUsername) {
          set({
            user_id: storedUserId,
            username: storedUsername,
            isLogin: true,
            userRole: storedRole || 'user',
          });
        } else {
          set({
            user_id: '0',
            username: null,
            isLogin: false,
            userRole: null,
          });
        }
      },
    }),
    {
      name: 'user-storage', // 本地存储键名
      storage: createJSONStorage(() => localStorage), // 使用localStorage
    }
  )
);
