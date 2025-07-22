#!/bin/bash
echo "Starting application"
cd /var/www/html/lambda
if [ -f lambda_function.py ]; then
    nohup python3 lambda_function.py > server.log 2>&1 &
    echo $! > server.pid
    echo "Application started"
else
    echo "Error: lambda_function.py not found" >&2
    exit 1
fi
