#!/bin/bash

# AWS S3 deployment script
# Prerequisites: AWS CLI installed and configured

# Configuration
S3_BUCKET="your-s3-bucket-name"
CLOUDFRONT_DISTRIBUTION_ID="your-cloudfront-distribution-id"
REGION="us-east-1"

# Build the application
echo "Building application..."
npm run build

# Sync build folder with S3 bucket
echo "Deploying to S3..."
aws s3 sync dist/ s3://$S3_BUCKET/ --delete --region $REGION

# Invalidate CloudFront cache
echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*" --region $REGION

echo "Deployment completed successfully!"