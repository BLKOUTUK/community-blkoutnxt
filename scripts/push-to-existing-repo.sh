#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

REPO_URL="https://github.com/BLKOUTUK/community-blkoutnxt.git"

echo -e "${YELLOW}Pushing your project to GitHub repository: ${REPO_URL}${NC}"

# Check if git is initialized
if [ ! -d .git ]; then
  echo -e "${GREEN}Initializing git repository...${NC}"
  git init
fi

# Check if remote origin exists and set it to the correct URL
if ! git remote | grep -q "origin"; then
  echo -e "${GREEN}Adding remote repository...${NC}"
  git remote add origin $REPO_URL
else
  current_url=$(git remote get-url origin)
  if [ "$current_url" != "$REPO_URL" ]; then
    echo -e "${YELLOW}Updating remote repository URL...${NC}"
    git remote set-url origin $REPO_URL
  else
    echo -e "${GREEN}Remote repository already correctly configured.${NC}"
  fi
fi

# Check if we need to pull first
echo -e "${YELLOW}Checking if we need to pull from the repository first...${NC}"
read -p "Do you want to pull from the repository before pushing? (y/N): " pull_first

if [[ $pull_first == "y" || $pull_first == "Y" ]]; then
  read -p "Enter branch name to pull from (default: 'main'): " pull_branch
  pull_branch=${pull_branch:-"main"}
  
  echo -e "${GREEN}Pulling from $pull_branch...${NC}"
  git pull origin $pull_branch --allow-unrelated-histories || {
    echo -e "${YELLOW}Pull failed. This might be because the remote branch doesn't exist yet or there are conflicts.${NC}"
    echo -e "${YELLOW}Continuing with push...${NC}"
  }
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
echo -e "Repository URL: $REPO_URL"