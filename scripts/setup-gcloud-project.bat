@echo off
echo Setting up Google Cloud project...

REM Set the project ID with timestamp
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set PROJECT_ID=onboardblkoutnxt-%datetime:~0,8%

REM Create the project
echo Creating project %PROJECT_ID%...
gcloud projects create %PROJECT_ID% --name="BLKOUTNXT Onboarding"

REM Set the project as current
echo Setting project as current...
gcloud config set project %PROJECT_ID%

REM Enable necessary APIs
echo Enabling Google Sheets API...
gcloud services enable sheets.googleapis.com

REM Create service account
echo Creating service account...
gcloud iam service-accounts create blkoutnxt-sheets --description="Service account for BLKOUTNXT Google Sheets integration" --display-name="BLKOUTNXT Sheets"

REM Grant necessary permissions
echo Granting permissions...
gcloud projects add-iam-policy-binding %PROJECT_ID% --member="serviceAccount:blkoutnxt-sheets@%PROJECT_ID%.iam.gserviceaccount.com" --role="roles/spreadsheets.editor"

echo.
echo Setup complete! Please check the output above for any errors.
echo.
echo Next steps:
echo 1. Go to https://console.cloud.google.com/iam-admin/serviceaccounts?project=%PROJECT_ID%
echo 2. Find the service account 'blkoutnxt-sheets'
echo 3. Click on it and go to the 'Keys' tab
echo 4. Click 'Add Key' > 'Create new key'
echo 5. Choose 'JSON' format
echo 6. Click 'Create'
echo.
pause 