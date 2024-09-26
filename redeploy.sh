#!/bin/bash
# Example commands to redeploy your bot

# Pull the latest changes from your repository
git pull origin main

# Install any new dependencies
npm install

# Restart the bot (assuming you are using PM2 for process management)
pm2 restart bhashimd

