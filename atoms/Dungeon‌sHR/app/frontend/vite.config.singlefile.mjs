// 单文件离线打包专用 Vite 配置
// 用法：vite build --config vite.config.singlefile.mjs
// 与默认 vite.config.ts 区别：
//   - 关 code splitting / manualChunks → 全部 JS 合并成一个 entry chunk
//   - 关 cssCodeSplit → CSS 全部进同一个文件
//   - inlineDynamicImports → 动态 import() 也合并到主 chunk
//   - base = './' → 资产引用相对路径，可在 file:// 下打开
//   - 自定义插件：把 BrowserRouter 替换成 HashRouter（file:// 下 HTML5 history API 不工作）
//   - 跳过 atoms() / sitemap / prerender / sourceLocator 等只在线上 / dev 时有用的插件

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 在 vite 处理 index.html 之前先把 %VITE_APP_*% 占位的环境变量设进去
// 否则 vite-plugin-html 的 decodeURI 会因为未替换的 % 字面量报 "URI malformed"
process.env.VITE_APP_TITLE ??= '地下城打工人 Dungeon HR';
process.env.VITE_APP_DESCRIPTION ??= 'AI Game Jam 项目：魔王城 HR 总监应对勇者突袭，撑过 N 波让公司上市。';
// favicon 用内联 svg，避免离线运行时去拉远程 ico
process.env.VITE_APP_LOGO_URL ??= 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%23B8B5A8%22%2F%3E%3C%2Fsvg%3E';

// Vite 插件：把 react-router-dom 的 BrowserRouter import 重写为 HashRouter as BrowserRouter
// 这样 App.tsx 里的 <BrowserRouter> 实际渲染成 <HashRouter>，路由用 #/path 而非 /path
function useHashRouterInsteadOfBrowserRouter() {
  return {
    name: 'use-hash-router',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('App.tsx') && !id.endsWith('App.jsx')) return null;
      const replaced = code.replace(
        /import\s*\{([^}]*\bBrowserRouter\b[^}]*)\}\s*from\s*['"]react-router-dom['"]/,
        (_m, imports) => {
          const newImports = imports.replace(/\bBrowserRouter\b/g, 'HashRouter as BrowserRouter');
          return `import {${newImports}} from 'react-router-dom'`;
        }
      );
      if (replaced === code) return null;
      return { code: replaced, map: null };
    },
  };
}

export default defineConfig({
  plugins: [
    useHashRouterInsteadOfBrowserRouter(),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: './',
  build: {
    target: 'esnext',
    cssCodeSplit: false,
    assetsInlineLimit: 0,            // 不让 vite 自己 inline；交给 post-build 脚本统一处理
    chunkSizeWarningLimit: 50000,    // 50 MB，避免 warn 噪音
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true,
      },
    },
  },
  // 让 process.env.NODE_ENV 等在 build 时被 vite 正确处理
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});
