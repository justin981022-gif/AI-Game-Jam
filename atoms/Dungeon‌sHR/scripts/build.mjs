#!/usr/bin/env node
// 单文件 HTML 打包脚本（离线可双击运行）
//
// 工作流程：
//   1. 检查 / 安装 frontend node_modules（优先 pnpm，否则 npm，懒安装）
//   2. 调用 vite.config.singlefile.mjs 跑生产构建 → app/frontend/dist/
//   3. 后处理：
//      a. 解析 dist/index.html
//      b. 把 <script src="/assets/xxx.js"></script> 内联为 <script type="module">...</script>
//      c. 把 <link rel="stylesheet" href="/assets/xxx.css"> 内联为 <style>...</style>
//      d. 把 modulepreload / 远程 CDN 链接保留
//      e. 把 JS / CSS 字符串里的 "/art/xxx.png" / "/audio/xxx.mp3" 替换为 base64 data URI
//   4. 写到 dist-html/Dungeon-HR.html
//
// 设计取舍：
//   - 用 npm 安装时加 --legacy-peer-deps 避免某些 radix-ui 版本冲突
//   - 远程字体（Google Fonts）保留外链：开 file:// 时若离线则降级为系统字体，不阻塞游戏
//   - 大约 14 MB 公共资源 + JS bundle，最终 HTML 约 18-22 MB（base64 膨胀 ~33%）
//
// 用法：node scripts/build.mjs

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const FRONTEND = path.join(ROOT, 'app', 'frontend');
const DIST = path.join(FRONTEND, 'dist');
const OUTPUT_DIR = path.join(ROOT, 'dist-html');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'Dungeon-HR.html');

const log = (m) => console.log(`[build] ${m}`);
const warn = (m) => console.warn(`[build] WARN: ${m}`);

function run(cmd, args, opts = {}) {
  log(`$ ${cmd} ${args.join(' ')} (cwd=${path.basename(opts.cwd || process.cwd())})`);
  const r = spawnSync(cmd, args, { stdio: 'inherit', shell: true, ...opts });
  if (r.status !== 0) {
    console.error(`[build] command failed: ${cmd} ${args.join(' ')} (exit ${r.status})`);
    process.exit(r.status || 1);
  }
}

function which(cmd) {
  const r = spawnSync(process.platform === 'win32' ? 'where' : 'which', [cmd], { stdio: 'pipe', shell: true });
  return r.status === 0;
}

// 1. 安装依赖（如果 node_modules 不存在）
const nodeModules = path.join(FRONTEND, 'node_modules');
const viteBin = path.join(nodeModules, '.bin', process.platform === 'win32' ? 'vite.cmd' : 'vite');
if (!fs.existsSync(viteBin)) {
  if (which('pnpm')) {
    log('node_modules 缺失，使用 pnpm install...');
    run('pnpm', ['install'], { cwd: FRONTEND });
  } else {
    log('node_modules 缺失，使用 npm install --legacy-peer-deps...');
    run('npm', ['install', '--no-audit', '--no-fund', '--legacy-peer-deps'], { cwd: FRONTEND });
  }
} else {
  log('node_modules 已存在，跳过安装');
}

// 2. 跑 vite 构建（用 singlefile 配置）
log('运行 vite 生产构建（vite.config.singlefile.mjs）...');
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true, force: true });
}
run('npx', ['vite', 'build', '--config', 'vite.config.singlefile.mjs'], { cwd: FRONTEND });

// 3. 后处理：内联 JS / CSS / 图片 / 音频
log('后处理：内联 JS / CSS / 图片 / 音频到单 HTML...');
const indexPath = path.join(DIST, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error(`[build] dist/index.html 缺失，构建可能失败`);
  process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf8');

// 3a. 内联 <script src="...">（同源相对/绝对路径，跳过远程）
html = html.replace(/<script\b([^>]*)\bsrc="([^"]+)"([^>]*)><\/script>/g, (m, pre, src, post) => {
  if (/^https?:\/\//i.test(src)) return m; // 远程 CDN 保留
  const localPath = resolveAsset(src);
  if (!localPath || !fs.existsSync(localPath)) {
    warn(`<script src="${src}"> 未找到对应文件，保留原引用`);
    return m;
  }
  let js = fs.readFileSync(localPath, 'utf8');
  js = inlineImagesInString(js);
  // 清理可能的 //# sourceMappingURL=... 注释
  js = js.replace(/\n?\/\/# sourceMappingURL=[^\n]*/g, '');
  // 检查 type="module"
  const isModule = /type=["']module["']/.test(pre + post);
  return `<script${isModule ? ' type="module"' : ''}>${js}</script>`;
});

// 3b. 内联 <link rel="stylesheet" href="...">
html = html.replace(/<link\b([^>]*)\brel="stylesheet"([^>]*)>/g, (m, pre, post) => {
  const fullAttrs = pre + post;
  const hrefMatch = fullAttrs.match(/href="([^"]+)"/);
  if (!hrefMatch) return m;
  const href = hrefMatch[1];
  if (/^https?:\/\//i.test(href)) return m; // 远程字体 / CDN 保留
  const localPath = resolveAsset(href);
  if (!localPath || !fs.existsSync(localPath)) {
    warn(`<link href="${href}"> 未找到对应文件，保留原引用`);
    return m;
  }
  let css = fs.readFileSync(localPath, 'utf8');
  css = inlineImagesInString(css);
  return `<style>${css}</style>`;
});

// 3c. 删除 modulepreload（已经把 JS 都 inline 了，没意义）
html = html.replace(/<link\b[^>]*\brel="modulepreload"[^>]*>\s*/g, '');

// 3d. 内联 HTML body 里直接引用的图片 / 音频
html = inlineImagesInString(html);

// 3e. 替换 favicon URL 模板占位（如果还有未替换的 %VITE_APP_LOGO_URL%）
html = html.replace(/%VITE_APP_LOGO_URL%/g, 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect width="16" height="16" fill="%23B8B5A8"/></svg>');
html = html.replace(/%VITE_APP_TITLE%/g, '地下城打工人 Dungeon HR');
html = html.replace(/%VITE_APP_DESCRIPTION%/g, 'AI Game Jam 项目：魔王城 HR 总监应对勇者突袭，撑过 N 波让公司上市。');

// 4. 写出
fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(OUTPUT_FILE, html);

const sizeMB = (fs.statSync(OUTPUT_FILE).size / 1024 / 1024).toFixed(2);
log(`✅ 完成`);
log(`   输出：${OUTPUT_FILE}`);
log(`   大小：${sizeMB} MB`);
log(`   双击 HTML 文件即可在浏览器中离线运行（建议 Chrome / Edge）`);

// ---- helpers ----

// 把 dist 里相对/绝对 url（如 "/assets/index.js" 或 "./assets/index.js"）映射到磁盘绝对路径
function resolveAsset(url) {
  // 去掉查询串 / 锚点
  url = url.split('?')[0].split('#')[0];
  if (url.startsWith('/')) return path.join(DIST, url);
  if (url.startsWith('./')) return path.join(DIST, url.slice(2));
  return path.join(DIST, url);
}

// 在字符串里查找 art / audio 引用并替换为 data URI
//   匹配："/art/xxx.png" / "/audio/xxx.mp3" / url(/art/xxx.png) / url("/audio/xxx.mp3")
function inlineImagesInString(s) {
  // CSS url(...)
  s = s.replace(/url\((["']?)((?:\.\/|\/)?(?:art|audio)\/[^"')]+\.(png|jpg|jpeg|gif|svg|webp|mp3|wav|ogg|m4a|aac|flac))\1\)/gi, (m, q, p, ext) => {
    const dataUri = toDataUri(p, ext);
    return dataUri ? `url(${q}${dataUri}${q})` : m;
  });
  // 字符串字面量引用（单引号 / 双引号 / 反引号）
  s = s.replace(
    /(["'`])((?:\.\/|\/)?(?:art|audio)\/[A-Za-z0-9_\-\/]+?\.(png|jpg|jpeg|gif|svg|webp|mp3|wav|ogg|m4a|aac|flac))\1/gi,
    (m, q, p, ext) => {
      const dataUri = toDataUri(p, ext);
      return dataUri ? `${q}${dataUri}${q}` : m;
    }
  );
  return s;
}

function toDataUri(refPath, ext) {
  // refPath 形如 "/art/xxx.png" 或 "/audio/xxx.mp3"
  const stripped = refPath.replace(/^\.?\//, '');   // → "art/xxx.png"
  const filePath = path.join(DIST, stripped);
  if (!fs.existsSync(filePath)) return null;
  try {
    const data = fs.readFileSync(filePath);
    const e = ext.toLowerCase();
    const mime =
      e === 'svg' ? 'image/svg+xml'
      : ['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac'].includes(e) ? `audio/${e === 'mp3' ? 'mpeg' : e}`
      : `image/${e === 'jpg' ? 'jpeg' : e}`;
    return `data:${mime};base64,${data.toString('base64')}`;
  } catch {
    return null;
  }
}
