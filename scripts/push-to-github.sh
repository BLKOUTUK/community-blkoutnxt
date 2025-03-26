#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Pushing your project to GitHub${NC}"

# Check if git is initialized
if [ ! -d .git ]; then
  echo -e "${GREEN}Initializing git repository...${NC}"
  git init
fi

# Check if remote origin exists
if ! git remote | grep -q "origin"; then
  echo -e "${YELLOW}No remote repository found.${NC}"
  echo -e "Please enter the URL of your existing GitHub repository:"
  read -p "GitHub repository URL: " repo_url
  
  if [ -z "$repo_url" ]; then
    echo "No URL provided. Exiting."
    exit 1
  fi
  
  echo -e "${GREEN}Adding remote repository...${NC}"
  git remote add origin $repo_url
else
  echo -e "${GREEN}Remote repository already configured: $(git remote get-url origin)${NC}"
  read -p "Do you want to use this repository? (Y/n): " use_existing
  
  if [[ $use_existing == "n" || $use_existing == "N" ]]; then
    echo -e "Please enter the URL of your existing GitHub repository:"
    read -p "GitHub repository URL: " repo_url
    
    if [ -z "$repo_url" ]; then
      echo "No URL provided. Exiting."
      exit 1
    fi
    
    git remote remove origin
    echo -e "${GREEN}Adding new remote repository...${NC}"
    git remote add origin $repo_url
  fi
fi

# Check if we need to pull first
echo -e "${YELLOW}Checking if we need to pull from the repository first...${NC}"
read -p "Do you want to pull from the repository before pushing? (y/N): " pull_first

if [[ $pull_first == "y" || $pull_first == "Y" ]]; then
  read -p "Enter branch name to pull from (default: 'main'): " pull_branch
  pull_branch=${pull_branch:-"main"}
  
  echo -e "${GREEN}Pulling from $pull_branch...${NC}"
  git pull origin $pull_branch --allow-unrelated-histories
fi

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

git push -u origin $branch_name

echo -e "${GREEN}Done! Your code has been pushed to GitHub.${NC}"
echo -e "Repository URL: $(git remote get-url origin)"