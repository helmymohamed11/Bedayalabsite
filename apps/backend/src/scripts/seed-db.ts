import { Database } from '../database/init';
import { createLogger } from '../utils/logger';

const logger = createLogger();

async function seedDatabase() {
  try {
    const db = Database.getInstance();
    
    // Insert categories
    const categories = [
      { name: 'blood-tests', name_ar: 'تحاليل الدم', description: 'فحوصات الدم الشاملة' },
      { name: 'hormones', name_ar: 'الهرمونات', description: 'فحوصات الهرمونات' },
      { name: 'vitamins', name_ar: 'الفيتامينات', description: 'فحوصات الفيتامينات والمعادن' },
      { name: 'liver', name_ar: 'وظائف الكبد', description: 'فحوصات وظائف الكبد' },
      { name: 'kidney', name_ar: 'وظائف الكلى', description: 'فحوصات وظائف الكلى' },
      { name: 'diabetes', name_ar: 'السكري', description: 'فحوصات السكري' },
      { name: 'lipids', name_ar: 'الدهون', description: 'فحوصات الدهون والكوليسترول' },
      { name: 'thyroid', name_ar: 'الغدة الدرقية', description: 'فحوصات الغدة الدرقية' }
    ];

    for (const category of categories) {
      await db.run(
        'INSERT OR IGNORE INTO categories (name, name_ar, description) VALUES (?, ?, ?)',
        [category.name, category.name_ar, category.description]
      );
    }

    // Insert sample tests
    const tests = [
      {
        code: 'CBC',
        name: 'Complete Blood Count',
        name_ar: 'صورة دم كاملة',
        category: 'blood-tests',
        price: 80,
        description: 'فحص شامل لخلايا الدم',
        sample_type: 'دم وريدي',
        turnaround_time: '24 ساعة'
      },
      {
        code: 'TSH',
        name: 'Thyroid Stimulating Hormone',
        name_ar: 'الهرمون المحفز للغدة الدرقية',
        category: 'thyroid',
        price: 120,
        description: 'فحص وظائف الغدة الدرقية',
        sample_type: 'دم وريدي',
        turnaround_time: '24 ساعة'
      },
      {
        code: 'VIT-D',
        name: 'Vitamin D',
        name_ar: 'فيتامين د',
        category: 'vitamins',
        price: 150,
        description: 'قياس مستوى فيتامين د في الدم',
        sample_type: 'دم وريدي',
        turnaround_time: '48 ساعة'
      },
      {
        code: 'HBA1C',
        name: 'Hemoglobin A1c',
        name_ar: 'الهيموجلوبين السكري',
        category: 'diabetes',
        price: 100,
        description: 'متوسط السكر في الدم خلال 3 أشهر',
        sample_type: 'دم وريدي',
        turnaround_time: '24 ساعة'
      },
      {
        code: 'LIPID',
        name: 'Lipid Profile',
        name_ar: 'دهون الدم',
        category: 'lipids',
        price: 90,
        description: 'فحص الكوليسترول والدهون الثلاثية',
        sample_type: 'دم وريدي',
        turnaround_time: '24 ساعة'
      },
      {
        code: 'ALT',
        name: 'Alanine Aminotransferase',
        name_ar: 'إنزيم الكبد ALT',
        category: 'liver',
        price: 60,
        description: 'فحص وظائف الكبد',
        sample_type: 'دم وريدي',
        turnaround_time: '24 ساعة'
      }
    ];

    for (const test of tests) {
      // Get category ID
      const category = await db.get('SELECT id FROM categories WHERE name = ?', [test.category]);
      
      await db.run(`
        INSERT OR IGNORE INTO tests 
        (code, name, name_ar, category_id, price, description, sample_type, turnaround_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        test.code,
        test.name,
        test.name_ar,
        category?.id,
        test.price,
        test.description,
        test.sample_type,
        test.turnaround_time
      ]);
    }

    logger.info('Database seeded successfully');
    console.log('✅ تم إدخال البيانات التجريبية بنجاح');
  } catch (error) {
    logger.error('Error seeding database:', error);
    console.log('❌ خطأ في إدخال البيانات التجريبية');
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export { seedDatabase };