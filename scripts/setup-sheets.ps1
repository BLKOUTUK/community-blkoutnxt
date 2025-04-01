# PowerShell script for setting up Google Sheets integration with Workload Identity Federation

# Function to check if a command exists
function Test-Command($Command) {
    return [bool](Get-Command -Name $Command -ErrorAction SilentlyContinue)
}

# Function to create a new Google Sheet
function New-GoogleSheet {
    param (
        [string]$Title
    )
    
    # Create a new Google Sheet using the Google Sheets API
    $body = @{
        properties = @{
            title = $Title
        }
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "https://sheets.googleapis.com/v4/spreadsheets" `
        -Method Post `
        -Headers @{
            "Authorization" = "Bearer $env:GOOGLE_ACCESS_TOKEN"
            "Content-Type" = "application/json"
        } `
        -Body $body

    return $response.spreadsheetId
}

# Function to set up sheet headers
function Set-SheetHeaders {
    param (
        [string]$SpreadsheetId,
        [string]$SheetName
    )
    
    $headers = @(
        "Timestamp",
        "Name",
        "Email",
        "Role",
        "Organisation",
        "Status",
        "Welcome Survey Responses"
    )

    $body = @{
        values = @($headers)
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "https://sheets.googleapis.com/v4/spreadsheets/$SpreadsheetId/values/$SheetName!A1:G1?valueInputOption=USER_ENTERED" `
        -Method Put `
        -Headers @{
            "Authorization" = "Bearer $env:GOOGLE_ACCESS_TOKEN"
            "Content-Type" = "application/json"
        } `
        -Body $body

    return $response
}

# Main setup process
Write-Host "Setting up Google Sheets integration with Workload Identity Federation..." -ForegroundColor Green

# Check if gcloud is installed
if (-not (Test-Command "gcloud")) {
    Write-Host "Google Cloud SDK is not installed. Please install it first:" -ForegroundColor Red
    Write-Host "https://cloud.google.com/sdk/docs/install"
    exit 1
}

# Set project to existing project
Write-Host "Setting project to onboardblkoutnxt..." -ForegroundColor Yellow
gcloud config set project onboardblkoutnxt

# Enable required APIs
Write-Host "Enabling required APIs..." -ForegroundColor Yellow
gcloud services enable sheets.googleapis.com
gcloud services enable iamcredentials.googleapis.com

# Create service account if it doesn't exist
Write-Host "Creating service account..." -ForegroundColor Yellow
gcloud iam service-accounts create blkoutnxt-sheets `
    --description="Service account for BLKOUTNXT Google Sheets integration" `
    --display-name="BLKOUTNXT Sheets" `
    --project=onboardblkoutnxt

# Create Workload Identity Pool
Write-Host "Creating Workload Identity Pool..." -ForegroundColor Yellow
gcloud iam workload-identity-pools create "blkoutnxt-pool" `
    --project="onboardblkoutnxt" `
    --location="global" `
    --display-name="BLKOUTNXT Identity Pool"

# Get project number
$PROJECT_NUMBER = $(gcloud projects describe onboardblkoutnxt --format="value(projectNumber)")

# Create Workload Identity Provider for GitHub Actions
Write-Host "Creating Workload Identity Provider for GitHub Actions..." -ForegroundColor Yellow
gcloud iam workload-identity-pools providers create-oidc github-provider `
    --location="global" `
    --workload-identity-pool="blkoutnxt-pool" `
    --display-name="GitHub Actions Provider" `
    --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" `
    --issuer-uri="https://token.actions.githubusercontent.com" `
    --allowed-audiences="https://token.actions.githubusercontent.com" `
    --attribute-condition="attribute.repository=='onboardblkoutnxt/community-blkoutnxt'"

# Get the Workload Identity Provider resource name
$providerResourceName = "projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/blkoutnxt-pool/providers/github-provider"

# Grant GitHub Actions permission to impersonate service account
Write-Host "Granting GitHub Actions permission to impersonate service account..." -ForegroundColor Yellow
gcloud iam service-accounts add-iam-policy-binding blkoutnxt-sheets@onboardblkoutnxt.iam.gserviceaccount.com `
    --role="roles/iam.workloadIdentityUser" `
    --member="principalSet://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/blkoutnxt-pool/*"

# Get the service account email
$serviceAccountEmail = gcloud iam service-accounts describe "blkoutnxt-sheets@onboardblkoutnxt.iam.gserviceaccount.com" --format="get(email)"

Write-Host "`nSetup complete! Here are your next steps:" -ForegroundColor Green
Write-Host "1. Create a new Google Sheet and share it with this email: $serviceAccountEmail"
Write-Host "2. Copy the spreadsheet ID from the URL (it's between /d/ and /edit)"
Write-Host "3. Add these environment variables to your GitHub repository secrets:"
Write-Host "   GOOGLE_SHEET_ID=your_spreadsheet_id"
Write-Host "   WORKLOAD_IDENTITY_PROVIDER=$providerResourceName"
Write-Host "   SERVICE_ACCOUNT=blkoutnxt-sheets@onboardblkoutnxt.iam.gserviceaccount.com"

Write-Host "`nWould you like me to help you create the Google Sheet template?" -ForegroundColor Yellow
Write-Host "Press Enter to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Create new Google Sheet
$spreadsheetId = New-GoogleSheet -Title "BLKOUTNXT Community Members"
Write-Host "Created new Google Sheet with ID: $spreadsheetId" -ForegroundColor Green

# Set up headers
Set-SheetHeaders -SpreadsheetId $spreadsheetId -SheetName "CommunityMembers"
Write-Host "Set up sheet headers successfully" -ForegroundColor Green

Write-Host "`nSetup complete! Your Google Sheet is ready to use." -ForegroundColor Green
Write-Host "The sheet ID is: $spreadsheetId"
Write-Host "Make sure to add this ID to your GitHub repository secrets." 