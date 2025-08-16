Write-Host "Quick test for Bidaya Lab" -ForegroundColor Green

# Test backend simple version
Write-Host "Starting simple backend..." -ForegroundColor Yellow
Set-Location "apps/backend"

# Copy simple files
Copy-Item "package-simple.json" "package.json" -Force
Copy-Item "src/index-simple.js" "src/index.js" -Force

# Install simple dependencies
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "Dependencies installed successfully" -ForegroundColor Green
    
    Write-Host "Starting server..." -ForegroundColor Yellow
    Write-Host "Server available at: http://localhost:3001/health" -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop server" -ForegroundColor Yellow
    
    npm run dev
} else {
    Write-Host "Failed to install dependencies" -ForegroundColor Red
}