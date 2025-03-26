@echo off
echo Pushing your changes to GitHub

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

git push origin %branch_name%

echo Done! Your changes have been pushed to GitHub.

pause