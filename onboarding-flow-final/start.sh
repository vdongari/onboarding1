#!/bin/bash

# Custom Onboarding Flow Application Startup Script

echo "Starting Custom Onboarding Flow Application..."

# Check if PostgreSQL is running
if ! pg_isready -q; then
    echo "PostgreSQL is not running. Please start PostgreSQL first."
    echo "On macOS with Homebrew: brew services start postgresql"
    echo "On Ubuntu/Debian: sudo systemctl start postgresql"
    exit 1
fi

# Start backend in background
echo "Starting Spring Boot backend..."
cd backend
mvn spring-boot:run > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 10

# Check if backend is running
if ! curl -s http://localhost:8080/actuator/health > /dev/null; then
    echo "Backend failed to start. Check backend.log for details."
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo "Backend started successfully!"

# Start frontend
echo "Starting React frontend..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo "Applications started!"
echo "Backend: http://localhost:8080"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both applications"

# Function to cleanup on exit
cleanup() {
    echo "Stopping applications..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait
