@echo off
chcp 65001 > nul
setlocal

cd /d "%~dp0app\frontend"

where node > nul 2>&1
if errorlevel 1 (
    echo.
    echo [ERROR] Node.js not found in PATH.
    echo Install Node 20+ from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

if not exist node_modules (
    echo [dev] node_modules missing, installing dependencies. First run takes 3-5 min...
    where pnpm > nul 2>&1
    if errorlevel 1 (
        npm install --no-audit --no-fund --legacy-peer-deps
    ) else (
        pnpm install
    )
    if errorlevel 1 (
        echo.
        echo [ERROR] Dependency install failed.
        pause
        exit /b 1
    )
)

echo.
echo [dev] Starting Vite dev server...
echo [dev] Browser will open http://localhost:3000 in 5 seconds.
echo [dev] Edit any .tsx / .ts / .css under src/ and save - browser auto reloads.
echo [dev] Press Ctrl+C to stop.
echo.

start /b "" cmd /c "timeout /t 5 /nobreak > nul && start http://localhost:3000"

npx vite --host 0.0.0.0 --port 3000

echo.
echo [dev] Server stopped.
pause
