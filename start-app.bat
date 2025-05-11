@echo off
cd /d %~dp0
pm2 start ecosystem.config.js
timeout /t 5
start http://localhost:3000 