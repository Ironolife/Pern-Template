import { AuthResponse } from '@pern-template/shared';
import cookie from 'js-cookie';

const COOKIE_NAME = `${process.env.NEXT_PUBLIC_COOKIE_PREFIX}:auth`;
const COOKIE_LIFETIME = 365; // 1 year

export const setAuthCookie = (tokens: AuthResponse) => {
  const value = JSON.stringify(tokens);

  cookie.set(COOKIE_NAME, value, {
    expires: COOKIE_LIFETIME,
    sameSite: 'Lax',
    secure: true,
  });
};

export const getAuthCookie = () => {
  const value = cookie.get(COOKIE_NAME);

  if (!value) return null;

  return JSON.parse(value) as AuthResponse;
};

export const clearAuthCookie = () => {
  cookie.remove(COOKIE_NAME, {
    sameSite: 'Lax',
  });
};
