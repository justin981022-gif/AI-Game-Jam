@echo off
chcp 65001 > nul
setlocal

REM Windows 一键启动 Vite dev server（带 HMR 热更新）
REM 用法：双击 dev.bat
REM 默认浏览器自动打开 http://localhost:3000

cd /d "%~dp0app\frontend"

where node > nul 2>&1
if errorlevel 1 (
    echo [dev] 错误：未检测到 Node.js，请先装 Node 18+
    pause
    exit /b 1
)

if not exist node_modules (
    echo [dev] node_modules 缺失，先装依赖（约 3-5 分钟）...
    where pnpm > nul 2>&1
    if not errorlevel 1 (
        pnpm install
    ) else (
        npm install --no-audit --no-fund --legacy-peer-deps
    )
)

echo [dev] 启动 Vite dev server...
echo [dev] 浏览器将自动打开 http://localhost:3000
echo [dev] 改 src/ 下任何 .tsx / .ts / .css 文件保存后浏览器自动刷新
echo [dev] 按 Ctrl+C 停止
echo.

REM 5 秒后自动开浏览器（让 vite 先把端口监听起来）
start /b "" cmd /c "timeout /t 5 /nobreak > nul && start http://localhost:3000"

npx vite --host 0.0.0.0 --port 3000
