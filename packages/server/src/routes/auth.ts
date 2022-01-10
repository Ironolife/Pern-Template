import { prisma } from '#server/libs/prisma';
import { redis } from '#server/libs/redis';
import { formValidator } from '#server/middlewares/formValidator';
import { asyncHandler } from '#server/utils/asyncHandler';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '#server/utils/jwt';
import {
  AccessTokenResposne,
  AuthResponse,
  FieldErrorResponse,
  loginFormSchema,
  LoginFormValues,
  registerFormSchema,
  RegisterFormValues,
} from '@pern-template/shared';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import express from 'express';
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from 'jsonwebtoken';
import startCase from 'lodash/startCase';

export const auth = express.Router();

auth.use(express.json());

auth.post(
  '/register',
  formValidator('body', registerFormSchema),
  asyncHandler(async (req, res) => {
    const { email, username, password } = req.body as RegisterFormValues;

    const user = await prisma.user
      .create({
        data: {
          email,
          username,
          hashedPassword: bcrypt.hashSync(password, 10),
          roles: ['USER'],
        },
      })
      .catch((err) => {
        // P2002 unique constraint
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === 'P2002'
        ) {
          const field = (err.meta as any)?.target[0] ?? '';

          const fieldErrors = {
            [field]: [`${startCase(field)} already registered`],
          };

          res.status(400).send({ fieldErrors } as FieldErrorResponse);
          return;
        }

        throw err;
      });
    if (!user) return;

    // Sign JWTs
    const accessToken = signAccessToken({ userId: user.id, roles: user.roles });
    const refreshToken = signRefreshToken(user.id);

    // Add refresh token to redis
    const redisKey = `${process.env.REDIS_PREFIX}:refreshTokens:${user.id}`;
    await redis.sadd(redisKey, refreshToken);

    return res.status(201).send({ accessToken, refreshToken } as AuthResponse);
  })
);

auth.post(
  '/login',
  formValidator('body', loginFormSchema),
  asyncHandler(async (req, res) => {
    const { usernameOrEmail, password } = req.body as LoginFormValues;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });

    if (!user) {
      const fieldErrors = {
        usernameOrEmail: ['User not found'],
      };

      return res.status(404).send({ fieldErrors } as FieldErrorResponse);
    }

    if (user.roles.includes('BANNED')) {
      const fieldErrors = {
        usernameOrEmail: ['User is banned'],
      };

      return res.status(401).send({ fieldErrors } as FieldErrorResponse);
    }

    if (!bcrypt.compareSync(password, user.hashedPassword)) {
      const fieldErrors = {
        password: ['Incorrect password'],
      };

      return res.status(401).send({ fieldErrors } as FieldErrorResponse);
    }

    // Sign JWTs
    const accessToken = signAccessToken({ userId: user.id, roles: user.roles });
    const refreshToken = signRefreshToken(user.id);

    // Add refresh token to redis
    const redisKey = `${process.env.REDIS_PREFIX}:refreshTokens:${user.id}`;
    await redis.sadd(redisKey, refreshToken);

    return res.status(200).send({ accessToken, refreshToken } as AuthResponse);
  })
);

auth.post(
  '/refresh',
  asyncHandler(async (req, res) => {
    const { refreshToken } = req.body as { refreshToken: string };

    const authPayload = await verifyRefreshToken(refreshToken).catch((err) => {
      if (
        err instanceof TokenExpiredError ||
        err instanceof JsonWebTokenError ||
        err instanceof NotBeforeError
      ) {
        res.status(401).send(err);
        return;
      }

      throw err;
    });
    if (!authPayload) return;

    // Check if refresh token exists in redis
    const redisKey = `${process.env.REDIS_PREFIX}:refreshTokens:${authPayload.userId}`;
    const isInRedis = await redis.sismember(redisKey, refreshToken);

    if (!isInRedis) return res.sendStatus(401);

    const user = await prisma.user.findUnique({
      where: { id: authPayload.userId },
    });

    if (!user) return res.sendStatus(404);

    // Sign new accessToken
    const accessToken = signAccessToken({ userId: user.id, roles: user.roles });

    return res.status(200).send({ accessToken } as AccessTokenResposne);
  })
);

auth.delete(
  '/logout',
  asyncHandler(async (req, res) => {
    const { refreshToken } = req.body as { refreshToken: string };

    const authPayload = await verifyRefreshToken(refreshToken).catch((err) => {
      if (
        err instanceof TokenExpiredError ||
        err instanceof JsonWebTokenError ||
        err instanceof NotBeforeError
      ) {
        res.status(401).send(err);
        return;
      }

      throw err;
    });
    if (!authPayload) return;

    // Remove refresh token from redis
    const redisKey = `${process.env.REDIS_PREFIX}:refreshTokens:${authPayload.userId}`;
    await redis.srem(redisKey, refreshToken);

    return res.sendStatus(204);
  })
);
