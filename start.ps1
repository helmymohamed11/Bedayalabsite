Write-Host "🚀 بدء تشغيل معمل بداية - نظام إدارة شامل" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan

# Check if this is first run
$isFirstRun = -not (Test-Path "apps/backend/.env")

if ($isFirstRun) {
    Write-Host "🔧 إعداد أولي للمشروع..." -ForegroundColor Yellow
    .\setup-dev.ps1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ فشل في الإعداد الأولي" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ المشروع معد مسبقاً" -ForegroundColor Green
    
    # Check if Docker containers are running
    $postgresRunning = docker ps --filter "name=bidaya_postgres" --filter "status=running" -q
    if (-not $postgresRunning) {
        Write-Host "🐳 بدء خدمات قاعدة البيانات..." -ForegroundColor Yellow
        Set-Location docker
        docker-compose up -d postgres redis
        Set-Location ..
        Start-Sleep -Seconds 5
    }
}

Write-Host ""
Write-Host "🌐 الخوادم المتاحة:" -ForegroundColor Cyan
Write-Host "• الموقع الرئيسي (المرضى): http://localhost:3000" -ForegroundColor White
Write-Host "• لوحة التحكم الإدارية: http://localhost:3002" -ForegroundColor White
Write-Host "• API الخلفي: http://localhost:3001/health" -ForegroundColor White
Write-Host "• pgAdmin (إدارة قاعدة البيانات): http://localhost:5050" -ForegroundColor White
Write-Host ""
Write-Host "🔑 بيانات الدخول:" -ForegroundColor Magenta
Write-Host "• لوحة التحكم: admin / change-this-password" -ForegroundColor White
Write-Host "• pgAdmin: admin@bidayalab.com / admin123" -ForegroundColor White
Write-Host ""
Write-Host "📊 قاعدة البيانات:" -ForegroundColor Blue
Write-Host "• Host: localhost:5432" -ForegroundColor White
Write-Host "• Database: bidaya_lab" -ForegroundColor White
Write-Host "• Username: bidaya_user" -ForegroundColor White
Write-Host "• Password: bidaya_password" -ForegroundColor White
Write-Host ""
Write-Host "⚡ أوامر مفيدة:" -ForegroundColor Yellow
Write-Host "• npm run db:reset -w apps/backend  # إعادة تعيين قاعدة البيانات" -ForegroundColor Gray
Write-Host "• npm run db:seed -w apps/backend   # إضافة بيانات تجريبية" -ForegroundColor Gray
Write-Host "• npm run csv:import -w apps/backend # استيراد ملف CSV" -ForegroundColor Gray
Write-Host "• docker-compose -f docker/docker-compose.yml logs -f # عرض سجلات قاعدة البيانات" -ForegroundColor Gray
Write-Host ""
Write-Host "🔥 بدء تشغيل جميع الخوادم..." -ForegroundColor Green
Write-Host "اضغط Ctrl+C لإيقاف جميع الخوادم" -ForegroundColor Yellow
Write-Host ""

# Start all development servers
npm run dev