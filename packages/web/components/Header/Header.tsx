import { NextLinkComposed } from '#web/components/common/Link';
import { useProfileStore } from '#web/stores/profile.store';
import { clearAuthCookie } from '#web/utils/authCookie';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import React, { VFC } from 'react';

const Header: VFC = () => {
  const { profile } = useProfileStore(({ profile }) => ({ profile }));

  const handleLogout = () => {
    // Remove JWTs cookie
    clearAuthCookie();

    // Reload page to reset zustand stores
    window.location.assign('/');
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='lg'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction='row' spacing={2}>
            <Button component={NextLinkComposed} to='/' color='inherit'>
              Home
            </Button>
          </Stack>
          <Stack direction='row' spacing={4}>
            {!profile && (
              <Button
                component={NextLinkComposed}
                to='/auth/login'
                color='inherit'
              >
                Login / Register
              </Button>
            )}
            {profile && (
              <Button
                component={NextLinkComposed}
                to='/my/profile'
                color='inherit'
              >
                Hi {profile.username}!
              </Button>
            )}
            {profile && (
              <Button onClick={handleLogout} color='inherit'>
                Logout
              </Button>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
