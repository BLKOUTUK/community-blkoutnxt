#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}Setting up Google Sheets integration...${NC}"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}gcloud CLI is not installed. Please install it first:${NC}"
    echo "https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if user is logged in
if ! gcloud auth list --filter=status:ACTIVE --format="get(account)" &> /dev/null; then
    echo -e "${RED}Please log in to gcloud first:${NC}"
    echo "gcloud auth login"
    exit 1
fi

# Create new project
echo -e "${GREEN}Creating new project...${NC}"
PROJECT_ID="blkoutnxt-$(date +%s)"
gcloud projects create $PROJECT_ID --name="BLKOUTNXT Sheets Integration"

# Set project
gcloud config set project $PROJECT_ID

# Enable Sheets API
echo -e "${GREEN}Enabling Google Sheets API...${NC}"
gcloud services enable sheets.googleapis.com

# Create service account
echo -e "${GREEN}Creating service account...${NC}"
gcloud iam service-accounts create blkoutnxt-sheets \
    --description="Service account for BLKOUTNXT Google Sheets integration" \
    --display-name="BLKOUTNXT Sheets"

# Create and download key
echo -e "${GREEN}Creating service account key...${NC}"
gcloud iam service-accounts keys create key.json \
    --iam-account=blkoutnxt-sheets@$PROJECT_ID.iam.gserviceaccount.com

# Get the service account email
SERVICE_ACCOUNT_EMAIL=$(gcloud iam service-accounts describe blkoutnxt-sheets@$PROJECT_ID.iam.gserviceaccount.com --format="get(email)")

echo -e "${GREEN}Setup complete! Here are your next steps:${NC}"
echo "1. Create a new Google Sheet and share it with this email: $SERVICE_ACCOUNT_EMAIL"
echo "2. Copy the spreadsheet ID from the URL (it's between /d/ and /edit)"
echo "3. Add these environment variables to your Supabase project:"
echo "   GOOGLE_SHEET_ID=your_spreadsheet_id"
echo "   GOOGLE_SERVICE_ACCOUNT=$(cat key.json | base64)"

echo -e "${GREEN}Would you like me to help you set up the Google Sheet template?${NC}"
read -p "Press enter to continue..." 