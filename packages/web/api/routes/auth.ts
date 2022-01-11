import { axios } from '#web/api/axios';
import { clearAuthCookie } from '#web/utils/authCookie';
import {
  AccessTokenResposne,
  AuthResponse,
  LoginFormValues,
  RegisterFormValues,
} from '@pern-template/shared';

export const register = (formValues: RegisterFormValues) =>
  axios
    .post<AuthResponse>('/auth/register', formValues)
    .then((res) => res.data);

export const login = (formValues: LoginFormValues) =>
  axios.post<AuthResponse>('/auth/login', formValues).then((res) => res.data);

export const refresh = (refreshToken: string) =>
  axios
    .post<AccessTokenResposne>('/auth/refresh', { refreshToken })
    .then((res) => res.data)
    .catch((err) => {
      // Refresh token invalid or not found on server
      if (err !== 'Not Found' && err !== 'Unauthorized') return;

      // Remove invalid JWTs cookie
      clearAuthCookie();

      // Redirect to login
      window.location.assign(`${window.location.origin}/auth/login`);
    });

export const logout = (refreshToken: string) =>
  axios.delete('/auth/logout', { data: { refreshToken } }).then(() => {});
