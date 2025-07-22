#!/bin/bash
echo "Stopping application"
if [ -f /var/www/html/lambda/server.pid ]; then
    sudo kill $(cat /var/www/html/lambda/server.pid)
    rm -f /var/www/html/lambda/server.pid
fi
echo "Application stopped"
