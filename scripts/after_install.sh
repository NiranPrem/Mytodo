#!/bin/bash
echo "After install hook executed"
if sudo unzip /var/www/html/lambda/lambda_function.zip -d /var/www/html/lambda; then
    sudo chmod -R 755 /var/www/html/lambda
    echo "After install completed"
else
    echo "Error: Failed to unzip lambda_function.zip" >&2
    exit 1
fi
