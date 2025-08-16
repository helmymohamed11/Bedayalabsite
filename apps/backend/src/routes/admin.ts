import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Database } from '../database/init';
import { createLogger } from '../utils/logger';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const logger = createLogger();

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'اسم المستخدم وكلمة المرور مطلوبان'
      });
    }

    // For development, use simple check
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { username, role: 'admin' },
        process.env.JWT_SECRET || 'default-secret',
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );

      res.json({
        success: true,
        message: 'تم تسجيل الدخول بنجاح',
        data: {
          token,
          user: {
            username,
            role: 'admin'
          }
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة'
      });
    }
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في تسجيل الدخول'
    });
  }
});

// Dashboard statistics
router.get('/reports/dashboard', authMiddleware, async (req, res) => {
  try {
    const db = Database.getInstance();
    
    const totalTests = await db.get('SELECT COUNT(*) as count FROM tests WHERE is_active = 1');
    const totalCategories = await db.get('SELECT COUNT(*) as count FROM categories');
    const totalBookings = await db.get('SELECT COUNT(*) as count FROM bookings');
    const pendingBookings = await db.get('SELECT COUNT(*) as count FROM bookings WHERE status = "pending"');
    
    res.json({
      success: true,
      data: {
        totalTests: totalTests?.count || 0,
        totalCategories: totalCategories?.count || 0,
        totalBookings: totalBookings?.count || 0,
        pendingBookings: pendingBookings?.count || 0,
        revenue: {
          today: 0,
          thisMonth: 0,
          thisYear: 0
        }
      }
    });
  } catch (error) {
    logger.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب إحصائيات لوحة التحكم'
    });
  }
});

// Get all tests for admin
router.get('/tests', authMiddleware, async (req, res) => {
  try {
    const db = Database.getInstance();
    const { category, search, page = 1, limit = 50 } = req.query;
    
    let sql = `
      SELECT t.*, c.name as category_name, c.name_ar as category_name_ar
      FROM tests t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE 1=1
    `;
    const params: any[] = [];

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
    
    const offset = (Number(page) - 1) * Number(limit);
    sql += ` LIMIT ? OFFSET ?`;
    params.push(Number(limit), offset);

    const tests = await db.all(sql, params);
    
    // Get total count
    let countSql = 'SELECT COUNT(*) as total FROM tests t LEFT JOIN categories c ON t.category_id = c.id WHERE 1=1';
    const countParams: any[] = [];
    
    if (category) {
      countSql += ' AND c.name = ?';
      countParams.push(category);
    }
    
    if (search) {
      countSql += ' AND (t.name LIKE ? OR t.name_ar LIKE ? OR t.code LIKE ?)';
      const searchTerm = `%${search}%`;
      countParams.push(searchTerm, searchTerm, searchTerm);
    }
    
    const totalResult = await db.get(countSql, countParams);
    
    res.json({
      success: true,
      data: tests,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalResult?.total || 0,
        pages: Math.ceil((totalResult?.total || 0) / Number(limit))
      }
    });
  } catch (error) {
    logger.error('Error fetching admin tests:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب التحاليل'
    });
  }
});

export { router as adminRouter };