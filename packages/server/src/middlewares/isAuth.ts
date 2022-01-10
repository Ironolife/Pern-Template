import { verifyAccessToken } from '#server/utils/jwt';
import { UserRole } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import {
  TokenExpiredError,
  JsonWebTokenError,
  NotBeforeError,
} from 'jsonwebtoken';
import intersection from 'lodash/intersection';

export const isAuth =
  (allowedRoles?: UserRole[], forbidRoles?: UserRole[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) return res.sendStatus(401);

    console.log(authorization);

    // Remove bearer prefix
    const accessToken = authorization.split(' ')[1];

    const authPayload = await verifyAccessToken(accessToken).catch((err) => {
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

    // Validate roles
    const { roles } = authPayload;

    if (roles.includes('BANNED')) return res.sendStatus(401);

    if (!!allowedRoles && intersection(roles, allowedRoles).length === 0)
      return res.sendStatus(401);

    if (!!forbidRoles && intersection(roles, forbidRoles).length > 0)
      return res.sendStatus(401);

    // Attach JWT payload to request
    req.auth = authPayload;

    return next();
  };
