import { axiosAuth } from '#web/api/axios';
import { refresh } from '#web/api/routes/auth';
import { useAuthStore } from '#web/stores/auth.store';
import { clearAuthCookie, setAuthCookie } from '#web/utils/authCookie';
import { AxiosError } from 'axios';
import debounce from 'lodash/debounce';

// Prevent multiple refresh on parallel queries
const debouncedRefresh = debounce(
  async () => {
    const refreshToken = useAuthStore.getState().tokens?.refreshToken;
    if (!refreshToken) return false;

    try {
      // Get new accessToken with refreshToken
      const res = await refresh(refreshToken);
      if (!res) return false;

      const { accessToken } = res;

      // Save new accessToken to zustand store
      useAuthStore.getState().setAuth({ accessToken, refreshToken });

      // Save new accessToken to cookie
      setAuthCookie({ accessToken, refreshToken });

      return true;
    } catch (err) {
      return false;
    }
  },
  500,
  { leading: true, trailing: false }
);

export const onJwtError = async (err: AxiosError) => {
  if (err.response?.status !== 401) return;

  // Handle expired JWT
  if (err.response.data.name === 'TokenExpiredError') {
    const refreshed = await debouncedRefresh();

    // Retry request after refresh
    if (refreshed) {
      const req = err.config;
      return axiosAuth(req);
    }
    // Debounced or failed refresh, catched at route handler
    else return;
  }

  // Handle invalid JWT
  if (
    err.response.data.name === 'JsonWebTokenError' ||
    err.response.data.name === 'NotBeforeError'
  ) {
    // Remove invalid JWTs cookie
    clearAuthCookie();

    // Redirect to login
    window.location.assign(`${window.location.origin}/auth/login`);
  }
};
