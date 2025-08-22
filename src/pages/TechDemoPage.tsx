import React from 'react';
import { TechCard, TechButton, TechInput } from '../components/atoms';
import { ThemeToggle } from '../components/molecules';
import {
  Settings,
  Zap,
  Rocket,
  Shield,
  Code,
  Mail,
  Lock,
  Search,
  Star,
  Heart,
  Download,
  ArrowRight,
} from 'lucide-react';

const TechDemoPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="bg-background tech-scrollbar min-h-screen">
      {/* 科技感背景 */}
      <div className="tech-grid fixed inset-0 -z-10 opacity-30" />

      <div className="container mx-auto space-y-12 px-4 py-8">
        {/* 头部区域 */}
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <ThemeToggle variant="dropdown" size="lg" showLabel />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold md:text-6xl">
              <span className="gradient-text">科技感</span> 主题演示
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              基于 Tailwind CSS 4 和 Zustand 的现代科技感 UI 组件库
            </p>
          </div>
        </div>

        {/* 主题切换演示 */}
        <TechCard className="mx-auto max-w-4xl">
          <div className="space-y-6 text-center">
            <h2 className="flex items-center justify-center gap-2 text-2xl font-bold">
              <Settings className="h-6 w-6" />
              主题切换演示
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-3">
                <h3 className="font-semibold">按钮样式</h3>
                <ThemeToggle variant="button" size="lg" />
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">下拉菜单</h3>
                <ThemeToggle variant="dropdown" showLabel />
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">切换开关</h3>
                <ThemeToggle variant="switch" showLabel />
              </div>
            </div>
          </div>
        </TechCard>

        {/* 卡片演示 */}
        <div className="space-y-6">
          <h2 className="text-center text-3xl font-bold">科技感卡片</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <TechCard variant="default">
              <div className="space-y-3 text-center">
                <Zap className="text-primary mx-auto h-8 w-8" />
                <h3 className="font-semibold">默认卡片</h3>
                <p className="text-muted-foreground text-sm">经典的卡片设计，适用于大多数场景</p>
              </div>
            </TechCard>

            <TechCard variant="glass">
              <div className="space-y-3 text-center">
                <Shield className="text-accent mx-auto h-8 w-8" />
                <h3 className="font-semibold">毛玻璃效果</h3>
                <p className="text-muted-foreground text-sm">现代感十足的毛玻璃背景效果</p>
              </div>
            </TechCard>

            <TechCard variant="gradient">
              <div className="space-y-3 text-center">
                <Rocket className="mx-auto h-8 w-8 text-white" />
                <h3 className="font-semibold text-white">渐变边框</h3>
                <p className="text-sm text-white/80">科技感渐变边框设计</p>
              </div>
            </TechCard>

            <TechCard variant="glow">
              <div className="space-y-3 text-center">
                <Code className="text-primary mx-auto h-8 w-8" />
                <h3 className="font-semibold">发光效果</h3>
                <p className="text-muted-foreground text-sm">动态发光边框，突出重要内容</p>
              </div>
            </TechCard>
          </div>
        </div>

        {/* 按钮演示 */}
        <div className="space-y-6">
          <h2 className="text-center text-3xl font-bold">科技感按钮</h2>

          <TechCard className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-4">
                <h3 className="font-semibold">主要按钮</h3>
                <div className="space-y-3">
                  <TechButton variant="primary" icon={<Star className="h-4 w-4" />}>
                    主要操作
                  </TechButton>
                  <TechButton variant="primary" size="sm">
                    小尺寸
                  </TechButton>
                  <TechButton variant="primary" size="lg">
                    大尺寸
                  </TechButton>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">特殊效果</h3>
                <div className="space-y-3">
                  <TechButton variant="gradient" icon={<Rocket className="h-4 w-4" />}>
                    渐变按钮
                  </TechButton>
                  <TechButton variant="glow" icon={<Zap className="h-4 w-4" />}>
                    发光按钮
                  </TechButton>
                  <TechButton variant="ghost" icon={<Heart className="h-4 w-4" />}>
                    幽灵按钮
                  </TechButton>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">状态演示</h3>
                <div className="space-y-3">
                  <TechButton variant="accent" loading={loading} onClick={handleSubmit}>
                    {loading ? '处理中...' : '点击加载'}
                  </TechButton>
                  <TechButton variant="secondary" disabled>
                    禁用状态
                  </TechButton>
                  <TechButton variant="primary" icon={<Download className="h-4 w-4" />}>
                    带图标
                  </TechButton>
                </div>
              </div>
            </div>
          </TechCard>
        </div>

        {/* 输入框演示 */}
        <div className="space-y-6">
          <h2 className="text-center text-3xl font-bold">科技感输入框</h2>

          <TechCard className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <h3 className="font-semibold">基础输入框</h3>

                <TechInput
                  label="邮箱地址"
                  type="email"
                  placeholder="请输入您的邮箱"
                  icon={<Mail className="h-4 w-4" />}
                  helperText="我们会保护您的隐私"
                />

                <TechInput label="密码" type="password" placeholder="请输入密码" variant="glow" />

                <TechInput
                  label="搜索"
                  placeholder="搜索内容..."
                  icon={<Search className="h-4 w-4" />}
                  variant="glass"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                />
              </div>

              <div className="space-y-6">
                <h3 className="font-semibold">不同状态</h3>

                <TechInput
                  label="错误状态"
                  placeholder="输入内容"
                  error="这是一个错误信息"
                  icon={<Lock className="h-4 w-4" />}
                />

                <TechInput label="禁用状态" placeholder="已禁用" disabled value="无法编辑的内容" />

                <TechInput
                  label="发光效果"
                  placeholder="科技感输入框"
                  variant="glow"
                  helperText="具有发光边框效果"
                />
              </div>
            </div>
          </TechCard>
        </div>

        {/* 交互演示 */}
        <TechCard variant="gradient" className="mx-auto max-w-2xl">
          <div className="space-y-6 text-center text-white">
            <h2 className="text-2xl font-bold">开始体验</h2>
            <p className="text-white/90">
              立即体验这些现代化的科技感组件，为您的项目带来未来感的设计
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <TechButton
                variant="ghost"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                icon={<Code className="h-4 w-4" />}
              >
                查看源码
              </TechButton>
              <TechButton
                variant="primary"
                className="bg-white text-gray-900 hover:bg-white/90"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                开始使用
              </TechButton>
            </div>
          </div>
        </TechCard>

        {/* 技术栈信息 */}
        <div className="text-muted-foreground space-y-4 text-center">
          <p className="text-sm">
            构建于 <span className="text-primary font-medium">React</span> +
            <span className="text-primary font-medium"> TypeScript</span> +
            <span className="text-primary font-medium"> Tailwind CSS 4</span> +
            <span className="text-primary font-medium"> Zustand</span>
          </p>
          <p className="text-xs">支持明暗主题切换，响应式设计，可访问性优化</p>
        </div>
      </div>
    </div>
  );
};

export default TechDemoPage;
