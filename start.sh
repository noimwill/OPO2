#!/bin/bash
# Save as start.sh in the root directory

echo "Starting OPO2 Crypto Portfolio Application..."

# Start Django backend
cd backend
source venv/bin/activate
python manage.py runserver &
BACKEND_PID=$!
echo "Backend running with PID: $BACKEND_PID"

# Start React frontend
cd ../frontend
npm start &
FRONTEND_PID=$!
echo "Frontend running with PID: $FRONTEND_PID"

# Wait for user to stop the application
echo "Press Ctrl+C to stop the application"
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait