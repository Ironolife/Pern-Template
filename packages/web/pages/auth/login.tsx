import LoginForm from '#web/components/forms/LoginForm';
import WithAuth from '#web/components/withAuth';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { VFC } from 'react';

const Login: VFC = () => {
  return (
    <Stack py={8} px={4} mx='auto' maxWidth='sm' spacing={8}>
      <Typography component='h1' variant='h4'>
        Login
      </Typography>
      <LoginForm />
    </Stack>
  );
};

export default WithAuth(Login, true);
