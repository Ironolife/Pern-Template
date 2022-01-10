import { NextFunction, Request, Response } from 'express';

// Wrap async handler in try/catch block to pass error into errorHandler middleware
export const asyncHandler =
  <T>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
      return next();
    } catch (err) {
      return next(err);
    }
  };
