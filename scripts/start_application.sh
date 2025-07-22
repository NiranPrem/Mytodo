#!/bin/bash
echo "Starting application"
# Example: Start a Python web server (adjust based on your application)
cd /var/www/html/lambda
nohup python3 lambda_function.py > server.log 2>&1 &
echo $! > server.pid
echo "Application started"
