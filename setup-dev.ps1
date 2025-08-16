Write-Host "🚀 إعداد بيئة التطوير لمعمل بداية..." -ForegroundColor Green

# Check if Docker is running
try {
    docker --version | Out-Null
    Write-Host "✅ Docker متوفر" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker غير متوفر. يرجى تثبيت Docker أولاً" -ForegroundColor Red
    Write-Host "تحميل Docker Desktop: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    exit 1
}

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js متوفر: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js غير متوفر. يرجى تثبيت Node.js 20+ أولاً" -ForegroundColor Red
    Write-Host "تحميل Node.js: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Start Docker services
Write-Host "🐳 بدء خدمات Docker..." -ForegroundColor Yellow
Set-Location docker
docker-compose up -d

# Wait for database to be ready
Write-Host "⏳ انتظار جاهزية قاعدة البيانات..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Check database connection
$maxAttempts = 30
$attempt = 0
$connected = $false

while (-not $connected -and $attempt -lt $maxAttempts) {
    $attempt++
    try {
        $env:PGPASSWORD = "bidaya_password"
        $result = docker exec bidaya_postgres psql -h localhost -U bidaya_user -d bidaya_lab -c "SELECT 1;" 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ قاعدة البيانات جاهزة" -ForegroundColor Green
            $connected = $true
        }
    } catch {
        # Continue trying
    }
    
    if (-not $connected) {
        if ($attempt -eq $maxAttempts) {
            Write-Host "❌ فشل في الاتصال بقاعدة البيانات" -ForegroundColor Red
            Write-Host "تحقق من أن Docker يعمل بشكل صحيح" -ForegroundColor Yellow
            exit 1
        }
        
        Write-Host "⏳ محاولة الاتصال بقاعدة البيانات ($attempt/$maxAttempts)..." -ForegroundColor Yellow
        Start-Sleep -Seconds 2
    }
}

Set-Location ..

# Install dependencies
Write-Host "📦 تثبيت المكتبات..." -ForegroundColor Yellow
npm install

# Setup environment files
Write-Host "⚙️ إعداد ملفات البيئة..." -ForegroundColor Yellow

# Backend .env
if (-not (Test-Path "apps/backend/.env")) {
    Copy-Item "apps/backend/.env.example" "apps/backend/.env"
    Write-Host "✅ تم إنشاء apps/backend/.env" -ForegroundColor Green
}

# Frontend .env.local
@"
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_ADMIN_URL=http://localhost:3002
"@ | Out-File -FilePath "apps/frontend/.env.local" -Encoding UTF8

# Admin .env.local
@"
VITE_API_URL=http://localhost:3001/api/v1
"@ | Out-File -FilePath "apps/admin/.env.local" -Encoding UTF8

Write-Host "✅ تم إعداد ملفات البيئة" -ForegroundColor Green

# Build database package
Write-Host "🔨 بناء حزمة قاعدة البيانات..." -ForegroundColor Yellow
npm run build -w packages/database

# Run database setup
Write-Host "🗄️ إعداد قاعدة البيانات..." -ForegroundColor Yellow
npm run db:reset -w apps/backend
npm run db:seed -w apps/backend

Write-Host ""
Write-Host "🎉 تم إعداد بيئة التطوير بنجاح!" -ForegroundColor Green
Write-Host ""
Write-Host "الخطوات التالية:" -ForegroundColor Yellow
Write-Host "1. npm run dev                    # تشغيل جميع الخدمات" -ForegroundColor White
Write-Host "2. افتح http://localhost:3000     # الموقع الرئيسي" -ForegroundColor White
Write-Host "3. افتح http://localhost:3001/health # API الباك-إند" -ForegroundColor White
Write-Host "4. افتح http://localhost:3002     # لوحة التحكم الإدارية" -ForegroundColor White
Write-Host "5. افتح http://localhost:5050     # pgAdmin (admin@bidayalab.com / admin123)" -ForegroundColor White
Write-Host ""
Write-Host "بيانات قاعدة البيانات:" -ForegroundColor Cyan
Write-Host "Host: localhost:5432" -ForegroundColor White
Write-Host "Database: bidaya_lab" -ForegroundColor White
Write-Host "Username: bidaya_user" -ForegroundColor White
Write-Host "Password: bidaya_password" -ForegroundColor White
Write-Host ""
Write-Host "بيانات لوحة التحكم الافتراضية:" -ForegroundColor Cyan
Write-Host "Username: admin" -ForegroundColor White
Write-Host "Password: change-this-password" -ForegroundColor White
Write-Host ""
Write-Host "أوامر مفيدة:" -ForegroundColor Magenta
Write-Host "npm run db:reset -w apps/backend  # إعادة تعيين قاعدة البيانات" -ForegroundColor White
Write-Host "npm run db:seed -w apps/backend   # إضافة بيانات تجريبية" -ForegroundColor White
Write-Host "npm run csv:import -w apps/backend # استيراد CSV" -ForegroundColor White