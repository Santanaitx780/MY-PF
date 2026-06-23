[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Write-Host "Downloading GitHub CLI..."
Invoke-WebRequest -Uri "https://github.com/cli/cli/releases/download/v2.95.0/gh_2.95.0_windows_amd64.msi" -OutFile "$env:TEMP\gh.msi" -UseBasicParsing
Write-Host "Installing..."
Start-Process msiexec.exe -ArgumentList "/i `"$env:TEMP\gh.msi`" /quiet /norestart" -Wait
Remove-Item "$env:TEMP\gh.msi"
Write-Host "Done"
