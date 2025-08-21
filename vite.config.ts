import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import dynamicImport from 'vite-plugin-dynamic-import';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr(), dynamicImport()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // 添加服务器配置以允许局域网访问
  server: {
    host: '0.0.0.0', // 允许从任何IP访问
    port: 5173, // 保持默认端口或自定义
  },
  css: {
    postcss: {},
  },
});
