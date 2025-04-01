# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "This script needs to be run as Administrator. Please run PowerShell as Administrator and try again." -ForegroundColor Red
    exit 1
}

Write-Host "Installing Google Cloud SDK using Chocolatey..." -ForegroundColor Green

# Update Chocolatey
Write-Host "Updating Chocolatey..." -ForegroundColor Yellow
choco upgrade chocolatey -y

# Install Google Cloud SDK (using the correct package name)
Write-Host "Installing Google Cloud SDK..." -ForegroundColor Yellow
choco install gcloudsdk -y

# If the above fails, try the alternative package name
if ($LASTEXITCODE -ne 0) {
    Write-Host "Trying alternative package name..." -ForegroundColor Yellow
    choco install google-cloud-sdk -y
}

# Refresh environment variables
Write-Host "Refreshing environment variables..." -ForegroundColor Yellow
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Verify installation
try {
    $version = gcloud --version
    Write-Host "`nGoogle Cloud SDK installed successfully!" -ForegroundColor Green
    Write-Host "Version information:" -ForegroundColor Yellow
    Write-Host $version
    
    Write-Host "`nNext steps:" -ForegroundColor Yellow
    Write-Host "1. Run 'gcloud init' to set up your account"
    Write-Host "2. Follow the prompts to log in and select your project"
    Write-Host "`nWould you like to run 'gcloud init' now? (Y/N)" -ForegroundColor Green
    $response = Read-Host
    
    if ($response -eq 'Y') {
        gcloud init
    }
} catch {
    Write-Host "`nError verifying installation. Trying alternative installation method..." -ForegroundColor Yellow
    
    # Download and run the official installer
    $installerUrl = "https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe"
    $installerPath = "$env:TEMP\GoogleCloudSDKInstaller.exe"
    
    Write-Host "Downloading official Google Cloud SDK installer..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $installerUrl -OutFile $installerPath
    
    Write-Host "`nPlease follow these steps:" -ForegroundColor Yellow
    Write-Host "1. The installer will open automatically"
    Write-Host "2. Click 'Next' through the installation wizard"
    Write-Host "3. Accept the default installation location"
    Write-Host "4. When prompted, select 'Yes' to run gcloud init"
    Write-Host "5. After installation, close the installer window"
    Write-Host "`nPress Enter to start the installation..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    
    # Start the installer
    Start-Process -FilePath $installerPath -Wait
    
    Write-Host "`nInstallation complete! Please close this window and open a new PowerShell window to continue."
    Write-Host "Then run: gcloud init"
} 