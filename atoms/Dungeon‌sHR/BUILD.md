# 地下城打工人 — Windows 本地打包说明

## 一句话

**双击 `build.bat`**，等几分钟，得到 `dist-html/Dungeon-HR.html` —— 一个能在任何浏览器里直接打开的离线游戏文件。

---

## 前置条件

| 工具 | 版本 | 检查方式 | 安装 |
|------|------|---------|------|
| Node.js | 18+（推荐 v20.x）| `node --version` | <https://nodejs.org/> |
| npm | 9+（随 Node 自带）| `npm --version` | 跟随 Node |
| pnpm | 可选（更快）| `pnpm --version` | `npm install -g pnpm` |

> 已检测到当前机器：Node v20.10.0 / npm 10.2.4 ✓

---

## 工作流程

```
双击 build.bat
    │
    ▼
1. 检查 Node 是否安装
    │
    ▼
2. 调用 scripts/build.mjs
    │
    ├─ a. 检查 app/frontend/node_modules
    │     未装 → pnpm install（优先）/ npm install --legacy-peer-deps
    │     已装 → 跳过
    │
    ├─ b. vite build --config vite.config.singlefile.mjs
    │     输出 → app/frontend/dist/
    │     特殊配置：
    │       - 关 code splitting（一个 entry chunk）
    │       - BrowserRouter 替换成 HashRouter（file:// 友好）
    │       - base = './'（相对路径资产）
    │
    └─ c. 后处理：把 dist/index.html 的所有外部资源 inline
          - <script src="..."> → <script type="module">...</script>
          - <link rel="stylesheet"> → <style>...</style>
          - "/art/xxx.png" 字符串 → "data:image/png;base64,xxx"
          - 远程字体 / CDN 链接保留（离线时降级到系统字体）
    │
    ▼
3. 输出 dist-html/Dungeon-HR.html (~20 MB)
    双击即可玩
```

---

## 文件说明

```
atoms/Dungeon‌sHR/
├── build.bat                                    ← Windows 一键入口
├── BUILD.md                                     ← 本文档
├── scripts/
│   └── build.mjs                                ← 构建编排（Node ESM）
├── app/frontend/
│   ├── vite.config.ts                           ← 默认 vite 配置（dev / 在线部署用，不动）
│   ├── vite.config.singlefile.mjs               ← 单文件离线构建专用配置（新增）
│   ├── package.json                             ← 不修改
│   ├── src/                                     ← 不修改
│   ├── public/art/                              ← 36 张美术资产（aiart 落盘）
│   ├── node_modules/                            ← 自动生成（首次运行约 3-5 分钟）
│   └── dist/                                    ← vite 构建中间产物（每次清理）
└── dist-html/
    └── Dungeon-HR.html                          ← 最终交付文件
```

---

## 输出文件特性

| 项 | 值 |
|----|----|
| 文件名 | `Dungeon-HR.html` |
| 大小 | 约 18-22 MB（base64 图片占大头）|
| 兼容性 | Chrome / Edge / Firefox / Safari 现代版本 |
| 联网需求 | **无**（包含全部 JS / CSS / 图片）|
| 例外 | Google Fonts（ZCOOL 字体）— 离线时降级为系统字体，不影响游戏运行 |
| 打开方式 | 双击 / 拖到浏览器 / `file:///path/to/Dungeon-HR.html` |
| 路由 | HashRouter（URL 形如 `file:///.../Dungeon-HR.html#/`）|
| 状态保存 | 浏览器 localStorage（同源策略下 file:// 各文件位置独立）|

---

## 常见问题

### Q1：build.bat 报错 "未检测到 Node.js"

装 Node.js v20.x → <https://nodejs.org/zh-cn/download> → 重启 cmd 再跑

### Q2：npm install 卡住或报错

- 网络问题：试 `npm config set registry https://registry.npmmirror.com` 切淘宝源后再跑
- peer deps 冲突：脚本已加 `--legacy-peer-deps`，仍报错就手动删 `app/frontend/node_modules` 重试

### Q3：vite build 报错 "out of memory"

改 build.bat 在 `node scripts\build.mjs` 前加：`set NODE_OPTIONS=--max-old-space-size=4096`

### Q4：HTML 文件太大（> 50 MB）

减少 public/art/ 里的资源体积：
- 用 [tinypng](https://tinypng.com/) 压缩 PNG
- 或用 webp 格式（Vite 会保留，浏览器原生支持）

### Q5：双击 HTML 后白屏 / 控制台报错

按 F12 打开开发者工具看 Console 错误：
- "BrowserRouter" 相关 → 检查 vite.config.singlefile.mjs 的 useHashRouterInsteadOfBrowserRouter 插件是否生效
- "404 ... art/..." → 后处理 inline 没成功，检查 dist/art/ 是否存在
- 跨域字体 → Google Fonts 加载被拦，正常现象，不影响游戏

### Q6：游戏内图片显示不出来 / 显示破碎图标

inline 失败。在浏览器开发者工具的 Console 跑：
```js
console.log(document.querySelectorAll('img:not([src^="data:"])'))
```
若有匹配项 → 这些 `<img>` 的 src 没被替换。把这些 src 路径回贴到 scripts/build.mjs 的 `inlineImagesInString` 正则去补匹配。

### Q7：想跑 dev server（边改边看）

照旧用 Atoms 默认流程：
```
cd app/frontend
pnpm install (or npm install --legacy-peer-deps)
pnpm dev (or npm run dev)
```
打开 <http://localhost:3000>。本文档的 `build.bat` 仅生成离线单文件 HTML，不影响开发流程。

---

## 重新打包（增量）

后续修改源码后再次打包：
1. 直接双击 `build.bat`（node_modules 已存在会跳过安装，几秒到一分钟内出新 HTML）
2. 旧 `dist-html/Dungeon-HR.html` 会被覆盖

**强制全新打包**（清依赖重装）：
```cmd
rmdir /s /q app\frontend\node_modules
rmdir /s /q app\frontend\dist
build.bat
```
