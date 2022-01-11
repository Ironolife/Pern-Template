import { prisma } from '#server/libs/prisma';
import { Request, Response, NextFunction } from 'express';
import trimStart from 'lodash/trimStart';

export const errorHandler = async (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) return next();

  console.error(err);

  // Create error log in db
  await prisma.errorLog.create({
    data: {
      message: trimStart(err.message),
      stack: err.stack,
    },
  });

  return res.sendStatus(500);
};
