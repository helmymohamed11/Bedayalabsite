Write-Host "إعداد مبسط لمعمل بداية" -ForegroundColor Green

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "Node.js متوفر: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js غير متوفر" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "تثبيت المكتبات..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "فشل في تثبيت المكتبات" -ForegroundColor Red
    exit 1
}

# Setup environment files
Write-Host "إعداد ملفات البيئة..." -ForegroundColor Yellow

# Create backend .env
$backendEnv = @"
DATABASE_URL=sqlite:./dev.db
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000,http://localhost:3002
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-this-password
ADMIN_TOKEN=admin-token-123-change-this
LOG_LEVEL=info
CSV_IMPORT_DIR=data/csv-imports
MAX_FILE_SIZE=5242880
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
BCRYPT_ROUNDS=12
"@

$backendEnv | Out-File -FilePath "apps/backend/.env" -Encoding UTF8

# Create frontend .env.local
$frontendEnv = @"
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_ADMIN_URL=http://localhost:3002
NEXT_PUBLIC_SITE_URL=http://localhost:3000
"@

$frontendEnv | Out-File -FilePath "apps/frontend/.env.local" -Encoding UTF8

# Create admin .env.local
$adminEnv = @"
VITE_API_URL=http://localhost:3001/api/v1
"@

$adminEnv | Out-File -FilePath "apps/admin/.env.local" -Encoding UTF8

Write-Host "تم إعداد ملفات البيئة" -ForegroundColor Green

# Setup SQLite database
Write-Host "إعداد قاعدة البيانات SQLite..." -ForegroundColor Yellow
npm run db:setup:sqlite -w apps/backend

Write-Host "تم إعداد بيئة التطوير بنجاح!" -ForegroundColor Green