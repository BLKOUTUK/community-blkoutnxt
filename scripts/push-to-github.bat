@echo off
echo Pushing your project to GitHub

REM Check if git is initialized
if not exist .git (
  echo Initializing git repository...
  git init
)

REM Check if remote origin exists
git remote | findstr "origin" > nul
if errorlevel 1 (
  echo No remote repository found.
  echo Please enter the URL of your existing GitHub repository:
  set /p repo_url="GitHub repository URL: "
  
  if "%repo_url%"=="" (
    echo No URL provided. Exiting.
    exit /b 1
  )
  
  echo Adding remote repository...
  git remote add origin %repo_url%
) else (
  for /f "tokens=*" %%a in ('git remote get-url origin') do (
    echo Remote repository already configured: %%a
  )
  set /p use_existing="Do you want to use this repository? (Y/n): "
  
  if /i "%use_existing%"=="n" (
    echo Please enter the URL of your existing GitHub repository:
    set /p repo_url="GitHub repository URL: "
    
    if "%repo_url%"=="" (
      echo No URL provided. Exiting.
      exit /b 1
    )
    
    git remote remove origin
    echo Adding new remote repository...
    git remote add origin %repo_url%
  )
)

REM Check if we need to pull first
echo Checking if we need to pull from the repository first...
set /p pull_first="Do you want to pull from the repository before pushing? (y/N): "

if /i "%pull_first%"=="y" (
  set /p pull_branch="Enter branch name to pull from (default: 'main'): "
  if "%pull_branch%"=="" set pull_branch=main
  
  echo Pulling from %pull_branch%...
  git pull origin %pull_branch% --allow-unrelated-histories
)

REM Add all files
echo Adding files to git...
git add .

REM Commit changes
echo Committing changes...
set /p commit_message="Enter commit message: "

if "%commit_message%"=="" (
  echo No commit message provided. Using default.
  set commit_message=Update project files
)

git commit -m "%commit_message%"

REM Push to GitHub
echo Pushing to GitHub...
set /p branch_name="Enter branch name (default: 'main'): "
if "%branch_name%"=="" set branch_name=main

git push -u origin %branch_name%

echo Done! Your code has been pushed to GitHub.
for /f "tokens=*" %%a in ('git remote get-url origin') do echo Repository URL: %%a

pause