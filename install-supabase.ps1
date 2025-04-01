# Download the latest release
$url = "https://github.com/supabase/cli/releases/latest/download/supabase_windows_amd64.exe"
$output = "$env:TEMP\supabase.exe"

Write-Host "Downloading Supabase CLI..."
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri $url -OutFile $output

# Move to a permanent location
$installPath = "$env:LOCALAPPDATA\supabase"
if (!(Test-Path $installPath)) {
    New-Item -ItemType Directory -Path $installPath
}

Move-Item -Force $output "$installPath\supabase.exe"

# Add to PATH
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$installPath*") {
    [Environment]::SetEnvironmentVariable("Path", $userPath + ";$installPath", "User")
}

Write-Host "Supabase CLI installed successfully!"
Write-Host "Please restart your terminal to use the 'supabase' command." 