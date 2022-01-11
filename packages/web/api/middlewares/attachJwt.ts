import { useAuthStore } from '#web/stores/auth.store';
import { AxiosRequestConfig } from 'axios';

// Attach accessToken to request header
export const attachJwt = (req: AxiosRequestConfig) => {
  const accessToken = useAuthStore.getState().tokens?.accessToken;
  if (!accessToken) return req;

  req.headers = {
    ...req.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  return req;
};
