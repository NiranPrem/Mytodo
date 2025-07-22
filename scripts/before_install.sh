#!/bin/bash
echo "Before install hook executed"
sudo mkdir -p /var/www/html/lambda
sudo chown ec2-user:ec2-user /var/www/html/lambda
sudo chmod 755 /var/www/html/lambda
echo "Before install completed"
