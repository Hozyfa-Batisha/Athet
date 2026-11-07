@echo off
chcp 65001 >nul
cd /d "%~dp0.."
node scripts\download-audio.js %1
pause
