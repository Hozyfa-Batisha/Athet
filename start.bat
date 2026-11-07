@echo off
chcp 65001 >nul
cd /d "%~dp0"
set ALLOW_SIGNUP=true
start "" http://localhost:3000
node src\server.js
pause
