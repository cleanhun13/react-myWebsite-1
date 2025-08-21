```mermaid
graph TD
    %% 主要文件和目录
    Root[MyWebsiteDemo] --> Public[public/]
    Root --> Src[src/]
    Root --> Config[配置文件]
    
    %% 公共资源
    Public --> PublicIcons[icons/]
    Public --> Logos[Logo文件]
    
    %% 源代码目录
    Src --> Assets[assets/]
    Src --> Components[components/]
    Src --> Hooks[hooks/]
    Src --> Pages[pages/]
    Src --> Store[store/]
    Src --> Types[types/]
    Src --> AppFiles[App文件]
    
    %% 资源目录
    Assets --> AssetIcons[icons/]
    Assets --> ReactSvg[react.svg]
    
    %% 组件目录
    Components --> AuthComponents[认证相关组件]
    Components --> UIComponents[UI组件]
    Components --> NavComponents[导航组件]
    
    %% 认证组件
    AuthComponents --> AuthForm[AuthForm.tsx]
    AuthComponents --> AuthCard[AuthCard/]
    
    %% UI组件
    UIComponents --> Icons[图标组件]
    UIComponents --> Footer[Footer.tsx]
    
    %% 导航组件
    NavComponents --> Navbar[Navbar.tsx]
    NavComponents --> SideNav[SideNavigationSeparator.jsx]
    
    %% 图标组件
    Icons --> CardIcon[CardIcon.tsx]
    Icons --> DynamicIcon[DynamicIcon.tsx]
    Icons --> EncryptIcons[EncryptIcons.tsx]
    Icons --> MyIcon[MyIcon.tsx]
    Icons --> SvgLoader[SvgLoader.tsx]
    Icons --> ModeToggle[mode-toggle.tsx]
    
    %% Hooks
    Hooks --> DynamicSvgImport[useDynamicSvgImport.tsx]
    
    %% 状态管理
    Store --> StoreIndex[index.ts]
    Store --> ThemeStore[useThemeStore.ts]
    Store --> UserStore[useUserStore.ts]
    
    %% 类型定义
    Types --> CommonTypes[common.d.ts]
    Types --> SvgTypes[svg.d.ts]
    Types --> ThemeTypes[theme.ts]
    
    %% 应用文件
    AppFiles --> AppTsx[App.tsx]
    AppFiles --> AppCss[App.css]
    AppFiles --> IndexCss[index.css]
    AppFiles --> MainTsx[main.tsx]
    AppFiles --> ViteEnv[vite-env.d.ts]
    
    %% 配置文件
    Config --> ViteConfig[vite.config.ts]
    Config --> TsConfig[tsconfig*.json]
    Config --> TailwindConfig[tailwind.config.js]
    Config --> PackageJson[package.json]
    Config --> EslintConfig[eslint.config.js]
    
    %% 样式
    style Root fill:#f9f9f9,stroke:#333,stroke-width:2px
    style Src fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    style Store fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style Components fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style AppFiles fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
```