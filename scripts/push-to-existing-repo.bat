@echo off
echo Pushing your project to GitHub

set REPO_URL=https://github.com/BLKOUTUK/community-blkoutnxt.git

echo Pushing your project to GitHub repository: %REPO_URL%

REM Check if git is initialized
if not exist .git (
  echo Initializing git repository...
  git init
)

REM Check if remote origin exists and set it to the correct URL
git remote | findstr "origin" > nul
if errorlevel 1 (
  echo Adding remote repository...
  git remote add origin %REPO_URL%
) else (
  for /f "tokens=*" %%a in ('git remote get-url origin') do (
    if not "%%a"=="%REPO_URL%" (
      echo Updating remote repository URL...
      git remote set-url origin %REPO_URL%
    ) else (
      echo Remote repository already correctly configured.
    )
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
  if errorlevel 1 (
    echo Pull failed. This might be because the remote branch doesn't exist yet or there are conflicts.
    echo Continuing with push...
  )
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
echo Repository URL: %REPO_URL%

pause