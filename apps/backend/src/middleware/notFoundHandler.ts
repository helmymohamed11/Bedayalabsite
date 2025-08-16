import { Request, Response } from 'express';

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: 'الصفحة المطلوبة غير موجودة',
    path: req.path
  });
}