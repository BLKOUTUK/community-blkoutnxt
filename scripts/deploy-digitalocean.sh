#!/bin/bash

# Digital Ocean App Platform deployment script
# Prerequisites: 
# 1. Digital Ocean CLI (doctl) installed and authenticated
# 2. App created on Digital Ocean App Platform

# Configuration
APP_ID="your-app-id"  # Replace with your Digital Ocean App ID
APP_NAME="your-app-name"  # Replace with your app name

# Check if doctl is installed
if ! command -v doctl &> /dev/null; then
    echo "Error: doctl is not installed. Please install the Digital Ocean CLI."
    echo "Visit: https://docs.digitalocean.com/reference/doctl/how-to/install/"
    exit 1
fi

# Check if authenticated with Digital Ocean
if ! doctl account get &> /dev/null; then
    echo "Error: Not authenticated with Digital Ocean."
    echo "Please run: doctl auth init"
    exit 1
fi

# Build the application
echo "Building application..."
npm run build

# Create app.yaml if it doesn't exist
if [ ! -f "app.yaml" ]; then
    echo "Creating app.yaml configuration file..."
    cat > app.yaml << EOL
name: $APP_NAME
static_sites:
- name: frontend
  github:
    branch: main
    deploy_on_push: true
    repo: owner/repo
  build_command: npm run build
  output_dir: dist
  environment_slug: node-js
  env:
    - key: VITE_SUPABASE_URL
      scope: RUN_AND_BUILD_TIME
      value: \${VITE_SUPABASE_URL}
    - key: VITE_SUPABASE_ANON_KEY
      scope: RUN_AND_BUILD_TIME
      value: \${VITE_SUPABASE_ANON_KEY}
    - key: VITE_APP_URL
      scope: RUN_AND_BUILD_TIME
      value: \${VITE_APP_URL}
  routes:
  - path: /
EOL
    echo "Please edit app.yaml with your specific GitHub repository details."
    echo "Then run this script again."
    exit 0
fi

# Deploy to Digital Ocean App Platform
echo "Deploying to Digital Ocean App Platform..."
if [ -z "$APP_ID" ] || [ "$APP_ID" = "your-app-id" ]; then
    # Create new app if APP_ID is not set
    echo "Creating new app on Digital Ocean App Platform..."
    doctl apps create --spec app.yaml
else
    # Update existing app
    echo "Updating existing app on Digital Ocean App Platform..."
    doctl apps update $APP_ID --spec app.yaml
fi

echo "Deployment initiated. Check the status in the Digital Ocean dashboard."
echo "Visit: https://cloud.digitalocean.com/apps"