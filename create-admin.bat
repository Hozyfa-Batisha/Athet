@echo off
setlocal
title Athar - Create Local Administrator
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo Install Node.js 24 or newer, then try again.
  pause
  exit /b 1
)
if not exist "node_modules\@electric-sql\pglite\package.json" (
  echo Run start.bat once to install the site files, then try again.
  pause
  exit /b 1
)
echo Close the local site window before creating the administrator.
node "scripts\create-admin.js"
if errorlevel 1 (
  echo Account creation failed. Read the error above.
  pause
  exit /b 1
)
echo Open start.bat again, then sign in with the same name and password.
pause
endlocal
