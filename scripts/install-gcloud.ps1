# Download URL for Google Cloud SDK installer
$installerUrl = "https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe"
$installerPath = "$env:TEMP\GoogleCloudSDKInstaller.exe"

Write-Host "Downloading Google Cloud SDK installer..." -ForegroundColor Green
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