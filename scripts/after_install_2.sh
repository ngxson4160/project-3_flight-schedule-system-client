#!/bin/bash

# Change to the application directory
cd /var/www/public-connect-client-2

# Install dependencies
npm install --legacy-peer-deps

npm install -g pm2

# Build the application
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Start the application using pm2
NITRO_PORT=4000 pm2 start .output/server/index.mjs --name public-connect-client-2 
