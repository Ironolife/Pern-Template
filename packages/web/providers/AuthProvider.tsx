import { getMyProfile } from '#web/api/routes/my';
import { useAuthStore } from '#web/stores/auth.store';
import { useProfileStore } from '#web/stores/profile.store';
import { getAuthCookie } from '#web/utils/authCookie';
import React, { FC, useEffect } from 'react';
import { useMutation } from 'react-query';

const AuthProvider: FC = ({ children }) => {
  const { tokens, readyAuth } = useAuthStore(({ tokens, readyAuth }) => ({
    tokens,
    readyAuth,
  }));

  // Load JWTs from cookie on initialization and store them in zustand store
  useEffect(() => {
    const tokens = getAuthCookie();

    readyAuth(tokens);
  }, []);

  const getMyProfileMutation = useMutation(getMyProfile);
  const { setProfile } = useProfileStore(({ setProfile }) => ({ setProfile }));

  // Fetch profile if tokens exist
  useEffect(() => {
    if (tokens)
      getMyProfileMutation.mutate(undefined, {
        onSuccess: (res) => {
          // Store profile into zustand store
          setProfile(res);
        },
      });
  }, [tokens]);

  return <>{children}</>;
};

export default AuthProvider;
