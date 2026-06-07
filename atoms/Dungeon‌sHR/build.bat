@echo off
chcp 65001 > nul
setlocal

cd /d "%~dp0"

where node > nul 2>&1
if errorlevel 1 (
    echo.
    echo [ERROR] Node.js not found in PATH.
    echo Install Node 20+ from https://nodejs.org/
    echo After install, close all cmd windows then re-run this .bat.
    echo.
    pause
    exit /b 1
)

node scripts\build.mjs
set EXITCODE=%ERRORLEVEL%

if %EXITCODE% NEQ 0 (
    echo.
    echo [ERROR] Build failed with exit code %EXITCODE%
    pause
    exit /b %EXITCODE%
)

echo.
echo [OK] Output: %~dp0dist-html\Dungeon-HR.html
echo Double-click the HTML to play offline (Chrome / Edge recommended).
echo.
pause
