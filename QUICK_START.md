# 🚀 دليل التشغيل السريع - معمل بداية

## التشغيل بأمر واحد

```powershell
.\start.ps1
```

هذا الأمر سيقوم بـ:
- ✅ فحص المتطلبات (Node.js, Docker)
- 🐳 تشغيل قاعدة البيانات
- 📦 تثبيت المكتبات
- 🗄️ إعداد قاعدة البيانات
- 🔥 تشغيل جميع الخوادم

## الوصول للنظام

| الخدمة | الرابط | الوصف |
|--------|--------|-------|
| **الموقع الرئيسي** | http://localhost:3000 | موقع المرضى |
| **لوحة التحكم** | http://localhost:3002 | إدارة المعمل |
| **API** | http://localhost:3001/health | الخدمات الخلفية |
| **pgAdmin** | http://localhost:5050 | إدارة قاعدة البيانات |

## بيانات الدخول

### لوحة التحكم الإدارية
- **اسم المستخدم:** `admin`
- **كلمة المرور:** `change-this-password`

### pgAdmin
- **البريد:** `admin@bidayalab.com`
- **كلمة المرور:** `admin123`

### قاعدة البيانات
- **Host:** `localhost:5432`
- **Database:** `bidaya_lab`
- **Username:** `bidaya_user`
- **Password:** `bidaya_password`

## أوامر مفيدة

```powershell
# إعادة تعيين قاعدة البيانات
npm run db:reset -w apps/backend

# إضافة بيانات تجريبية
npm run db:seed -w apps/backend

# استيراد ملف CSV
npm run csv:import -w apps/backend

# عرض سجلات قاعدة البيانات
docker-compose -f docker/docker-compose.yml logs -f postgres

# إيقاف جميع الخدمات
docker-compose -f docker/docker-compose.yml down
```

## استيراد كتالوج التحاليل

1. افتح لوحة التحكم: http://localhost:3002
2. سجل دخول بالبيانات أعلاه
3. اذهب إلى "استيراد CSV"
4. حمّل القالب أو استخدم الملف الموجود في `apps/backend/data/csv-imports/tests_catalog.csv`
5. ارفع الملف وراجع النتائج

## حل المشاكل الشائعة

### خطأ في قاعدة البيانات
```powershell
docker-compose -f docker/docker-compose.yml restart postgres
npm run db:setup -w apps/backend
```

### خطأ في المنافذ
تأكد من أن المنافذ 3000, 3001, 3002, 5432, 5050 غير مستخدمة

### إعادة تثبيت المكتبات
```powershell
npm run fresh-install
```

## الدعم

للمساعدة أو الاستفسارات:
- 📞 **الهاتف:** 0502236471
- 💬 **واتساب:** 01550565005
- 📧 **البريد:** info@bidayalab.com

---
**معمل بداية للتحاليل الطبية** - دقة في النتائج، ثقة في الخدمة