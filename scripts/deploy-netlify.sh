#!/bin/bash

# Netlify deployment script
# Prerequisites: Netlify CLI installed and authenticated

# Configuration
NETLIFY_SITE_ID="your-netlify-site-id"
PRODUCTION_BRANCH="main"
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Build the application
echo "Building application..."
npm run build

# Deploy to Netlify
if [ "$CURRENT_BRANCH" = "$PRODUCTION_BRANCH" ]; then
  echo "Deploying to production..."
  netlify deploy --site=$NETLIFY_SITE_ID --dir=dist --prod
else
  echo "Deploying preview..."
  netlify deploy --site=$NETLIFY_SITE_ID --dir=dist
fi

echo "Deployment completed successfully!"