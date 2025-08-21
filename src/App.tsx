import './Styles.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useUserStore } from './store';

// 创建一个简单的页面组件，用于示例
const Home = () => (
  <div className="py-8">
    <h2 className="text-2xl font-bold mb-4">欢迎来到 TechNexus</h2>
    <p className="text-gray-300">这是我们应用的首页。探索我们的服务，发现如何提升您的数字体验。</p>
  </div>
);

// 创建一个简单的页面组件，用于示例
const About = () => (
  <div className="flex justify-center items py-8">
    <h2 className="text-2xl font-bold mb-4">欢迎来到 About</h2>
    <p className="text-gray-300">about page</p>
  </div>
);

// 创建主布局组件
const Layout = () => {
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
    <div className="min-h-[100vh] min-w-[100vw] bg-tech-dark-900 text-black flex flex-col items-center">
      {/* 导航栏固定在头部 */}
      <Navbar onLogin={handleLogin} />

      {/* 中间内容区域显示子路由页面 */}
      <main className="flex-1 items-center h-full container mx-auto px-4 pt-24 pb-16">
        <Outlet />
      </main>

      {/* 底部显示Footer */}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 使用Layout组件作为父路由，包含共享的导航栏和页脚 */}
        <Route path="/" element={<Layout />}>
          {/* 子路由 */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          {/* 可以根据需要添加更多子路由 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
