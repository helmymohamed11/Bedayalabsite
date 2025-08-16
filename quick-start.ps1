Write-Host "🚀 تشغيل سريع لمعمل بداية..." -ForegroundColor Green

# Check if setup has been run
if (-not (Test-Path "apps/backend/.env")) {
    Write-Host "⚠️ لم يتم إعداد المشروع بعد. سيتم تشغيل الإعداد أولاً..." -ForegroundColor Yellow
    .\setup-dev.ps1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ فشل في الإعداد" -ForegroundColor Red
        exit 1
    }
}

# Check if Docker containers are running
$postgresRunning = docker ps --filter "name=bidaya_postgres" --filter "status=running" -q
if (-not $postgresRunning) {
    Write-Host "🐳 بدء خدمات Docker..." -ForegroundColor Yellow
    Set-Location docker
    docker-compose up -d
    Set-Location ..
    Start-Sleep -Seconds 10
}

# Start development servers
Write-Host "🔥 تشغيل خوادم التطوير..." -ForegroundColor Green
Write-Host ""
Write-Host "الخوادم المتاحة:" -ForegroundColor Cyan
Write-Host "• الموقع الرئيسي: http://localhost:3000" -ForegroundColor White
Write-Host "• لوحة التحكم: http://localhost:3002" -ForegroundColor White
Write-Host "• API الباك-إند: http://localhost:3001/health" -ForegroundColor White
Write-Host "• pgAdmin: http://localhost:5050" -ForegroundColor White
Write-Host ""
Write-Host "بيانات الدخول:" -ForegroundColor Magenta
Write-Host "• لوحة التحكم: admin / change-this-password" -ForegroundColor White
Write-Host "• pgAdmin: admin@bidayalab.com / admin123" -ForegroundColor White
Write-Host ""
Write-Host "اضغط Ctrl+C لإيقاف الخوادم" -ForegroundColor Yellow
Write-Host ""

npm run dev