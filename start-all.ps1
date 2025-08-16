Write-Host "🚀 Starting Bidaya Lab Portal - All Services" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Cyan

# Function to start a service in background
function Start-Service {
    param(
        [string]$Name,
        [string]$Path,
        [string]$Command,
        [string]$Url
    )
    
    Write-Host "Starting $Name..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$Path'; $Command" -WindowStyle Minimized
    Start-Sleep -Seconds 2
    Write-Host "$Name started - $Url" -ForegroundColor Green
}

# Start Backend
Start-Service -Name "Backend API" -Path "apps/backend" -Command "npm run dev" -Url "http://localhost:3001"

# Start Frontend  
Start-Service -Name "Frontend" -Path "apps/frontend" -Command "npm run dev" -Url "http://localhost:3000"

# Start Admin
Start-Service -Name "Admin Panel" -Path "apps/admin" -Command "npm run dev" -Url "http://localhost:3002"

Write-Host ""
Write-Host "🌐 All services started!" -ForegroundColor Green
Write-Host "Available URLs:" -ForegroundColor Cyan
Write-Host "• Frontend (Patients): http://localhost:3000" -ForegroundColor White
Write-Host "• Backend API: http://localhost:3001/health" -ForegroundColor White  
Write-Host "• Admin Panel: http://localhost:3002" -ForegroundColor White
Write-Host ""
Write-Host "🔑 Admin Login:" -ForegroundColor Magenta
Write-Host "Username: admin" -ForegroundColor White
Write-Host "Password: change-this-password" -ForegroundColor White
Write-Host ""
Write-Host "📝 To stop all services, close the PowerShell windows or run:" -ForegroundColor Yellow
Write-Host "Get-Process node | Stop-Process" -ForegroundColor Gray
Write-Host ""
Write-Host "Press any key to open all URLs in browser..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Open URLs in default browser
Start-Process "http://localhost:3000"
Start-Process "http://localhost:3001/health"  
Start-Process "http://localhost:3002"