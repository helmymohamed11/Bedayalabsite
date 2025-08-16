import { Router } from 'express';
import { Database } from '../database/init';
import { createLogger } from '../utils/logger';

const router = Router();
const logger = createLogger();

// Get all tests with optional filtering
router.get('/', async (req, res) => {
  try {
    const db = Database.getInstance();
    const { category, search, active = '1' } = req.query;
    
    let sql = `
      SELECT t.*, c.name as category_name, c.name_ar as category_name_ar
      FROM tests t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.is_active = ?
    `;
    const params: any[] = [active];

    if (category) {
      sql += ' AND c.name = ?';
      params.push(category);
    }

    if (search) {
      sql += ' AND (t.name LIKE ? OR t.name_ar LIKE ? OR t.code LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    sql += ' ORDER BY t.name_ar ASC';

    const tests = await db.all(sql, params);
    
    res.json({
      success: true,
      data: tests,
      count: tests.length
    });
  } catch (error) {
    logger.error('Error fetching tests:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب التحاليل'
    });
  }
});

// Get featured/popular tests
router.get('/featured/popular', async (req, res) => {
  try {
    const db = Database.getInstance();
    
    const tests = await db.all(`
      SELECT t.*, c.name as category_name, c.name_ar as category_name_ar
      FROM tests t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.is_active = 1
      ORDER BY t.name_ar ASC
      LIMIT 6
    `);
    
    res.json({
      success: true,
      data: tests
    });
  } catch (error) {
    logger.error('Error fetching popular tests:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب التحاليل الشائعة'
    });
  }
});

// Get test by ID
router.get('/:id', async (req, res) => {
  try {
    const db = Database.getInstance();
    const { id } = req.params;
    
    const test = await db.get(`
      SELECT t.*, c.name as category_name, c.name_ar as category_name_ar
      FROM tests t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.id = ? AND t.is_active = 1
    `, [id]);
    
    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'التحليل غير موجود'
      });
    }
    
    res.json({
      success: true,
      data: test
    });
  } catch (error) {
    logger.error('Error fetching test:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب التحليل'
    });
  }
});

export { router as testsRouter };