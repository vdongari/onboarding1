@echo off
echo Starting Custom Onboarding Flow Application...

REM Start backend in background
echo Starting Spring Boot backend...
cd backend
start "Backend" cmd /k "mvn spring-boot:run"
cd ..

REM Wait for backend to start
echo Waiting for backend to start...
timeout /t 15 /nobreak > nul

REM Start frontend
echo Starting React frontend...
cd frontend
start "Frontend" cmd /k "npm start"
cd ..

echo Applications started!
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo Close the command windows to stop the applications.
pause
