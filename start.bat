@echo off
echo ========================================================
echo  Starting XYZ Hotel Full-Stack Application
echo ========================================================
echo.
echo 1. Starting Backend API on http://localhost:5000 ...
start "XYZ Hotel Backend (Port 5000)" cmd /k "cd server && npm start"

timeout /t 2 /nobreak >nul

echo 2. Starting Frontend Client on http://localhost:5173 ...
start "XYZ Hotel Frontend (Port 5173)" cmd /k "cd client && npm run dev"

echo.
echo ========================================================
echo Both servers have been launched in separate windows!
echo - Public Website:        http://localhost:5173
echo - Private Admin Portal:  http://localhost:5173/private-management
echo - Backend API:           http://localhost:5000/api
echo ========================================================
echo.
timeout /t 3 >nul
start http://localhost:5173
