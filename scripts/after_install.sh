#!/bin/bash
echo "After install hook executed"
# Unzip the Lambda function to the destination directory
sudo unzip /var/www/html/lambda/lambda_function.zip -d /var/www/html/lambda
# Set permissions (adjust as needed)
sudo chmod -R 755 /var/www/html/lambda
# Install any additional dependencies if required
cd /var/www/html/lambda
sudo pip install -r requirements.txt
echo "After install completed"
