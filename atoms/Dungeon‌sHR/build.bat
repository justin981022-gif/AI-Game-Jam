@echo off
chcp 65001 > nul
setlocal

REM Windows 一键打包入口 — 调用 scripts\build.mjs 产出单文件 HTML
REM 用法：双击或在 cmd 里运行 build.bat

cd /d "%~dp0"

where node > nul 2>&1
if errorlevel 1 (
    echo [build] 错误：未检测到 Node.js
    echo [build] 请先安装 Node.js 18+ ^(推荐 v20.x^)：https://nodejs.org/
    pause
    exit /b 1
)

echo [build] Node 版本：
node --version

node scripts\build.mjs
set EXITCODE=%ERRORLEVEL%

if %EXITCODE% NEQ 0 (
    echo [build] 构建失败，退出码 %EXITCODE%
    pause
    exit /b %EXITCODE%
)

echo.
echo [build] ✅ 完成。输出目录：%~dp0dist-html\
echo [build] 双击 dist-html\Dungeon-HR.html 即可离线运行
echo.
pause
