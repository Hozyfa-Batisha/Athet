@echo off
setlocal
title Athar - Local Site
cd /d "%~dp0"

if not exist "package.json" (
  echo Extract the complete project before running start.bat.
  pause
  exit /b 1
)

where node >nul 2>&1
if errorlevel 1 goto missing_node
node -e "process.exit(Number(process.versions.node.split('.')[0]) >= 24 ? 0 : 1)"
if errorlevel 1 goto missing_node

where npm >nul 2>&1
if errorlevel 1 goto missing_node

if not exist "node_modules\pg\package.json" goto install
if not exist "node_modules\@electric-sql\pglite\package.json" goto install
goto local_site

:install
echo Installing project dependencies. Internet is required for this first run.
call npm ci --include=dev --no-audit --no-fund
if errorlevel 1 (
  echo Installation failed. Check your connection and try again.
  pause
  exit /b 1
)

:local_site
set "NODE_ENV=development"
node "scripts\start-local.js"
if errorlevel 1 (
  echo The local site could not start. See the error above.
  pause
  exit /b 1
)
endlocal
exit /b 0

:missing_node
echo Install Node.js 24 or newer with npm, then reopen start.bat.
echo Official download: https://nodejs.org/en/download
pause
exit /b 1
