#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Pushing your changes to GitHub${NC}"

# Add all files
echo -e "${GREEN}Adding files to git...${NC}"
git add .

# Commit changes
echo -e "${GREEN}Committing changes...${NC}"
read -p "Enter commit message: " commit_message

if [ -z "$commit_message" ]; then
  echo "No commit message provided. Using default."
  commit_message="Update project files"
fi

git commit -m "$commit_message"

# Push to GitHub
echo -e "${GREEN}Pushing to GitHub...${NC}"
read -p "Enter branch name (default: 'main'): " branch_name
branch_name=${branch_name:-"main"}

git push origin $branch_name

echo -e "${GREEN}Done! Your changes have been pushed to GitHub.${NC}"