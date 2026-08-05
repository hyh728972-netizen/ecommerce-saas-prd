/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1890ff',
        'bg-gray': '#f5f5f5',
        'content-white': '#ffffff',
        'error-red': '#ff4d4f',
        'login-blue': '#409eff',
      },
    },
  },
  plugins: [],
  // 避免与Ant Design冲突
  corePlugins: {
    preflight: false,
  },
}
