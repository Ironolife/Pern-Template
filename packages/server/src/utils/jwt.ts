import { AuthPayload } from '#server/@types/auth';
import { sign, verify } from 'jsonwebtoken';

const ACCESS_TOKEN_LIFETIME = '5m';

export const signAccessToken = (payload: AuthPayload) =>
  sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_LIFETIME,
  });

export const signRefreshToken = (userId: string) =>
  sign({ userId }, process.env.REFRESH_TOKEN_SECRET);

export const verifyAccessToken = (accessToken: string) =>
  new Promise<AuthPayload>((res, rej) => {
    try {
      res(verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as AuthPayload);
    } catch (err) {
      rej(err);
    }
  });

export const verifyRefreshToken = (refreshToken: string) =>
  new Promise<AuthPayload>((res, rej) => {
    try {
      res(
        verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as AuthPayload
      );
    } catch (err) {
      rej(err);
    }
  });
