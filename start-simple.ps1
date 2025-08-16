Write-Host "بدء تشغيل معمل بداية (نسخة مبسطة)" -ForegroundColor Green

$isFirstRun = -not (Test-Path "apps/backend/.env")

if ($isFirstRun) {
    Write-Host "إعداد أولي للمشروع..." -ForegroundColor Yellow
    & ".\setup-simple.ps1"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "فشل في الإعداد الأولي" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "الخوادم المتاحة:" -ForegroundColor Cyan
Write-Host "الموقع الرئيسي: http://localhost:3000" -ForegroundColor White
Write-Host "لوحة التحكم: http://localhost:3002" -ForegroundColor White
Write-Host "API: http://localhost:3001/health" -ForegroundColor White
Write-Host ""
Write-Host "بيانات الدخول:" -ForegroundColor Magenta
Write-Host "admin / change-this-password" -ForegroundColor White
Write-Host ""
Write-Host "بدء تشغيل الخوادم..." -ForegroundColor Green

npm run dev