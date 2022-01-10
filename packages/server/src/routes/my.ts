import { ProfileResposne, userProfileArgs } from '@pern-template/shared';
import { prisma } from '#server/libs/prisma';
import { isAuth } from '#server/middlewares/isAuth';
import { asyncHandler } from '#server/utils/asyncHandler';
import express from 'express';

export const my = express.Router();

my.use(express.json());

my.get(
  '/profile',
  isAuth(),
  asyncHandler(async (req, res) => {
    const profile = await prisma.user.findUnique({
      where: { id: req.auth!.userId },
      select: userProfileArgs.select,
    });
    if (!profile) return res.sendStatus(404);

    return res.status(200).send({ profile } as ProfileResposne);
  })
);
