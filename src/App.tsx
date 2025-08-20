import './App.css';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import { useUserStore } from './store';

function App() {
  const { isLogin, login, logout } = useUserStore();

  // 处理登录按钮点击
  const handleLogin = () => {
    // 这里是简化的登录流程，实际项目中应该调用API进行身份验证
    const mockUserId = '123';
    const mockUsername = 'demo_user';
    login(mockUserId, mockUsername);
  };

  // 监听认证状态变化
  useEffect(() => {
    const handleAuthChange = () => {
      console.log('认证状态已变化:', { isLogin });
      // 这里可以添加认证状态变化后的逻辑
    };

    // 初始调用一次
    handleAuthChange();

    // 订阅状态变化
    const unsubscribe = useUserStore.subscribe(handleAuthChange);

    // 清理订阅
    return () => unsubscribe();
  }, [isLogin]);

  return (
    <div className="min-h-screen bg-tech-dark-900 text-white">
      <Navbar onLogin={handleLogin} />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-neon-cyan-400">
          欢迎使用 TechNexus
        </h1>

        <div className="bg-tech-panel-800 rounded-lg p-6 shadow-glow-primary">
          <p className="mb-4">当前认证状态: {isLogin ? '已登录' : '未登录'}</p>

          {isLogin ? (
            <div className="space-y-4">
              <p>您已成功登录到系统。</p>
              <button onClick={logout}>注销登录</button>
            </div>
          ) : (
            <div className="space-y-4">
              <p>请登录以访问所有功能。</p>
              <button onClick={handleLogin}>登录演示账户</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
