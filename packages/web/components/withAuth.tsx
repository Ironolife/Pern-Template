import { useAuthStore } from '#web/stores/auth.store';
import { useRouter } from 'next/router';
import React, { useEffect, VFC } from 'react';

// Routes guard HOC
const WithAuth =
  (Component: VFC, reverse = false) =>
  () => {
    const router = useRouter();

    const { isReady, tokens } = useAuthStore(({ isReady, tokens }) => ({
      isReady,
      tokens,
    }));

    // Reverse for login & register page
    const shouldRedirect = isReady && (!reverse ? !tokens : tokens);

    // Handle redirect
    useEffect(() => {
      // Not logged in
      if (shouldRedirect && !reverse) router.replace('/auth/login');
      // Already logged in
      if (shouldRedirect && reverse) router.replace('/');
    }, [shouldRedirect]);

    // Wait for JWTs cookie or redirect
    if (!isReady || shouldRedirect) return null;

    if (isReady && !shouldRedirect) return <Component />;
  };

export default WithAuth;
