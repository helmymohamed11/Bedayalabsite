import { Router } from 'express';
import { Database } from '../database/init';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const db = Database.getInstance();
    
    // Test database connection
    await db.get('SELECT 1 as test');
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'Bidaya Lab Backend API',
      version: '1.0.0',
      database: 'connected',
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      service: 'Bidaya Lab Backend API',
      version: '1.0.0',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export { router as healthRouter };