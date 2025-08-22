import './Styles.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Navbar } from './components';
import { Footer } from './components';
import { TechThemeProvider } from './components/organisms';
import { useUserStore } from './store';
import TechDemoPage from './pages/TechDemoPage';

// 创建一个简单的页面组件，用于示例
const Home = () => (
  <div className="space-y-6 py-8">
    <div className="space-y-4 text-center">
      <h2 className="gradient-text text-4xl font-bold">欢迎来到 TechNexus</h2>
      <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
        这是我们应用的首页。探索我们的服务，发现如何提升您的数字体验。
      </p>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="card space-y-3 p-6 text-center">
        <div className="bg-primary/20 mx-auto flex h-12 w-12 items-center justify-center rounded-xl">
          <span className="text-primary text-xl">🚀</span>
        </div>
        <h3 className="font-semibold">高性能</h3>
        <p className="text-muted-foreground text-sm">基于现代技术栈构建，提供极致的用户体验</p>
      </div>

      <div className="card space-y-3 p-6 text-center">
        <div className="bg-accent/20 mx-auto flex h-12 w-12 items-center justify-center rounded-xl">
          <span className="text-accent text-xl">🎨</span>
        </div>
        <h3 className="font-semibold">美观设计</h3>
        <p className="text-muted-foreground text-sm">科技感十足的现代化界面设计</p>
      </div>

      <div className="card space-y-3 p-6 text-center">
        <div className="bg-secondary/20 mx-auto flex h-12 w-12 items-center justify-center rounded-xl">
          <span className="text-secondary text-xl">⚡</span>
        </div>
        <h3 className="font-semibold">响应迅速</h3>
        <p className="text-muted-foreground text-sm">快速响应，支持各种设备尺寸</p>
      </div>
    </div>
  </div>
);

// 创建一个简单的页面组件，用于示例
const About = () => (
  <div className="space-y-6 py-8">
    <div className="space-y-4 text-center">
      <h2 className="text-3xl font-bold">关于我们</h2>
      <div className="card mx-auto max-w-2xl p-8">
        <p className="text-muted-foreground leading-relaxed">
          我们致力于创建现代化、科技感十足的用户界面。 基于最新的 Web
          技术，为用户提供卓越的数字体验。
        </p>
      </div>
    </div>
  </div>
);

// 创建主布局组件
const Layout = () => {
  const { isLogin, login } = useUserStore();

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
    <div className="flex min-h-screen flex-col">
      {/* 导航栏固定在头部 */}
      <Navbar onLogin={handleLogin} />

      {/* 中间内容区域显示子路由页面 */}
      <main className="container mx-auto flex-1 px-4 pb-16 pt-24">
        <Outlet />
      </main>

      {/* 底部显示Footer */}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <TechThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* 使用Layout组件作为父路由，包含共享的导航栏和页脚 */}
          <Route path="/" element={<Layout />}>
            {/* 子路由 */}
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="demo" element={<TechDemoPage />} />

            {/* 可以根据需要添加更多子路由 */}
          </Route>
        </Routes>
      </BrowserRouter>
    </TechThemeProvider>
  );
}

export default App;
