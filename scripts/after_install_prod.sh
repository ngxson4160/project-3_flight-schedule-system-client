#!/bin/bash

sudo chown -R ubuntu:ubuntu /var/www/public-connect-client
# Change to the application directory
cd /var/www/public-connect-client

npm install -g pm2

# Check if the PM2 process exists
if pm2 show public-connect-client &> /dev/null; then
  # Stop the PM2 process
  pm2 reload public-connect-client
else
  # Start the application using pm2
  pm2 start .output/server/index.mjs --name public-connect-client
fi