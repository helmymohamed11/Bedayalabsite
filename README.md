# معمل بداية للتحاليل الطبية - نظام إدارة شامل

## 🏥 نظرة عامة

نظام إدارة شامل لمعمل بداية للتحاليل الطبية يتضمن:

- **موقع إلكتروني** للمرضى (Next.js + TypeScript)
- **لوحة تحكم إدارية** لإدارة الأسعار والكتالوج (React + Vite)
- **API خلفي** قوي (Express + TypeScript + PostgreSQL)
- **قاعدة بيانات** متقدمة مع تتبع تاريخ الأسعار
- **نظام استيراد/تصدير CSV** لإدارة الكتالوج

## 🚀 التشغيل السريع

### المتطلبات
- Node.js 20+
- npm 9+
- Docker & Docker Compose

### خطوات التشغيل

1. **تشغيل سكريبت الإعداد**
```powershell
.\setup-dev.ps1
```

2. **أو الإعداد اليدوي**
```bash
# تشغيل قاعدة البيانات
cd docker
docker-compose up -d

# تثبيت المكتبات
cd ..
npm install

# إعداد قاعدة البيانات
npm run db:setup

# تشغيل التطبيق
npm run dev
```

### الوصول للنظام
- **الموقع الرئيسي**: http://localhost:3000
- **لوحة التحكم**: http://localhost:3002
- **API**: http://localhost:3001/health
- **pgAdmin**: http://localhost:5050

### بيانات الدخول الافتراضية
- **لوحة التحكم**: admin / change-this-password
- **pgAdmin**: admin@bidayalab.com / admin123
- **قاعدة البيانات**: bidaya_user / bidaya_password

## 📊 إدارة الكتالوج والأسعار

### استيراد البيانات من CSV
1. حمّل القالب من لوحة التحكم
2. املأ البيانات (code, name, category, price مطلوبة)
3. ارفع الملف وراجع النتائج

### تحديث الأسعار
- **فردي**: عدّل كل تحليل مع ذكر السبب
- **جماعي**: حدد فئة ونسبة الزيادة/التقليل
- **تتبع التاريخ**: كل تغيير يُسجل تلقائياً

## 🏗️ هيكل المشروع

```
bidaya-lab-portal/
├── apps/
│   ├── backend/              # Express API Server
│   ├── frontend/             # Next.js Patient Portal
│   └── admin/                # React Admin Dashboard
├── packages/
│   ├── database/             # Database schema & migrations
│   └── shared/               # Shared types & utilities
├── docker/                   # Docker configuration
└── docs/                     # Documentation
```

## 🔧 أوامر مفيدة

```bash
# تطوير
npm run dev                    # تشغيل جميع الخدمات
npm run build                  # بناء جميع التطبيقات

# قاعدة البيانات
npm run db:setup -w apps/backend    # إعداد قاعدة البيانات
npm run db:reset -w apps/backend    # إعادة تعيين قاعدة البيانات
npm run db:seed -w apps/backend     # إضافة بيانات تجريبية

# CSV
npm run csv:import -w apps/backend  # استيراد CSV

# اختبارات
npm run test                   # تشغيل الاختبارات
npm run lint                   # فحص الكود
npm run type-check             # فحص الأنواع
```

## 📱 API Documentation

### Authentication
```http
POST /api/v1/admin/login
{
  "username": "admin",
  "password": "your-password"
}
```

### Tests Management
```http
GET /api/v1/admin/tests?category=الفيتامينات&search=vitamin
PUT /api/v1/admin/tests/123/price
POST /api/v1/admin/tests/bulk-price-update
```

### CSV Import/Export
```http
POST /api/v1/admin/csv/import
GET /api/v1/admin/csv/export/tests
GET /api/v1/admin/csv/template
```

## 🔒 الأمان

### متغيرات البيئة الحساسة
```env
DATABASE_URL=postgresql://user:password@host:port/database
GEMINI_API_KEY=your-gemini-api-key
JWT_SECRET=your-super-secret-jwt-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-this-password
```

## 🚀 النشر في الإنتاج

```bash
# بناء الصور
docker-compose -f docker-compose.prod.yml build

# تشغيل الخدمات
docker-compose -f docker-compose.prod.yml up -d
```

## 📈 المراقبة والصيانة

### السجلات
```bash
docker-compose logs -f backend
docker-compose logs -f postgres
```

### النسخ الاحتياطية
```bash
docker exec bidaya_postgres pg_dump -U bidaya_user bidaya_lab > backup.sql
```

## 📞 الدعم والتواصل

- **البريد الإلكتروني**: info@bidayalab.com
- **الهاتف**: 0502236471
- **واتساب**: 01550565005
- **العنوان**: المنصورة – ميدان المحطة – برج الكوثر الطبي – الدور الرابع

---

**معمل بداية للتحاليل الطبية** - دقة في النتائج، ثقة في الخدمة