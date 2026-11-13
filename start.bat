@echo off
cd /d "%~dp0"
echo ========================================================
echo  Starting XYZ Hotel Full-Stack Application
echo ========================================================
echo.
echo 1. Starting Backend API on http://localhost:5000 ...
start "XYZ Hotel Backend (Port 5000)" cmd /k "cd /d \"%~dp0server\" && npm start"

ping -n 3 127.0.0.1 >nul

echo 2. Starting Frontend Client on http://localhost:5173 ...
start "XYZ Hotel Frontend (Port 5173)" cmd /k "cd /d \"%~dp0client\" && npm run dev"

echo.
echo ========================================================
echo Both servers have been launched in separate windows!
echo - Public Website:        http://localhost:5173
echo - Private Admin Portal:  http://localhost:5173/private-management
echo - Backend API:           http://localhost:5000/api
echo ========================================================
echo.
ping -n 4 127.0.0.1 >nul
start http://localhost:5173
