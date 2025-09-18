@echo off
echo ========================================
echo    RMD-GSU IMS - System Startup
echo ========================================

echo.
echo Starting Laravel Server...
cd /d "%~dp0"
start "Laravel Server" cmd /k "php artisan serve --port=8001"

echo.
echo Waiting for server to start...
timeout /t 3 /nobreak >nul

echo.
echo Opening System Diagnostic Page...
start "" "http://localhost:8001/system_fix.html"

echo.
echo Starting React Development Server...
cd ..\client
start "React Dev Server" cmd /k "npm run dev"

echo.
echo ========================================
echo    System Started Successfully!
echo ========================================
echo.
echo Laravel Server: http://localhost:8001
echo React App: http://localhost:3007
echo System Test: http://localhost:8001/system_fix.html
echo.
echo Press any key to exit this window...
pause >nul
