#!/bin/bash

# Install Node.js 16.x
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

chmod -R 777 /var/www/public-connect-client