# PowerShell script for Google Sheets setup

# Function to check if a command exists
function Test-Command($Command) {
    return [bool](Get-Command -Name $Command -ErrorAction SilentlyContinue)
}

# Check if gcloud is installed
if (-not (Test-Command "gcloud")) {
    Write-Host "gcloud CLI is not installed. Please install it first:" -ForegroundColor Red
    Write-Host "https://cloud.google.com/sdk/docs/install"
    exit 1
}

# Check if user is logged in
$account = gcloud auth list --filter=status:ACTIVE --format="get(account)" 2>$null
if (-not $account) {
    Write-Host "Please log in to gcloud first:" -ForegroundColor Red
    Write-Host "gcloud auth login"
    exit 1
}

# Create new project
Write-Host "Creating new project..." -ForegroundColor Green
$projectId = "blkoutnxt-$(Get-Date -Format 'yyyyMMddHHmmss')"
gcloud projects create $projectId --name="BLKOUTNXT Sheets Integration"

# Set project
gcloud config set project $projectId

# Enable Sheets API
Write-Host "Enabling Google Sheets API..." -ForegroundColor Green
gcloud services enable sheets.googleapis.com

# Create service account
Write-Host "Creating service account..." -ForegroundColor Green
gcloud iam service-accounts create blkoutnxt-sheets `
    --description="Service account for BLKOUTNXT Google Sheets integration" `
    --display-name="BLKOUTNXT Sheets"

# Create and download key
Write-Host "Creating service account key..." -ForegroundColor Green
gcloud iam service-accounts keys create key.json `
    --iam-account="blkoutnxt-sheets@$projectId.iam.gserviceaccount.com"

# Get the service account email
$serviceAccountEmail = gcloud iam service-accounts describe "blkoutnxt-sheets@$projectId.iam.gserviceaccount.com" --format="get(email)"

# Convert key.json to base64
$keyBase64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes("key.json"))

Write-Host "`nSetup complete! Here are your next steps:" -ForegroundColor Green
Write-Host "1. Create a new Google Sheet and share it with this email: $serviceAccountEmail"
Write-Host "2. Copy the spreadsheet ID from the URL (it's between /d/ and /edit)"
Write-Host "3. Add these environment variables to your Supabase project:"
Write-Host "   GOOGLE_SHEET_ID=your_spreadsheet_id"
Write-Host "   GOOGLE_SERVICE_ACCOUNT=$keyBase64"

Write-Host "`nWould you like me to help you set up the Google Sheet template?" -ForegroundColor Green
Write-Host "Press Enter to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 