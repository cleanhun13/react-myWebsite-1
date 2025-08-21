/** @type {import('tailwindcss').Config} */
module.exports = {
  // 确保 content 路径正确，Tailwind 会扫描这些文件中的类名
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],
  // 配置主题扩展
  theme: {
    extend: {
      // 科技风格颜色系统
      colors: {
        // 主色调 - 深蓝色系
        primary: {
          50: '#e6f0ff',
          100: '#cce0ff',
          200: '#99c1ff',
          300: '#66a3ff',
          400: '#3384ff',
          500: '#0066ff', // 科技蓝
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        // 霓虹色调 - 科技感强调色
        neon: {
          // 霓虹青
          cyan: {
            400: '#00f5d4', // 明亮霓虹青
            500: '#00e0c7', // 标准霓虹青
            600: '#00c7b0', // 深霓虹青
          },
          // 霓虹紫
          purple: {
            400: '#bc6ff1', // 明亮霓虹紫
            500: '#a756e8', // 标准霓虹紫
            600: '#9146d0', // 深霓虹紫
          },
          // 霓虹蓝
          blue: {
            400: '#01b4e4', // 明亮霓虹蓝
            500: '#0093c7', // 标准霓虹蓝
            600: '#007cb9', // 深霓虹蓝
          },
        },
        // 科技风深色背景
        tech: {
          // 深色背景
          dark: {
            800: '#0a0e17', // 深黑蓝背景
            900: '#050810', // 近黑色背景
          },
          // 面板颜色
          panel: {
            700: '#131929', // 深色面板
            800: '#0e1423', // 更深色面板
          },
          // 线条颜色
          line: {
            600: '#2d3a56', // 浅色线条
            700: '#1e2840', // 深色线条
          },
        },
        // 功能色
        success: {
          400: '#00e59f', // 科技绿
          500: '#00c88c', // 标准科技绿
        },
        warning: {
          400: '#ffc857', // 科技黄
          500: '#ffb527', // 标准科技黄
        },
        danger: {
          400: '#ff5964', // 科技红
          500: '#ff3e4d', // 标准科技红
        },
      },
      // 科技风格字体
      fontFamily: {
        // 主要字体 - 现代无衬线
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        // 等宽字体 - 代码和科技显示
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        // 标题字体 - 科技感强的字体
        tech: ['Orbitron', 'Rajdhani', 'sans-serif'],
      },
      // 科技风格边框
      borderColor: {
        'tech-glow': 'rgba(0, 102, 255, 0.5)', // 科技蓝发光边框
      },
      // 科技风格阴影
      boxShadow: {
        // 发光阴影效果
        'glow-primary': '0 0 15px rgba(0, 102, 255, 0.5)',
        'glow-cyan': '0 0 15px rgba(0, 245, 212, 0.5)',
        'glow-purple': '0 0 15px rgba(188, 111, 241, 0.5)',
        // 内嵌发光效果
        'inner-glow': 'inset 0 0 10px rgba(0, 102, 255, 0.3)',
      },
      // 科技风格动画
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
        'typing': 'typing 2.5s steps(40, end)',
      },
      keyframes: {
        // 发光效果
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 102, 255, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 102, 255, 0.8)' },
        },
        // 扫描线效果
        scan: {
          '0%': { backgroundPosition: '0 -100%' },
          '100%': { backgroundPosition: '0 200%' },
        },
        // 打字效果
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
      },
      // 科技风格背景图案
      backgroundImage: {
        // 科技网格背景
        'tech-grid': "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%232d3a56' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/svg%3E')",
        // 科技扫描线
        'tech-scan': 'linear-gradient(to bottom, transparent 0%, rgba(0, 102, 255, 0.1) 50%, transparent 100%)',
      },
    },
    // 响应式断点
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  // 插件配置
  plugins: [],
  // 暗色模式配置
  darkMode: 'class',
}