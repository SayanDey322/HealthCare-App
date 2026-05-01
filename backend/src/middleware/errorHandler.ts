import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

export const errorHandler = (err: any, req: AuthRequest, res: Response, next: NextFunction): void => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    res.status(400).json({ error: 'Validation error', details: err.message });
    return;
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    res.status(400).json({ error: 'Duplicate field value' });
    return;
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
};

export const asyncHandler = (fn: Function) => (req: AuthRequest, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
