Write-Host "Testing Admin Panel" -ForegroundColor Green

Set-Location "apps/admin"

# Copy simple files
Copy-Item "package-simple.json" "package.json" -Force
Copy-Item "src/App-simple.tsx" "src/App.tsx" -Force
Copy-Item "vite.config-simple.js" "vite.config.js" -Force

# Install simple dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install --legacy-peer-deps

if ($LASTEXITCODE -eq 0) {
    Write-Host "Dependencies installed successfully" -ForegroundColor Green
    
    Write-Host "Starting admin panel..." -ForegroundColor Yellow
    Write-Host "Admin panel available at: http://localhost:3002" -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop server" -ForegroundColor Yellow
    
    npm run dev
} else {
    Write-Host "Failed to install dependencies" -ForegroundColor Red
}