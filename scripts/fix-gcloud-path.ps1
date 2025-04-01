# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "This script needs to be run as Administrator. Please run PowerShell as Administrator and try again." -ForegroundColor Red
    exit 1
}

# Define the correct Google Cloud SDK paths based on actual installation
$gcloudPaths = @(
    "C:\Program Files (x86)\Google\Cloud SDK",
    "C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk",
    "C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\bin",
    "C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\platform\google_appengine"
)

# Get current PATH
$currentPath = [System.Environment]::GetEnvironmentVariable("Path", "Machine")

# Add each path if it's not already in PATH
foreach ($path in $gcloudPaths) {
    if (Test-Path $path) {
        Write-Host "Found path: $path" -ForegroundColor Green
        if ($currentPath -notlike "*$path*") {
            Write-Host "Adding $path to system PATH..." -ForegroundColor Yellow
            $newPath = $currentPath + ";" + $path
            [System.Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")
        }
    }
}

# Refresh current session's PATH
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")

Write-Host "`nVerifying gcloud installation..." -ForegroundColor Green
try {
    $version = gcloud --version
    Write-Host "`nGoogle Cloud SDK is now accessible!" -ForegroundColor Green
    Write-Host "Version information:" -ForegroundColor Yellow
    Write-Host $version
    
    Write-Host "`nPlease close this window and open a new PowerShell window to continue." -ForegroundColor Yellow
    Write-Host "Then run: gcloud init"
} catch {
    Write-Host "`nError: gcloud is still not accessible. Please try these steps manually:" -ForegroundColor Red
    Write-Host "1. Open System Properties (Win + Pause/Break)"
    Write-Host "2. Click 'Advanced system settings'"
    Write-Host "3. Click 'Environment Variables'"
    Write-Host "4. Under 'System variables', find and select 'Path'"
    Write-Host "5. Click 'Edit'"
    Write-Host "6. Add these paths if they're not already there:"
    foreach ($path in $gcloudPaths) {
        if (Test-Path $path) {
            Write-Host "   $path"
        }
    }
    Write-Host "7. Click 'OK' on all windows"
    Write-Host "8. Open a new PowerShell window and try again"
    
    Write-Host "`nAlternative method:" -ForegroundColor Yellow
    Write-Host "1. Open the Google Cloud SDK command prompt (it should be in your Start menu)"
    Write-Host "2. Run 'gcloud init' from there"
    
    Write-Host "`nOr try running this command directly:" -ForegroundColor Yellow
    Write-Host "C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\bin\gcloud init"
} 