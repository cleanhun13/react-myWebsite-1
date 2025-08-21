/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 亮色主题颜色
        light: {
          primary: '#3b82f6',
          secondary: '#6366f1',
          accent: '#10b981',
          background: '#ffffff',
          text: '#1f2937',
          muted: '#6b7280',
          border: '#e5e7eb',
          card: '#f9fafb',
        },
        // 暗色主题颜色
        dark: {
          primary: '#60a5fa',
          secondary: '#818cf8',
          accent: '#34d399',
          background: '#111827',
          text: '#f9fafb',
          muted: '#9ca3af',
          border: '#374151',
          card: '#1f2937',
        },
      },
    },
  },
  plugins: [],
}