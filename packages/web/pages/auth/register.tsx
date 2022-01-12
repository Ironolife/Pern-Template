import RegisterForm from '#web/components/forms/RegisterForm';
import WithAuth from '#web/components/withAuth';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { VFC } from 'react';

const Register: VFC = () => {
  return (
    <Stack component='main' py={8} px={4} mx='auto' maxWidth='sm' spacing={8}>
      <Typography component='h1' variant='h4'>
        Register
      </Typography>
      <RegisterForm />
    </Stack>
  );
};

export default WithAuth(Register, true);
