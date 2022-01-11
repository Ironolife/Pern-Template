import { attachJwt } from '#web/api/middlewares/attachJwt';
import { onError } from '#web/api/middlewares/onError';
import { onJwtError } from '#web/api/middlewares/onJwtError';
import _axios from 'axios';

export const axios = _axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

axios.interceptors.request.use(undefined, onError);
axios.interceptors.response.use(undefined, onError);

// For routes that requires authorization header
export const axiosAuth = _axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

axiosAuth.interceptors.request.use(attachJwt, onError);
axiosAuth.interceptors.response.use(undefined, onJwtError);
axiosAuth.interceptors.response.use(undefined, onError);
